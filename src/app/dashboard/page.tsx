"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

export default function CertificationHub() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-primary/30 flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Heritage Identity (Easter Egg) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none select-none">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/50">
          Inspired by UniBook 1998
        </p>
      </div>

      <div className="w-full max-w-4xl px-8 relative z-10">
        {/* Core Vision: Alpha Pass Master */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-[0.25em] bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent uppercase leading-tight">
              ALPHA PASS
            </h1>
          </div>
          <div className="flex items-center gap-2 opacity-30">
            <Sparkles size={12} className="text-primary" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">
              Shared Growth Intelligence
            </p>
          </div>
        </motion.div>
        
        {/* The One Search: Google-like Simplicity */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative max-w-2xl mx-auto group w-full"
        >
          {/* Subtle Glow beneath the search */}
          <div className="absolute -inset-4 bg-primary/5 blur-[80px] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative flex items-center">
            <Search className="absolute left-8 text-white/10 group-focus-within:text-white/40 transition-colors" size={24} />
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (search.trim()) {
                  // Navigation would happen here
                  window.location.href = `/study?id=${search.toLowerCase().replace(/\s+/g, '-')}`;
                }
              }}
              className="w-full"
            >
              <input 
                type="search" 
                autoFocus
                placeholder="어떤 성공을 꿈꾸십니까?" 
                className="w-full bg-transparent border-b-2 border-white/5 py-8 px-16 text-2xl md:text-3xl font-medium focus:outline-none focus:border-white/20 focus:bg-white/[0.01] transition-all placeholder:text-white/5 tracking-tighter text-center"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
          
          {/* Actionable Hint */}
          <AnimatePresence>
            {search.length > 0 && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-center text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse"
              >
                Press Enter to Start Mission
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[150px] rounded-full opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full opacity-20" />
      </div>
    </div>
  );
}
