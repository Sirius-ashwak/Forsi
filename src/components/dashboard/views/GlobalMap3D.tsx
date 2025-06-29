import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Satellite, Cloud, Eye, EyeOff, Globe, MapPin, Activity, AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import { mockSupplyChainNodes, mockShippingRoutes } from '../../../api-mocks/graniteAI';
import { SupplyChainNode } from '../../../types';

interface NodeMarkerProps {
  node: SupplyChainNode;
  onClick: (node: SupplyChainNode) => void;
}

const NodeMarker: React.FC<NodeMarkerProps> = ({ node, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      if (node.status === 'disrupted') {
        meshRef.current.rotation.y += 0.03;
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.15);
      } else {
        meshRef.current.rotation.y += 0.008;
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      }
    }

    if (ringRef.current && node.status === 'disrupted') {
      ringRef.current.rotation.z += 0.02;
      ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
    }
  });

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'operational': return '#22c55e';
      case 'at-risk': return '#f59e0b';
      case 'disrupted': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getNodeSize = (type: string) => {
    switch (type) {
      case 'factory': return 0.08;
      case 'port': return 0.07;
      case 'warehouse': return 0.06;
      case 'supplier': return 0.05;
      default: return 0.06;
    }
  };

  // Convert lat/lng to 3D coordinates on sphere (Earth radius = 5)
  const phi = (90 - node.coordinates[0]) * (Math.PI / 180);
  const theta = (node.coordinates[1] + 180) * (Math.PI / 180);
  const radius = 5.05; // Slightly above Earth surface

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return (
    <group position={[x, y, z]}>
      {/* Main node */}
      <mesh
        ref={meshRef}
        onClick={() => onClick(node)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.6 : 1}
      >
        <sphereGeometry args={[getNodeSize(node.type), 16, 16]} />
        <meshStandardMaterial 
          color={getNodeColor(node.status)} 
          emissive={getNodeColor(node.status)}
          emissiveIntensity={node.status === 'disrupted' ? 0.8 : 0.5}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.7}
        />
      </mesh>
      
      {/* Disruption rings */}
      {node.status === 'disrupted' && (
        <>
          <mesh ref={ringRef} scale={hovered ? 4 : 3}>
            <ringGeometry args={[getNodeSize(node.type) * 2, getNodeSize(node.type) * 2.5, 32]} />
            <meshBasicMaterial 
              color="#ef4444" 
              transparent 
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh scale={hovered ? 5 : 4}>
            <ringGeometry args={[getNodeSize(node.type) * 3, getNodeSize(node.type) * 3.5, 32]} />
            <meshBasicMaterial 
              color="#ef4444" 
              transparent 
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}

      {/* Energy field for at-risk nodes */}
      {node.status === 'at-risk' && (
        <mesh scale={hovered ? 2.5 : 2}>
          <sphereGeometry args={[getNodeSize(node.type) * 2, 12, 12]} />
          <meshBasicMaterial 
            color="#f59e0b" 
            transparent 
            opacity={0.15}
            wireframe
          />
        </mesh>
      )}
      
      {hovered && (
        <Html distanceFactor={15}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            className="bg-gray-900 border border-gray-700 p-6 rounded-2xl min-w-64 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-lg">{node.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                node.status === 'operational' ? 'bg-green-500/20 text-green-400' :
                node.status === 'at-risk' ? 'bg-yellow-500/20 text-yellow-400' : 
                'bg-red-500/20 text-red-400'
              }`}>
                {node.status}
              </span>
            </div>
            <p className="text-sm text-gray-300 capitalize mb-4">{node.type}</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Capacity:</span>
                <span className="text-white font-semibold">{node.capacity.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Utilization:</span>
                <span className="text-white font-semibold">{Math.round(node.utilizationRate * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${node.utilizationRate * 100}%` }}
                />
              </div>
              {node.status === 'disrupted' && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-xs text-red-300 font-medium">⚠️ Critical disruption detected</p>
                  <p className="text-xs text-red-400 mt-1">AI countermeasures recommended</p>
                </div>
              )}
            </div>
          </motion.div>
        </Html>
      )}
    </group>
  );
};

// Create procedural Earth textures
const createEarthTexture = (satelliteMode: boolean): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  
  if (satelliteMode) {
    // Satellite-style Earth with more realistic colors
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.3, '#1e293b');
    gradient.addColorStop(0.7, '#334155');
    gradient.addColorStop(1, '#475569');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add landmasses with more realistic colors
    ctx.fillStyle = '#22543d';
    
    // North America
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.15, canvas.height * 0.35, canvas.width * 0.08, canvas.height * 0.15, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.22, canvas.height * 0.65, canvas.width * 0.04, canvas.height * 0.12, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Europe
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.52, canvas.height * 0.25, canvas.width * 0.03, canvas.height * 0.08, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Africa
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.53, canvas.height * 0.5, canvas.width * 0.05, canvas.height * 0.18, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.12, canvas.height * 0.15, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.04, canvas.height * 0.06, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add some texture details
    ctx.fillStyle = '#2d5a3d';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 8 + 2;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  } else {
    // Standard blue marble style
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e40af');
    gradient.addColorStop(0.5, '#2563eb');
    gradient.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Continents
    ctx.fillStyle = '#16a34a';
    
    // North America
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.15, canvas.height * 0.35, canvas.width * 0.08, canvas.height * 0.15, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.22, canvas.height * 0.65, canvas.width * 0.04, canvas.height * 0.12, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Europe
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.52, canvas.height * 0.25, canvas.width * 0.03, canvas.height * 0.08, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Africa
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.53, canvas.height * 0.5, canvas.width * 0.05, canvas.height * 0.18, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.12, canvas.height * 0.15, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.04, canvas.height * 0.06, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  return new THREE.CanvasTexture(canvas);
};

const createCloudsTexture = (): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Create realistic cloud patterns
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 60 + 20;
    const opacity = Math.random() * 0.4 + 0.2;
    
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // Add some wispy clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const width = Math.random() * 100 + 50;
    const height = Math.random() * 20 + 10;
    const opacity = Math.random() * 0.3 + 0.1;
    
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.ellipse(x, y, width, height, Math.random() * Math.PI, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
};

// Real Earth with procedural textures
const RealEarth: React.FC<{ satelliteMode: boolean }> = ({ satelliteMode }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);
  const [cloudsTexture, setCloudsTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Create textures immediately without external loading
    const earthTex = createEarthTexture(satelliteMode);
    const cloudsTex = createCloudsTexture();
    
    setEarthTexture(earthTex);
    setCloudsTexture(cloudsTex);
  }, [satelliteMode]);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.003;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.001;
    }
  });

  if (!earthTexture) {
    return (
      <group>
        <mesh>
          <sphereGeometry args={[5, 32, 32]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* Main Earth with procedural texture */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[5, 128, 128]} />
        <meshPhongMaterial
          map={earthTexture}
          shininess={30}
          specular={new THREE.Color(0x222222)}
          bumpScale={0.05}
        />
      </mesh>
      
      {/* Clouds layer */}
      {cloudsTexture && (
        <mesh ref={cloudsRef} scale={1.003}>
          <sphereGeometry args={[5, 64, 64]} />
          <meshBasicMaterial
            map={cloudsTexture}
            transparent
            opacity={0.4}
            alphaTest={0.1}
          />
        </mesh>
      )}
      
      {/* Atmospheric glow */}
      <mesh ref={atmosphereRef} scale={1.01}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const QuantumParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0008;
      pointsRef.current.rotation.x += 0.0003;
    }
  });

  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const radius = 6 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    // Color variation
    const colorChoice = Math.random();
    if (colorChoice < 0.6) {
      colors[i * 3] = 0.23; // Blue
      colors[i * 3 + 1] = 0.51;
      colors[i * 3 + 2] = 0.96;
    } else if (colorChoice < 0.8) {
      colors[i * 3] = 0.54; // Purple
      colors[i * 3 + 1] = 0.36;
      colors[i * 3 + 2] = 0.96;
    } else {
      colors[i * 3] = 0.13; // Green
      colors[i * 3 + 1] = 0.77;
      colors[i * 3 + 2] = 0.58;
    }
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        transparent
        opacity={0.8}
        sizeAttenuation
        vertexColors
      />
    </points>
  );
};

export const GlobalMap3D: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode | null>(null);
  const [timelineValue, setTimelineValue] = useState(0);
  const [predictiveMode, setPredictiveMode] = useState(false);
  const [satelliteMode, setSatelliteMode] = useState(true);
  const [weatherOverlay, setWeatherOverlay] = useState(false);

  const handleNodeClick = (node: SupplyChainNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="h-full bg-black text-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">3D Global Supply Chain Map</h1>
            <p className="text-gray-400">Interactive visualization of your global supply chain network</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-900 rounded-lg px-4 py-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Live Data</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-900 rounded-lg px-4 py-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">{mockSupplyChainNodes.length} Nodes</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 18], fov: 65 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[15, 15, 15]} intensity={2} color="#ffffff" />
          <pointLight position={[-15, -15, -15]} intensity={1} color="#8b5cf6" />
          <pointLight position={[0, 15, 0]} intensity={0.8} color="#22c55e" />
          
          <Stars radius={200} depth={100} count={12000} factor={8} saturation={0} fade speed={1.5} />
          <QuantumParticleField />
          <RealEarth satelliteMode={satelliteMode} />
          
          {mockSupplyChainNodes.map((node) => (
            <NodeMarker
              key={node.id}
              node={node}
              onClick={handleNodeClick}
            />
          ))}
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={35}
            autoRotate
            autoRotateSpeed={0.2}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* Control Panel */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.0 }}
        className="absolute top-24 left-8 bg-gray-900 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl z-10"
      >
        <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-400" />
          <span>Visualization Controls</span>
        </h4>
        
        <div className="space-y-4">
          <motion.button
            onClick={() => setSatelliteMode(!satelliteMode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-500 ${
              satelliteMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Satellite className="w-4 h-4" />
            <span>{satelliteMode ? 'Satellite View' : 'Standard View'}</span>
          </motion.button>

          <motion.button
            onClick={() => setWeatherOverlay(!weatherOverlay)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-500 ${
              weatherOverlay 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Weather Data</span>
          </motion.button>

          <motion.button
            onClick={() => setPredictiveMode(!predictiveMode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-500 ${
              predictiveMode 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Predictive Mode</span>
          </motion.button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Data Source</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-semibold">Real-time Feed</span>
          </div>
        </div>
      </motion.div>

      {/* Timeline Scrubber */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.0 }}
        className="absolute bottom-8 left-8 right-8 bg-gray-900 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl z-10"
      >
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-white whitespace-nowrap">Timeline:</span>
            <motion.button
              onClick={() => setPredictiveMode(!predictiveMode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-500 ${
                predictiveMode 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {predictiveMode ? 'Predictive Mode' : 'Current State'}
            </motion.button>
          </div>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="30"
              value={timelineValue}
              onChange={(e) => setTimelineValue(Number(e.target.value))}
              className="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer"
            />
            <div 
              className="absolute top-0 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full pointer-events-none transition-all duration-500"
              style={{ width: `${(timelineValue / 30) * 100}%` }}
            />
            {/* Timeline markers */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-400">
              <span>Now</span>
              <span>+15 days</span>
              <span>+30 days</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-300 whitespace-nowrap">T+{timelineValue} days</span>
            <p className="text-xs text-blue-400 mt-1">
              {predictiveMode ? 'AI Predictions Active' : 'Real-time Data'}
            </p>
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
            className="absolute top-24 right-8 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-sm backdrop-blur-xl z-10"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">{selectedNode.name}</h3>
              <motion.button
                onClick={() => setSelectedNode(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-gray-800"
              >
                ×
              </motion.button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Node Type:</span>
                <span className="text-sm font-semibold capitalize text-white px-3 py-1 bg-gray-800 rounded-lg">
                  {selectedNode.type}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Status:</span>
                <span className={`text-sm font-semibold capitalize px-4 py-2 rounded-xl ${
                  selectedNode.status === 'operational' ? 'bg-green-500/20 text-green-400' :
                  selectedNode.status === 'at-risk' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-red-500/20 text-red-400'
                }`}>
                  {selectedNode.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Capacity:</span>
                <span className="text-sm font-semibold text-white">{selectedNode.capacity.toLocaleString()}</span>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Utilization:</span>
                  <span className="text-sm font-semibold text-white">{Math.round(selectedNode.utilizationRate * 100)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedNode.utilizationRate * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 h-3 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-4 flex items-center space-x-2">
                <Zap className="w-3 h-3" />
                <span>Quick Actions:</span>
              </p>
              <div className="space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left text-xs bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 rounded-xl hover:bg-gray-700 transition-all duration-500"
                >
                  📊 View detailed analytics
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left text-xs bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 rounded-xl hover:bg-gray-700 transition-all duration-500"
                >
                  🚨 Set up alerts
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left text-xs bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 rounded-xl hover:bg-gray-700 transition-all duration-500"
                >
                  📈 Generate report
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
        className="absolute bottom-8 right-8 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-8 backdrop-blur-xl z-10"
      >
        <h4 className="text-lg font-bold mb-6">Node Status</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-300">Operational</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <span className="text-sm text-gray-300">At Risk</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
            <span className="text-sm text-gray-300">Disrupted</span>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Network Health</p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-blue-500" style={{ width: '73%' }} />
            </div>
            <span className="text-xs text-blue-400 font-semibold">73%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};