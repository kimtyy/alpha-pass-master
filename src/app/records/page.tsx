'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import { History, Lock, Zap, BookOpen, Star, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function RecordsPage() {
  const { isPremium, isLoaded } = useUser();

  const mockRecords = [
    { title: '전자기기기능사', date: '2026.04.16', score: 85, status: 'PASS' },
    { title: '정보처리기사', date: '2026.04.15', score: 45, status: 'FAIL' },
    { title: '전기기능사', date: '2026.04.14', score: 70, status: 'PASS' },
  ];

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center px-6 pt-24 pb-40 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <header className="w-full max-w-2xl mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">My Pass</h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Continuous Mastery Records</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
          <History size={24} />
        </div>
      </header>

      <main className="w-full max-w-2xl relative">
        {!isPremium ? (
          /* PREMIUM GATE */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0d0d12]/80 border border-white/10 rounded-[48px] p-12 backdrop-blur-3xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 text-gray-600">
              <Lock size={40} />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">지속적 합격 관리는<br/>프리미엄 전용 기능입니다</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-[280px] mx-auto">
              합격 확률 분석, 오답 데이터 영구 저장 및 무제한 AI 진단을 통해 가장 확실한 합격의 길을 걸으세요.
            </p>

            <Link 
              href="/account"
              className="w-full py-5 rounded-[28px] bg-accent text-black font-black flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-2xl"
            >
              <Zap size={18} className="fill-current" />
              프리미엄 멤버십 시작하기
            </Link>
          </motion.div>
        ) : (
          /* PREMIUM CONTENT (HISTORY) */
          <div className="space-y-8">
            <section className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-[32px] p-6">
                <div className="text-[9px] font-black text-gray-500 uppercase mb-2">Average Score</div>
                <div className="text-3xl font-black text-accent">67%</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-[32px] p-6">
                <div className="text-[9px] font-black text-gray-500 uppercase mb-2">Best Mission</div>
                <div className="text-3xl font-black text-primary">85%</div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recent Performance</h3>
                <TrendingUp size={14} className="text-accent" />
              </div>
              
              {mockRecords.map((record, i) => (
                <div 
                  key={i}
                  className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6 flex items-center justify-between group hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${
                      record.status === 'PASS' ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {record.score}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{record.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={10} className="text-gray-600" />
                        <span className="text-[10px] text-gray-600 font-medium">{record.date}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 rounded-xl bg-white/5 text-gray-600 group-hover:text-white transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
