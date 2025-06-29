import React from 'react';
import { motion } from 'framer-motion';
import { QuickStart } from './views/QuickStart';
import { ConnectedIntegrations } from './views/ConnectedIntegrations';
import { Playground } from './views/Playground';
import { GlobalMap3D } from './views/GlobalMap3D';

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