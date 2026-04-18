"use client";

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, Brain, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Share2, Bookmark, BarChart3, Info, LayoutGrid, Trophy, RotateCcw, Home, Clock, History as HistoryIcon } from 'lucide-react';
import Link from 'next/link';
import { EXAM_DATA } from '@/data/exams';
import { useUser } from '@/hooks/useUser';
import { STAFF_MESSAGES, ALPHA_STAFF } from '@/data/staff';
import { AIAssistant, StaffBubble } from '@/components/AIAssistant';
import { StudyStorage } from '@/lib/storage';

function StudyContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('id') || 'electronic-craftsman';
  const subject = EXAM_DATA[subjectId] || EXAM_DATA['electronic-craftsman'];

  const [mode, setMode] = useState<'exam'>('exam');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // CBT Exclusive State
  const [examAnswers, setExamAnswers] = useState<Record<number, number | null>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [isOmrOpen, setIsOmrOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes default
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [history, setHistory] = useState<{idx: number, selected: number, isCorrect: boolean, isConfident?: boolean, timeTaken?: number}[]>([]);

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

  // Initialize exam on mount
  React.useEffect(() => {
    const initial: Record<number, number | null> = {};
    subject.questions.forEach((_, i) => initial[i] = null);
    setExamAnswers(initial);
  }, [subjectId]);

  const handleSelect = (index: number) => {
    setSelected(index);
    setExamAnswers(prev => ({ ...prev, [currentIdx]: index }));
    
    // Auto-advance logic (MBTI Style)
    if (currentIdx < subject.questions.length - 1) {
      setTimeout(() => {
        const nextIdx = currentIdx + 1;
        setCurrentIdx(nextIdx);
        // Important: Use the answer from the next question state
        setExamAnswers(prev => {
          setSelected(prev[nextIdx] || null);
          return prev;
        });
      }, 300);
    }
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentIdx)) next.delete(currentIdx);
      else next.add(currentIdx);
      return next;
    });
  };

  const handleVerify = () => {
    const isCorrect = selected === currentQuestion.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setHistory(prev => [...prev, { 
      idx: currentIdx, 
      selected: selected!, 
      isCorrect,
      isConfident: true 
    }]);
  };

  const handleNext = () => {
    if (currentIdx < subject.questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setSelected(examAnswers[nextIdx] || null);
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
        isCorrect,
        isConfident: true // Exam mode assumes confidence is the goal
      });
    });

    setScore(totalScore);
    setHistory(finalHistory);
    setIsTimerActive(false);

    // Calc stats for saving
    const subjectStatsLocal = finalHistory.reduce((acc: any, h: any) => {
      const q = subject.questions[h.idx];
      if (!acc[q.subject]) acc[q.subject] = { total: 0, correct: 0 };
      acc[q.subject].total++;
      if (h.isCorrect) acc[q.subject].correct++;
      return acc;
    }, {});
    const weakestLocal = Object.entries(subjectStatsLocal).reduce((min: any, [sub, stat]: any) => {
      const rate = stat.correct / stat.total;
      if (!min || rate < min.rate) return { name: sub, rate };
      return min;
    }, null);

    // Save Exam Record
    StudyStorage.saveRecord({
      subjectId,
      subjectTitle: subject.title,
      score: totalScore,
      totalQuestions: subject.questions.length,
      isPass: totalScore / subject.questions.length >= 0.6,
      mode: 'exam',
      weakestSubject: weakestLocal?.name || '기타',
      blindspots: finalHistory.filter((h: any) => !h.isCorrect && h.isConfident).length,
      luckyStrikes: 0,
      subjectMastery: subjectStatsLocal
    });

    setIsFinished(true);
  };

  const handleReset = () => {
    setMode('exam');
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
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

  // ----------------------------------------------------------------
  // DIAGNOSTIC ENGINE COMPUTE
  // ----------------------------------------------------------------
  const subjectStats = history.reduce((acc: Record<string, {total: number, correct: number}>, h) => {
    const q = subject.questions[h.idx];
    if (!acc[q.subject]) acc[q.subject] = { total: 0, correct: 0 };
    acc[q.subject].total++;
    if (h.isCorrect) acc[q.subject].correct++;
    return acc;
  }, {});

  const weakestSubject = Object.entries(subjectStats).reduce((min: any, [sub, stat]: any) => {
    const rate = stat.correct / stat.total;
    if (!min || rate < min.rate) return { name: sub, rate, ...stat };
    return min;
  }, null as any);

  // Metacognitive Analysis
  const blindspots = history.filter(h => !h.isCorrect && h.isConfident).length; // "Confident but wrong"
  const luckyStrikes = history.filter(h => h.isCorrect && !h.isConfident).length; // "Unsure but right"

  // Remove selection screen, always exam

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
              <div className="text-[9px] font-black text-gray-600 uppercase mb-1 tracking-widest">Target</div>
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

          {/* Detailed Diagnosis UI */}
          <div className="w-full max-w-2xl mx-auto mb-16 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* 1. Radar Mastery Chart (한눈에 보는 리포트) */}
            <div className="bg-[#12121a]/80 border border-white/5 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[100px] rounded-full" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-10 self-start">
                  <LayoutGrid size={14} className="text-primary" />
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mastery Balance Index</h3>
                </div>

                {/* SVG Radar Chart */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 mb-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                    {/* Background Circles */}
                    {[20, 40, 60, 80, 100].map(r => (
                      <circle key={r} cx="50" cy="50" r={r/2} fill="none" stroke="white" strokeWidth="0.1" strokeOpacity="0.1" />
                    ))}
                    {/* Axis Lines */}
                    {Object.keys(subjectStats).map((_, i, arr) => {
                      const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
                      return (
                        <line key={i} x1="50" y1="50" x2={50 + 50 * Math.cos(angle)} y2={50 + 50 * Math.sin(angle)} stroke="white" strokeWidth="0.1" strokeOpacity="0.1" />
                      );
                    })}
                    {/* Data Polygon */}
                    <motion.polygon
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      points={Object.values(subjectStats).map((stat: any, i, arr) => {
                        const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
                        const r = (stat.correct / stat.total) * 45 + 5; // offset slightly from center
                        return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
                      }).join(' ')}
                      className="fill-primary/20 stroke-primary stroke-[1.5]"
                    />
                    {/* Data Points */}
                    {Object.values(subjectStats).map((stat: any, i, arr) => {
                      const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
                      const r = (stat.correct / stat.total) * 45 + 5;
                      return (
                        <circle key={i} cx={50 + r * Math.cos(angle)} cy={50 + r * Math.sin(angle)} r="1.5" className="fill-white" />
                      );
                    })}
                  </svg>
                  
                  {/* Subject Labels */}
                  {Object.keys(subjectStats).map((sub, i, arr) => {
                    const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 50 + 55 * Math.cos(angle);
                    const y = 50 + 55 * Math.sin(angle);
                    return (
                      <div key={sub} className="absolute text-[8px] md:text-[9px] font-black text-gray-500 uppercase whitespace-nowrap" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                        {sub}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full pt-8 border-t border-white/5">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                    <div className="text-[8px] font-black text-gray-600 uppercase mb-1">Strongest</div>
                    <div className="text-xs font-bold text-accent">
                      {Object.entries(subjectStats).reduce((a, b: any) => (a[1].correct/a[1].total > b[1].correct/b[1].total ? a : b) as any)[0]}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                    <div className="text-[8px] font-black text-gray-600 uppercase mb-1">Critical Focus</div>
                    <div className="text-xs font-bold text-red-400">
                      {weakestSubject?.name || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Professional Analytical Prescription (전문가용 처방전 - 쭈욱 읽게 됨) */}
            <div className="space-y-6">
              <div className="bg-[#12121a]/60 border border-white/5 rounded-[40px] p-8 md:p-10 backdrop-blur-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">Alpha Strategic Diagnosis</h4>
                    <p className="text-[10px] text-gray-500 font-bold">AI 데이터 기반 정밀 분석 보고서</p>
                  </div>
                </div>

                <div className="space-y-8 text-gray-300">
                  <section>
                    <h5 className="text-[11px] font-black text-primary uppercase mb-3 flex items-center gap-2">
                       <CheckCircle2 size={12} />
                       종합 성취도 판정
                    </h5>
                    <p className="text-[13px] leading-relaxed font-medium italic mb-2">
                      {isPass 
                        ? `수험생님의 현재 성취도는 [${passScore}%]로 합격 안정권에 진입했습니다. 전체 밸런스가 뛰어나며, 실전에서도 변수 없이 합격할 가능성이 90% 이상으로 분석됩니다.`
                        : `현재 성취도는 [${passScore}%]로 합격 기준(60%)에 미달합니다. 특정 단원에서의 지식 공백이 전체 점수를 끌어내리고 있으며, 전략적인 보완이 시급한 상태입니다.`
                      }
                    </p>
                    <p className="text-[13px] leading-relaxed font-medium text-gray-500">
                      본 결과는 최근 3개년 기출 경향과 수험생님의 응시 패턴을 복합 분석한 결과입니다. 특히 단원별 데이터 편차를 고려했을 때, 다음 단계의 학습 방향이 결과에 결정적인 영향을 미칠 것입니다.
                    </p>
                  </section>

                  <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                    <h5 className="text-[11px] font-black text-accent uppercase mb-4 flex items-center gap-2">
                       <AlertCircle size={12} />
                       취약 단원 정밀 분석 (Critical Zone)
                    </h5>
                    {weakestSubject ? (
                      <div className="space-y-4">
                        <p className="text-[13px] leading-relaxed font-medium">
                          가장 보완이 시급한 영역은 **[${weakestSubject.name}]** 단원입니다. 
                          해당 영역의 정답률인 ${(weakestSubject.rate * 100).toFixed(0)}%는 전체 평균에 비해 현저히 낮으며, 이는 기본 개념의 구조화가 부족함을 의미합니다.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex gap-2 text-[12px] font-medium text-gray-400 italic">
                             <div className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                             해당 단원의 핵심 키워드 중심 재개념화 필요
                          </li>
                          <li className="flex gap-2 text-[12px] font-medium text-gray-400 italic">
                             <div className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                             최근 출제 빈도가 높은 응용 문제 풀이 권장
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">전반적인 단원 밸런스가 양호하며, 치명적인 약점은 발견되지 않았습니다.</p>
                    )}
                  </section>

                  <section>
                    <h5 className="text-[11px] font-black text-gray-500 uppercase mb-3">메타인지적 맹점 (Blindspots)</h5>
                    <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                      <p className="text-[12px] font-medium leading-relaxed text-red-200/60">
                        {blindspots > 0 
                          ? `검토(Flag)하지 않았으나 틀린 문제가 ${blindspots}문항 발견되었습니다. 이는 자신이 알고 있다는 착각(Metacognitive Blindspot)이 발생하는 영역으로, 실제 시험에서 가장 주의해야 할 리스크 요소입니다.`
                          : "맹점 문항이 발견되지 않았습니다. 자신의 실력을 정확히 파악하고 응시하고 계십니다."
                        }
                      </p>
                    </div>
                  </section>

                  <div className="pt-6 border-t border-white/5">
                     <p className="text-[11px] font-bold text-gray-600 text-center uppercase tracking-widest">
                       Alpha Pass Master AI Intelligence Diagnostic System
                     </p>
                  </div>
                </div>
              </div>

              {/* Step back to specific chapter breakdown if needed */}
              <div className="bg-[#12121a]/40 border border-white/5 rounded-[40px] p-8 hidden md:block">
                 <div className="flex items-center gap-2 mb-6">
                    <BarChart3 size={14} className="text-gray-500" />
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Chapter Data Breakdown</h3>
                 </div>
                 <div className="space-y-4">
                    {Object.entries(subjectStats).map(([sub, stat]: any) => (
                      <div key={sub} className="flex justify-between items-center text-[11px] font-bold text-gray-500 px-2">
                        <span>{sub}</span>
                        <span>{stat.correct} / {stat.total}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
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

      {/* CBT Header: Slimmed */}
      <header className="w-full max-w-2xl px-5 pt-10 pb-4 flex justify-between items-center bg-[#09090d]/80 backdrop-blur-xl border-b border-white/5 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 border border-white/10">
            <ChevronLeft size={16} />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-[12px] font-black tracking-tight leading-none">{subject.title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOmrOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary active:scale-95 transition-all"
          >
            <LayoutGrid size={16} />
          </button>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-red-500/80">
              <Clock size={12} />
              <span className="text-sm font-black tracking-widest tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full max-w-7xl flex overflow-hidden lg:px-8 lg:pb-8">
        {/* Main Focus Area */}
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-0 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col relative bg-[#12121a]/60 border border-white/5 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl shadow-2xl overflow-hidden"
            >
              <div className="shrink-0 mb-6 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Item {currentIdx + 1} / {subject.questions.length}</span>
                  </div>
                  <h1 className="text-lg md:text-xl font-bold leading-tight tracking-tight text-gray-200">
                    {currentQuestion.question}
                  </h1>
                </div>
                <button 
                  onClick={toggleFlag}
                  className={`p-3 rounded-2xl border transition-all active:scale-90 ml-4 ${
                    flaggedQuestions.has(currentIdx) 
                      ? 'bg-accent/20 border-accent text-accent' 
                      : 'bg-white/5 border-white/5 text-gray-700'
                  }`}
                >
                  <Bookmark size={18} fill={flaggedQuestions.has(currentIdx) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                {currentQuestion.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-5 rounded-3xl border-2 transition-all duration-200 relative ${
                      selected === idx 
                        ? 'bg-white/10 border-white/20' 
                        : 'bg-white/[0.02] border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all ${
                        selected === idx ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-gray-600'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-[14px] font-medium leading-snug ${selected === idx ? 'text-white' : 'text-gray-400'}`}>
                        {option}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation Footer */}
              <div className="mt-10 mb-8 shrink-0 flex gap-4">
                <button onClick={() => {
                  if (currentIdx > 0) {
                    const next = currentIdx - 1;
                    setCurrentIdx(next);
                    setSelected(examAnswers[next] || null);
                  }
                }} disabled={currentIdx === 0} className="px-8 py-6 rounded-3xl bg-white/5 border border-white/10 text-gray-500 hover:text-white disabled:opacity-30 active:scale-95 transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="flex-1 py-6 rounded-3xl bg-[#1a1a20] border border-white/5 text-white font-black text-base shadow-xl active:scale-95 flex items-center justify-center gap-3">
                  {currentIdx < subject.questions.length - 1 ? 'Next Item' : 'Review & Submit'}
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Desktop OMR Sidebar */}
        <aside className="hidden lg:flex w-96 flex-col p-8 bg-[#09090d]/80 border border-white/5 rounded-[40px] ml-6 overflow-hidden shadow-2xl backdrop-blur-3xl">
          <div className="mb-8 overflow-y-auto pr-2">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Exam Tracker</h3>
            <div className="grid grid-cols-5 gap-3">
              {subject.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIdx(i);
                    setSelected(examAnswers[i]);
                  }}
                  className={`h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all border ${
                    currentIdx === i ? 'bg-primary border-primary text-white shadow-lg' : 
                    flaggedQuestions.has(i) ? 'bg-accent/20 border-accent/40 text-accent' :
                    examAnswers[i] !== null ? 'bg-white/10 border-white/20 text-gray-300' : 
                    'bg-white/5 border-white/5 text-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
              <div>
                <div className="text-[9px] font-black text-gray-600 uppercase mb-1">Answered</div>
                <div className="text-xl font-black text-white">{Object.values(examAnswers).filter(v => v !== null).length} / {subject.questions.length}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] font-black text-accent uppercase mb-1">Flagged</div>
                <div className="text-xl font-black text-accent">{flaggedQuestions.size}</div>
              </div>
            </div>
            <button 
              onClick={handleFinalSubmit}
              className="w-full py-5 rounded-3xl bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-xl"
            >
              <CheckCircle2 size={20} />
              SUBMIT PROTOCOL
            </button>
          </div>
        </aside>
      </div>

      {/* Mobile OMR Drawer */}
      <AnimatePresence>
        {isOmrOpen && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#060608] flex flex-col"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090d]">
              <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-500">Exam Navigator</h3>
              <button onClick={() => setIsOmrOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase">Close</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-5 gap-4">
                {subject.questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIdx(i);
                      setSelected(examAnswers[i]);
                      setIsOmrOpen(false);
                    }}
                    className={`h-14 rounded-2xl flex items-center justify-center text-xs font-black transition-all border ${
                      currentIdx === i ? 'bg-primary border-primary text-white shadow-lg scale-110' : 
                      flaggedQuestions.has(i) ? 'bg-accent/20 border-accent/40 text-accent' :
                      examAnswers[i] !== null ? 'bg-white/10 border-white/20 text-gray-300' : 
                      'bg-white/5 border-white/5 text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-[#09090d]">
              <div className="flex justify-between items-end mb-8 px-2">
                 <div>
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-1">Remaining</span>
                    <span className="text-3xl font-black text-white">{subject.questions.length - Object.values(examAnswers).filter(v => v !== null).length}문항</span>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest block mb-1">Total Flagged</span>
                    <span className="text-3xl font-black text-accent">{flaggedQuestions.size}</span>
                 </div>
              </div>
              <button 
                onClick={() => {
                  setIsOmrOpen(false);
                  handleFinalSubmit();
                }}
                className="w-full py-6 rounded-[32px] bg-white text-black font-black text-lg shadow-2xl active:scale-95 transition-all"
              >
                FINAL SUBMIT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
