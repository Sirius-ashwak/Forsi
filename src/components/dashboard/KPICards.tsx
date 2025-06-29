import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Activity, Shield, Zap, Brain } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  index: number;
  subtitle?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, trend, icon, color, index, subtitle }) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100/50 border-blue-200/60',
    green: 'from-emerald-50 to-emerald-100/50 border-emerald-200/60',
    red: 'from-red-50 to-red-100/50 border-red-200/60',
    yellow: 'from-amber-50 to-amber-100/50 border-amber-200/60',
    purple: 'from-purple-50 to-purple-100/50 border-purple-200/60'
  };

  const iconBgClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600'
  };

  const textClasses = {
    blue: 'text-blue-600',
    green: 'text-emerald-600',
    red: 'text-red-600',
    yellow: 'text-amber-600',
    purple: 'text-purple-600'
  };

  const trendColorClasses = {
    up: trend === 'up' ? 'text-emerald-600' : 'text-red-600',
    down: trend === 'down' ? 'text-red-600' : 'text-emerald-600',
    neutral: 'text-slate-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 300,
        damping: 30,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-3xl p-8 backdrop-blur-xl hover:shadow-2xl hover:shadow-${color}-200/30 transition-all duration-500 relative overflow-hidden group`}
    >
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${iconBgClasses[color]} shadow-lg shadow-${color}-500/25`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {trend === 'up' && <TrendingUp className="w-5 h-5" />}
              {trend === 'down' && <TrendingDown className="w-5 h-5" />}
              {trend === 'neutral' && <Activity className="w-5 h-5" />}
              <span className={`text-sm font-bold ${trendColorClasses[trend]}`}>
                {change}
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl font-bold text-slate-900 mb-3"
          >
            {value}
          </motion.h3>
          <p className="text-sm text-slate-600 font-semibold">{title}</p>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 pt-6 border-t border-white/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">Efficiency</span>
            <span className={`text-xs font-bold ${textClasses[color]}`}>
              {Math.floor(Math.random() * 30) + 70}%
            </span>
          </div>
          <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
              transition={{ 
                duration: 2, 
                delay: index * 0.15 + 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={`bg-gradient-to-r ${iconBgClasses[color]} h-2 rounded-full shadow-lg`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const KPICards: React.FC = () => {
  const kpis = [
    {
      title: 'Total Supply Chain Value',
      value: '$142.8M',
      change: '+5.2%',
      trend: 'up' as const,
      icon: <DollarSign className="w-7 h-7" />,
      color: 'green' as const,
      subtitle: 'Monthly growth'
    },
    {
      title: 'Active Disruptions',
      value: '3',
      change: '+2',
      trend: 'up' as const,
      icon: <AlertTriangle className="w-7 h-7" />,
      color: 'red' as const,
      subtitle: 'Requires attention'
    },
    {
      title: 'Resilience Score',
      value: '7.2/10',
      change: '+0.8',
      trend: 'up' as const,
      icon: <Shield className="w-7 h-7" />,
      color: 'yellow' as const,
      subtitle: 'AI assessment'
    },
    {
      title: 'On-Time Delivery',
      value: '87.5%',
      change: '-2.3%',
      trend: 'down' as const,
      icon: <Zap className="w-7 h-7" />,
      color: 'blue' as const,
      subtitle: 'Last 30 days'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} index={index} />
      ))}
    </div>
  );
};