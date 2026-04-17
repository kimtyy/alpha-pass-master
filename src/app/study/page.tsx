"use client";

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, Brain, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Share2, Bookmark, BarChart3, Info, LayoutGrid, Trophy, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { EXAM_DATA } from '@/data/exams';
import { useUser } from '@/hooks/useUser';

function StudyContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('id') || 'electronic-craftsman';
  const subject = EXAM_DATA[subjectId] || EXAM_DATA['electronic-craftsman'];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<{idx: number, selected: number, isCorrect: boolean}[]>([]);

  const currentQuestion = subject.questions[currentIdx];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
  };

  const handleVerify = () => {
    const isCorrect = selected === currentQuestion.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setHistory(prev => [...prev, { idx: currentIdx, selected: selected!, isCorrect }]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIdx < subject.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setIsFinished(false);
    setHistory([]);
  };

  const isCorrect = selected === currentQuestion.answer;
  const progressPercent = ((currentIdx + (showResult ? 1 : 0)) / subject.questions.length) * 100;
  const passScore = Math.round((score / subject.questions.length) * 100);
  const isPass = passScore >= 60;

  const { status, isGuest, login } = useUser();
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [activeReviewIdx, setActiveReviewIdx] = useState<number | null>(null);

  const filteredHistory = history.filter(h => {
    if (filter === 'all') return true;
    if (filter === 'correct') return h.isCorrect;
    if (filter === 'incorrect') return !h.isCorrect;
    return true;
  });

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center pb-20 relative overflow-x-hidden">
        {/* Decorative Background */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] opacity-20 blur-[120px] rounded-full ${isPass ? 'bg-accent' : 'bg-red-500'}`} />
        </div>

        {/* Verdict Banner */}
        <header className="w-full pt-16 pb-10 px-6 text-center shrink-0">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-28 h-28 rounded-[40px] flex items-center justify-center mx-auto mb-6 shadow-2xl relative ${isPass ? 'bg-accent text-white' : 'bg-red-500 text-white'}`}
          >
            {isPass ? <Trophy size={56} /> : <AlertCircle size={56} />}
            <div className={`absolute inset-0 blur-3xl rounded-full opacity-40 animate-pulse ${isPass ? 'bg-accent' : 'bg-red-500'}`} />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-black tracking-tighter mb-2"
          >
            {isPass ? 'MISSION PASS' : 'TRY AGAIN'}
          </motion.h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            AlphaPass Diagnostic Result
          </p>

          <div className="flex justify-center gap-6 max-w-sm mx-auto">
            <div className="text-center">
              <div className="text-[9px] font-black text-gray-600 uppercase mb-1">Pass Score</div>
              <div className={`text-2xl font-black ${isPass ? 'text-accent' : 'text-red-400'}`}>{passScore}%</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-[9px] font-black text-gray-600 uppercase mb-1">Target</div>
              <div className="text-2xl font-black text-gray-400">60%</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-[9px] font-black text-gray-600 uppercase mb-1">Items</div>
              <div className="text-2xl font-black text-white">{score} <span className="text-xs text-gray-600">/ {subject.questions.length}</span></div>
            </div>
          </div>
        </header>

        {/* Selective Review Hub */}
        <main className="w-full max-w-2xl px-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selective Review Hub</h3>
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
              {(['all', 'correct', 'incorrect'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setFilter(t);
                    setActiveReviewIdx(null);
                  }}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                    filter === t ? 'bg-white text-black' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredHistory.map((h, i) => {
              const q = subject.questions[h.idx];
              const isActive = activeReviewIdx === h.idx;
              
              return (
                <div key={h.idx} className="group">
                  <button
                    onClick={() => setActiveReviewIdx(isActive ? null : h.idx)}
                    className={`w-full text-left p-6 rounded-[32px] border transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 border-white/20' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-[10px] font-black border ${
                        h.isCorrect ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-red-500/10 border-red-500/20 text-red-500'
                      }`}>
                        {h.idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`text-[13px] font-bold leading-snug tracking-tight mb-1 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {q.question.length > 60 && !isActive ? q.question.substring(0, 60) + '...' : q.question}
                        </p>
                      </div>
                      <div className={`transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`}>
                        <ArrowRight size={16} className="text-gray-600" />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
                            <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                              <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-2">Your Answer</span>
                              <p className={`text-xs font-bold ${h.isCorrect ? 'text-accent' : 'text-red-400'}`}>{q.options[h.selected]}</p>
                            </div>
                            
                            {!h.isCorrect && (
                              <div className="bg-accent/5 rounded-2xl p-4 border border-accent/10">
                                <span className="text-[8px] font-black text-accent uppercase tracking-widest block mb-2">Alpha Solution</span>
                                <p className="text-xs font-bold text-white">{q.options[q.answer]}</p>
                              </div>
                            )}

                            {/* THE GATE */}
                            <div className="relative pt-2">
                              {isGuest ? (
                                <div className="space-y-3">
                                  <div className="blur-sm opacity-30 select-none pointer-events-none">
                                    <div className="text-[10px] font-black text-primary uppercase mb-2">AI Master Insight</div>
                                    <p className="text-xs leading-relaxed text-gray-400">
                                      {q.explanation}
                                    </p>
                                  </div>
                                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 text-center">
                                    <p className="text-[11px] font-black text-white mb-3 tracking-tight">상세 오답 해설은 회원에게만 제공됩니다.</p>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        login();
                                      }}
                                      className="px-6 py-2 bg-primary text-white text-[10px] font-black rounded-xl hover:scale-105 transition-transform"
                                    >
                                      1초 회원가입 후 해설 보기
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-[10px] font-black text-primary uppercase mb-2">AI Master Insight</div>
                                    <p className="text-xs leading-relaxed text-gray-400 font-medium">
                                      {q.explanation}
                                    </p>
                                  </div>
                                  <div className="p-4 rounded-2xl bg-[#12121a] border border-accent/10">
                                    <div className="text-[10px] font-black text-accent uppercase mb-2 flex items-center gap-1.5">
                                      <Sparkles size={10} />
                                      Diagnostic Detail
                                    </div>
                                    <p className="text-xs leading-relaxed text-gray-300 font-medium italic">
                                      {h.isCorrect ? q.diagnostic.correct : q.diagnostic.incorrect}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 space-y-4">
            <button 
              onClick={handleReset}
              className="w-full py-5 rounded-[28px] bg-white text-black font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
            >
              <RotateCcw size={18} />
              새로운 모의고사 도전하기
            </button>
            <Link 
              href="/dashboard"
              className="w-full py-5 rounded-[28px] bg-white/5 border border-white/10 text-white font-black flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Home size={18} />
              메인 화면으로 복귀
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-[#060608] text-white flex flex-col items-center overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Navigation */}
      <header className="w-full max-w-2xl px-5 py-2.5 flex justify-between items-center bg-transparent z-50 shrink-0">
        <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="flex flex-col items-center text-center px-4">
          <span className="text-[8px] text-primary font-black uppercase tracking-[0.2em] mb-0.5 opacity-70 italic">Alpha Focus Protocol</span>
          <div className="flex items-center gap-1.5 justify-center">
            <h2 className="text-[11px] font-bold truncate max-w-[150px] tracking-tight">{subject.title}</h2>
          </div>
        </div>
        <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
          <Share2 size={16} className="text-gray-600" />
        </button>
      </header>

      {/* Progress Indicator */}
      <div className="w-full max-w-sm px-6 mb-4 shrink-0">
        <div className="flex justify-between text-[9px] font-black text-gray-600 uppercase mb-2 px-1 tracking-widest">
          <span>Accuracy: {score > 0 ? Math.round((score / (currentIdx + (showResult ? 1 : 0))) * 100) : 0}%</span>
          <span>Item {currentIdx + 1} / {subject.questions.length}</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden flex gap-1">
          {subject.questions.map((_, i) => (
            <div 
              key={i}
              className={`flex-1 h-full rounded-full transition-all duration-500 ${
                i < currentIdx ? 'bg-accent shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 
                i === currentIdx ? 'bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'bg-white/5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Focus Area */}
      <main className="flex-1 w-full max-w-2xl px-4 pb-4 flex flex-col overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col relative bg-[#09090d]/80 border border-white/5 rounded-[32px] p-4 md:p-8 backdrop-blur-3xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] -z-10" />
            
            <div className="shrink-0 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-md">
                  <Brain size={14} />
                </span>
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic leading-none">AI Core</span>
              </div>
              <h1 className="text-lg md:text-xl font-bold leading-tight tracking-tight">
                {currentQuestion.question}
              </h1>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-3.5 md:p-4 rounded-2xl border-2 transition-all duration-300 relative group overflow-hidden ${
                    selected === idx 
                      ? 'bg-primary/20 border-primary shadow-lg shadow-primary/5' 
                      : 'bg-white/5 border-white/5'
                  } ${showResult && idx === currentQuestion.answer ? 'border-accent/30 bg-accent/5' : ''} 
                    ${showResult && selected === idx && idx !== currentQuestion.answer ? 'border-red-500/30 bg-red-500/5' : ''}`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all ${
                      selected === idx ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-gray-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`text-[14px] leading-tight transition-colors ${selected === idx ? 'text-white' : 'text-gray-400'}`}>
                      {option}
                    </span>
                  </div>
                </motion.button>
              ))}

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 rounded-[32px] bg-white/5 border border-white/10 shadow-inner relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Sparkles size={40} />
                    </div>
                    <div className={`flex items-center gap-2 mb-3 ${isCorrect ? 'text-accent' : 'text-red-400'}`}>
                      {isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-black/40 border border-white/10 uppercase tracking-tighter">
                        {isCorrect ? 'Perfect' : 'Need Review'}
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-300 leading-relaxed font-medium mb-5">
                      {isCorrect ? currentQuestion.diagnostic.correct : currentQuestion.diagnostic.incorrect}
                    </p>
                    <div className="pt-5 border-t border-white/10 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Info size={14} className="text-primary" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Master Insights</span>
                      </div>
                      <div className="text-[12px] text-gray-400 leading-relaxed font-medium p-4 rounded-2xl bg-black/20 italic">
                        {currentQuestion.explanation}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 shrink-0 flex gap-3">
              {!showResult ? (
                <button
                  onClick={handleVerify}
                  disabled={selected === null}
                  className={`flex-1 py-5 rounded-[28px] font-black text-base transition-all flex items-center justify-center gap-2.5 relative overflow-hidden group ${
                    selected !== null 
                      ? 'text-white active:scale-95' 
                      : 'bg-white/5 text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 transition-opacity duration-500 ${selected !== null ? 'opacity-100' : 'opacity-0'}`} />
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles size={18} className="fill-current" />
                    정답 확인 및 AI 진단
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 py-5 rounded-[28px] bg-white text-black font-black text-base hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {currentIdx < subject.questions.length - 1 ? '다음 문제 도전' : '학습 세션 완료'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="w-full max-w-sm px-4 pt-2 pb-6 shrink-0">
        <div className="bg-[#1a1a20]/90 border border-white/10 rounded-[32px] p-2 flex justify-between items-center shadow-2xl backdrop-blur-2xl">
          <button className="flex-1 flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 transition-colors text-gray-500">
            <Bookmark size={18} />
            <span className="text-[8px] font-bold uppercase mt-1">Save</span>
          </button>
          <div className="w-[1px] h-6 bg-white/5 mx-1" />
          <button className="flex-1 flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 transition-colors text-gray-500">
            <BarChart3 size={18} />
            <span className="text-[8px] font-bold uppercase mt-1">Stats</span>
          </button>
          <div className="w-[1px] h-6 bg-white/5 mx-1" />
          <button className="flex-1 flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 transition-colors text-gray-500">
            <Brain size={18} />
            <span className="text-[8px] font-bold uppercase mt-1">Hint</span>
          </button>
          <div className="w-[1px] h-6 bg-white/5 mx-1" />
          <Link href="/dashboard" className="flex-1 flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 transition-colors text-gray-500">
            <LayoutGrid size={18} />
            <span className="text-[8px] font-bold uppercase mt-1">Home</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense fallback={
      <div className="h-[100dvh] bg-[#060608] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <StudyContent />
    </Suspense>
  );
}
