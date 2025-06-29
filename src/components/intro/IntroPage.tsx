import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, ArrowRight, Zap, Globe, Brain, Shield, TrendingUp, BarChart3, Users, CheckCircle } from 'lucide-react';

interface IntroPageProps {
  onEnter: () => void;
}

const integrationLogos = [
  { name: 'SAP', icon: '🏢' },
  { name: 'Oracle', icon: '🔶' },
  { name: 'Microsoft', icon: '🪟' },
  { name: 'Salesforce', icon: '☁️' },
  { name: 'AWS', icon: '🌐' },
  { name: 'Google Cloud', icon: '☁️' },
  { name: 'Azure', icon: '🔷' },
  { name: 'IBM', icon: '🔵' },
];

const testimonials = [
  {
    quote: "Reduced supply chain disruptions by 40% and improved visibility across our global operations.",
    author: "Sarah Chen",
    role: "VP of Supply Chain",
    company: "Global Manufacturing Corp"
  },
  {
    quote: "The predictive analytics helped us avoid $2.3M in potential losses during the recent port strikes.",
    author: "Michael Rodriguez",
    role: "Chief Operations Officer",
    company: "International Logistics"
  },
  {
    quote: "Real-time monitoring and automated alerts have transformed how we manage our supplier network.",
    author: "Emily Johnson",
    role: "Procurement Director",
    company: "Tech Solutions Inc"
  }
];

const stats = [
  { value: "99.7%", label: "Uptime Guarantee" },
  { value: "40%", label: "Faster Issue Resolution" },
  { value: "500+", label: "Global Enterprises" },
  { value: "24/7", label: "Expert Support" }
];

export const IntroPage: React.FC<IntroPageProps> = ({ onEnter }) => {
  const handleNavClick = (section: string) => {
    console.log(`Navigate to ${section}`);
    // Here you would implement navigation logic
  };

  const handleSignIn = () => {
    console.log('Sign in clicked');
    // Here you would implement sign in logic
  };

  const handleWatchDemo = () => {
    console.log('Watch demo clicked');
    // Here you would implement demo video logic
  };

  const handleContactSales = () => {
    console.log('Contact sales clicked');
    // Here you would implement contact sales logic
  };

  const handleCodeLanguageChange = (language: string) => {
    console.log(`Switch to ${language} code example`);
    // Here you would implement language switching
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between p-6 md:p-8"
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-semibold">Forsi</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-8">
            <motion.button
              onClick={() => handleNavClick('features')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Features
            </motion.button>
            <motion.button
              onClick={() => handleNavClick('pricing')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </motion.button>
            <motion.button
              onClick={() => handleNavClick('docs')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>Documentation</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleSignIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </motion.button>
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-32">
        {/* Hero section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-2 mb-8">
              <span className="text-orange-400 text-sm">Enterprise Ready</span>
              <span className="text-gray-500">🚀</span>
              <span className="text-blue-400 text-sm">Global Scale</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            Next-generation supply chain{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              resilience platform
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Transform your supply chain operations with advanced analytics, real-time monitoring,
            and predictive insights. Built for enterprise scale with global reach.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center space-x-4 mb-16"
          >
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              onClick={handleWatchDemo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-gray-700 text-white rounded-lg font-semibold text-lg hover:border-gray-600 transition-colors"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Integration logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <p className="text-center text-gray-400 mb-8">Trusted by leading enterprises worldwide</p>
          <div className="flex items-center justify-center space-x-8 md:space-x-12 overflow-x-auto pb-4">
            {integrationLogos.map((logo, index) => (
              <motion.button
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                onClick={() => console.log(`Learn more about ${logo.name} integration`)}
                className="flex-shrink-0 w-16 h-16 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center hover:border-gray-700 transition-colors cursor-pointer"
              >
                <span className="text-2xl">{logo.icon}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Code preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <motion.button
                  onClick={() => handleCodeLanguageChange('python')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                >
                  Python
                </motion.button>
                <motion.button
                  onClick={() => handleCodeLanguageChange('javascript')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 rounded hover:bg-gray-800 transition-colors"
                >
                  JavaScript
                </motion.button>
                <motion.button
                  onClick={() => handleCodeLanguageChange('rest')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 rounded hover:bg-gray-800 transition-colors"
                >
                  REST API
                </motion.button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => console.log('Copy code')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-800 rounded transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => console.log('View on GitHub')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-800 rounded transition-colors"
              >
                <Github className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          
          <div className="font-mono text-sm relative">
            <div className="absolute left-0 top-0 text-gray-500 select-none">
              <div className="mb-2">1</div>
              <div className="mb-2">2</div>
              <div className="mb-2">3</div>
              <div className="mb-2">4</div>
              <div className="mb-2">5</div>
              <div className="mb-2">6</div>
              <div className="mb-2">7</div>
              <div className="mb-2">8</div>
            </div>
            
            <div className="ml-8">
              <div className="text-purple-400 mb-2">from <span className="text-blue-400">forsi</span> <span className="text-purple-400">import</span> <span className="text-yellow-400">SupplyChainClient</span></div>
              <div className="text-purple-400 mb-2">from <span className="text-blue-400">forsi.analytics</span> <span className="text-purple-400">import</span> <span className="text-yellow-400">RiskAnalytics</span></div>
              <div className="text-purple-400 mb-2">from <span className="text-blue-400">forsi.monitoring</span> <span className="text-purple-400">import</span> <span className="text-yellow-400">RealTimeMonitor</span></div>
              <div className="mb-2"></div>
              <div className="text-gray-500 mb-2"># Initialize Forsi client</div>
              <div className="text-blue-400 mb-2">client <span className="text-white">=</span> <span className="text-yellow-400">SupplyChainClient</span>(<span className="text-green-400">api_key</span>=<span className="text-green-400">"YOUR_API_KEY"</span>)</div>
              <div className="text-blue-400 mb-2">monitor <span className="text-white">=</span> <span className="text-yellow-400">RealTimeMonitor</span>(<span className="text-green-400">client</span>)</div>
              <div className="text-blue-400 mb-2">analytics <span className="text-white">=</span> <span className="text-yellow-400">RiskAnalytics</span>(<span className="text-green-400">client</span>)</div>
            </div>
          </div>
        </motion.div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mb-20"
          id="features"
        >
          <div className="inline-block bg-gray-900 border border-gray-800 rounded-full px-4 py-2 mb-8">
            <span className="text-gray-400 text-sm">Platform Capabilities</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Enterprise-Grade Features</h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Comprehensive tools for modern supply chain management
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Global Monitoring',
                description: 'Real-time visibility across your entire supply network with 24/7 monitoring'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Predictive Analytics',
                description: 'Advanced forecasting for demand planning and risk assessment'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Risk Management',
                description: 'Proactive identification and mitigation of supply chain vulnerabilities'
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Performance Insights',
                description: 'Comprehensive dashboards and reporting for data-driven decisions'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors cursor-pointer"
                onClick={() => console.log(`Learn more about ${feature.title}`)}
              >
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how organizations worldwide are transforming their supply chains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors cursor-pointer"
                onClick={() => console.log(`Read full case study for ${testimonial.company}`)}
              >
                <div className="mb-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Supply Chain?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of enterprises already using Forsi to build more resilient operations.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              onClick={handleContactSales}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/30 text-white rounded-lg font-semibold text-lg hover:border-white/50 transition-colors"
            >
              Contact Sales
            </motion.button>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};