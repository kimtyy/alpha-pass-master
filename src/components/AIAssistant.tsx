"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALPHA_STAFF, StaffPersona } from '@/data/staff';
import { Sparkles, Brain, Zap, MessageCircle } from 'lucide-react';

interface AIAssistantProps {
  staffId: 'kidari' | 'youngja';
  message: string;
  context?: 'exam' | 'training' | 'dashboard';
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ staffId, message, context = 'dashboard' }) => {
  const staff = ALPHA_STAFF[staffId];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={`relative p-6 rounded-[32px] border backdrop-blur-3xl shadow-2xl ${
        staff.role === 'dev' 
          ? 'bg-blue-500/5 border-blue-500/20 shadow-blue-500/5' 
          : 'bg-purple-500/5 border-purple-500/20 shadow-purple-500/5'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar Area */}
        <div className="relative shrink-0">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${
            staff.role === 'dev' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-purple-500/10 border-purple-500/20'
          }`}>
            {staff.avatar}
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-lg"
          >
            {staff.role === 'dev' ? <Brain size={12} className="text-blue-600" /> : <Sparkles size={12} className="text-purple-600" />}
          </motion.div>
        </div>

        {/* Message Area */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-1.5">
              <Zap size={10} className="fill-current" />
              Alpha Intelligence Guidance
            </span>
          </div>
          <p className="text-[13px] font-medium leading-relaxed text-gray-200 italic">
            "{message}"
          </p>
        </div>
      </div>

      {/* Background Decor for context */}
      {context === 'exam' && (
        <div className="absolute top-2 right-4 text-blue-500/20">
          <Zap size={40} />
        </div>
      )}
    </motion.div>
  );
};

export const StaffBubble: React.FC<{ staffId: 'kidari' | 'youngja', message: string }> = ({ staffId, message }) => {
  const staff = ALPHA_STAFF[staffId];
  
  return (
    <div className="flex items-end gap-3 max-w-sm">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border shrink-0 ${
        staff.role === 'dev' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-purple-500/10 border-purple-500/20'
      }`}>
        {staff.avatar}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none p-3 shadow-xl backdrop-blur-xl"
      >
        <p className="text-[11px] leading-snug text-gray-300 font-bold">{message}</p>
      </motion.div>
    </div>
  );
};
