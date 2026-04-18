"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, BookOpen, GraduationCap, ChevronRight, Plus, Star, Filter, LayoutGrid, Clock, Calendar, Zap, Brain, Sparkles } from 'lucide-react';
import { EXAM_DATA } from '@/data/exams';
import { CERTIFICATE_LIST } from '@/data/certificates';
import { AIAssistant } from '@/components/AIAssistant';
import { STAFF_MESSAGES } from '@/data/staff';

export default function CertificationHub() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Engineer' | 'Craftsman'>('All');

  const allExams = Object.values(EXAM_DATA);
  const filteredExams = allExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || exam.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const remainingCertificates = CERTIFICATE_LIST.filter(cert => {
    // Only show if not already in EXAM_DATA and matches search/category
    const isInExamData = allExams.some(e => e.id === cert.id);
    if (isInExamData) return false;
    
    const matchesSearch = cert.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || cert.category === activeCategory;
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
      <section className="pt-10 md:pt-14 pb-6 px-6 relative flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-10"
          >
            <Sparkles size={12} className="text-primary" />
            ALPHA PASS MASTER
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto group w-full mb-8"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-gray-600" size={22} />
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  (e.target as any).querySelector('input')?.blur();
                }}
                className="w-full"
              >
                <input 
                  type="search" 
                  placeholder="Alpha Search" 
                  className="w-full bg-[#12121a]/90 border border-white/5 rounded-[32px] py-6 px-16 text-base focus:outline-none focus:ring-1 focus:ring-white/10 backdrop-blur-3xl transition-all placeholder:text-gray-500 shadow-2xl [&::-webkit-search-cancel-button]:appearance-none font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
          </motion.div>

          {/* Shortcut Circles: Conditional Visibility (Hide when searching) */}
          <AnimatePresence>
            {search.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6 md:gap-10 px-4"
              >
                {allExams.slice(0, 5).map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => setSearch(exam.title)}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500 group-hover:bg-white/10 group-hover:text-primary transition-all duration-300 group-active:scale-90 shadow-lg">
                      {exam.category === 'Engineer' ? <Brain size={24} /> : <Zap size={24} />}
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter group-hover:text-gray-200 transition-colors">
                      {exam.title.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {search.length > 0 && (
        <main className="w-full max-w-2xl mx-auto px-6 pb-48 animate-in fade-in slide-in-from-bottom-5 duration-500">
          {/* Modules Grid */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">Active Missions</h3>
              <span className="text-[9px] text-gray-700 font-bold">{filteredExams.length + remainingCertificates.length} Found</span>
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
                    className="group relative bg-[#12121a]/80 border-2 border-white/5 rounded-[40px] p-8 md:p-10 hover:border-primary/20 transition-all duration-500 shadow-2xl backdrop-blur-3xl overflow-hidden"
                  >
                    {/* Decorative Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-12 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-[9px] text-primary font-black uppercase tracking-widest border border-primary/10">
                            {exam.category}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-green-500/10 text-[9px] text-green-500 font-black uppercase tracking-widest border border-green-500/10 flex items-center gap-1.5">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                            AI Bank Ready
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-tight">
                          {exam.title}
                        </h3>
                      </div>
                      <div className="w-14 h-14 rounded-[24px] bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500">
                        {exam.category === 'Engineer' ? <Brain size={28} /> : <Zap size={28} />}
                      </div>
                    </div>

                    <Link 
                      href={`/study?id=${exam.id}`} 
                      className="flex items-center justify-center w-full py-6 rounded-[32px] bg-white text-black font-black hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl group/btn active:scale-95"
                    >
                      <span className="text-base flex items-center gap-3">
                        <GraduationCap size={20} />
                        무료 모의고사 시작
                      </span>
                      <ChevronRight size={20} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}

                {/* Discovery Certificates */}
                {remainingCertificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group relative bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-10 opacity-70 hover:opacity-100 transition-all duration-500 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] text-gray-500 font-black uppercase tracking-widest border border-white/5">
                            {cert.category}
                          </span>
                          <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{cert.field}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black tracking-tighter text-gray-400">
                          {cert.name}
                        </h3>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-700">
                        <Clock size={20} />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center w-full py-5 rounded-[28px] border border-white/5 text-gray-600 text-[11px] font-black tracking-widest uppercase bg-black/20">
                      Analyzing Database Pattern...
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredExams.length === 0 && remainingCertificates.length === 0 && (
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
      )}

      {search.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center opacity-40"
        >
          <div className="w-12 h-[1px] bg-white/10 mx-auto mb-4" />
          <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">Search to Initialize Diagnostic Mission</p>
        </motion.div>
      )}
    </div>
  );
}
