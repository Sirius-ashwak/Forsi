import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Minimize2, Sparkles, Zap, Brain, Activity } from 'lucide-react';
import { ChatMessage } from '../../types';
import { mockChatMessages, generateAIResponse } from '../../api-mocks/graniteAI';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputValue);
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
        actions: [
          { label: 'Create Scenario', action: 'create-scenario' },
          { label: 'Analyze Patterns', action: 'analyze-patterns' },
          { label: 'Generate Report', action: 'generate-report' }
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  if (isMinimized) {
    return (
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 bg-white/80 backdrop-blur-xl border-l border-slate-200/60 flex flex-col items-center py-8 shadow-xl shadow-slate-200/20"
      >
        <motion.button
          onClick={() => setIsMinimized(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Brain className="w-6 h-6" />
        </motion.button>
        <div className="mt-4 text-center">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mx-auto mb-3 shadow-lg shadow-green-500/50" />
          <p className="text-xs text-slate-500 transform rotate-90 whitespace-nowrap origin-center mt-8">AI Active</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-96 bg-white/80 backdrop-blur-xl border-l border-slate-200/60 flex flex-col h-full shadow-xl shadow-slate-200/20"
    >
      <div className="p-6 border-b border-slate-200/60 flex items-center justify-between">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">AI Assistant</h2>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-slate-500">GPT-4 Powered</p>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.button
          onClick={() => setIsMinimized(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Minimize2 className="w-5 h-5 text-slate-500" />
        </motion.button>
      </div>

      {/* Voice indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 80 }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 py-4 border-b border-slate-200/60 bg-blue-50/50"
          >
            <div className="flex items-center justify-center space-x-1 h-12">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-blue-500 rounded-full"
                  animate={{ 
                    height: [4, Math.random() * 24 + 8, 4],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-blue-600 text-center mt-2 font-medium">Listening...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-5 py-4 rounded-2xl relative shadow-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white shadow-blue-500/25'
                    : message.type === 'alert'
                    ? 'bg-red-50 border border-red-200 text-red-900 shadow-red-200/50'
                    : 'bg-slate-100 border border-slate-200 text-slate-900 shadow-slate-200/50'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="absolute -top-2 -left-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
                
                <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                
                {message.actions && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mt-4 space-y-2"
                  >
                    {message.actions.map((action, actionIndex) => (
                      <motion.button
                        key={actionIndex}
                        whileHover={{ x: 2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="block w-full text-left text-sm px-4 py-3 bg-white/80 rounded-xl hover:bg-white transition-all duration-300 border border-slate-200/60 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center space-x-3">
                          <Zap className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-slate-700">{action.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
                
                <p className="text-xs opacity-70 mt-3 flex items-center space-x-2">
                  <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                  {message.type === 'assistant' && (
                    <span className="text-blue-400">• AI</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-100 border border-slate-200 rounded-2xl px-5 py-4 shadow-lg shadow-slate-200/50">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-blue-500 rounded-full"
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
                <span className="text-sm text-blue-600 font-medium">AI thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="p-6 border-t border-slate-200/60"
      >
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your supply chain..."
              className="w-full px-4 py-4 bg-slate-100/80 border border-slate-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-slate-900 placeholder-slate-500 text-sm font-medium shadow-sm transition-all duration-300"
              rows={2}
            />
          </div>
          <div className="flex flex-col space-y-3">
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={toggleListening}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};