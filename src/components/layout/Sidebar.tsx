import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  Globe, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  Map,
  Users,
  FileText,
  Zap,
  Activity,
  Brain
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, description: 'Main Overview' },
  { id: 'nexus', name: 'Global Map', icon: Globe, description: '3D Supply Chain View' },
  { id: 'insights', name: 'Analytics', icon: Brain, description: 'AI-Powered Insights' },
  { id: 'quantum', name: 'Scenarios', icon: Map, description: 'What-If Analysis' },
  { id: 'chronospectrum', name: 'Timeline', icon: Activity, description: 'Event History' },
  { id: 'radar', name: 'Risk Monitor', icon: AlertTriangle, description: 'Threat Detection' },
  { id: 'network', name: 'Suppliers', icon: Users, description: 'Supplier Network' },
  { id: 'intelligence', name: 'Reports', icon: FileText, description: 'Strategic Reports' },
  { id: 'settings', name: 'Settings', icon: Settings, description: 'Configuration' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col h-full relative shadow-xl shadow-slate-200/20"
    >
      <div className="p-8 border-b border-slate-200/60">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center space-x-4"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Supply Chain</h1>
            <p className="text-sm text-slate-500 font-medium">Resilience Navigator</p>
          </div>
        </motion.div>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              whileHover={{ x: 4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.1 * index, 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              {/* Active indicator background */}
              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              <div className={`relative z-10 p-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-800'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 relative z-10">
                <span className="font-semibold text-base">{item.name}</span>
                <p className={`text-sm mt-0.5 ${
                  isActive ? 'text-white/80' : 'text-slate-500 group-hover:text-slate-600'
                }`}>
                  {item.description}
                </p>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="relative z-10 w-2 h-2 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="p-6 border-t border-slate-200/60"
      >
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-100/80 hover:bg-slate-200/80 transition-all duration-300 cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-sm font-bold text-white">AI</span>
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">AI Assistant</p>
            <p className="text-sm text-slate-500">Online & Ready</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};