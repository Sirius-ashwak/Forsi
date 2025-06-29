import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Shield, 
  Key, 
  Palette, 
  Monitor,
  Moon,
  Sun,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export const Settings: React.FC = () => {
  const { user, updatePreferences, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [preferences, setPreferences] = useState(user?.preferences || {
    theme: 'dark',
    notifications: true,
    language: 'en',
    timezone: 'UTC'
  });

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Key },
    { id: 'data', name: 'Data & Privacy', icon: Globe }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePreferences(preferences);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Timezone
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Dashboard Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={true}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">Show real-time updates</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={true}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">Enable auto-refresh</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={false}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">Compact view mode</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Alert Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Critical Disruptions</h4>
              <p className="text-sm text-gray-400">High-priority supply chain alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={true} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Performance Alerts</h4>
              <p className="text-sm text-gray-400">KPI threshold notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={true} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Weekly Reports</h4>
              <p className="text-sm text-gray-400">Automated summary emails</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={false} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Delivery Methods</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={true}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">Email notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={true}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">In-app notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={false}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">SMS alerts (Premium)</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'light', name: 'Light', icon: Sun },
            { id: 'dark', name: 'Dark', icon: Moon },
            { id: 'auto', name: 'Auto', icon: Monitor }
          ].map((theme) => {
            const Icon = theme.icon;
            return (
              <motion.button
                key={theme.id}
                onClick={() => setPreferences(prev => ({ ...prev, theme: theme.id as any }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  preferences.theme === theme.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                <span className="text-sm text-gray-300">{theme.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Display Options</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Animation Speed
            </label>
            <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white">
              <option value="slow">Slow</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
              <option value="none">No animations</option>
            </select>
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={true}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">High contrast mode</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={false}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">Reduce motion</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Account Security</h3>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Change Password</h4>
                <p className="text-sm text-gray-400">Update your account password</p>
              </div>
              <Key className="w-5 h-5 text-gray-400" />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400">Add an extra layer of security</p>
              </div>
              <div className="text-sm text-green-400 font-medium">Enabled</div>
            </div>
          </motion.button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">API Access</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-white">API Key</h4>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Regenerate
              </motion.button>
            </div>
            <div className="flex items-center space-x-2">
              <code className="flex-1 p-2 bg-gray-900 rounded text-sm text-gray-300 font-mono">
                fsi_••••••••••••••••••••••••••••••••
              </code>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-white"
              >
                Copy
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Session Management</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div>
              <span className="text-white font-medium">Current Session</span>
              <p className="text-sm text-gray-400">Chrome on Windows • Active now</p>
            </div>
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Sign Out All Devices
          </motion.button>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Connected Services</h3>
        <div className="space-y-4">
          {[
            { name: 'SAP ERP', status: 'Connected', color: 'green' },
            { name: 'Oracle SCM', status: 'Connected', color: 'green' },
            { name: 'Microsoft Dynamics', status: 'Disconnected', color: 'gray' },
            { name: 'Salesforce', status: 'Error', color: 'red' }
          ].map((service) => (
            <div key={service.name} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-white">{service.name}</h4>
                <p className={`text-sm ${
                  service.color === 'green' ? 'text-green-400' :
                  service.color === 'red' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {service.status}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Configure
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Webhook Settings</h3>
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-white">Webhook URL</h4>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Test
            </motion.button>
          </div>
          <input
            type="url"
            placeholder="https://your-app.com/webhooks/forsi"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
          />
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Data Export</h3>
        <div className="space-y-4">
          <motion.button
            onClick={handleExportData}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-blue-400" />
              <div>
                <h4 className="font-medium text-white">Export All Data</h4>
                <p className="text-sm text-gray-400">Download all your supply chain data</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <Upload className="w-5 h-5 text-green-400" />
              <div>
                <h4 className="font-medium text-white">Import Data</h4>
                <p className="text-sm text-gray-400">Upload data from external sources</p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={true}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">Allow analytics tracking</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={false}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">Share usage data for improvements</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={true}
              className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="ml-3 text-gray-300">Receive product updates</span>
          </label>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Danger Zone</span>
        </h3>
        <motion.button
          onClick={handleDeleteAccount}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 bg-red-600/10 border border-red-600/30 rounded-lg hover:bg-red-600/20 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <Trash2 className="w-5 h-5 text-red-400" />
            <div>
              <h4 className="font-medium text-red-400">Delete Account</h4>
              <p className="text-sm text-red-300">Permanently delete your account and all data</p>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'notifications': return renderNotificationSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'security': return renderSecuritySettings();
      case 'integrations': return renderIntegrationsSettings();
      case 'data': return renderDataSettings();
      default: return renderGeneralSettings();
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
            <h1 className="text-4xl font-bold mb-4">Settings</h1>
            <p className="text-gray-400 text-lg">Manage your account preferences and platform configuration</p>
          </div>
          <motion.button
            onClick={handleSave}
            disabled={isSaving}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </motion.button>
        </div>

        {/* Settings Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-8"
            >
              {renderTabContent()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};