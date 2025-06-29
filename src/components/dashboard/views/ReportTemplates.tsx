import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Edit, Copy, Plus, Calendar, Filter, Search, TrendingUp } from 'lucide-react';

export const ReportTemplates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const reportTemplates = [
    {
      id: 'supply-chain-overview',
      name: 'Supply Chain Overview',
      description: 'Comprehensive overview of supply chain performance and KPIs',
      category: 'Executive',
      lastModified: '2025-01-10',
      usage: 45,
      format: 'PDF',
      sections: ['Executive Summary', 'KPI Dashboard', 'Risk Analysis', 'Recommendations']
    },
    {
      id: 'risk-assessment-report',
      name: 'Risk Assessment Report',
      description: 'Detailed analysis of supply chain risks and mitigation strategies',
      category: 'Risk Management',
      lastModified: '2025-01-08',
      usage: 32,
      format: 'PDF',
      sections: ['Risk Matrix', 'Threat Analysis', 'Impact Assessment', 'Mitigation Plans']
    },
    {
      id: 'supplier-performance',
      name: 'Supplier Performance Scorecard',
      description: 'Performance metrics and ratings for all suppliers',
      category: 'Procurement',
      lastModified: '2025-01-12',
      usage: 28,
      format: 'Excel',
      sections: ['Performance Metrics', 'Quality Scores', 'Delivery Performance', 'Cost Analysis']
    },
    {
      id: 'demand-forecast',
      name: 'Demand Forecasting Report',
      description: 'AI-powered demand predictions and trend analysis',
      category: 'Planning',
      lastModified: '2025-01-11',
      usage: 38,
      format: 'PDF',
      sections: ['Forecast Summary', 'Trend Analysis', 'Seasonal Patterns', 'Accuracy Metrics']
    },
    {
      id: 'operational-metrics',
      name: 'Operational Metrics Dashboard',
      description: 'Real-time operational performance and efficiency metrics',
      category: 'Operations',
      lastModified: '2025-01-09',
      usage: 52,
      format: 'PowerBI',
      sections: ['Performance KPIs', 'Efficiency Metrics', 'Cost Analysis', 'Trend Charts']
    },
    {
      id: 'compliance-audit',
      name: 'Compliance Audit Report',
      description: 'Regulatory compliance status and audit findings',
      category: 'Compliance',
      lastModified: '2025-01-07',
      usage: 15,
      format: 'PDF',
      sections: ['Compliance Status', 'Audit Findings', 'Corrective Actions', 'Timeline']
    }
  ];

  const categories = ['all', 'Executive', 'Risk Management', 'Procurement', 'Planning', 'Operations', 'Compliance'];

  const filteredTemplates = reportTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateAction = (action: string, templateId: string) => {
    console.log(`${action} template: ${templateId}`);
  };

  const handleCreateNew = () => {
    console.log('Create new report template');
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF': return 'bg-red-500/20 text-red-400';
      case 'Excel': return 'bg-green-500/20 text-green-400';
      case 'PowerBI': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
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
            <h1 className="text-4xl font-bold mb-4">Report Templates</h1>
            <p className="text-gray-400 text-lg">Pre-built report templates for comprehensive supply chain analysis</p>
          </div>
          <motion.button
            onClick={handleCreateNew}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors self-start md:self-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Create Template</span>
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-600"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Templates</p>
                <p className="text-3xl font-bold text-white">{reportTemplates.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Most Used</p>
                <p className="text-3xl font-bold text-green-400">
                  {Math.max(...reportTemplates.map(t => t.usage))}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-purple-400">{categories.length - 1}</p>
              </div>
              <Filter className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {reportTemplates.reduce((sum, t) => sum + t.usage, 0)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 hover:bg-gray-850 transition-all duration-200 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{template.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getFormatColor(template.format)}`}>
                      {template.format}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{template.description}</p>
              
              {/* Sections */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Sections included:</p>
                <div className="flex flex-wrap gap-1">
                  {template.sections.slice(0, 3).map((section, idx) => (
                    <span key={idx} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                      {section}
                    </span>
                  ))}
                  {template.sections.length > 3 && (
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                      +{template.sections.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Metadata */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>Category: {template.category}</span>
                <span>Used {template.usage} times</span>
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Last modified: {new Date(template.lastModified).toLocaleDateString()}
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => handleTemplateAction('preview', template.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </motion.button>
                
                <motion.button
                  onClick={() => handleTemplateAction('generate', template.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate</span>
                </motion.button>
                
                <motion.button
                  onClick={() => handleTemplateAction('edit', template.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-400" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleTemplateAction('copy', template.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-400" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { action: 'Create Custom Template', icon: '📝', description: 'Build a new template from scratch' },
              { action: 'Import Template', icon: '📥', description: 'Import existing template file' },
              { action: 'Template Library', icon: '📚', description: 'Browse community templates' },
              { action: 'Schedule Reports', icon: '⏰', description: 'Set up automated reporting' }
            ].map((action, index) => (
              <motion.button
                key={action.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => console.log(`Execute: ${action.action}`)}
                className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors text-left"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h4 className="font-semibold text-white mb-1">{action.action}</h4>
                <p className="text-sm text-gray-400">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};