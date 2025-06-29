import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Paperclip, Mic, MoreVertical, TrendingUp, AlertTriangle, Truck } from 'lucide-react';

interface ChatInterfaceProps {
  onClose: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const messages = [
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your Supply Chain AI assistant. I can help you monitor global operations, analyze risk levels, predict demand, optimize logistics routes, and provide insights on supplier performance. What would you like to explore today?",
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'user',
      content: "Can you analyze the current risk levels in my Asia-Pacific supply chain operations?",
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      type: 'assistant',
      content: "I've analyzed your APAC supply chain and found several key insights:\n\n🔴 **High Risk Areas:**\n• Weather disruptions in Southeast Asia (Typhoon season)\n• Port congestion in Shanghai and Singapore\n• Semiconductor shortage affecting electronics suppliers\n\n🟡 **Medium Risk:**\n• Currency fluctuations in emerging markets\n• Labor shortages in manufacturing hubs\n\n✅ **Recommendations:**\n• Diversify suppliers across multiple countries\n• Increase safety stock for critical components\n• Consider alternative shipping routes\n\nWould you like me to generate a detailed risk mitigation plan?",
      timestamp: '10:33 AM'
    }
  ];

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-96 bg-gray-950 border-l border-gray-800 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-black text-lg font-bold">AI</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Supply Chain AI</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-400">Monitoring 1,247 nodes</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </motion.button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.type === 'assistant' && (
              <div className="flex items-start space-x-3 max-w-xs">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-black text-xs font-bold">AI</span>
                </div>
                <div className="bg-gray-900 rounded-xl rounded-tl-md p-4 border border-gray-800">
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{msg.timestamp}</p>
                </div>
              </div>
            )}
            
            {msg.type === 'user' && (
              <div className="max-w-xs">
                <div className="bg-white text-black rounded-xl rounded-tr-md p-4">
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className="text-xs text-gray-600 mt-2 text-right">{msg.timestamp}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
        
        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start space-x-3"
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black text-xs font-bold">AI</span>
          </div>
          <div className="bg-gray-900 rounded-xl rounded-tl-md p-4 border border-gray-800">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-800 bg-gray-900">
        <div className="space-y-4">
          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2">
            {[
              { text: 'Risk analysis', icon: <AlertTriangle className="w-3 h-3" /> },
              { text: 'Track shipments', icon: <Truck className="w-3 h-3" /> },
              { text: 'Demand forecast', icon: <TrendingUp className="w-3 h-3" /> }
            ].map((suggestion) => (
              <motion.button
                key={suggestion.text}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-300 transition-colors"
              >
                {suggestion.icon}
                <span>{suggestion.text}</span>
              </motion.button>
            ))}
          </div>
          
          {/* Input area */}
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about supply chain performance, risks, or optimization..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 resize-none transition-all"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Paperclip className="w-4 h-4 text-gray-400" />
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setIsRecording(!isRecording)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl transition-all ${
                  isRecording 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                }`}
              >
                <Mic className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!message.trim()}
                className="p-3 bg-white text-black rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};