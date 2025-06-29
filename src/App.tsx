import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/layout/Sidebar';
import { AIAssistant } from './components/layout/AIAssistant';
import { GlobalMap } from './components/map/GlobalMap';
import { KPICards } from './components/dashboard/KPICards';
import { ScenarioBuilder } from './components/scenarios/ScenarioBuilder';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderMainContent = () => {
    const content = (() => {
      switch (activeView) {
        case 'dashboard':
          return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
              {/* Hero Section */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative px-6 py-24 sm:px-12 sm:py-32 lg:px-16">
                  <div className="mx-auto max-w-2xl text-center">
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                    >
                      Supply Chain Intelligence Platform
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mt-6 text-lg leading-8 text-blue-100"
                    >
                      AI-powered supply chain resilience and risk management. Monitor global operations, predict disruptions, and optimize your supply network in real-time.
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="mt-10 flex items-center justify-center gap-x-6"
                    >
                      <motion.button
                        onClick={() => setActiveView('nexus')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        View Global Map
                      </motion.button>
                      <motion.button
                        onClick={() => setActiveView('insights')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-semibold leading-6 text-white hover:text-blue-100"
                      >
                        Analytics Dashboard <span aria-hidden="true">→</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                  <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mx-auto max-w-2xl lg:max-w-none"
                  >
                    <div className="text-center">
                      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Real-time Supply Chain Intelligence
                      </h2>
                      <p className="mt-4 text-lg leading-8 text-gray-600">
                        Monitor your global supply network with AI-powered insights and predictive analytics
                      </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col bg-gray-400/5 p-8"
                      >
                        <dt className="text-sm font-semibold leading-6 text-gray-600">Global Suppliers</dt>
                        <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">2,847</dd>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="flex flex-col bg-gray-400/5 p-8"
                      >
                        <dt className="text-sm font-semibold leading-6 text-gray-600">Active Shipments</dt>
                        <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">12,394</dd>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        className="flex flex-col bg-gray-400/5 p-8"
                      >
                        <dt className="text-sm font-semibold leading-6 text-gray-600">Risk Score</dt>
                        <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">7.2/10</dd>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="flex flex-col bg-gray-400/5 p-8"
                      >
                        <dt className="text-sm font-semibold leading-6 text-gray-600">On-time Delivery</dt>
                        <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">94.2%</dd>
                      </motion.div>
                    </dl>
                  </motion.div>
                </div>
              </div>

              {/* Features Section */}
              <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Comprehensive Supply Chain Management
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                      Everything you need to monitor, analyze, and optimize your global supply chain operations
                    </p>
                  </div>
                  <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="flex flex-col"
                      >
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
                            </svg>
                          </div>
                          Global Visibility
                        </dt>
                        <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                          <p className="flex-auto">Real-time monitoring of your entire supply chain network across all continents with interactive 3D visualization.</p>
                        </dd>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        className="flex flex-col"
                      >
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                            </svg>
                          </div>
                          AI-Powered Predictions
                        </dt>
                        <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                          <p className="flex-auto">Advanced machine learning algorithms predict disruptions before they happen, enabling proactive risk management.</p>
                        </dd>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                        className="flex flex-col"
                      >
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-2.25m2.25 0l.5 1.5m.5-1.5l1 1.5" />
                            </svg>
                          </div>
                          Scenario Planning
                        </dt>
                        <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                          <p className="flex-auto">Create and analyze what-if scenarios to test supply chain resilience and develop contingency plans.</p>
                        </dd>
                      </motion.div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-blue-600">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                  <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Ready to optimize your supply chain?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                      Start monitoring your global operations with AI-powered insights and real-time analytics.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <motion.button
                        onClick={() => setActiveView('nexus')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Launch Global Map
                      </motion.button>
                      <motion.button
                        onClick={() => setActiveView('quantum')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-semibold leading-6 text-white hover:text-blue-100"
                      >
                        Build Scenarios <span aria-hidden="true">→</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case 'nexus':
          return <GlobalMap />;
        case 'insights':
          return (
            <div className="p-12 space-y-12 min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h1 className="text-6xl font-thin text-slate-900 mb-6 tracking-tight">
                    Supply Chain
                    <span className="block font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Intelligence
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                    Real-time insights and predictive analytics for your global operations
                  </p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <KPICards />
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-700"
                  >
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <div className="w-6 h-6 bg-white rounded-full animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-semibold text-slate-900">Active Disruptions</h3>
                    </div>
                    <div className="space-y-4">
                      <motion.div 
                        whileHover={{ x: 4, scale: 1.01 }}
                        className="flex items-center space-x-4 p-5 bg-red-50/80 border border-red-100 rounded-2xl hover:bg-red-50 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">Labor strike at Munich supplier facility</p>
                          <p className="text-sm text-slate-500 mt-1">18 minutes ago</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: 4, scale: 1.01 }}
                        className="flex items-center space-x-4 p-5 bg-amber-50/80 border border-amber-100 rounded-2xl hover:bg-amber-50 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">Severe weather delays at Los Angeles port</p>
                          <p className="text-sm text-slate-500 mt-1">1.2 hours ago</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-700"
                  >
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                      <h3 className="text-2xl font-semibold text-slate-900">Supply Chain Trends</h3>
                    </div>
                    <div className="h-48 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                        <p className="text-slate-600 font-medium">Processing supply chain analytics...</p>
                        <div className="flex justify-center space-x-2 mt-4">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-blue-500 rounded-full"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.4, 1, 0.4]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        case 'quantum':
          return <ScenarioBuilder />;
        case 'chronospectrum':
          return (
            <div className="p-12 space-y-12 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-full">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h1 className="text-6xl font-thin text-slate-900 mb-6 tracking-tight">
                    Supply Chain
                    <span className="block font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Timeline
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                    Historical and predictive analysis of supply chain events
                  </p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-10 shadow-xl shadow-slate-200/50"
                >
                  <h3 className="text-3xl font-semibold text-slate-900 mb-10 flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <div className="w-5 h-5 bg-white rounded-full" />
                    </div>
                    <span>Recent Supply Chain Events</span>
                  </h3>
                  <div className="space-y-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="border border-red-100 rounded-2xl p-8 bg-red-50/50 hover:bg-red-50 transition-all duration-500 hover:shadow-lg hover:shadow-red-100"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-2xl font-semibold text-slate-900">Labor Strike - Munich Supplier</h4>
                        <span className="px-4 py-2 bg-red-500 text-white text-sm rounded-full font-medium shadow-lg">
                          Critical
                        </span>
                      </div>
                      <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                        Production halt affecting 3,400 products with estimated 12-day delay across European supply chain.
                      </p>
                      <div className="flex space-x-4">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium shadow-lg hover:shadow-xl"
                        >
                          Send Alert Communication
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 border border-red-200 text-red-700 rounded-xl hover:bg-red-50 transition-colors font-medium"
                        >
                          View Impact Analysis
                        </motion.button>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="border border-amber-100 rounded-2xl p-8 bg-amber-50/50 hover:bg-amber-50 transition-all duration-500 hover:shadow-lg hover:shadow-amber-100"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-2xl font-semibold text-slate-900">Weather System - Pacific Coast</h4>
                        <span className="px-4 py-2 bg-amber-500 text-white text-sm rounded-full font-medium shadow-lg">
                          High Risk
                        </span>
                      </div>
                      <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                        Severe weather causing port delays with 4-day estimated impact on West Coast operations.
                      </p>
                      <div className="flex space-x-4">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-medium shadow-lg hover:shadow-xl"
                        >
                          Monitor Weather Status
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 border border-amber-200 text-amber-700 rounded-xl hover:bg-amber-50 transition-colors font-medium"
                        >
                          Find Alternative Routes
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        default:
          return (
            <div className="p-12 flex items-center justify-center h-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-4">Loading Supply Chain Interface</h2>
                <p className="text-slate-600 text-lg">Initializing global monitoring systems...</p>
              </motion.div>
            </div>
          );
      }
    })();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full"
        >
          {content}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 pointer-events-none" />
      
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex relative z-10">
        <main className="flex-1 overflow-auto">
          {renderMainContent()}
        </main>
        
        <AIAssistant />
      </div>
    </div>
  );
}

export default App;