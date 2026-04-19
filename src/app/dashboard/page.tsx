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
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 pb-28 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[130px] rounded-full opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[110px] rounded-full opacity-30" />
      </div>

      {/* Hero / Search Section */}
      <section className="pt-4 md:pt-10 pb-4 px-6 relative flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={20} className="text-primary" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[0.2em] bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent uppercase leading-tight">
                ALPHA PASS MASTER
              </h1>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.6em] ml-2">
              Next-Gen Certification Engine
            </p>
          </motion.div>
          
          {/* Search Bar Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto group w-full mb-4"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[36px] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-8 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
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
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[32px] py-4 px-16 text-lg md:text-xl font-medium focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] backdrop-blur-3xl transition-all placeholder:text-white/10 shadow-2xl [&::-webkit-search-cancel-button]:appearance-none tracking-tight text-center"
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
                className="max-w-2xl mx-auto mb-4"
              >
                <div className="premium-glass flex items-center gap-4 px-5 py-3 rounded-[24px]">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-pulse" />
                    <AlertCircle size={18} className="relative z-10" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-primary rounded-full animate-ping" />
                        <span className="text-[10px] font-black text-white/90 uppercase tracking-widest">Alpha Scout Live</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Intelligence Stream</span>
                    </div>
                    <p className="text-[11px] text-white/60 font-medium leading-relaxed tracking-tight">
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
                className="grid grid-cols-3 gap-y-6 gap-x-6 md:flex md:flex-wrap md:justify-center md:gap-10 px-6"
              >
                {shortcutExams.map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => setSearch(exam.title)}
                    className="flex flex-col items-center gap-3 group px-4 py-2 rounded-3xl hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/30 group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary transition-all duration-500 group-active:scale-95 relative">
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                      <div className="relative z-10">{getExamIcon(exam.id, exam.category)}</div>
                    </div>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors text-center w-20 overflow-hidden text-ellipsis whitespace-nowrap">
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
            <div className="flex items-center justify-between px-4 border-l-2 border-primary/40 ml-2">
              <div className="flex flex-col">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-1">Mission Database</h3>
                <p className="text-[9px] text-primary/60 font-bold uppercase tracking-widest">Search Execution Results</p>
              </div>
              <span className="text-[10px] text-white/40 font-bold bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">{filteredExams.length + remainingCertificates.length} Found</span>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredExams.map((exam) => (
                  <motion.div
                    key={exam.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="group relative bg-white/[0.02] border border-white/10 rounded-[40px] p-8 md:p-10 hover:border-primary/30 transition-all duration-500 shadow-2xl backdrop-blur-3xl overflow-hidden"
                  >
                    {/* Decorative Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[70px] rounded-full pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-10 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-[9px] text-primary font-black uppercase tracking-widest border border-primary/20">
                            {exam.category}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-accent/10 text-[9px] text-accent font-black uppercase tracking-widest border border-accent/20 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            AI Ready
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                          {exam.title}
                        </h3>
                      </div>
                      <div className="w-14 h-14 rounded-[22px] bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                        {exam.category === 'Engineer' ? <Brain size={26} /> : <Zap size={26} />}
                      </div>
                    </div>

                    <Link 
                      href={`/study?id=${exam.id}`} 
                      className="flex items-center justify-center w-full py-5 rounded-[28px] bg-white text-black font-black hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl group/btn active:scale-[0.98]"
                    >
                      <span className="text-sm flex items-center gap-3 tracking-tight">
                        <GraduationCap size={18} />
                        무료 모의고사 시작
                      </span>
                      <ChevronRight size={18} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
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
                    className="group relative bg-white/[0.01] border border-white/5 rounded-[40px] p-8 md:p-10 opacity-60 hover:opacity-100 transition-all duration-500 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] text-white/30 font-black uppercase tracking-widest border border-white/5">
                            {cert.category}
                          </span>
                          <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">{cert.field}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white/40 group-hover:text-white/60 transition-colors">
                          {cert.name}
                        </h3>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.02] flex items-center justify-center text-white/10 group-hover:text-white/20 transition-colors">
                        <Clock size={20} />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center w-full py-4 rounded-[24px] border border-white/5 text-white/20 text-[10px] font-black tracking-widest uppercase bg-white/[0.01]">
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
                  <div className="w-16 h-16 bg-white/[0.03] rounded-full flex items-center justify-center mx-auto mb-6 text-white/20">
                    <Search size={22} />
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-white/40">No Matches Found</h3>
                  <p className="text-xs text-white/20">데이터베이스를 다시 검색해 주십시오.</p>
                </motion.div>
              )}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
