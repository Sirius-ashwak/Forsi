import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, BarChart3, Target, Zap, Download, Settings, RefreshCw } from 'lucide-react';

export const DemandForecasting: React.FC = () => {
  const [timeHorizon, setTimeHorizon] = useState('90d');
  const [productCategory, setProductCategory] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const forecastData = [
    {
      product: 'Electronics Components',
      currentDemand: 15420,
      forecastedDemand: 18650,
      confidence: 94,
      trend: 'increasing',
      variance: '+21%'
    },
    {
      product: 'Automotive Parts',
      currentDemand: 8930,
      forecastedDemand: 8420,
      confidence: 89,
      trend: 'decreasing',
      variance: '-6%'
    },
    {
      product: 'Pharmaceuticals',
      currentDemand: 12340,
      forecastedDemand: 14200,
      confidence: 96,
      trend: 'increasing',
      variance: '+15%'
    },
    {
      product: 'Consumer Goods',
      currentDemand: 22100,
      forecastedDemand: 25800,
      confidence: 87,
      trend: 'increasing',
      variance: '+17%'
    }
  ];

  const metrics = [
    { label: 'Forecast Accuracy', value: '94.3%', change: '+2.1%', color: 'green' },
    { label: 'Demand Variance', value: '12.4%', change: '-1.8%', color: 'blue' },
    { label: 'Prediction Confidence', value: '91.5%', change: '+0.9%', color: 'purple' },
    { label: 'Model Performance', value: '96.7%', change: '+1.2%', color: 'yellow' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleExport = () => {
    console.log('Exporting demand forecast report...');
  };

  const handleProductClick = (product: string) => {
    console.log(`View detailed forecast for ${product}`);
  };

  const getTrendColor = (trend: string) => {
    return trend === 'increasing' ? 'text-green-400' : 'text-red-400';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-400 bg-green-500/20';
    if (confidence >= 85) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
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
            <h1 className="text-4xl font-bold mb-4">Demand Forecasting</h1>
            <p className="text-gray-400 text-lg">AI-powered demand predictions and trend analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleRefresh}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
            <motion.button
              onClick={handleExport}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-600"
            >
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
              <option value="180d">6 Months</option>
              <option value="1y">1 Year</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-gray-400" />
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-600"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="automotive">Automotive</option>
              <option value="pharmaceuticals">Pharmaceuticals</option>
              <option value="consumer">Consumer Goods</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Open forecast settings')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </motion.button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Target className={`w-8 h-8 ${
                  metric.color === 'green' ? 'text-green-400' :
                  metric.color === 'blue' ? 'text-blue-400' :
                  metric.color === 'purple' ? 'text-purple-400' : 'text-yellow-400'
                }`} />
                <span className={`text-sm px-2 py-1 rounded-full ${
                  metric.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{metric.label}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Forecast Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Product Demand Forecasts</h2>
            <div className="flex items-center space-x-2 bg-blue-500/20 rounded-lg px-3 py-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-semibold">AI Powered</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Product Category</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Current Demand</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Forecasted Demand</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Variance</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Confidence</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Trend</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((item, index) => (
                  <motion.tr
                    key={item.product}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleProductClick(item.product)}
                    className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="font-semibold text-white">{item.product}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-300">{item.currentDemand.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white font-semibold">{item.forecastedDemand.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${getTrendColor(item.trend)}`}>
                        {item.variance}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getConfidenceColor(item.confidence)}`}>
                        {item.confidence}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`w-4 h-4 ${
                          item.trend === 'increasing' ? 'text-green-400' : 'text-red-400 rotate-180'
                        }`} />
                        <span className={`text-sm capitalize ${getTrendColor(item.trend)}`}>
                          {item.trend}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">Forecast Accuracy Trend</h3>
            <div className="h-64 flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Interactive chart would be rendered here</p>
                <p className="text-sm text-gray-500 mt-2">Showing 94.3% average accuracy</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">Seasonal Patterns</h3>
            <div className="space-y-4">
              {[
                { season: 'Q1 2025', demand: 'High', confidence: 92, pattern: 'Electronics surge' },
                { season: 'Q2 2025', demand: 'Medium', confidence: 88, pattern: 'Automotive growth' },
                { season: 'Q3 2025', demand: 'Low', confidence: 85, pattern: 'Summer slowdown' },
                { season: 'Q4 2025', demand: 'Very High', confidence: 94, pattern: 'Holiday season' }
              ].map((season, index) => (
                <motion.div
                  key={season.season}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold text-white">{season.season}</h4>
                    <p className="text-sm text-gray-400">{season.pattern}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      season.demand === 'Very High' || season.demand === 'High' ? 'text-green-400' :
                      season.demand === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {season.demand}
                    </p>
                    <p className="text-sm text-gray-400">{season.confidence}% confidence</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};