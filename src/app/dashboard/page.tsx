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
    return subjects
      .filter(sub =>
        sub.title.toLowerCase().includes(search.toLowerCase()) ||
        sub.category.toLowerCase().includes(search.toLowerCase()) ||
        sub.id.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 5);
  }, [search, subjects]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/20 flex flex-col items-center justify-center overflow-hidden font-sans">

      {/* Heritage footer */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none select-none">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-text-secondary">
          Inspired by UniBook 1998
        </p>
      </div>

      <div className="w-full max-w-4xl px-6 md:px-8 relative z-10 flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-black tracking-[0.25em] bg-gradient-to-b from-foreground via-foreground to-foreground/20 bg-clip-text text-transparent uppercase leading-tight mb-3">
            ALPHA PASS
          </h1>
          <div className="flex items-center gap-2 opacity-40">
            <Sparkles size={11} className="text-primary" />
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">
              Shared Growth Intelligence
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto group w-full">
          {/* Ambient glow */}
          <div className="absolute -inset-4 bg-primary/8 blur-[80px] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="relative flex items-center">
            <Search
              className="absolute left-6 md:left-8 text-foreground/10 group-focus-within:text-primary/60 transition-colors duration-300"
              size={22}
            />
            <input
              type="search"
              autoFocus
              placeholder="어떤 성공을 꿈꾸십니까?"
              className="w-full bg-transparent border-b-2 border-foreground/6 py-6 md:py-8 px-14 md:px-16 text-xl md:text-3xl font-medium focus:outline-none focus:border-primary/40 transition-all placeholder:text-foreground/8 tracking-tighter text-center"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {filteredSubjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-4 premium-glass rounded-[28px] overflow-hidden z-50 p-2"
              >
                {filteredSubjects.map((sub, idx) => (
                  <Link
                    key={sub.id}
                    href={`/study?id=${sub.id}`}
                    className="flex items-center justify-between p-4 md:p-5 rounded-2xl hover:bg-primary/8 transition-all group/item"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-surface-2 flex items-center justify-center text-[10px] font-black text-text-secondary group-hover/item:bg-primary/15 group-hover/item:text-primary transition-colors shrink-0">
                        {idx + 1}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">
                          {sub.title}
                        </p>
                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">
                          {sub.category}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-text-secondary/50 group-hover/item:text-primary group-hover/item:translate-x-1 transition-all shrink-0"
                    />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background ambience — amber 계열로 교체 */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[15%] right-[-15%] w-[55%] h-[55%] bg-primary/6 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-secondary/4 blur-[130px] rounded-full" />
      </div>
    </div>
  );
}
