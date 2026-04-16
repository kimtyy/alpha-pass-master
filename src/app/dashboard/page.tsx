"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, BookOpen, GraduationCap, ChevronRight, Plus, Star } from 'lucide-react';

const POPULAR_EXAMS = [
  { id: '1', title: '정보처리기사 필기', category: 'IT/정보통신', progress: 0, saved: false },
  { id: '2', title: '전자기기기능사', category: '전자/전기', progress: 78, saved: true },
  { id: '3', title: '공인중개사 1차', category: '부동산', progress: 0, saved: false },
  { id: '4', title: '운전면허 필기', category: '기타', progress: 0, saved: false },
];

export default function CertificationHub() {
  const [search, setSearch] = useState('');
  const savedExams = POPULAR_EXAMS.filter(e => e.saved);

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-primary/30 pb-20 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Hero / Search Section */}
      <section className="pt-20 pb-16 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Star size={12} className="fill-current" />
            Alpha Family EdTech Platform
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight"
          >
            합격을 위한 <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">가장 짧은 길</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto group mt-12"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="준비하시는 자격증을 검색하세요..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-16 text-xl focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-xl transition-all placeholder:text-gray-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="absolute right-4 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
                검색
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 mt-16">
        {/* My Study Room */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                <BookOpen className="text-primary" size={24} />
                나의 공부방
              </h2>
              <p className="text-sm text-gray-500">최근에 학습하던 시험들입니다.</p>
            </div>
            <button className="text-xs font-bold text-gray-500 hover:text-primary transition underline underline-offset-4">
              기록 관리
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {savedExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-primary/50 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full group-hover:bg-primary/20 transition-all" />
                  
                  <div className="flex justify-between items-start relative z-10 mb-6">
                    <div>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{exam.category}</span>
                      <h3 className="text-xl font-bold mt-1 group-hover:text-primary transition leading-tight">{exam.title}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 font-black">
                      {exam.progress}%
                    </div>
                  </div>
                  
                  <div className="w-full bg-white/5 h-1.5 rounded-full mb-8 relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${exam.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-indigo-400 rounded-full"
                    />
                  </div>
                  
                  <Link 
                    href="/study" 
                    className="flex items-center justify-between w-full py-4 px-6 rounded-2xl bg-white/5 group-hover:bg-primary text-white border border-white/10 group-hover:border-primary transition-all duration-300 shadow-xl"
                  >
                    <span className="font-bold flex items-center gap-2">
                      <GraduationCap size={18} />
                      학습 이어서 하기
                    </span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Add New Exam Button */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl p-8 min-h-[220px] text-gray-600 hover:border-primary/30 hover:text-gray-400 hover:bg-primary/5 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                <Plus size={24} />
              </div>
              <span className="font-bold text-sm tracking-tight text-center">새로운 자격증 <br/>목록에서 찾기</span>
            </motion.div>
          </div>
        </div>

        {/* Hot Topics */}
        <div>
          <h2 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-6">Trending Exams</h2>
          <div className="flex flex-wrap gap-3">
            {POPULAR_EXAMS.map(exam => (
              <button key={exam.id} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 hover:border-primary/50 transition-all flex items-center gap-2">
                #{exam.title}
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Quick Action Dock (Mobile Style) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs px-4">
        <div className="glass rounded-[32px] p-2 flex justify-between items-center shadow-2xl">
          <div className="aspect-square w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <BookOpen size={20} />
          </div>
          <div className="flex-1 px-4">
            <div className="text-[10px] text-gray-500 font-bold uppercase">Active Session</div>
            <div className="text-[11px] font-bold line-clamp-1 truncate">전자기기기능사 학습 중</div>
          </div>
          <Link href="/study" className="bg-primary text-white p-3 rounded-full shadow-lg active:scale-90 transition-all">
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
