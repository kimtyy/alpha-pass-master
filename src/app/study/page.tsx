"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Brain, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Share2, MoreVertical } from 'lucide-react';
import Link from 'next/link';

const MOCK_QUESTION = {
  id: "q_copyright_001",
  subject: "전자기기기능사 | 전자회로",
  question: "반도체 소자 중 '전류의 흐름을 한 방향으로만 흐르게 하는 성질'을 이용한 소자는 무엇입니까?",
  options: [
    "트랜지스터 (Transistor)",
    "다이오드 (Diode)",
    "콘덴서 (Capacitor)",
    "저항기 (Resistor)"
  ],
  answer: 1, 
  explanation: "다이오드는 P형 반도체와 N형 반도체를 접합하여 만든 소자로, 순방향 전압에서만 전류가 흐르는 정류 작용을 합니다.",
  diagnostic: {
    correct: "정답입니다! 다이오드의 '정류 작용' 핵심 원리를 정확히 이해하고 계시네요. 기초 소자 파트에서 아주 탄탄한 점수가 예상됩니다. ✨",
    incorrect: "AI 진단: 오답입니다. 선택하신 소자는 다른 기능을 수행합니다. 다이오드는 오직 '한 방향(정류)'만 기억하세요! 전자기기기능사 필기에서 매년 출제되는 빈출 개념입니다. ⚠️"
  }
};

export default function StudyPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
  };

  const isCorrect = selected === MOCK_QUESTION.answer;

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center pb-12 overflow-x-hidden">
      {/* Top Navigation */}
      <header className="w-full max-w-2xl px-6 py-8 flex justify-between items-center bg-transparent z-50">
        <Link href="/dashboard" className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-1">Session Active</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h2 className="text-sm font-bold truncate max-w-[150px]">{MOCK_QUESTION.subject.split('|')[1]}</h2>
          </div>
        </div>
        <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Progress Indicator */}
      <div className="w-full max-w-sm px-6 mb-12">
        <div className="flex justify-between text-[10px] font-black text-gray-600 uppercase mb-2">
          <span>Target Score: 80%</span>
          <span>Question 1 / 10</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '10%' }}
            className="h-full bg-primary"
          />
        </div>
      </div>

      {/* Main Focus Card */}
      <main className="w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl shadow-2xl overflow-hidden"
        >
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -z-10" />

          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
              <Brain size={20} />
            </span>
            <span className="text-xs font-bold text-gray-400">AI 역공학 핵심 기출</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-12">
            {MOCK_QUESTION.question}
          </h1>

          <div className="space-y-4">
            {MOCK_QUESTION.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-6 rounded-3xl border-2 transition-all duration-300 relative group overflow-hidden ${
                  selected === idx 
                    ? 'bg-primary/20 border-primary shadow-[0_0_30px_rgba(139,92,246,0.3)]' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                } ${showResult && idx === MOCK_QUESTION.answer ? 'border-accent/50 bg-accent/10' : ''} 
                  ${showResult && selected === idx && idx !== MOCK_QUESTION.answer ? 'border-red-500/50 bg-red-500/10' : ''}`}
              >
                <div className="flex items-center gap-5 relative z-10">
                  <span className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black border-2 transition-colors ${
                    selected === idx ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-gray-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`text-lg transition-colors font-medium ${selected === idx ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {option}
                  </span>
                </div>
                {selected === idx && !showResult && (
                  <motion.div 
                    layoutId="active-bg"
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent -z-10" 
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Result Area */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="mt-12 p-8 rounded-[32px] bg-white/5 border border-white/10 relative overflow-hidden"
              >
                <div className={`flex items-center gap-3 mb-4 ${isCorrect ? 'text-accent' : 'text-red-400'}`}>
                  {isCorrect ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                  <span className="text-xl font-black uppercase italic tracking-tighter">
                    {isCorrect ? 'Perfect Point!' : 'Diagnostic Alert'}
                  </span>
                </div>
                
                <p className="text-gray-300 leading-relaxed font-medium">
                  {isCorrect ? MOCK_QUESTION.diagnostic.correct : MOCK_QUESTION.diagnostic.incorrect}
                </p>

                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-6">
                  <div>
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Master Insight</div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-400 leading-relaxed">
                      {MOCK_QUESTION.explanation}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 rounded-full glass text-[10px] font-bold text-primary border-primary/30">#반도체_기초</span>
                    <span className="px-4 py-2 rounded-full glass text-[10px] font-bold text-primary border-primary/30">#PN접합</span>
                    <span className="px-4 py-2 rounded-full glass text-[10px] font-bold text-primary border-primary/30">#정류원리</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          {!showResult ? (
            <button
              onClick={() => setShowResult(true)}
              disabled={selected === null}
              className={`mt-12 w-full py-6 rounded-[32px] font-black text-lg transition-all flex items-center justify-center gap-3 ${
                selected !== null 
                  ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-[0_20px_40px_rgba(139,92,246,0.4)] active:scale-95' 
                  : 'bg-white/5 text-gray-600 cursor-not-allowed grayscale'
              }`}
            >
              <Sparkles size={20} />
              정답 확인 및 AI 진단
            </button>
          ) : (
            <button
              onClick={() => {
                setShowResult(false);
                setSelected(null);
              }}
              className="mt-12 w-full py-6 rounded-[32px] bg-white text-black font-black text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              다음 문제로 도전
              <ArrowRight size={20} />
            </button>
          )}
        </motion.div>
      </main>

      {/* Footer Meta */}
      <footer className="mt-16 flex flex-col items-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex gap-10">
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Share2 size={14} />
            Share Progress
          </button>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Brain size={14} />
            Root Cause Analysis
          </button>
        </div>
        <div className="text-[10px] font-medium text-gray-500">
          ALPHA PASS ENGINE v1.0.4 | SECURED BY AI AGENTS
        </div>
      </footer>
    </div>
  );
}
