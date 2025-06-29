import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Satellite, Cloud, Eye, EyeOff, Zap, Activity, AlertTriangle, MapPin } from 'lucide-react';
import { mockSupplyChainNodes, mockShippingRoutes, mockDisruptions } from '../../api-mocks/graniteAI';
import { SupplyChainNode, DisruptionEvent } from '../../types';

// OpenGlobus imports
declare global {
  interface Window {
    og: any;
  }
}

export const OpenGlobusMap: React.FC = () => {
  const globusRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode | null>(null);
  const [timelineValue, setTimelineValue] = useState(0);
  const [predictiveMode, setPredictiveMode] = useState(false);
  const [satelliteMode, setSatelliteMode] = useState(true);
  const [weatherOverlay, setWeatherOverlay] = useState(false);
  const [globusInstance, setGlobusInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOpenGlobus = async () => {
      try {
        // Load OpenGlobus CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@openglobus/og@0.9.0/css/og.css';
        document.head.appendChild(link);

        // Load OpenGlobus JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@openglobus/og@0.9.0/dist/og-debug.js';
        script.onload = () => {
          initializeGlobus();
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load OpenGlobus:', error);
        setIsLoading(false);
      }
    };

    const initializeGlobus = () => {
      if (!globusRef.current || !window.og) return;

      try {
        const { og } = window;

        // Create the globe
        const globus = new og.Globe({
          target: globusRef.current,
          name: "Supply Chain Earth",
          terrain: new og.terrain.GlobusTerrain(),
          layers: [
            new og.layer.XYZ("OpenStreetMap", {
              isBaseLayer: true,
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              visibility: !satelliteMode,
              attribution: 'Data © OpenStreetMap contributors, ODbL'
            }),
            new og.layer.XYZ("Satellite", {
              isBaseLayer: true,
              url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              visibility: satelliteMode,
              attribution: 'Tiles © Esri'
            })
          ],
          autoActivated: true
        });

        // Set initial camera position
        globus.planet.camera.setLonLat(new og.LonLat(0, 30, 20000000));

        // Create vector layer for supply chain nodes
        const nodesLayer = new og.Layer("Supply Chain Nodes", {
          clampToGround: true,
          polygonOffsetFactor: 0,
          polygonOffsetUnits: 0
        });

        globus.planet.addLayer(nodesLayer);

        // Add supply chain nodes
        mockSupplyChainNodes.forEach((node) => {
          const color = getNodeColor(node.status);
          const size = getNodeSize(node.type);

          // Create billboard for the node
          const billboard = new og.Billboard({
            src: createNodeCanvas(node),
            width: size,
            height: size,
            anchorY: 0.5
          });

          // Create entity
          const entity = new og.Entity({
            lonlat: new og.LonLat(node.coordinates[1], node.coordinates[0]),
            billboard: billboard,
            properties: {
              nodeData: node
            }
          });

          // Add click handler
          entity.events.on("click", () => {
            setSelectedNode(node);
          });

          // Add hover effects
          entity.events.on("mouseenter", () => {
            billboard.setSize(size * 1.5, size * 1.5);
          });

          entity.events.on("mouseleave", () => {
            billboard.setSize(size, size);
          });

          nodesLayer.add(entity);
        });

        // Add disruption markers
        mockDisruptions.forEach((disruption) => {
          const disruptionBillboard = new og.Billboard({
            src: createDisruptionCanvas(disruption),
            width: 40,
            height: 40,
            anchorY: 0.5
          });

          const disruptionEntity = new og.Entity({
            lonlat: new og.LonLat(disruption.location[1], disruption.location[0]),
            billboard: disruptionBillboard,
            properties: {
              disruptionData: disruption
            }
          });

          nodesLayer.add(disruptionEntity);
        });

        // Add shipping routes
        mockShippingRoutes.forEach((route) => {
          const fromNode = mockSupplyChainNodes.find(n => n.id === route.from);
          const toNode = mockSupplyChainNodes.find(n => n.id === route.to);

          if (fromNode && toNode) {
            const routeColor = route.status === 'active' ? [0, 255, 0, 0.8] : 
                             route.status === 'delayed' ? [255, 165, 0, 0.8] : [255, 0, 0, 0.8];

            const polyline = new og.Polyline({
              path3v: [
                [fromNode.coordinates[1], fromNode.coordinates[0], 100000],
                [toNode.coordinates[1], toNode.coordinates[0], 100000]
              ],
              style: {
                color: routeColor,
                width: 3
              }
            });

            const routeEntity = new og.Entity({
              polyline: polyline
            });

            nodesLayer.add(routeEntity);
          }
        });

        setGlobusInstance(globus);
        setIsLoading(false);

      } catch (error) {
        console.error('Failed to initialize OpenGlobus:', error);
        setIsLoading(false);
      }
    };

    loadOpenGlobus();

    return () => {
      if (globusInstance) {
        globusInstance.destroy();
      }
    };
  }, []);

  // Update layers when satellite mode changes
  useEffect(() => {
    if (globusInstance) {
      const layers = globusInstance.planet.layers;
      layers.forEach((layer: any) => {
        if (layer.name === "OpenStreetMap") {
          layer.setVisibility(!satelliteMode);
        } else if (layer.name === "Satellite") {
          layer.setVisibility(satelliteMode);
        }
      });
    }
  }, [satelliteMode, globusInstance]);

  const getNodeColor = (status: string): string => {
    switch (status) {
      case 'operational': return '#22c55e';
      case 'at-risk': return '#f59e0b';
      case 'disrupted': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getNodeSize = (type: string): number => {
    switch (type) {
      case 'factory': return 32;
      case 'port': return 28;
      case 'warehouse': return 24;
      case 'supplier': return 20;
      default: return 24;
    }
  };

  const createNodeCanvas = (node: SupplyChainNode): string => {
    const canvas = document.createElement('canvas');
    const size = getNodeSize(node.type);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Draw outer ring for disrupted nodes
    if (node.status === 'disrupted') {
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2 - 2, 0, 2 * Math.PI);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Draw main node
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/3, 0, 2 * Math.PI);
    ctx.fillStyle = getNodeColor(node.status);
    ctx.fill();

    // Add white border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add type indicator
    ctx.fillStyle = '#ffffff';
    ctx.font = `${size/4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const typeChar = node.type.charAt(0).toUpperCase();
    ctx.fillText(typeChar, size/2, size/2);

    return canvas.toDataURL();
  };

  const createDisruptionCanvas = (disruption: DisruptionEvent): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d')!;

    // Draw warning triangle
    ctx.beginPath();
    ctx.moveTo(20, 5);
    ctx.lineTo(35, 30);
    ctx.lineTo(5, 30);
    ctx.closePath();
    
    const color = disruption.severity === 'critical' ? '#dc2626' : 
                  disruption.severity === 'high' ? '#ea580c' : '#d97706';
    
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add exclamation mark
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', 20, 20);

    return canvas.toDataURL();
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-full cosmic-bg overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-3xl font-semibold text-white mb-4">Loading 3D Earth</h2>
          <p className="text-blue-200 text-lg">Initializing OpenGlobus visualization...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full cosmic-bg overflow-hidden">
      {/* OpenGlobus Container */}
      <div ref={globusRef} className="w-full h-full" />

      {/* Enhanced Control Panel */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.0 }}
        className="absolute top-8 left-8 glass-panel border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl glow-blue volumetric-depth"
      >
        <h4 className="text-lg font-bold gradient-text mb-6 flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-400" />
          <span>Earth Visualization</span>
        </h4>
        
        <div className="space-y-4">
          <motion.button
            onClick={() => setSatelliteMode(!satelliteMode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-500 elite-button ${
              satelliteMode 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white glow-blue' 
                : 'glass border border-blue-500/30 text-blue-300 hover:glow-blue'
            }`}
          >
            <Satellite className="w-4 h-4" />
            <span>{satelliteMode ? 'Satellite View' : 'Street Map'}</span>
          </motion.button>

          <motion.button
            onClick={() => setWeatherOverlay(!weatherOverlay)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-500 elite-button ${
              weatherOverlay 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white glow-green' 
                : 'glass border border-green-500/30 text-green-300 hover:glow-green'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Weather Data</span>
          </motion.button>

          <motion.button
            onClick={() => setPredictiveMode(!predictiveMode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-500 elite-button ${
              predictiveMode 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white glow-purple' 
                : 'glass border border-purple-500/30 text-purple-300 hover:glow-purple'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{predictiveMode ? 'Predictive Mode' : 'Real-time Mode'}</span>
          </motion.button>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-400 mb-2">Data Source</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-semibold">OpenGlobus Earth</span>
          </div>
        </div>
      </motion.div>

      {/* Timeline Scrubber */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.0 }}
        className="absolute bottom-8 left-8 right-8 glass-panel border border-blue-500/20 rounded-3xl p-8 backdrop-blur-xl glow-blue volumetric-depth"
      >
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-white whitespace-nowrap">Timeline:</span>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-400">
                {predictiveMode ? 'AI Predictions' : 'Real-time Data'}
              </span>
            </div>
          </div>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="30"
              value={timelineValue}
              onChange={(e) => setTimelineValue(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer slider"
            />
            <div 
              className="absolute top-0 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full pointer-events-none transition-all duration-500 energy-flow"
              style={{ width: `${(timelineValue / 30) * 100}%` }}
            />
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-slate-400">
              <span>Now</span>
              <span>+15 days</span>
              <span>+30 days</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-slate-300 whitespace-nowrap">T+{timelineValue} days</span>
          </div>
        </div>
      </motion.div>

      {/* Node Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ x: -100, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-8 right-8 glass-panel border border-blue-500/30 rounded-3xl shadow-2xl p-8 max-w-sm backdrop-blur-xl glow-blue volumetric-depth"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold gradient-text">{selectedNode.name}</h3>
              <motion.button
                onClick={() => setSelectedNode(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-xl hover:glass"
              >
                ×
              </motion.button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Node Type:</span>
                <span className="text-sm font-semibold capitalize text-white px-3 py-1 glass rounded-lg">
                  {selectedNode.type}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Status:</span>
                <span className={`text-sm font-semibold capitalize px-4 py-2 rounded-xl ${
                  selectedNode.status === 'operational' ? 'bg-green-500/20 text-green-400 glow-green' :
                  selectedNode.status === 'at-risk' ? 'bg-yellow-500/20 text-yellow-400 glow-amber' : 
                  'bg-red-500/20 text-red-400 glow-red anomaly-pulse'
                }`}>
                  {selectedNode.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Capacity:</span>
                <span className="text-sm font-semibold text-white">{selectedNode.capacity.toLocaleString()}</span>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">Utilization:</span>
                  <span className="text-sm font-semibold text-white">{Math.round(selectedNode.utilizationRate * 100)}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedNode.utilizationRate * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 h-3 rounded-full energy-flow"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-4 flex items-center space-x-2">
                <MapPin className="w-3 h-3" />
                <span>Location Analysis:</span>
              </p>
              <div className="space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left text-xs glass-panel border border-blue-500/30 text-blue-300 px-4 py-3 rounded-xl hover:glow-blue transition-all duration-500 elite-button"
                >
                  🌍 Real-time monitoring active
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left text-xs glass-panel border border-amber-500/30 text-amber-300 px-4 py-3 rounded-xl hover:glow-amber transition-all duration-500 elite-button"
                >
                  🌦️ Weather impact assessment
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left text-xs glass-panel border border-green-500/30 text-green-300 px-4 py-3 rounded-xl hover:glow-green transition-all duration-500 elite-button"
                >
                  🚛 Logistics optimization
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.0 }}
        className="absolute bottom-8 right-8 glass-panel border border-blue-500/20 rounded-3xl shadow-lg p-8 backdrop-blur-xl glow-blue volumetric-depth"
      >
        <h4 className="text-lg font-bold gradient-text mb-6">Supply Chain Status</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-green-500 rounded-full glow-green cosmic-breathe" />
            <span className="text-sm text-slate-300">Operational</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-yellow-500 rounded-full glow-amber" />
            <span className="text-sm text-slate-300">At Risk</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-red-500 rounded-full glow-red anomaly-pulse" />
            <span className="text-sm text-slate-300">Disrupted</span>
          </div>
          <div className="flex items-center space-x-4">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-slate-300">Active Disruption</span>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-400 mb-2">Network Health</p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 energy-flow" style={{ width: '78%' }} />
            </div>
            <span className="text-xs text-blue-400 font-semibold">78%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};