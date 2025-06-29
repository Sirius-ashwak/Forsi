import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, TrendingUp, MapPin, Calendar, Filter, Download, RefreshCw } from 'lucide-react';

export const RiskAssessment: React.FC = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const [riskLevel, setRiskLevel] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const riskFactors = [
    {
      id: 1,
      name: 'Weather Disruptions',
      level: 'High',
      probability: 85,
      impact: 'Severe delays in APAC region',
      affectedNodes: 23,
      trend: 'increasing'
    },
    {
      id: 2,
      name: 'Geopolitical Tensions',
      level: 'Medium',
      probability: 65,
      impact: 'Trade route restrictions',
      affectedNodes: 12,
      trend: 'stable'
    },
    {
      id: 3,
      name: 'Supplier Financial Health',
      level: 'Low',
      probability: 25,
      impact: 'Minor capacity reductions',
      affectedNodes: 5,
      trend: 'decreasing'
    },
    {
      id: 4,
      name: 'Cyber Security Threats',
      level: 'Medium',
      probability: 45,
      impact: 'System vulnerabilities',
      affectedNodes: 8,
      trend: 'increasing'
    }
  ];

  const riskMetrics = [
    { label: 'Overall Risk Score', value: '7.2/10', change: '+0.3', color: 'red' },
    { label: 'Critical Risks', value: '3', change: '+1', color: 'red' },
    { label: 'Medium Risks', value: '8', change: '-2', color: 'yellow' },
    { label: 'Low Risks', value: '15', change: '+3', color: 'green' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleExport = () => {
    console.log('Exporting risk assessment report...');
  };

  const handleRiskClick = (riskId: number) => {
    console.log(`View detailed risk analysis for risk ${riskId}`);
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-400" />;
      case 'decreasing': return <TrendingUp className="w-4 h-4 text-green-400 rotate-180" />;
      default: return <div className="w-4 h-4 bg-yellow-400 rounded-full" />;
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
            <h1 className="text-4xl font-bold mb-4">Risk Assessment</h1>
            <p className="text-gray-400 text-lg">AI-powered risk analysis and mitigation recommendations</p>
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
              <span>Export Report</span>
            </motion.button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
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
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-600"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk Only</option>
              <option value="medium">Medium Risk Only</option>
              <option value="low">Low Risk Only</option>
            </select>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riskMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Shield className={`w-8 h-8 ${
                  metric.color === 'red' ? 'text-red-400' :
                  metric.color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
                }`} />
                <span className={`text-sm px-2 py-1 rounded-full ${
                  metric.change.startsWith('+') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{metric.label}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Risk Factors */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Current Risk Factors</h2>
          <div className="space-y-4">
            {riskFactors.map((risk, index) => (
              <motion.div
                key={risk.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleRiskClick(risk.id)}
                className="flex items-center space-x-6 p-6 bg-gray-800 hover:bg-gray-750 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(risk.level)}`}>
                    {risk.level}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg mb-2">{risk.name}</h3>
                  <p className="text-gray-400 text-sm">{risk.impact}</p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Probability</p>
                    <p className="text-lg font-bold text-white">{risk.probability}%</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Affected Nodes</p>
                    <p className="text-lg font-bold text-white">{risk.affectedNodes}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Trend</p>
                    <div className="flex justify-center mt-1">
                      {getTrendIcon(risk.trend)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risk Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">Risk Distribution by Region</h3>
            <div className="space-y-4">
              {[
                { region: 'APAC', high: 8, medium: 12, low: 5 },
                { region: 'EMEA', high: 3, medium: 8, low: 15 },
                { region: 'Americas', high: 2, medium: 6, low: 18 }
              ].map((region) => (
                <div key={region.region} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{region.region}</span>
                    <span className="text-sm text-gray-400">
                      {region.high + region.medium + region.low} total risks
                    </span>
                  </div>
                  <div className="flex h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="bg-red-500" 
                      style={{ width: `${(region.high / (region.high + region.medium + region.low)) * 100}%` }}
                    />
                    <div 
                      className="bg-yellow-500" 
                      style={{ width: `${(region.medium / (region.high + region.medium + region.low)) * 100}%` }}
                    />
                    <div 
                      className="bg-green-500" 
                      style={{ width: `${(region.low / (region.high + region.medium + region.low)) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>High: {region.high}</span>
                    <span>Medium: {region.medium}</span>
                    <span>Low: {region.low}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">Mitigation Recommendations</h3>
            <div className="space-y-4">
              {[
                {
                  priority: 'High',
                  action: 'Diversify APAC suppliers',
                  impact: 'Reduce weather risk by 40%',
                  effort: 'Medium'
                },
                {
                  priority: 'High',
                  action: 'Implement backup routes',
                  impact: 'Improve resilience by 25%',
                  effort: 'Low'
                },
                {
                  priority: 'Medium',
                  action: 'Enhance cyber security',
                  impact: 'Reduce security risk by 60%',
                  effort: 'High'
                },
                {
                  priority: 'Medium',
                  action: 'Increase safety stock',
                  impact: 'Buffer against disruptions',
                  effort: 'Low'
                }
              ].map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      rec.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {rec.priority} Priority
                    </span>
                    <span className="text-xs text-gray-400">Effort: {rec.effort}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-1">{rec.action}</h4>
                  <p className="text-sm text-gray-400">{rec.impact}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};