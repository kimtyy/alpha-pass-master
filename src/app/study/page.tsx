"use client";

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, Brain, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Share2, Bookmark, BarChart3, Info, LayoutGrid, Trophy, RotateCcw, Home, Clock, History as HistoryIcon } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { STAFF_MESSAGES, ALPHA_STAFF } from '@/data/staff';
import { AIAssistant, StaffBubble } from '@/components/AIAssistant';
import { StudyStorage, type SessionAnswerInput } from '@/lib/storage';
import { createClient } from '@/lib/supabase/client';

// ── Supabase 문제 타입 ───────────────────────────────────────
interface DBQuestion {
  id: string;           // questions 테이블 UUID (session_answers 저장에 사용)
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  subject: string;
  originalIdx: number;
  diagnostic?: { correct: string; incorrect: string };
}

// ── 문제 fetch 함수 ──────────────────────────────────────────
async function fetchQuestions(
  certificateSlug: string,
): Promise<{ questions: DBQuestion[]; title: string; category: string }> {
  const supabase = createClient();

  // 1. 자격증 정보 조회
  const { data: cert, error: certError } = await supabase
    .from('certificates')
    .select('id, name, category')
    .eq('slug', certificateSlug)
    .single();

  if (certError || !cert) {
    throw new Error(`자격증을 찾을 수 없습니다: ${certificateSlug}`);
  }

  const certRow = cert as { id: string; name: string; category: string };

  // 2. 문제 + 보기 + 과목명 조회
  const { data: rows, error: qError } = await supabase
    .from('questions')
    .select(`
      id,
      content,
      answer_index,
      explanation,
      diagnostic_correct,
      diagnostic_incorrect,
      exam_subjects ( name ),
      options ( order_index, content )
    `)
    .eq('certificate_id', certRow.id)
    .order('created_at');

  if (qError || !rows) {
    throw new Error('문제를 불러오지 못했습니다.');
  }

  // 3. 앱 내부 형식으로 변환
  const questions: DBQuestion[] = rows.map((row: any, i: number) => ({
    id: row.id,
    question: row.content,
    options: [...row.options]
      .sort((a: any, b: any) => a.order_index - b.order_index)
      .map((o: any) => o.content),
    answer: row.answer_index,
    explanation: row.explanation ?? '',
    subject: row.exam_subjects?.name ?? '',
    originalIdx: i,
    diagnostic:
      row.diagnostic_correct
        ? { correct: row.diagnostic_correct, incorrect: row.diagnostic_incorrect ?? '' }
        : undefined,
  }));

  return { questions, title: certRow.name, category: certRow.category };
}

// ── 메인 컴포넌트 ────────────────────────────────────────────
function StudyContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('id') || 'industrial-safety-engineer';

  // ── DB 문제 데이터 상태 ─────────────────────────────────────
  const [questionPool, setQuestionPool] = useState<DBQuestion[]>([]);
  const [certificateName, setCertificateName] = useState('');
  const [categoryType, setCategoryType] = useState('Engineer');
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // ── 시험 상태 ───────────────────────────────────────────────
  const [mode, setMode] = useState<'exam'>('exam');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [shuffledQuestions, setShuffledQuestions] = useState<DBQuestion[]>([]);
  const [examAnswers, setExamAnswers] = useState<Record<number, number | null>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [isOmrOpen, setIsOmrOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [history, setHistory] = useState<{
    idx: number; originalIdx: number; selected: number | null;
    isCorrect: boolean; isConfident?: boolean;
  }[]>([]);

  const { status, isGuest, login } = useUser();
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [activeReviewIdx, setActiveReviewIdx] = useState<number | null>(null);

  // ── 1. Supabase에서 문제 fetch ──────────────────────────────
  React.useEffect(() => {
    setIsLoadingQuestions(true);
    setFetchError(null);

    fetchQuestions(subjectId)
      .then(({ questions, title, category }) => {
        setQuestionPool(questions);
        setCertificateName(title);
        setCategoryType(category);
      })
      .catch((err) => {
        console.error(err);
        setFetchError(err.message);
      })
      .finally(() => setIsLoadingQuestions(false));
  }, [subjectId]);

  // ── 2. 문제 로드 완료 후 층화 무작위 추출 ─────────────────────
  React.useEffect(() => {
    if (questionPool.length === 0) return;

    const subjectsInPool = Array.from(new Set(questionPool.map((q) => q.subject)));
    const targetPerSubject =
      questionPool.length > 60 ? (categoryType === 'Professional' ? 40 : 20) : 20;

    const sampledPool: DBQuestion[] = [];
    subjectsInPool.forEach((subName) => {
      const subGroup = questionPool.filter((q) => q.subject === subName);
      const shuffledSub = [...subGroup].sort(() => Math.random() - 0.5);
      sampledPool.push(...shuffledSub.slice(0, targetPerSubject));
    });

    const final = sampledPool
      .sort(() => Math.random() - 0.5)
      .map((q, i) => ({ ...q, originalIdx: i }));

    setShuffledQuestions(final);

    const initial: Record<number, number | null> = {};
    final.forEach((_, i) => (initial[i] = null));
    setExamAnswers(initial);
    setCurrentIdx(0);
    setSelected(null);
    setTimeLeft(60 * 60);
    setIsTimerActive(true);
  }, [questionPool, categoryType]);

  // ── 3. 타이머 ───────────────────────────────────────────────
  React.useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) {
      if (timeLeft === 0) handleFinalSubmit();
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // ── 핸들러 ──────────────────────────────────────────────────
  const currentQuestion = shuffledQuestions[currentIdx];

  const handleSelect = (index: number) => {
    setSelected(index);
    setExamAnswers((prev) => ({ ...prev, [currentIdx]: index }));
    setTimeout(() => {
      if (currentIdx < shuffledQuestions.length - 1) {
        const next = currentIdx + 1;
        setCurrentIdx(next);
        setSelected(examAnswers[next] ?? null);
      } else {
        setIsOmrOpen(true);
      }
    }, 300);
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      next.has(currentIdx) ? next.delete(currentIdx) : next.add(currentIdx);
      return next;
    });
  };

  const handleNext = () => {
    if (currentIdx < shuffledQuestions.length - 1) {
      const next = currentIdx + 1;
      setCurrentIdx(next);
      setSelected(examAnswers[next] ?? null);
    } else {
      setIsOmrOpen(true);
    }
  };

  // ── 최종 제출 (Supabase 저장) ────────────────────────────────
  const handleFinalSubmit = async () => {
    let totalScore = 0;
    const finalHistory: typeof history = [];

    shuffledQuestions.forEach((q, i) => {
      const userAnswer = examAnswers[i] ?? null;
      const isCorrect = userAnswer === q.answer;
      if (isCorrect) totalScore++;
      finalHistory.push({
        idx: i,
        originalIdx: q.originalIdx,
        selected: userAnswer,
        isCorrect,
        isConfident: true,
      });
    });

    setScore(totalScore);
    setHistory(finalHistory);
    setIsTimerActive(false);

    // 과목별 통계
    const subjectStatsLocal = finalHistory.reduce(
      (acc: Record<string, { total: number; correct: number }>, h) => {
        const q = shuffledQuestions[h.idx];
        if (!acc[q.subject]) acc[q.subject] = { total: 0, correct: 0 };
        acc[q.subject].total++;
        if (h.isCorrect) acc[q.subject].correct++;
        return acc;
      },
      {},
    );

    const weakestLocal = Object.entries(subjectStatsLocal).reduce(
      (min: any, [sub, stat]: any) => {
        const rate = stat.correct / stat.total;
        return !min || rate < min.rate ? { name: sub, rate } : min;
      },
      null,
    );

    // session_answers 배열 구성 (question_id = Supabase UUID)
    const answers: SessionAnswerInput[] = finalHistory
      .filter((h) => h.selected !== null && shuffledQuestions[h.idx]?.id)
      .map((h) => ({
        question_id: shuffledQuestions[h.idx].id,
        user_answer: h.selected as number,
        is_correct: h.isCorrect,
      }));

    // Supabase (로그인) 또는 localStorage (비로그인) 저장
    await StudyStorage.saveRecord(
      {
        subjectId,
        subjectTitle: certificateName,
        score: totalScore,
        totalQuestions: shuffledQuestions.length,
        isPass: totalScore / shuffledQuestions.length >= 0.6,
        mode: 'exam',
        weakestSubject: weakestLocal?.name ?? '기타',
        blindspots: finalHistory.filter((h) => !h.isCorrect && h.isConfident).length,
        luckyStrikes: 0,
        subjectMastery: subjectStatsLocal,
      },
      answers,
    );

    setIsFinished(true);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setIsFinished(false);
    setHistory([]);
    setExamAnswers({});
    setTimeLeft(60 * 60);
    // questionPool이 있으면 shuffle effect가 재실행되도록 트리거
    setQuestionPool((prev) => [...prev]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const passScore = Math.round((score / (shuffledQuestions.length || 1)) * 100);
  const isPass = passScore >= 60;

  const filteredHistory = history.filter((h) => {
    if (filter === 'correct') return h.isCorrect;
    if (filter === 'incorrect') return !h.isCorrect;
    return true;
  });

  const subjectGroups = shuffledQuestions.reduce((acc: { name: string; startIdx: number }[], q, i) => {
    const last = acc[acc.length - 1];
    if (!last || last.name !== q.subject) acc.push({ name: q.subject, startIdx: i });
    return acc;
  }, []);

  const subjectStats = history.reduce(
    (acc: Record<string, { total: number; correct: number }>, h) => {
      const q = shuffledQuestions[h.idx];
      if (!acc[q.subject]) acc[q.subject] = { total: 0, correct: 0 };
      acc[q.subject].total++;
      if (h.isCorrect) acc[q.subject].correct++;
      return acc;
    },
    {},
  );

  const weakestSubject = Object.entries(subjectStats).reduce(
    (min: any, [sub, stat]: any) => {
      const rate = stat.correct / stat.total;
      return !min || rate < min.rate ? { name: sub, rate, ...stat } : min;
    },
    null as any,
  );

  const blindspots = history.filter((h) => !h.isCorrect && h.isConfident).length;

  // ── 에러 화면 ────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="min-h-screen bg-[#060608] flex flex-col items-center justify-center gap-6 text-white px-6">
        <AlertCircle size={48} className="text-red-500" />
        <p className="text-lg font-black text-center">{fetchError}</p>
        <Link href="/dashboard" className="px-8 py-4 rounded-2xl bg-white/10 border border-white/10 font-black">
          메인으로 돌아가기
        </Link>
      </div>
    );
  }

  // ── 로딩 화면 ────────────────────────────────────────────────
  if (isLoadingQuestions || shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#060608] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest animate-pulse">
            {isLoadingQuestions ? 'Loading Questions from DB...' : 'Initializing CBT Engine...'}
          </p>
        </div>
      </div>
    );
  }

  // ── 결과 화면 ────────────────────────────────────────────────
  if (isFinished) {
    return (
      <div className="min-h-[100dvh] bg-black text-white flex flex-col items-center pb-20 relative overflow-x-hidden font-sans">
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] opacity-10 blur-[150px] rounded-full ${isPass ? 'bg-primary' : 'bg-red-500'}`} />
        </div>

        <header className="w-full pt-20 pb-12 px-6 text-center shrink-0">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center mb-10">
            <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center mb-6 relative ${isPass ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'}`}>
              {isPass ? <Trophy size={48} /> : <AlertCircle size={48} />}
              <div className={`absolute inset-0 blur-2xl rounded-full opacity-20 ${isPass ? 'bg-primary' : 'bg-red-500'}`} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 uppercase">
              {isPass ? 'Mission Success' : 'Protocol Failed'}
            </h1>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.6em] mb-8">Alpha Intelligence Report</p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="glass px-6 py-3 rounded-full flex items-center gap-3 border-primary/20">
              <Sparkles size={14} className="text-primary animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-primary">
                Potential Alpha Shares Gained: <span className="text-white">+{(score * 1.11).toFixed(2)}</span>
              </span>
            </motion.div>
          </motion.div>

          <div className="flex justify-center gap-12 max-w-sm mx-auto mb-16">
            <div className="text-center">
              <div className="text-[9px] font-black text-gray-700 uppercase mb-2 tracking-widest">Accuracy</div>
              <div className={`text-4xl font-black tracking-tighter ${isPass ? 'text-primary' : 'text-red-500'}`}>{passScore}%</div>
            </div>
            <div className="w-[1px] h-12 bg-white/5 self-center" />
            <div className="text-center">
              <div className="text-[9px] font-black text-gray-700 uppercase mb-2 tracking-widest">Status</div>
              <div className={`text-xl font-black uppercase ${isPass ? 'text-primary' : 'text-red-500'}`}>{isPass ? 'Pass' : 'Fail'}</div>
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto mb-16 px-4">
            <div className="premium-glass p-8 md:p-12 rounded-[48px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full" />
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Brain size={24} />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-black text-primary uppercase tracking-widest">ALPHA PASS STRATEGIC REPORT</span>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4 leading-snug">
                    {isPass
                      ? "놀라운 집중력입니다! 사용자의 현재 학습 궤적은 최적 합격 곡선에 근접해 있습니다."
                      : `분석 결과, 현재 세션은 [${weakestSubject?.name || '기초영역'}] 파트에서의 데이터 임계치를 넘지 못했습니다.`}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    {isPass
                      ? "전체적인 밸런스가 매우 이상적입니다. 이제 다음 레벨로 진격할 준비가 되었습니다."
                      : `'${weakestSubject?.name}' 단원에서의 오답률이 높습니다. 기출 유형 익히기 전략이 효율적입니다.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 w-fit mx-auto mb-16">
            {(['all', 'correct', 'incorrect'] as const).map((t) => (
              <button key={t} onClick={() => { setFilter(t); setActiveReviewIdx(null); }}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${filter === t ? 'bg-white text-black' : 'text-gray-600 hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>
        </header>

        <main className="w-full max-w-2xl px-6">
          <div className="space-y-4">
            {filteredHistory.map((h, i) => {
              const q = shuffledQuestions[h.idx];
              const isActive = activeReviewIdx === h.idx;
              return (
                <div key={h.idx} className="group">
                  <button onClick={() => setActiveReviewIdx(isActive ? null : h.idx)}
                    className={`w-full text-left p-8 rounded-[40px] border transition-all duration-300 ${isActive ? 'bg-white/[0.04] border-white/20' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-[10px] font-black border ${h.isCorrect ? 'bg-primary/20 border-primary/20 text-primary' : 'bg-red-500/20 border-red-500/20 text-red-500'}`}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`text-[15px] font-bold leading-snug tracking-tight mb-1 ${isActive ? 'text-white' : 'text-gray-500'}`}>{q.question}</p>
                      </div>
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="pt-8 mt-8 border-t border-white/5 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-black/40 rounded-2xl p-5 border border-white/5">
                                <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest block mb-2">Selection</span>
                                <p className={`text-xs font-bold ${h.isCorrect ? 'text-primary' : 'text-red-400'}`}>
                                  {h.selected !== null ? q.options[h.selected] : '(미응답)'}
                                </p>
                              </div>
                              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                                <span className="text-[8px] font-black text-primary uppercase tracking-widest block mb-2">Alpha Target</span>
                                <p className="text-xs font-bold text-white">{q.options[q.answer]}</p>
                              </div>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                              <div className="text-[10px] font-black text-primary uppercase mb-3 flex items-center gap-2">
                                <Sparkles size={12} />Expert Insight
                              </div>
                              <p className="text-[13px] leading-relaxed text-gray-400 font-medium italic">{q.explanation}</p>
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

          <div className="mt-16 space-y-4">
            <button onClick={handleReset}
              className="w-full py-6 rounded-[32px] bg-white text-black font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-2xl">
              <RotateCcw size={20} />새로운 작전 도전하기
            </button>
            <Link href="/dashboard"
              className="w-full py-6 rounded-[32px] bg-white/5 border border-white/10 text-white font-black flex items-center justify-center gap-3 active:scale-95 transition-all">
              <Home size={20} />메인 지휘부로 복귀
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // ── 시험 화면 ────────────────────────────────────────────────
  return (
    <div className="h-[100dvh] bg-[#060608] text-white flex flex-col items-center overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <header className="w-full max-w-2xl px-5 pt-6 pb-3 flex justify-between items-center bg-[#09090d]/80 backdrop-blur-xl border-b border-white/5 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 border border-white/10">
            <ChevronLeft size={16} />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-[12px] font-black tracking-tight leading-none">{certificateName}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{currentQuestion?.subject}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOmrOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary active:scale-95 transition-all">
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
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-0 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col relative bg-[#12121a]/60 border border-white/5 rounded-[40px] p-6 md:p-12 backdrop-blur-3xl shadow-2xl overflow-hidden">
              <div className="shrink-0 mb-4 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">Item {currentIdx + 1} / {shuffledQuestions.length}</span>
                  </div>
                  <h1 className="text-[17px] md:text-xl font-bold leading-snug tracking-tight text-gray-200">{currentQuestion?.question}</h1>
                </div>
                <button onClick={toggleFlag}
                  className={`p-3 rounded-2xl border transition-all active:scale-90 ml-4 ${flaggedQuestions.has(currentIdx) ? 'bg-accent/20 border-accent text-accent' : 'bg-white/5 border-white/5 text-gray-700'}`}>
                  <Bookmark size={18} fill={flaggedQuestions.has(currentIdx) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
                {currentQuestion?.options.map((option, idx) => (
                  <motion.button key={idx} whileTap={{ scale: 0.98 }} onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-4 rounded-3xl border-2 transition-all duration-200 relative ${selected === idx ? 'bg-white/10 border-white/20' : 'bg-white/[0.02] border-white/5'}`}>
                    <div className="flex items-center gap-4 relative z-10">
                      <span className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center text-[9px] font-black border transition-all ${selected === idx ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-gray-600'}`}>
                        {idx + 1}
                      </span>
                      <span className={`text-[13.5px] font-medium leading-tight ${selected === idx ? 'text-white' : 'text-gray-400'}`}>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 mb-4 shrink-0 flex gap-3">
                <button onClick={() => { if (currentIdx > 0) { const n = currentIdx - 1; setCurrentIdx(n); setSelected(examAnswers[n] ?? null); } }}
                  disabled={currentIdx === 0} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-500 hover:text-white disabled:opacity-30 active:scale-95 transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={handleNext}
                  className="flex-1 py-4 rounded-2xl bg-[#1a1a20] border border-white/5 text-white font-black text-sm shadow-xl active:scale-95 flex items-center justify-center gap-2">
                  {currentIdx < shuffledQuestions.length - 1 ? 'Next Item' : 'Review & Submit'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        <aside className="hidden lg:flex w-96 flex-col p-8 bg-[#09090d]/80 border border-white/5 rounded-[40px] ml-6 overflow-hidden shadow-2xl backdrop-blur-3xl">
          <div className="mb-6 flex flex-col gap-2">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Jump to Subject</h3>
            <div className="flex flex-wrap gap-2">
              {subjectGroups.map((group) => (
                <button key={group.name} onClick={() => { setCurrentIdx(group.startIdx); setSelected(examAnswers[group.startIdx] ?? null); }}
                  className={`px-3 py-1.5 rounded-lg border text-[8px] font-black uppercase transition-all ${currentQuestion?.subject === group.name ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'}`}>
                  {group.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Exam Tracker</h3>
            <div className="grid grid-cols-5 gap-3">
              {shuffledQuestions.map((_, i) => (
                <button key={i} onClick={() => { setCurrentIdx(i); setSelected(examAnswers[i] ?? null); }}
                  className={`h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all border ${
                    currentIdx === i ? 'bg-primary border-primary text-white shadow-lg scale-110' :
                    flaggedQuestions.has(i) ? 'bg-accent/20 border-accent/40 text-accent' :
                    examAnswers[i] !== null ? 'bg-white/10 border-white/20 text-gray-300' :
                    'bg-white/5 border-white/5 text-gray-600'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <button onClick={handleFinalSubmit}
              className="w-full py-5 rounded-3xl bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-xl">
              <CheckCircle2 size={20} />SUBMIT PROTOCOL
            </button>
          </div>
        </aside>
      </div>

      {/* OMR 모달 */}
      <AnimatePresence>
        {isOmrOpen && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#060608] flex flex-col">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090d]">
              <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-500">Exam Navigator</h3>
              <button onClick={() => setIsOmrOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase">Close</button>
            </div>
            <div className="p-6 overflow-x-auto whitespace-nowrap border-b border-white/5 no-scrollbar bg-[#0d0d12]">
              <div className="flex gap-2">
                {subjectGroups.map((group) => (
                  <button key={group.name} onClick={() => { setCurrentIdx(group.startIdx); setSelected(examAnswers[group.startIdx] ?? null); }}
                    className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase transition-all shrink-0 ${currentQuestion?.subject === group.name ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                    {group.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-5 gap-4">
                {shuffledQuestions.map((_, i) => (
                  <button key={i} onClick={() => { setCurrentIdx(i); setSelected(examAnswers[i] ?? null); setIsOmrOpen(false); }}
                    className={`h-14 rounded-2xl flex items-center justify-center text-xs font-black transition-all border ${
                      currentIdx === i ? 'bg-primary border-primary text-white shadow-lg scale-110' :
                      flaggedQuestions.has(i) ? 'bg-accent/20 border-accent/40 text-accent' :
                      examAnswers[i] !== null ? 'bg-white/10 border-white/20 text-gray-300' :
                      'bg-white/5 border-white/5 text-gray-700'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-8 border-t border-white/5 bg-[#09090d]">
              <button onClick={() => { setIsOmrOpen(false); handleFinalSubmit(); }}
                className="w-full py-6 rounded-[32px] bg-white text-black font-black text-lg shadow-2xl active:scale-95 transition-all">
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
