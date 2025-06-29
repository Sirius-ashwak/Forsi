import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { ChatInterface } from './ChatInterface';

export const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('quick-start');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex relative">
        <MainContent activeView={activeView} />
        
        <AnimatePresence>
          {isChatOpen && (
            <ChatInterface onClose={() => setIsChatOpen(false)} />
          )}
        </AnimatePresence>
        
        {/* Chat toggle button */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-50"
        >
          <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">#</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};