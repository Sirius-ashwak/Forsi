import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Settings, CheckCircle, Clock, AlertCircle, Factory, Truck, Globe, Database } from 'lucide-react';

export const ConnectedIntegrations: React.FC = () => {
  const integrations = [
    { 
      name: 'SAP ERP', 
      status: 'Connected', 
      icon: <Factory className="w-6 h-6 text-blue-400" />, 
      lastSync: '2 minutes ago', 
      color: 'green',
      type: 'ERP System',
      dataPoints: '15,247'
    },
    { 
      name: 'Oracle SCM Cloud', 
      status: 'Connected', 
      icon: <Database className="w-6 h-6 text-orange-400" />, 
      lastSync: '5 minutes ago', 
      color: 'green',
      type: 'Supply Chain Management',
      dataPoints: '8,932'
    },
    { 
      name: 'FedEx API', 
      status: 'Pending', 
      icon: <Truck className="w-6 h-6 text-purple-400" />, 
      lastSync: null, 
      color: 'yellow',
      type: 'Logistics Provider',
      dataPoints: null
    },
    { 
      name: 'Microsoft Dynamics 365', 
      status: 'Available', 
      icon: <Factory className="w-6 h-6 text-blue-400" />, 
      lastSync: null, 
      color: 'gray',
      type: 'ERP System',
      dataPoints: null
    },
    { 
      name: 'UPS Tracking', 
      status: 'Available', 
      icon: <Truck className="w-6 h-6 text-yellow-600" />, 
      lastSync: null, 
      color: 'gray',
      type: 'Logistics Provider',
      dataPoints: null
    },
    { 
      name: 'IoT Sensor Network', 
      status: 'Available', 
      icon: <Globe className="w-6 h-6 text-green-400" />, 
      lastSync: null, 
      color: 'gray',
      type: 'IoT Platform',
      dataPoints: null
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">Connected Supply Chain Systems</h1>
            <p className="text-gray-400 text-lg">Manage your connected supply chain systems and data sources</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors self-start md:self-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add Integration</span>
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Connected Systems</p>
                <p className="text-3xl font-bold text-green-400">2</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Pending Setup</p>
                <p className="text-3xl font-bold text-yellow-400">1</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Available</p>
                <p className="text-3xl font-bold text-gray-400">3</p>
              </div>
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Data Points</p>
                <p className="text-3xl font-bold text-blue-400">24.2K</p>
              </div>
              <Database className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Integration cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 hover:bg-gray-850 transition-all duration-200 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{integration.name}</h3>
                    <p className="text-sm text-gray-400">{integration.type}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(integration.status)}
                      <span className={`text-sm px-2 py-1 rounded-lg border ${getStatusColor(integration.status)}`}>
                        {integration.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>
              
              {/* Details */}
              <div className="space-y-3">
                {integration.lastSync && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Last sync:</span>
                    <span className="text-white">{integration.lastSync}</span>
                  </div>
                )}

                {integration.dataPoints && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Data points:</span>
                    <span className="text-white font-medium">{integration.dataPoints}</span>
                  </div>
                )}
                
                {integration.status === 'Connected' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Health status:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-green-400 rounded-full"></div>
                      </div>
                      <span className="text-green-400 font-medium">98%</span>
                    </div>
                  </div>
                )}
                
                {integration.status === 'Available' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Connect System
                  </motion.button>
                )}
                
                {integration.status === 'Pending' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-yellow-500/20 border border-yellow-500/30 hover:bg-yellow-500/30 rounded-lg text-sm font-medium text-yellow-400 transition-colors"
                  >
                    Complete Setup
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Integration Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'ERP Systems', count: 12, icon: <Factory className="w-6 h-6" />, color: 'blue' },
              { name: 'Logistics', count: 8, icon: <Truck className="w-6 h-6" />, color: 'green' },
              { name: 'IoT Sensors', count: 15, icon: <Globe className="w-6 h-6" />, color: 'purple' },
              { name: 'Analytics', count: 6, icon: <Database className="w-6 h-6" />, color: 'orange' }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-${category.color}-500/20 rounded-xl flex items-center justify-center`}>
                    <div className={`text-${category.color}-400`}>
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-gray-400 text-sm">{category.count} available</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};