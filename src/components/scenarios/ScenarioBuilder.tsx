import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Play, Save, Zap, CloudRain, Users, TrendingDown, Building, Brain, Activity } from 'lucide-react';
import { DisruptionEvent } from '../../types';

const disruptionTypes = [
  { 
    id: 'weather', 
    name: 'Weather Events', 
    color: 'from-blue-500 to-cyan-500', 
    icon: CloudRain,
    description: 'Natural weather disruptions'
  },
  { 
    id: 'political', 
    name: 'Political Events', 
    color: 'from-red-500 to-pink-500', 
    icon: Users,
    description: 'Geopolitical instability'
  },
  { 
    id: 'economic', 
    name: 'Economic Events', 
    color: 'from-yellow-500 to-orange-500', 
    icon: TrendingDown,
    description: 'Market fluctuations'
  },
  { 
    id: 'infrastructure', 
    name: 'Infrastructure', 
    color: 'from-purple-500 to-indigo-500', 
    icon: Building,
    description: 'System failures'
  }
];

export const ScenarioBuilder: React.FC = () => {
  const [scenarioName, setScenarioName] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<DisruptionEvent[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddEvent = (type: string) => {
    const typeData = disruptionTypes.find(t => t.id === type);
    const newEvent: DisruptionEvent = {
      id: `event-${Date.now()}`,
      title: `${typeData?.name} Event`,
      type: type as any,
      severity: 'medium',
      location: [0, 0] as [number, number],
      affectedNodes: [],
      startDate: new Date().toISOString(),
      impact: {
        cost: Math.floor(Math.random() * 2000000) + 500000,
        delay: Math.floor(Math.random() * 15) + 1,
        productsAffected: Math.floor(Math.random() * 2000) + 100
      }
    };

    setSelectedEvents(prev => [...prev, newEvent]);
  };

  const handleRemoveEvent = (eventId: string) => {
    setSelectedEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const handleRunScenario = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  const totalImpact = selectedEvents.reduce((acc, event) => ({
    cost: acc.cost + event.impact.cost,
    delay: Math.max(acc.delay, event.impact.delay),
    productsAffected: acc.productsAffected + event.impact.productsAffected
  }), { cost: 0, delay: 0, productsAffected: 0 });

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h1 className="text-6xl font-thin text-slate-900 mb-6 tracking-tight">
            Scenario
            <span className="block font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Builder
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            Create and analyze what-if scenarios for your supply chain
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden"
        >
          <div className="p-10 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-slate-900">Scenario Configuration</h2>
            </div>
            <p className="text-slate-600 text-lg font-light">Design custom disruption scenarios with AI-powered impact analysis</p>
          </div>

          <div className="p-10 space-y-10">
            {/* Scenario Name */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <label className="block text-xl font-semibold text-slate-900 mb-4">
                Scenario Name
              </label>
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="Enter scenario name..."
                className="w-full px-6 py-4 bg-slate-100/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-slate-900 placeholder-slate-500 text-lg font-medium shadow-sm transition-all duration-300"
              />
            </motion.div>

            {/* Disruption Types */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <label className="block text-xl font-semibold text-slate-900 mb-6">
                Disruption Events
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {disruptionTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.id}
                      onClick={() => handleAddEvent(type.id)}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.6 + index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className={`bg-gradient-to-br ${type.color} p-8 rounded-2xl text-white hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 flex flex-col items-center space-y-4">
                        <Icon className="w-10 h-10" />
                        <div className="text-center">
                          <div className="font-bold text-lg mb-2">{type.name}</div>
                          <p className="text-sm opacity-90 mb-3">{type.description}</p>
                          <Plus className="w-5 h-5 mx-auto opacity-80" />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Selected Events */}
              <AnimatePresence>
                {selectedEvents.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-slate-900">Selected Events:</h4>
                    {selectedEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ 
                          delay: index * 0.1,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="flex items-center justify-between bg-slate-100/80 border border-slate-200 p-6 rounded-2xl group hover:bg-slate-100 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex-1">
                          <h5 className="font-semibold text-slate-900 capitalize mb-2 text-lg">{event.title}</h5>
                          <div className="flex items-center space-x-6 text-sm">
                            <span className="text-slate-600">
                              Impact: <span className="text-red-600 font-bold">${event.impact.cost.toLocaleString()}</span>
                            </span>
                            <span className="text-slate-600">
                              Delay: <span className="text-amber-600 font-bold">{event.impact.delay} days</span>
                            </span>
                            <span className="text-slate-600">
                              Products: <span className="text-blue-600 font-bold">{event.impact.productsAffected.toLocaleString()}</span>
                            </span>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => handleRemoveEvent(event.id)}
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Impact Analysis */}
            <AnimatePresence>
              {selectedEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-slate-100/80 border border-slate-200 rounded-2xl p-8"
                >
                  <h4 className="text-2xl font-semibold text-slate-900 mb-8 flex items-center space-x-3">
                    <Zap className="w-6 h-6 text-blue-500" />
                    <span>Impact Analysis</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-center p-6 bg-red-50 border border-red-200 rounded-2xl"
                    >
                      <div className="text-3xl font-bold text-red-600 mb-3">
                        ${totalImpact.cost.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600 mb-3 font-medium">Total Cost Impact</div>
                      <div className="w-full bg-white rounded-full h-2 overflow-hidden shadow-inner">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full shadow-lg" style={{ width: '85%' }} />
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-center p-6 bg-amber-50 border border-amber-200 rounded-2xl"
                    >
                      <div className="text-3xl font-bold text-amber-600 mb-3">
                        {totalImpact.delay} days
                      </div>
                      <div className="text-sm text-slate-600 mb-3 font-medium">Maximum Delay</div>
                      <div className="w-full bg-white rounded-full h-2 overflow-hidden shadow-inner">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full shadow-lg" style={{ width: '70%' }} />
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-center p-6 bg-blue-50 border border-blue-200 rounded-2xl"
                    >
                      <div className="text-3xl font-bold text-blue-600 mb-3">
                        {totalImpact.productsAffected.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600 mb-3 font-medium">Products Affected</div>
                      <div className="w-full bg-white rounded-full h-2 overflow-hidden shadow-inner">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full shadow-lg" style={{ width: '60%' }} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center justify-between pt-8 border-t border-slate-200"
            >
              <div className="flex space-x-6">
                <motion.button
                  onClick={handleRunScenario}
                  disabled={selectedEvents.length === 0 || isRunning}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  <Play className="w-6 h-6" />
                  <span>{isRunning ? 'Running Analysis...' : 'Run Scenario'}</span>
                </motion.button>
                <motion.button
                  disabled={!scenarioName || selectedEvents.length === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  <Save className="w-6 h-6" />
                  <span>Save Scenario</span>
                </motion.button>
              </div>

              <AnimatePresence>
                {isRunning && (
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="flex items-center space-x-4 text-blue-600"
                  >
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <div>
                      <span className="text-lg font-semibold">AI analysis in progress...</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <Activity className="w-4 h-4" />
                        <span className="text-sm text-slate-500">Processing scenario</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};