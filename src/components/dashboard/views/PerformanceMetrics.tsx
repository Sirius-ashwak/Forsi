import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, Target, Zap, Download, Filter, RefreshCw, Eye } from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [metricType, setMetricType] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const performanceData = [
    {
      metric: 'On-Time Delivery',
      current: 87.5,
      target: 95.0,
      trend: 'decreasing',
      change: '-2.3%',
      status: 'warning'
    },
    {
      metric: 'Order Fulfillment Rate',
      current: 94.2,
      target: 98.0,
      trend: 'increasing',
      change: '+1.8%',
      status: 'good'
    },
    {
      metric: 'Inventory Turnover',
      current: 12.4,
      target: 15.0,
      trend: 'stable',
      change: '0.0%',
      status: 'warning'
    },
    {
      metric: 'Cost per Shipment',
      current: 45.30,
      target: 40.00,
      trend: 'increasing',
      change: '+3.2%',
      status: 'critical'
    },
    {
      metric: 'Customer Satisfaction',
      current: 4.6,
      target: 4.8,
      trend: 'increasing',
      change: '+0.2',
      status: 'good'
    },
    {
      metric: 'Supplier Performance',
      current: 91.8,
      target: 95.0,
      trend: 'decreasing',
      change: '-1.1%',
      status: 'warning'
    }
  ];

  const kpiSummary = [
    { label: 'Total Metrics Tracked', value: '24', change: '+3', color: 'blue' },
    { label: 'Metrics on Target', value: '18', change: '+2', color: 'green' },
    { label: 'Metrics Below Target', value: '6', change: '+1', color: 'red' },
    { label: 'Performance Score', value: '8.7/10', change: '+0.3', color: 'purple' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleExport = () => {
    console.log('Exporting performance metrics report...');
  };

  const handleMetricClick = (metric: string) => {
    console.log(`View detailed analysis for ${metric}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'decreasing': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <div className="w-4 h-4 bg-yellow-400 rounded-full" />;
    }
  };

  const getProgressWidth = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
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
            <h1 className="text-4xl font-bold mb-4">Performance Metrics</h1>
            <p className="text-gray-400 text-lg">Comprehensive performance tracking and KPI monitoring</p>
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-600"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={metricType}
              onChange={(e) => setMetricType(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-600"
            >
              <option value="all">All Metrics</option>
              <option value="delivery">Delivery Metrics</option>
              <option value="financial">Financial Metrics</option>
              <option value="quality">Quality Metrics</option>
              <option value="efficiency">Efficiency Metrics</option>
            </select>
          </div>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiSummary.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className={`w-8 h-8 ${
                  kpi.color === 'blue' ? 'text-blue-400' :
                  kpi.color === 'green' ? 'text-green-400' :
                  kpi.color === 'red' ? 'text-red-400' : 'text-purple-400'
                }`} />
                <span className={`text-sm px-2 py-1 rounded-full ${
                  kpi.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{kpi.label}</h3>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {performanceData.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleMetricClick(metric.metric)}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:bg-gray-850 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-white">{metric.metric}</h3>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-semibold ${
                    metric.change.startsWith('+') && metric.trend === 'increasing' ? 'text-green-400' :
                    metric.change.startsWith('-') && metric.trend === 'decreasing' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Current</span>
                  <span className="text-white font-bold text-xl">
                    {typeof metric.current === 'number' && metric.current < 10 
                      ? metric.current.toFixed(1) 
                      : metric.current}
                    {metric.metric.includes('Rate') || metric.metric.includes('Delivery') || metric.metric.includes('Performance') ? '%' : 
                     metric.metric.includes('Cost') ? '$' : 
                     metric.metric.includes('Satisfaction') ? '/5' : ''}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Target</span>
                  <span className="text-gray-300">
                    {typeof metric.target === 'number' && metric.target < 10 
                      ? metric.target.toFixed(1) 
                      : metric.target}
                    {metric.metric.includes('Rate') || metric.metric.includes('Delivery') || metric.metric.includes('Performance') ? '%' : 
                     metric.metric.includes('Cost') ? '$' : 
                     metric.metric.includes('Satisfaction') ? '/5' : ''}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Progress to Target</span>
                    <span className={`text-sm px-2 py-1 rounded-full font-semibold ${getStatusColor(metric.status)}`}>
                      {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        metric.status === 'good' ? 'bg-green-500' :
                        metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${getProgressWidth(metric.current, metric.target)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    {getProgressWidth(metric.current, metric.target).toFixed(1)}% of target
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Performance Insights</h3>
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="space-y-4">
              {[
                {
                  insight: 'On-time delivery has decreased by 2.3% this month',
                  impact: 'High',
                  recommendation: 'Review logistics partners and routes'
                },
                {
                  insight: 'Order fulfillment rate improved significantly',
                  impact: 'Medium',
                  recommendation: 'Maintain current operational practices'
                },
                {
                  insight: 'Cost per shipment trending upward',
                  impact: 'High',
                  recommendation: 'Negotiate better rates with carriers'
                },
                {
                  insight: 'Customer satisfaction scores improving',
                  impact: 'Low',
                  recommendation: 'Continue quality improvement initiatives'
                }
              ].map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      insight.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                      insight.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {insight.impact} Impact
                    </span>
                  </div>
                  <p className="text-white font-medium mb-2">{insight.insight}</p>
                  <p className="text-sm text-gray-400">{insight.recommendation}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Quick Actions</h3>
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-3">
              {[
                { action: 'Generate Performance Report', icon: '📊' },
                { action: 'Set Performance Alerts', icon: '🚨' },
                { action: 'Compare with Benchmarks', icon: '📈' },
                { action: 'Schedule Performance Review', icon: '📅' },
                { action: 'Export Metrics Data', icon: '💾' },
                { action: 'Configure Dashboards', icon: '⚙️' }
              ].map((action, index) => (
                <motion.button
                  key={action.action}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => console.log(`Execute: ${action.action}`)}
                  className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="font-medium">{action.action}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};