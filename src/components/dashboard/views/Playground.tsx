import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Save, Share, Settings, Copy, Download, BarChart3, TrendingUp } from 'lucide-react';

export const Playground: React.FC = () => {
  const [code, setCode] = useState(`# Supply Chain AI Analytics Playground
# Test your supply chain analytics and monitoring queries here

from supply_chain_ai import SupplyChainClient
from supply_chain_ai.analytics import RiskAnalytics, DemandForecasting
from supply_chain_ai.monitoring import SupplierMonitor

# Initialize Supply Chain AI client
client = SupplyChainClient(
    api_key="YOUR_API_KEY",
    region="global"
)

# Create analytics instances
risk_analytics = RiskAnalytics(client)
demand_forecast = DemandForecasting(client)
supplier_monitor = SupplierMonitor(client)

# Analyze supply chain risk across regions
risk_analysis = risk_analytics.analyze_global_risk(
    regions=["APAC", "EMEA", "Americas"],
    timeframe="30d",
    include_weather=True,
    include_geopolitical=True
)

# Generate demand forecast for key products
forecast = demand_forecast.predict_demand(
    product_categories=["electronics", "automotive", "pharmaceuticals"],
    horizon_days=90,
    confidence_level=0.95
)

# Monitor supplier performance
supplier_health = supplier_monitor.get_supplier_scorecard(
    supplier_ids=["SUP001", "SUP002", "SUP003"],
    metrics=["delivery_performance", "quality_score", "financial_stability"]
)

# Display results
print(f"Global Risk Score: {risk_analysis.overall_score}/10")
print(f"High Risk Regions: {risk_analysis.high_risk_regions}")
print(f"Demand Forecast Accuracy: {forecast.confidence}%")
print(f"Critical Suppliers: {supplier_health.critical_count}")

# Generate alerts for critical issues
alerts = risk_analytics.generate_alerts(
    threshold="high",
    notify_channels=["email", "slack", "dashboard"]
)

print(f"Active Alerts: {len(alerts)} critical issues detected")`);

  const [activeTab, setActiveTab] = useState('python');

  const tabs = [
    { id: 'python', name: 'Python', active: true },
    { id: 'sql', name: 'SQL', active: false },
    { id: 'r', name: 'R', active: false },
    { id: 'javascript', name: 'JavaScript', active: false },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-950">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 bg-gray-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Supply Chain Analytics Playground</h1>
            <p className="text-gray-400">Test and experiment with supply chain analytics, risk assessment, and forecasting</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Analysis</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Share className="w-4 h-4" />
              <span>Share Report</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Run Analysis</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Code editor */}
        <div className="flex-1 flex flex-col">
          {/* Editor header */}
          <div className="p-4 border-b border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {tab.name}
                  </motion.button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Copy code"
                >
                  <Copy className="w-4 h-4 text-gray-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4 text-gray-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Settings"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Editor content */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 flex">
              {/* Line numbers */}
              <div className="w-16 bg-gray-900 border-r border-gray-800 p-4 text-right text-sm text-gray-500 font-mono select-none">
                {code.split('\n').map((_, index) => (
                  <div key={index} className="leading-6">
                    {index + 1}
                  </div>
                ))}
              </div>
              
              {/* Code area */}
              <div className="flex-1 p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-transparent text-sm font-mono resize-none focus:outline-none text-white leading-6"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output panel */}
        <div className="w-96 border-l border-gray-800 bg-gray-950 flex flex-col">
          {/* Output header */}
          <div className="p-4 border-b border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Analysis Results</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Ready</span>
              </div>
            </div>
          </div>
          
          {/* Output content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Console output */}
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2">$ python supply_chain_analysis.py</div>
                <div className="text-gray-400 mb-4">Initializing Supply Chain AI client...</div>
                <div className="text-blue-400 mb-2">Connecting to global analytics engine...</div>
                <div className="text-gray-300 space-y-1">
                  <div>✓ Client initialized successfully</div>
                  <div>✓ Risk analytics module loaded</div>
                  <div>✓ Demand forecasting ready</div>
                  <div>✓ Supplier monitoring active</div>
                </div>
              </div>
              
              {/* Analysis results */}
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-blue-400 flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analysis Output:</span>
                </h4>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-white">Global Risk Score: 7.2/10</div>
                  <div className="text-red-400">High Risk Regions: ['APAC-East', 'EMEA-South']</div>
                  <div className="text-green-400">Demand Forecast Accuracy: 94.3%</div>
                  <div className="text-yellow-400">Critical Suppliers: 3</div>
                  <div className="text-orange-400">Active Alerts: 5 critical issues detected</div>
                  <div className="text-gray-400 mt-4">
                    <div>Analysis complete in 3.7s</div>
                    <div>Memory usage: 67.4 MB</div>
                    <div>Data points processed: 24,179</div>
                  </div>
                </div>
              </div>

              {/* Risk breakdown */}
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-red-400 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Risk Breakdown:</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Weather Risk</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-yellow-400">75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Geopolitical</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-orange-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-orange-400">50%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Supplier Risk</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-red-400">80%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick actions */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-400">Quick Actions</h4>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm transition-colors"
                  >
                    📊 Generate Risk Report
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm transition-colors"
                  >
                    📈 Visualize Supply Chain
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm transition-colors"
                  >
                    🚨 Create Alert Rules
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm transition-colors"
                  >
                    💾 Export to Dashboard
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};