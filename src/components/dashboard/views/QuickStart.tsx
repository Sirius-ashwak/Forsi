import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Factory, BarChart3, Globe, Database, FileSpreadsheet, Zap, Shield } from 'lucide-react';

export const QuickStart: React.FC = () => {
  const integrationTypes = [
    { name: 'ERP Systems', active: true },
    { name: 'Logistics APIs', active: false },
    { name: 'IoT Sensors', active: false },
    { name: 'Supplier Portals', active: false },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Quick Start</h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Set up Forsi and connect your systems to start monitoring your global operations
          </p>
        </div>

        {/* Integration type selector */}
        <div className="flex flex-wrap items-center gap-3">
          {integrationTypes.map((type) => (
            <motion.button
              key={type.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                type.active
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {type.name}
            </motion.button>
          ))}
        </div>

        {/* Step 1 */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-2xl font-semibold">Connect your supply chain systems</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-12">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-4 p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-850 transition-all duration-200 text-left group"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <Factory className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <span className="font-semibold text-lg block">Connect ERP System</span>
                <span className="text-gray-400 text-sm">SAP, Oracle, Microsoft Dynamics</span>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-4 p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-850 transition-all duration-200 text-left group"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <Truck className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <span className="font-semibold text-lg block">Logistics Platforms</span>
                <span className="text-gray-400 text-sm">FedEx, UPS, DHL APIs</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-4 p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-850 transition-all duration-200 text-left group"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <span className="font-semibold text-lg block">IoT Sensors</span>
                <span className="text-gray-400 text-sm">Temperature, location, inventory</span>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-4 p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-850 transition-all duration-200 text-left group"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <FileSpreadsheet className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <span className="font-semibold text-lg block">Import Data Files</span>
                <span className="text-gray-400 text-sm">CSV, Excel, JSON formats</span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="text-2xl font-semibold">Chat with Forsi Assistant</h2>
          </div>
          
          <div className="ml-12">
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-850">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-black text-lg font-bold">F</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Forsi Assistant</h3>
                    <p className="text-sm text-gray-400">Analyze supply chain performance and predict disruptions</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              {/* Chat content */}
              <div className="p-6">
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-black text-3xl font-bold">F</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Welcome to Forsi</h4>
                      <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                        I can help you monitor global operations, predict supply disruptions, optimize logistics routes, and analyze supplier performance. What would you like to explore?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick action buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors text-left"
                  >
                    📊 Analyze risk levels
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors text-left"
                  >
                    🚚 Track shipments
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors text-left"
                  >
                    📈 Demand forecast
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors text-left"
                  >
                    🏭 Supplier analysis
                  </motion.button>
                </div>

                {/* Input area */}
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Ask about supply chain performance, risks, or optimization..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Zap className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-12 p-6 bg-gray-900 border border-gray-800 rounded-xl">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Supply Chain Security</h3>
              <p className="text-gray-400 leading-relaxed">
                Start by connecting your primary ERP system to get comprehensive visibility into your supply chain. 
                Forsi will analyze patterns, identify potential risks, and provide actionable insights to improve resilience and efficiency across your global operations.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};