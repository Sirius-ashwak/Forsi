import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Rocket, 
  Link, 
  Play, 
  Shield, 
  Eye, 
  FileText, 
  Settings,
  ChevronRight,
  Globe,
  TrendingUp,
  Map
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  { id: 'quick-start', name: 'Quick start', icon: Rocket },
  { id: 'connected-integrations', name: 'Connected systems', icon: Link },
  { id: 'playground', name: 'Analytics playground', icon: Play },
  { id: '3d-map', name: '3D Global Map', icon: Map },
  { id: 'global-monitor', name: 'Global monitor', icon: Globe },
  { id: 'risk-assessment', name: 'Risk assessment', icon: Shield },
  { id: 'demand-forecast', name: 'Demand forecasting', icon: TrendingUp },
  { id: 'performance-metrics', name: 'Performance metrics', icon: Eye, hasSubmenu: true },
  { id: 'report-templates', name: 'Report templates', icon: FileText },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col h-full relative z-10"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <div>
            <span className="text-xl font-bold">Forsi</span>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Global Operations</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">1,247 nodes monitored</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Live Demo
          </motion.button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-white'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{item.name}</span>
              </div>
              {item.hasSubmenu && (
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  isActive ? 'rotate-90' : ''
                }`} />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Usage stats */}
      <div className="p-4 space-y-4 border-t border-gray-800">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">API Calls</span>
            <span className="text-white font-medium">2,847 of 10,000</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '28%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-orange-500 h-2 rounded-full"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Data Processing</span>
            <span className="text-white font-medium">67.2 GB of 500 GB</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '13%' }}
              transition={{ duration: 1, delay: 0.7 }}
              className="bg-blue-500 h-2 rounded-full"
            />
          </div>
        </div>
        
        <div className="text-xs text-gray-500 pt-2">
          Usage will reset July 9, 2025
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-colors"
        >
          Upgrade Plan
        </motion.button>
      </div>

      {/* User profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">
              mohamedashwak2022@g...
            </div>
            <div className="text-xs text-gray-400">Supply Chain Admin</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">F</span>
            </div>
            <Settings className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};