"use client";

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, Brain, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Share2, Bookmark, BarChart3, Info, LayoutGrid, Trophy, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { EXAM_DATA } from '@/data/exams';

function StudyContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('id') || 'electronic-craftsman';
  const subject = EXAM_DATA[subjectId] || EXAM_DATA['electronic-craftsman'];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = subject.questions[currentIdx];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
  };

  const handleVerify = () => {
    if (selected === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
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
  };

  const isCorrect = selected === currentQuestion.answer;
  const progressPercent = ((currentIdx + (showResult ? 1 : 0)) / subject.questions.length) * 100;

  if (isFinished) {
    return (
      <div className="h-[100dvh] bg-[#060608] text-white flex flex-col items-center justify-center px-6 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 blur-[100px] rounded-full animate-pulse" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-sm bg-[#0d0d12]/80 border border-white/10 rounded-[40px] p-10 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          
          <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mx-auto mb-8 shadow-2xl relative">
            <Trophy size={48} className="text-white relative z-10" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-primary blur-2xl rounded-full"
            />
          </div>

          <h1 className="text-3xl font-black mb-2 tracking-tight">Mission<br/>Accomplished</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-8">Alpha Pass Protocol Complete</p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
              <div className="text-[10px] font-black text-gray-500 uppercase mb-1">Score</div>
              <div className="text-2xl font-black text-primary">{Math.round((score / subject.questions.length) * 100)}%</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
              <div className="text-[10px] font-black text-gray-500 uppercase mb-1">Correct</div>
              <div className="text-2xl font-black text-accent">{score} / {subject.questions.length}</div>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleReset}
              className="w-full py-5 rounded-[24px] bg-white text-black font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
            >
              <RotateCcw size={18} />
              다시 도전하기
            </button>
            <Link 
              href="/dashboard"
              className="w-full py-5 rounded-[24px] bg-white/5 border border-white/10 text-white font-black flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Home size={18} />
              공부방으로 복귀
            </Link>
          </div>
        </motion.div>
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
      <header className="w-full max-w-2xl px-6 py-4 flex justify-between items-center bg-transparent z-50 shrink-0">
        <Link href="/dashboard" className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="flex flex-col items-center text-center px-4">
          <span className="text-[9px] text-primary font-black uppercase tracking-[0.2em] mb-0.5 opacity-70">Focus Mode Active</span>
          <div className="flex items-center gap-1.5 justify-center">
            <h2 className="text-xs font-bold truncate max-w-[150px] tracking-tight">{subject.title}</h2>
          </div>
        </div>
        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
          <Share2 size={18} className="text-gray-500" />
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
            className="flex-1 flex flex-col relative bg-[#0d0d12]/60 border border-white/10 rounded-[40px] p-6 md:p-10 backdrop-blur-3xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] -z-10" />
            
            <div className="shrink-0 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-lg">
                  <Brain size={16} />
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">AI Core Intelligence</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold leading-[1.4] tracking-tight">
                {currentQuestion.question}
              </h1>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 md:p-5 rounded-3xl border-2 transition-all duration-300 relative group overflow-hidden ${
                    selected === idx 
                      ? 'bg-primary/20 border-primary shadow-[0_0_25px_rgba(139,92,246,0.15)]' 
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  } ${showResult && idx === currentQuestion.answer ? 'border-accent/40 bg-accent/10' : ''} 
                    ${showResult && selected === idx && idx !== currentQuestion.answer ? 'border-red-500/40 bg-red-500/10' : ''}`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <span className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-[11px] font-black border-2 transition-all ${
                      selected === idx ? 'bg-primary border-primary text-white shadow-lg scale-110' : 'bg-white/5 border-white/10 text-gray-500'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`text-[15px] md:text-base transition-colors font-medium leading-tight ${selected === idx ? 'text-white' : 'text-gray-400'}`}>
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
