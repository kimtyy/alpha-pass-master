"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { EXAM_DATA } from '@/data/exams';
import Link from 'next/link';

export default function CertificationHub() {
  const [search, setSearch] = useState('');

  const subjects = useMemo(() => Object.values(EXAM_DATA), []);
  
  const filteredSubjects = useMemo(() => {
    if (!search.trim()) return [];
    return subjects.filter(sub => 
      sub.title.toLowerCase().includes(search.toLowerCase()) ||
      sub.category.toLowerCase().includes(search.toLowerCase()) ||
      sub.id.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search, subjects]);

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-primary/30 flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Heritage Identity */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none select-none">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/50">
          Inspired by UniBook 1998
        </p>
      </div>

      <div className="w-full max-w-4xl px-8 relative z-10 flex flex-col items-center">
        {/* Core Vision */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-12"
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
        
        {/* The One Search */}
        <div className="relative max-w-2xl mx-auto group w-full">
          <div className="absolute -inset-4 bg-primary/5 blur-[80px] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative flex items-center">
            <Search className="absolute left-8 text-white/10 group-focus-within:text-white/40 transition-colors" size={24} />
            <input 
              type="search" 
              autoFocus
              placeholder="어떤 성공을 꿈꾸십니까?" 
              className="w-full bg-transparent border-b-2 border-white/5 py-8 px-16 text-2xl md:text-3xl font-medium focus:outline-none focus:border-white/20 focus:bg-white/[0.01] transition-all placeholder:text-white/5 tracking-tighter text-center"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {/* Smart Suggestion Engine */}
          <AnimatePresence>
            {filteredSubjects.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-full left-0 right-0 mt-4 premium-glass border border-white/10 rounded-[32px] overflow-hidden z-50 p-2"
              >
                {filteredSubjects.map((sub, idx) => (
                  <Link 
                    key={sub.id} 
                    href={`/study?id=${sub.id}`}
                    className="flex items-center justify-between p-5 rounded-2xl hover:bg-white/5 transition-all group/item"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[10px] font-black group-hover/item:bg-primary/20 group-hover/item:text-primary transition-colors">
                        {idx + 1}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{sub.title}</p>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{sub.category}</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-700 group-hover/item:text-primary group-hover/item:translate-x-1 transition-all" />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[150px] rounded-full opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full opacity-20" />
      </div>
    </div>
  );
}
