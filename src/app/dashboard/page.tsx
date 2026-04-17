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
      <section className="pt-32 pb-12 px-6 relative flex flex-col items-center justify-center min-h-[60vh]">
        <div className="max-w-4xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-8"
          >
            <Zap size={12} className="fill-current" />
            AI-Powered Certification Mastery
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-74xl font-black mb-10 tracking-tighter leading-none"
          >
            어떤 자격증을 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-accent">정복할까요?</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto group w-full"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-gray-400" size={22} />
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  (e.target as any).querySelector('input')?.blur();
                }}
                className="w-full"
              >
                <input 
                  type="search" 
                  placeholder="자격증 명칭을 입력하세요 (예: 전자기기기능사)" 
                  className="w-full bg-[#12121a]/80 border border-white/10 rounded-[32px] py-6 px-16 text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 backdrop-blur-3xl transition-all placeholder:text-gray-600 shadow-2xl [&::-webkit-search-cancel-button]:appearance-none"
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
        <section className="space-y-10">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Available Missions</h3>
            <span className="text-[10px] text-gray-700 font-bold">{filteredExams.length} Subjects Found</span>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-[48px] p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-[9px] text-primary font-black uppercase tracking-tighter border border-primary/10">
                          {exam.category}
                        </span>
                        {exam.id === 'electronic-craftsman' && (
                          <span className="px-2.5 py-1 rounded-full bg-accent/10 text-[9px] text-accent font-black uppercase tracking-tighter border border-accent/10">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold tracking-tighter">
                        {exam.title}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500">
                      {exam.category === 'Engineer' ? <Brain size={24} /> : <Zap size={24} />}
                    </div>
                  </div>

                  <Link 
                    href={`/study?id=${exam.id}`} 
                    className="flex items-center justify-center w-full py-5 rounded-[28px] bg-white text-black font-black hover:bg-primary hover:text-white transition-all duration-500 shadow-xl group/btn"
                  >
                    <span className="text-base flex items-center gap-2">
                      <GraduationCap size={20} />
                      무료 모의고사 시작
                    </span>
                    <ChevronRight size={20} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
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
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-600">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">검색 결과가 없습니다</h3>
                <p className="text-sm text-gray-500">다른 자격증 이름을 입력해보세요.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
