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
      <section className="pt-20 pb-4 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Star size={12} className="fill-current" />
            Alpha Family Universal Platform
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-tight"
          >
            모든 자격증의 <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">지능형 성지</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto group mt-8"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="어떤 자격증에 도전하시겠습니까?" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-16 text-xl focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-xl transition-all placeholder:text-gray-600 shadow-2xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 pb-20 mt-12">
        {/* Live Q-Net Intelligence Card */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Live Q-Net Intelligence</h3>
            </div>
            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">Real-time Feed</span>
          </div>
          <div className="bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border border-white/5 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Calendar size={60} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-tighter">
                  D-Day Focus
                </div>
                <span className="text-xs font-bold text-white tracking-tight">2026년 정기 기사 2회 필기</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[11px] text-gray-400 font-medium">원서 접수</span>
                  <span className="text-[11px] font-black text-white">04.16 ~ 04.19 <span className="text-accent ml-2 text-[9px] italic">Active</span></span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[11px] text-gray-400 font-medium">시험 시행</span>
                  <span className="text-[11px] font-black text-white">05.09 ~ 05.28</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Selector */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Explore Domains</h3>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
            {(['All', 'Engineer', 'Craftsman'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                }`}
              >
                {cat === 'All' ? '전체' : cat === 'Engineer' ? '기사' : '기능사'}
              </button>
            ))}
          </div>
        </section>

        {/* Modules Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Available Modules</h3>
            <span className="text-[9px] text-gray-600 font-bold">{filteredExams.length} Subjects Ready</span>
          </div>
          
          <div className="grid grid-cols-1 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative bg-[#0d0d12]/60 border border-white/10 rounded-[40px] p-6 backdrop-blur-3xl hover:border-primary/50 transition-all duration-500 overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="px-2 py-0.5 rounded-lg bg-primary/20 text-[9px] text-primary font-black uppercase tracking-tighter">
                        {exam.category}
                      </span>
                      <h3 className="text-xl font-bold mt-2 group-hover:text-primary transition leading-tight tracking-tight">
                        {exam.title}
                      </h3>
                    </div>
                    <div className="text-primary opacity-30 group-hover:opacity-100 transition-opacity">
                      {exam.category === 'Engineer' ? <Brain size={24} /> : <Zap size={24} />}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-indigo-400 w-full opacity-10" />
                    </div>
                    <span className="text-[10px] font-black text-gray-600 uppercase italic">New Mission</span>
                  </div>

                  <Link 
                    href={`/study?id=${exam.id}`} 
                    className="flex items-center justify-between w-full py-5 px-6 rounded-[28px] bg-white text-black font-black hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl relative group/btn"
                  >
                    <span className="text-base flex items-center gap-2 relative z-10 transition-transform group-hover/btn:translate-x-1">
                      <GraduationCap size={20} />
                      무료 학습 시작하기
                    </span>
                    <ChevronRight size={22} className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Request Button */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] p-10 min-h-[200px] text-gray-600 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                <Plus size={24} />
              </div>
              <span className="font-bold text-xs tracking-tight text-center">원하시는 자격증을 <br/>찾을 수 없나요?</span>
            </motion.div>
          </div>
        </section>

        {/* Q-Net Insights */}
        <section className="mt-20">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="text-primary" size={18} />
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Live Intelligence Stream</h2>
          </div>
          <div className="p-8 rounded-[40px] bg-white/5 border border-white/5 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap size={80} />
            </div>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <span className="px-2 py-0.5 rounded bg-accent text-[8px] font-black text-black">NOTICE</span>
                <p className="text-[11px] text-gray-400 font-medium">2026년도 국가기술자격 시험 일정 공고 안내</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="px-2 py-0.5 rounded bg-primary/20 text-[8px] font-black text-primary">UPDATE</span>
                <p className="text-[11px] text-gray-400 font-medium">전자기기기능사 필기 신규 기출 데이터 업로드 완료</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Persistence Dock (Mobile) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4">
        <div className="bg-[#121216]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 flex justify-between items-center shadow-2xl">
          <div className="aspect-square w-12 rounded-[24px] bg-primary/20 flex items-center justify-center text-primary border border-primary/10">
            <BookOpen size={20} />
          </div>
          <div className="flex-1 px-4">
            <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest italic leading-none mb-1">Night Mission</div>
            <div className="text-[11px] font-bold truncate tracking-tight">전국 모든 자격증 구축 중... 🌙</div>
          </div>
          <Link href="/study?id=electronic-craftsman" className="bg-primary text-white p-3.5 rounded-[24px] shadow-lg active:scale-95 transition-all">
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
