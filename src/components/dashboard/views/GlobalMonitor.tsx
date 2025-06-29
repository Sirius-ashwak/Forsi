import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Activity, AlertTriangle, TrendingUp, MapPin, Zap, Eye, RefreshCw } from 'lucide-react';

export const GlobalMonitor: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('global');

  const regions = [
    { id: 'global', name: 'Global', nodes: 1247, alerts: 5 },
    { id: 'americas', name: 'Americas', nodes: 342, alerts: 1 },
    { id: 'emea', name: 'EMEA', nodes: 456, alerts: 2 },
    { id: 'apac', name: 'APAC', nodes: 449, alerts: 2 }
  ];

  const alerts = [
    {
      id: 1,
      severity: 'high',
      title: 'Port Congestion - Shanghai',
      description: 'Severe delays affecting 23 shipments',
      time: '2 minutes ago',
      region: 'APAC'
    },
    {
      id: 2,
      severity: 'medium',
      title: 'Weather Alert - Gulf Coast',
      description: 'Hurricane tracking towards logistics hubs',
      time: '15 minutes ago',
      region: 'Americas'
    },
    {
      id: 3,
      severity: 'low',
      title: 'Supplier Maintenance - Munich',
      description: 'Scheduled downtime for facility upgrades',
      time: '1 hour ago',
      region: 'EMEA'
    }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  const handleAlertClick = (alertId: number) => {
    console.log(`View alert details: ${alertId}`);
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
            <h1 className="text-4xl font-bold mb-4">Global Monitor</h1>
            <p className="text-gray-400 text-lg">Real-time monitoring of your global supply chain operations</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleRefresh}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
            <div className="flex items-center space-x-2 bg-green-500/20 rounded-lg px-4 py-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-semibold">Live</span>
            </div>
          </div>
        </div>

        {/* Region Selector */}
        <div className="flex flex-wrap gap-4">
          {regions.map((region) => (
            <motion.button
              key={region.id}
              onClick={() => handleRegionSelect(region.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedRegion === region.id
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4" />
                <span>{region.name}</span>
                <div className="flex items-center space-x-2 text-xs">
                  <span>{region.nodes} nodes</span>
                  {region.alerts > 0 && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                      {region.alerts}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <MapPin className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-blue-400">1,247</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Active Nodes</h3>
            <p className="text-sm text-gray-400">Across all regions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <span className="text-2xl font-bold text-red-400">5</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Active Alerts</h3>
            <p className="text-sm text-gray-400">Requiring attention</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400">94.2%</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">System Health</h3>
            <p className="text-sm text-gray-400">Overall performance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">2.3s</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Avg Response</h3>
            <p className="text-sm text-gray-400">System latency</p>
          </motion.div>
        </div>

        {/* Alerts Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Alerts</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('View all alerts')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>View All</span>
            </motion.button>
          </div>

          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAlertClick(alert.id)}
                className="flex items-center space-x-4 p-4 bg-gray-800 hover:bg-gray-750 rounded-lg cursor-pointer transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${
                  alert.severity === 'high' ? 'bg-red-500' :
                  alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{alert.title}</h3>
                  <p className="text-sm text-gray-400">{alert.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{alert.time}</p>
                  <p className="text-xs text-gray-400">{alert.region}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">Regional Performance</h3>
            <div className="space-y-4">
              {regions.slice(1).map((region) => (
                <div key={region.id} className="flex items-center justify-between">
                  <span className="text-gray-300">{region.name}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white w-12">
                      {Math.floor(Math.random() * 40 + 60)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">System Status</h3>
            <div className="space-y-4">
              {[
                { name: 'API Gateway', status: 'Operational', uptime: '99.9%' },
                { name: 'Data Processing', status: 'Operational', uptime: '99.7%' },
                { name: 'AI Analytics', status: 'Operational', uptime: '99.8%' },
                { name: 'Real-time Sync', status: 'Degraded', uptime: '97.2%' }
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <span className="text-gray-300">{service.name}</span>
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.status === 'Operational' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {service.status}
                    </span>
                    <span className="text-sm font-semibold text-white w-12">
                      {service.uptime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};