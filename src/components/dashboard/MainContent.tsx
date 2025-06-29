import React from 'react';
import { motion } from 'framer-motion';
import { QuickStart } from './views/QuickStart';
import { ConnectedIntegrations } from './views/ConnectedIntegrations';
import { Playground } from './views/Playground';
import { GlobalMap3D } from './views/GlobalMap3D';
import { GlobalMonitor } from './views/GlobalMonitor';
import { RiskAssessment } from './views/RiskAssessment';
import { DemandForecasting } from './views/DemandForecasting';
import { PerformanceMetrics } from './views/PerformanceMetrics';
import { ReportTemplates } from './views/ReportTemplates';

interface MainContentProps {
  activeView: string;
}

export const MainContent: React.FC<MainContentProps> = ({ activeView }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'quick-start':
        return <QuickStart />;
      case 'connected-integrations':
        return <ConnectedIntegrations />;
      case 'playground':
        return <Playground />;
      case '3d-map':
        return <GlobalMap3D />;
      case 'global-monitor':
        return <GlobalMonitor />;
      case 'risk-assessment':
        return <RiskAssessment />;
      case 'demand-forecast':
        return <DemandForecasting />;
      case 'performance-metrics':
        return <PerformanceMetrics />;
      case 'report-templates':
        return <ReportTemplates />;
      case 'settings':
        return (
          <div className="p-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-4">Settings</h1>
              <p className="text-gray-400 text-lg mb-8">Configure your Forsi platform preferences</p>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-12">
                <div className="text-6xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold mb-2">Settings Panel</h3>
                <p className="text-gray-400">Settings interface will be implemented here</p>
              </div>
            </motion.div>
          </div>
        );
      default:
        return <QuickStart />;
    }
  };

  return (
    <motion.div 
      key={activeView}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-auto relative z-10"
    >
      {renderContent()}
    </motion.div>
  );
};