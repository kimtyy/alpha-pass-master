"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, BookOpen, GraduationCap, ChevronRight, Plus, Star, Filter, LayoutGrid, Clock } from 'lucide-react';
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
      <section className="pt-20 pb-12 px-6 relative">
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

          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-3 mt-8"
          >
            {(['All', 'Engineer', 'Craftsman'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
                    : 'bg-white/5 border-white/10 text-gray-500 hover:text-gray-300'
                }`}
              >
                {cat === 'All' ? '전체' : cat === 'Engineer' ? '기사' : '기능사'}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-black mb-1 flex items-center gap-2 uppercase tracking-tighter italic">
              <LayoutGrid className="text-primary" size={20} />
              Available Missions
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{filteredExams.length} Subjects Ready</p>
          </div>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-500">
            <Filter size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredExams.map((exam) => (
              <motion.div
                key={exam.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md hover:border-primary/50 transition-all duration-500 overflow-hidden"
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
                    <BookOpen size={24} />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-indigo-400 w-0" />
                  </div>
                  <span className="text-[10px] font-black text-gray-600">NEW STUDY</span>
                </div>

                <Link 
                  href={`/study?id=${exam.id}`} 
                  className="flex items-center justify-between w-full py-4 px-6 rounded-2xl bg-white/5 group-hover:bg-primary text-white border border-white/10 group-hover:border-primary transition-all duration-300 shadow-xl overflow-hidden relative"
                >
                  <span className="font-bold flex items-center gap-2 relative z-10">
                    <GraduationCap size={18} />
                    무료 학습 시작하기
                  </span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Request Button */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl p-8 min-h-[200px] text-gray-600 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors shadow-lg">
              <Plus size={20} />
            </div>
            <span className="font-bold text-xs tracking-tight text-center">원하시는 자격증을 <br/>찾을 수 없나요?</span>
          </motion.div>
        </div>

        {/* Q-Net Daily Intel */}
        <div className="mt-20">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="text-primary" size={18} />
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Live Q-Net Intelligence</h2>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
              <Star size={80} />
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="px-2 py-0.5 rounded bg-accent text-[9px] font-black text-black">NOTICE</span>
                <p className="text-xs text-gray-400 font-medium">2026년도 국가기술자격 시험 일정 공고 안내</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="px-2 py-0.5 rounded bg-primary/20 text-[9px] font-black text-primary">UPDATE</span>
                <p className="text-xs text-gray-400 font-medium">전자기기기능사 실기 신규 위탁 종목 추가</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Persistence Dock (Mobile) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4">
        <div className="bg-[#0f0f13]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="aspect-square w-12 rounded-[24px] bg-primary/20 flex items-center justify-center text-primary border border-primary/10">
            <BookOpen size={20} />
          </div>
          <div className="flex-1 px-4">
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic leading-none mb-1">Night Mission</div>
            <div className="text-[11px] font-bold truncate tracking-tight">지능형 엠파이어 구축 중... 🌙</div>
          </div>
          <Link href="/study?id=electronic-craftsman" className="bg-primary text-white p-3.5 rounded-[24px] shadow-lg active:scale-90 transition-all">
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
  );
}
