import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, ArrowRight, Zap, Globe, Brain, Shield } from 'lucide-react';

interface IntroPageProps {
  onEnter: () => void;
}

const integrationLogos = [
  { name: 'SAP', icon: '🏢' },
  { name: 'Oracle', icon: '🔶' },
  { name: 'Microsoft', icon: '🪟' },
  { name: 'Salesforce', icon: '☁️' },
  { name: 'AWS', icon: '🌐' },
  { name: 'Google Cloud', icon: '☁️' },
  { name: 'Azure', icon: '🔷' },
  { name: 'IBM', icon: '🔵' },
];

export const IntroPage: React.FC<IntroPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between p-6 md:p-8"
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-semibold">Supply Chain AI</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Company</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
              <span>Docs</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Log in
            </motion.button>
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-32">
        {/* Hero section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-2 mb-8">
              <span className="text-orange-400 text-sm">Built with AI</span>
              <span className="text-gray-500">🚀</span>
              <span className="text-blue-400 text-sm">Enterprise Ready</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            AI-powered supply chain{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              resilience platform
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Connect your supply chain data with AI-powered insights, predictive analytics,
            and real-time monitoring across your global operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center space-x-4 mb-16"
          >
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start monitoring
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-gray-700 text-white rounded-lg font-semibold text-lg hover:border-gray-600 transition-colors"
            >
              See demo
            </motion.button>
          </motion.div>
        </div>

        {/* Integration logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-center space-x-8 md:space-x-12 overflow-x-auto pb-4">
            {integrationLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex-shrink-0 w-16 h-16 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center hover:border-gray-700 transition-colors cursor-pointer"
              >
                <span className="text-2xl">{logo.icon}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <button className="bg-gray-800 px-3 py-1 rounded">Python</button>
                <button className="px-3 py-1 rounded hover:bg-gray-800 transition-colors">TypeScript</button>
                <button className="px-3 py-1 rounded hover:bg-gray-800 transition-colors">REST API</button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                <Github className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="font-mono text-sm">
            <div className="text-gray-500 mb-2">1</div>
            <div className="text-gray-500 mb-2">2</div>
            <div className="text-gray-500 mb-2">3</div>
            <div className="text-gray-500 mb-2">4</div>
            <div className="text-gray-500 mb-2">5</div>
            <div className="text-gray-500 mb-2">6</div>
            <div className="text-gray-500 mb-2">7</div>
            
            <div className="absolute left-16 top-0">
              <div className="text-purple-400 mb-2">from <span className="text-blue-400">supply_chain_ai</span> <span className="text-purple-400">import</span> <span className="text-yellow-400">SupplyChainClient</span></div>
              <div className="text-purple-400 mb-2">from <span className="text-blue-400">supply_chain_ai.analytics</span> <span className="text-purple-400">import</span> <span className="text-yellow-400">PredictiveAnalytics</span></div>
              <div className="text-purple-400 mb-2">from <span className="text-blue-400">supply_chain_ai.monitoring</span> <span className="text-purple-400">import</span> <span className="text-yellow-400">RealTimeMonitor</span></div>
              <div className="mb-2"></div>
              <div className="text-gray-500 mb-2"># Initialize Supply Chain AI client</div>
              <div className="text-blue-400 mb-2">client <span className="text-white">=</span> <span className="text-yellow-400">SupplyChainClient</span>(<span className="text-green-400">api_key</span>=<span className="text-green-400">"YOUR_API_KEY"</span>)</div>
              <div className="text-blue-400 mb-2">monitor <span className="text-white">=</span> <span className="text-yellow-400">RealTimeMonitor</span>(<span className="text-green-400">client</span>)</div>
            </div>
          </div>
        </motion.div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-gray-900 border border-gray-800 rounded-full px-4 py-2 mb-8">
            <span className="text-gray-400 text-sm">Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Platform Features</h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Everything you need to build resilient supply chain operations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Global Monitoring',
                description: 'Real-time visibility across your entire supply network'
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'AI Predictions',
                description: 'Advanced analytics for demand forecasting and risk assessment'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Risk Management',
                description: 'Proactive identification and mitigation of supply chain risks'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Automated Response',
                description: 'Intelligent automation for supply chain optimization'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};