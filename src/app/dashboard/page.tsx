"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, BookOpen, GraduationCap, ChevronRight, Plus, Star, Filter, LayoutGrid, Clock, Calendar, Zap, Brain, Sparkles, ShieldCheck, Home, UtensilsCrossed, PencilRuler, Code, Construction, Truck, Car, AlertCircle } from 'lucide-react';
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

  const getExamIcon = (id: string, category: string) => {
    if (id.includes('safety')) return <ShieldCheck size={24} />;
    if (id.includes('real-estate')) return <Home size={24} />;
    if (id.includes('cook')) return <UtensilsCrossed size={24} />;
    if (id.includes('architectural')) return <PencilRuler size={24} />;
    if (id.includes('info-processing')) return <Code size={24} />;
    if (id.includes('electric')) return <Zap size={24} />;
    if (id.includes('driver-license')) return <Car size={24} />;
    if (id.includes('forklift')) return <Truck size={24} />;
    if (category === 'Engineer') return <Construction size={24} />;
    return <Zap size={24} />;
  };

  // Select core subjects for shortcuts (Market-First Priority)
  const shortcutExams = [
    'driver-license-general',
    'forklift-operator-craftsman',
    'industrial-safety-engineer',
    'electric-engineer',
    'real-estate-agent',
    'info-processing-engineer'
  ].map(id => EXAM_DATA[id]).filter(Boolean);

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
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-12"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={24} className="text-primary animate-pulse" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic leading-tight">
                ALPHA PASS MASTER
              </h1>
            </div>
            <p className="text-[11px] font-black text-primary/60 uppercase tracking-[0.5em] ml-1">
              Examination Master Database
            </p>
          </motion.div>
          
          {/* Search Bar Container */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto group w-full mb-8"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-8 text-primary/50 group-focus-within:text-primary transition-colors" size={24} />
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
                  className="w-full bg-[#12121a]/95 border-2 border-white/5 rounded-[32px] py-6 px-16 text-lg md:text-xl font-black focus:outline-none focus:border-primary/30 backdrop-blur-3xl transition-all placeholder:text-gray-600 shadow-2xl [&::-webkit-search-cancel-button]:appearance-none tracking-tight text-center"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
          </motion.div>

          {/* Market Intelligence Alert (Alpha Scout) */}
          <AnimatePresence mode="wait">
            {!search && (
              <motion.div
                key="market-alert"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto mb-10"
              >
                <div className="flex items-center gap-4 px-6 py-4 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-xl">
                  <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0 animate-pulse">
                    <AlertCircle size={20} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">Alpha Scout Alert</span>
                      <span className="w-1 h-1 rounded-full bg-primary/40" />
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Market Intelligence Live</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                      {STAFF_MESSAGES.market.trending[0]}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shortcut Circles */}
          <AnimatePresence>
            {!search && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid grid-cols-3 gap-y-10 gap-x-6 md:flex md:flex-wrap md:justify-center md:gap-10 px-6"
              >
                {shortcutExams.map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => setSearch(exam.title)}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:text-primary transition-all duration-300 group-active:scale-95 shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {getExamIcon(exam.id, exam.category)}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter group-hover:text-gray-200 transition-colors text-center w-20 overflow-hidden text-ellipsis whitespace-nowrap">
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
          <section className="space-y-10">
            <div className="flex items-center justify-between px-4 border-l-2 border-primary/30 ml-2">
              <div className="flex flex-col">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Active Missions</h3>
                <p className="text-[9px] text-primary/50 font-bold uppercase tracking-widest">Protocol Search Results</p>
              </div>
              <span className="text-[10px] text-gray-500 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/5">{filteredExams.length + remainingCertificates.length} Found</span>
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
    </div>
  );
}
