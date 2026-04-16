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
    <div className="h-[100dvh] bg-[#060608] text-white flex flex-col items-center overflow-hidden">
      {/* Top Navigation - Slightly more compact */}
      <header className="w-full max-w-2xl px-6 py-4 flex justify-between items-center bg-transparent z-50 shrink-0">
        <Link href="/dashboard" className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-primary font-black uppercase tracking-[0.2em] mb-0.5 opacity-70">Focus Mode</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <h2 className="text-xs font-bold truncate max-w-[120px]">{MOCK_QUESTION.subject.split('|')[1]}</h2>
          </div>
        </div>
        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all opacity-50">
          <MoreVertical size={18} />
        </button>
      </header>

      {/* Progress Indicator - Compact */}
      <div className="w-full max-w-sm px-6 mb-4 shrink-0">
        <div className="flex justify-between text-[9px] font-black text-gray-600 uppercase mb-1.5 px-1">
          <span>Target Score: 80%</span>
          <span>Question 1 / 10</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '10%' }}
            className="h-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]"
          />
        </div>
      </div>

      {/* Main Focus Area - Flexible height */}
      <main className="flex-1 w-full max-w-2xl px-4 pb-6 flex flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col relative bg-white/5 border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-10 backdrop-blur-3xl shadow-2xl overflow-hidden"
        >
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 blur-[80px] -z-10" />

          {/* Question Section - Scrollable if text is huge, but usually fits */}
          <div className="mb-6 shrink-0">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                <Brain size={16} />
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">AI 역공학 핵심 기출</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight line-clamp-4">
              {MOCK_QUESTION.question}
            </h1>
          </div>

          {/* Options Section - Scrollable within card */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            {MOCK_QUESTION.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 relative group overflow-hidden ${
                  selected === idx 
                    ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(139,92,246,0.2)]' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                } ${showResult && idx === MOCK_QUESTION.answer ? 'border-accent/50 bg-accent/10' : ''} 
                  ${showResult && selected === idx && idx !== MOCK_QUESTION.answer ? 'border-red-500/50 bg-red-500/10' : ''}`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <span className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-xs font-black border-2 transition-colors ${
                    selected === idx ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-gray-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`text-base transition-colors font-medium leading-tight ${selected === idx ? 'text-white' : 'text-gray-400'}`}>
                    {option}
                  </span>
                </div>
              </motion.button>
            ))}

            {/* AI Result Area - Revealed inside scrollable area */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-3xl bg-white/5 border border-white/10"
                >
                  <div className={`flex items-center gap-2 mb-3 ${isCorrect ? 'text-accent' : 'text-red-400'}`}>
                    {isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span className="text-sm font-black uppercase italic tracking-tighter">
                      {isCorrect ? 'Perfect!' : 'AI Diagnosis'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium mb-4">
                    {isCorrect ? MOCK_QUESTION.diagnostic.correct : MOCK_QUESTION.diagnostic.incorrect}
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Concept Insights</div>
                    <div className="text-[11px] text-gray-400 leading-relaxed italic">
                      {MOCK_QUESTION.explanation}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Button - Sticky at bottom of card */}
          <div className="mt-6 shrink-0">
            {!showResult ? (
              <button
                onClick={() => setShowResult(true)}
                disabled={selected === null}
                className={`w-full py-5 rounded-[24px] font-black text-base transition-all flex items-center justify-center gap-2.5 ${
                  selected !== null 
                    ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-xl active:scale-95' 
                    : 'bg-white/5 text-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                <Sparkles size={18} />
                정답 확인 및 AI 진단
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowResult(false);
                  setSelected(null);
                }}
                className="w-full py-5 rounded-[24px] bg-white text-black font-black text-base hover:bg-gray-200 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl"
              >
                다음 문제로 도전
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </motion.div>
      </main>

      {/* Navigation Dock (Optional) */}
      <footer className="w-full max-w-2xl px-6 py-4 flex justify-center items-center opacity-30 shrink-0">
        <div className="text-[9px] font-medium text-gray-500 uppercase tracking-tighter">
          ALPHA PASS ENGINE v1.0.4 | SECURED
        </div>
      </footer>
    </div>
  );
}
