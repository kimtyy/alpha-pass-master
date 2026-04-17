"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, BookOpen, GraduationCap, ChevronRight, Plus, Star, Filter, LayoutGrid, Clock, Calendar, Zap, Brain } from 'lucide-react';
import { EXAM_DATA } from '@/data/exams';

export default function CertificationHub() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Engineer' | 'Craftsman'>('All');

  const allExams = Object.values(EXAM_DATA);
  const filteredExams = allExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || exam.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-primary/30 pb-28 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Hero / Search Section */}
      <section className="pt-24 pb-12 px-6 relative flex flex-col items-center justify-center min-h-[50vh]">
        <div className="max-w-4xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest mb-6"
          >
            <Zap size={10} className="fill-current" />
            Elite Intelligence OS
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none"
          >
            어떤 자격증을 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-accent text-3xl md:text-5xl">정복할까요?</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-xl mx-auto group w-full"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-gray-500" size={20} />
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  (e.target as any).querySelector('input')?.blur();
                }}
                className="w-full"
              >
                <input 
                  type="search" 
                  placeholder="자격증 명칭을 입력하세요" 
                  className="w-full bg-[#12121a]/90 border border-white/10 rounded-[28px] py-5 px-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 backdrop-blur-3xl transition-all placeholder:text-gray-700 shadow-2xl [&::-webkit-search-cancel-button]:appearance-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="w-full max-w-2xl mx-auto px-6 pb-40">
        {/* Modules Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">Active Missions</h3>
            <span className="text-[9px] text-gray-700 font-bold">{filteredExams.length} Found</span>
          </div>
          
          <div className="grid grid-cols-1 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group relative bg-[#09090b]/40 border border-white/5 rounded-[40px] p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-primary/10 text-[8px] text-primary font-black uppercase tracking-tighter border border-primary/10">
                          {exam.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tighter text-gray-100">
                        {exam.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-primary transition-colors">
                      {exam.category === 'Engineer' ? <Brain size={20} /> : <Zap size={20} />}
                    </div>
                  </div>

                  <Link 
                    href={`/study?id=${exam.id}`} 
                    className="flex items-center justify-center w-full py-5 rounded-3xl bg-white text-black font-black hover:bg-primary hover:text-white transition-all duration-300 shadow-xl group/btn active:scale-95"
                  >
                    <span className="text-sm flex items-center gap-2">
                      <GraduationCap size={18} />
                      무료 모의고사 시작
                    </span>
                    <ChevronRight size={18} className="ml-0.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredExams.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-700">
                  <Search size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1 text-gray-400">검색 결과가 없습니다</h3>
                <p className="text-xs text-gray-600">자격증 명칭을 다시 한 번 확인해 주세요.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
