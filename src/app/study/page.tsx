"use client";

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, Brain, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Share2, Bookmark, BarChart3, Info, LayoutGrid, Trophy, RotateCcw, Home, History as HistoryIcon } from 'lucide-react';
import Link from 'next/link';
import { EXAM_DATA } from '@/data/exams';
import { useUser } from '@/hooks/useUser';

function StudyContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('id') || 'electronic-craftsman';
  const subject = EXAM_DATA[subjectId] || EXAM_DATA['electronic-craftsman'];

  const [mode, setMode] = useState<'training' | 'exam' | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // CBT Exclusive State
  const [examAnswers, setExamAnswers] = useState<Record<number, number | null>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes default
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [history, setHistory] = useState<{idx: number, selected: number, isCorrect: boolean, timeTaken?: number}[]>([]);

  const { status, isGuest, login } = useUser();
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [activeReviewIdx, setActiveReviewIdx] = useState<number | null>(null);

  // Timer Logic
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleFinalSubmit();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const currentQuestion = subject.questions[currentIdx];

  const handleStartExam = (m: 'training' | 'exam') => {
    setMode(m);
    if (m === 'exam') {
      setIsTimerActive(true);
      // Initialize empty answers
      const initial: Record<number, number | null> = {};
      subject.questions.forEach((_, i) => initial[i] = null);
      setExamAnswers(initial);
    }
  };

  const handleSelect = (index: number) => {
    if (showResult && mode === 'training') return;
    setSelected(index);
    if (mode === 'exam') {
      setExamAnswers(prev => ({ ...prev, [currentIdx]: index }));
    }
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
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setSelected(mode === 'exam' ? examAnswers[nextIdx] : null);
      setShowResult(false);
    } else if (mode === 'training') {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      const prevIdx = currentIdx - 1;
      setCurrentIdx(prevIdx);
      setSelected(mode === 'exam' ? examAnswers[prevIdx] : null);
      setShowResult(false);
    }
  };

  const handleFinalSubmit = () => {
    let totalScore = 0;
    const finalHistory: any[] = [];
    
    subject.questions.forEach((q, i) => {
      const userAnswer = examAnswers[i];
      const isCorrect = userAnswer === q.answer;
      if (isCorrect) totalScore++;
      finalHistory.push({
        idx: i,
        selected: userAnswer,
        isCorrect
      });
    });

    setScore(totalScore);
    setHistory(finalHistory);
    setIsTimerActive(false);
    setIsFinished(true);
  };

  const handleReset = () => {
    setMode(null);
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setIsFinished(false);
    setHistory([]);
    setExamAnswers({});
    setTimeLeft(60 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const passScore = Math.round((score / subject.questions.length) * 100);
  const isPass = passScore >= 60;
  const isCorrect = selected === currentQuestion.answer;

  const filteredHistory = history.filter(h => {
    if (filter === 'all') return true;
    if (filter === 'correct') return h.isCorrect;
    if (filter === 'incorrect') return !h.isCorrect;
    return true;
  });

  // 0. MODE SELECTION SCREEN
  if (!mode && !isFinished) {
    return (
      <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[60vh] bg-primary/10 blur-[120px] rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm text-center"
        >
          <div className="w-20 h-20 rounded-[32px] bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Brain size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tighter">Mission Protocol</h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12">Select Your Study Mode</p>

          <div className="space-y-4">
            <button 
              onClick={() => handleStartExam('training')}
              className="w-full p-6 rounded-[32px] bg-[#12121a] border border-white/5 hover:border-primary/40 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm text-gray-200">훈련 모드</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5 text-balance">풀 즉시 해설 확인 가능</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => handleStartExam('exam')}
              className="w-full p-6 rounded-[32px] bg-[#12121a] border border-white/5 hover:border-accent/40 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <LayoutGrid size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm text-gray-200">실전 CBT 모드</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5 text-balance">타이머 가동, 종료 후 결과 확인</p>
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 1. RESULT SCREEN
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
            className="text-5xl font-black tracking-tighter mb-2 uppercase"
          >
            {isPass ? 'Mission Pass' : 'Try Again'}
          </motion.h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            AlphaPass Diagnostic Result
          </p>

          <div className="flex justify-center gap-6 max-w-sm mx-auto mb-10">
            <div className="text-center">
              <div className="text-[9px] font-black text-gray-600 uppercase mb-1 tracking-widest">Score</div>
              <div className={`text-2xl font-black ${isPass ? 'text-accent' : 'text-red-400'}`}>{passScore}%</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-[9px] font-black text-gray-600 uppercase mb-1 tracking-widest">Pass Line</div>
              <div className="text-2xl font-black text-gray-400">60%</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-[9px] font-black text-gray-600 uppercase mb-1 tracking-widest">Correct</div>
              <div className="text-2xl font-black text-white">{score} <span className="text-[10px] text-gray-700">/ {subject.questions.length}</span></div>
            </div>
          </div>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 w-fit mx-auto mb-12">
            {(['all', 'correct', 'incorrect'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setFilter(t);
                  setActiveReviewIdx(null);
                }}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                  filter === t ? 'bg-white text-black' : 'text-gray-500 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </header>

        {/* Selective Review Hub */}
        <main className="w-full max-w-2xl px-6">
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
                              <p className={`text-xs font-bold ${h.isCorrect ? 'text-accent' : 'text-red-400'}`}>
                                {h.selected !== null ? q.options[h.selected] : '(미응답)'}
                              </p>
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

  // 2. EXAM AREA
  return (
    <div className="h-[100dvh] bg-[#060608] text-white flex flex-col items-center overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* CBT Header */}
      <header className="w-full max-w-2xl px-5 py-4 flex justify-between items-center bg-[#09090d]/80 backdrop-blur-xl border-b border-white/5 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <ChevronLeft size={16} />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-[12px] font-black truncate max-w-[140px] tracking-tight leading-none mb-1">{subject.title}</h2>
            <div className="flex items-center gap-2">
              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${mode === 'exam' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                {mode === 'exam' ? 'Exam Protocol' : 'Training Protocol'}
              </span>
            </div>
          </div>
        </div>

        {mode === 'exam' && (
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-red-400">
              <BarChart3 size={14} />
              <span className="text-base font-black tracking-widest tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>
        )}
      </header>

      <div className="flex-1 w-full max-w-6xl flex overflow-hidden">
        {/* Main Focus Area */}
        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col relative bg-[#12121a]/60 border border-white/5 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl shadow-2xl overflow-hidden"
            >
              <div className="shrink-0 mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                    <Brain size={16} />
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Item {currentIdx + 1} / {subject.questions.length}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-gray-100 italic">
                  "{currentQuestion.question}"
                </h1>
              </div>

              <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                {currentQuestion.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-6 rounded-[28px] border-2 transition-all duration-300 relative group ${
                      selected === idx 
                        ? 'bg-primary/20 border-primary shadow-lg shadow-primary/10' 
                        : 'bg-white/5 border-white/5 hover:border-white/10'
                    } ${showResult && mode === 'training' && idx === currentQuestion.answer ? 'border-accent/40 bg-accent/5' : ''} 
                      ${showResult && mode === 'training' && selected === idx && idx !== currentQuestion.answer ? 'border-red-500/40 bg-red-500/5' : ''}`}
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <span className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-xs font-black border transition-all ${
                        selected === idx ? 'bg-primary border-primary text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-[15px] font-medium leading-snug ${selected === idx ? 'text-white' : 'text-gray-400'}`}>
                        {option}
                      </span>
                    </div>
                  </motion.button>
                ))}

                <AnimatePresence>
                  {showResult && mode === 'training' && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 shadow-2xl"
                    >
                      <div className={`flex items-center gap-2 mb-4 ${isCorrect ? 'text-accent' : 'text-red-400'}`}>
                        {isCorrect ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        <span className="text-xs font-black px-3 py-1 rounded-full bg-black/40 border border-white/10 tracking-widest uppercase">
                          {isCorrect ? 'Elite Accurate' : 'Analysis Required'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-8 italic font-medium leading-relaxed">
                        {isCorrect ? currentQuestion.diagnostic.correct : currentQuestion.diagnostic.incorrect}
                      </p>
                      <div className="pt-8 border-t border-white/5 space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <Brain size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Master Insights</span>
                        </div>
                        <div className="text-sm text-gray-400 leading-relaxed font-medium p-6 rounded-3xl bg-black/40 border border-white/5 italic">
                          {currentQuestion.explanation}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Footer */}
              <div className="mt-10 shrink-0 flex gap-4">
                {mode === 'training' ? (
                  !showResult ? (
                    <button
                      onClick={handleVerify}
                      disabled={selected === null}
                      className={`flex-1 py-6 rounded-3xl font-black text-base flex items-center justify-center gap-3 transition-all ${
                        selected !== null 
                          ? 'bg-primary text-white shadow-2xl active:scale-95' 
                          : 'bg-white/5 text-gray-700 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles size={20} />
                      지능형 분석 가동
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex-1 py-6 rounded-3xl bg-white text-black font-black text-base flex items-center justify-center gap-3 shadow-2xl active:scale-95 group"
                    >
                      {currentIdx < subject.questions.length - 1 ? 'Next Sequence' : 'Finish Mission'}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )
                ) : (
                  <>
                    <button onClick={handlePrev} disabled={currentIdx === 0} className="px-8 py-6 rounded-3xl bg-white/5 border border-white/10 text-gray-500 hover:text-white disabled:opacity-30 active:scale-95 transition-all">
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={handleNext} className="flex-1 py-6 rounded-3xl bg-[#1a1a20] border border-white/5 text-white font-black text-base shadow-xl active:scale-95 flex items-center justify-center gap-3">
                      {currentIdx < subject.questions.length - 1 ? 'Next Phase' : 'Check Submission'}
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* OMR Sidebar (Exam Mode Only) */}
        {mode === 'exam' && (
          <aside className="hidden lg:flex w-80 flex-col p-8 bg-[#09090d]/80 border-l border-white/5 overflow-hidden">
            <div className="mb-8">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">OMR Protocol</h3>
              <div className="grid grid-cols-5 gap-3">
                {subject.questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIdx(i);
                      setSelected(examAnswers[i]);
                    }}
                    className={`h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all border ${
                      currentIdx === i ? 'bg-primary border-primary text-white' : 
                      examAnswers[i] !== null ? 'bg-accent/10 border-accent/30 text-accent' : 
                      'bg-white/5 border-white/5 text-gray-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[9px] font-black text-gray-600 uppercase mb-2">Completion</div>
                <div className="text-xl font-black text-white">{Object.values(examAnswers).filter(v => v !== null).length} / {subject.questions.length}</div>
              </div>
              <button 
                onClick={handleFinalSubmit}
                className="w-full py-5 rounded-3xl bg-accent text-black font-black flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl shadow-accent/20"
              >
                <CheckCircle2 size={20} />
                MISSION SUBMIT
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Floating Action for Mobile Exam */}
      {mode === 'exam' && (
        <div className="lg:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-6">
          <button 
            onClick={handleFinalSubmit}
            className="w-full py-6 rounded-[32px] bg-accent text-black font-black shadow-2xl shadow-accent/30 shadow-black/80 flex items-center justify-center gap-3 active:scale-95"
          >
            <HistoryIcon size={20} className="fill-current" />
            FINAL SUBMIT MISSION
          </button>
        </div>
      )}
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
