"use client";

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  ChevronLeft, Brain, Sparkles, CheckCircle2, AlertCircle, ArrowRight,
  Bookmark, LayoutGrid, Trophy, RotateCcw, Home, Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { StudyStorage, type SessionAnswerInput } from '@/lib/storage';
import { createClient } from '@/lib/supabase/client';

// ── Types ───────────────────────────────────────────────────────
interface DBQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  subject: string;
  originalIdx: number;
  diagnostic?: { correct: string; incorrect: string };
}

// ── Fetch ───────────────────────────────────────────────────────
async function fetchQuestions(
  certificateSlug: string,
): Promise<{ questions: DBQuestion[]; title: string; category: string }> {
  const supabase = createClient();

  const { data: cert, error: certError } = await supabase
    .from('certificates')
    .select('id, name, category')
    .eq('slug', certificateSlug)
    .single();

  if (certError || !cert) throw new Error(`자격증을 찾을 수 없습니다: ${certificateSlug}`);

  const certRow = cert as { id: string; name: string; category: string };

  const { data: rows, error: qError } = await supabase
    .from('questions')
    .select(`
      id, content, answer_index, explanation,
      diagnostic_correct, diagnostic_incorrect,
      exam_subjects ( name ),
      options ( order_index, content )
    `)
    .eq('certificate_id', certRow.id)
    .order('created_at');

  if (qError || !rows) throw new Error('문제를 불러오지 못했습니다.');

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

// ── Main ────────────────────────────────────────────────────────
function StudyContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('id') || 'industrial-safety-engineer';

  const [questionPool, setQuestionPool] = useState<DBQuestion[]>([]);
  const [certificateName, setCertificateName] = useState('');
  const [categoryType, setCategoryType] = useState('Engineer');
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

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

  const { isGuest } = useUser();
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [activeReviewIdx, setActiveReviewIdx] = useState<number | null>(null);

  // 1. Fetch
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

  // 2. Shuffle after load
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

  // 3. Timer
  React.useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) {
      if (timeLeft === 0) handleFinalSubmit();
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

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
    }, 280);
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

  const handleFinalSubmit = async () => {
    let totalScore = 0;
    const finalHistory: typeof history = [];

    shuffledQuestions.forEach((q, i) => {
      const userAnswer = examAnswers[i] ?? null;
      const isCorrect = userAnswer === q.answer;
      if (isCorrect) totalScore++;
      finalHistory.push({ idx: i, originalIdx: q.originalIdx, selected: userAnswer, isCorrect, isConfident: true });
    });

    setScore(totalScore);
    setHistory(finalHistory);
    setIsTimerActive(false);

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

    const answers: SessionAnswerInput[] = finalHistory
      .filter((h) => h.selected !== null && shuffledQuestions[h.idx]?.id)
      .map((h) => ({
        question_id: shuffledQuestions[h.idx].id,
        user_answer: h.selected as number,
        is_correct: h.isCorrect,
      }));

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

  const subjectGroups = shuffledQuestions.reduce(
    (acc: { name: string; startIdx: number }[], q, i) => {
      const last = acc[acc.length - 1];
      if (!last || last.name !== q.subject) acc.push({ name: q.subject, startIdx: i });
      return acc;
    },
    [],
  );

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

  // ── Error ──────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center gap-6 text-foreground px-6">
        <AlertCircle size={40} className="text-[#f05050]" />
        <p className="text-base font-black text-center">{fetchError}</p>
        <Link
          href="/dashboard"
          className="px-8 py-4 rounded-[14px] bg-surface border border-white/8 font-bold text-sm"
        >
          메인으로 돌아가기
        </Link>
      </div>
    );
  }

  // ── Loading ────────────────────────────────────────────────────
  if (isLoadingQuestions || shuffledQuestions.length === 0) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest animate-pulse">
            {isLoadingQuestions ? 'Loading Questions...' : 'Initializing...'}
          </p>
        </div>
      </div>
    );
  }

  // ── Result screen ──────────────────────────────────────────────
  if (isFinished) {
    const passColor = isPass ? '#34c77b' : '#f05050';
    return (
      <div className="min-h-[100dvh] bg-background text-foreground flex flex-col items-center pb-24 relative overflow-x-hidden font-sans">
        {/* Ambient */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] blur-[160px] rounded-full opacity-8"
            style={{ backgroundColor: passColor }}
          />
        </div>

        {/* Hero */}
        <header className="w-full max-w-lg px-5 pt-20 pb-10 text-center shrink-0">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center mb-10"
          >
            <div
              className="w-20 h-20 rounded-[24px] flex items-center justify-center mb-5 relative"
              style={{ backgroundColor: `${passColor}18` }}
            >
              {isPass ? (
                <Trophy size={36} style={{ color: passColor }} />
              ) : (
                <AlertCircle size={36} style={{ color: passColor }} />
              )}
              <div
                className="absolute inset-0 blur-2xl rounded-full opacity-20"
                style={{ backgroundColor: passColor }}
              />
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-1 uppercase">
              {isPass ? 'Mission Complete' : 'Protocol Failed'}
            </h1>
            <p className="text-[9px] font-black text-text-secondary uppercase tracking-[0.5em]">
              Alpha Intelligence Report
            </p>
          </motion.div>

          {/* Score */}
          <div className="flex justify-center gap-10 mb-12">
            <div className="text-center">
              <div className="text-[9px] font-black text-text-secondary uppercase mb-2 tracking-widest">Accuracy</div>
              <div className="text-4xl font-black tracking-tighter" style={{ color: passColor }}>
                {passScore}%
              </div>
            </div>
            <div className="w-px h-10 bg-white/8 self-center" />
            <div className="text-center">
              <div className="text-[9px] font-black text-text-secondary uppercase mb-2 tracking-widest">Result</div>
              <div className="text-xl font-black uppercase" style={{ color: passColor }}>
                {isPass ? 'Pass' : 'Fail'}
              </div>
            </div>
            <div className="w-px h-10 bg-white/8 self-center" />
            <div className="text-center">
              <div className="text-[9px] font-black text-text-secondary uppercase mb-2 tracking-widest">Score</div>
              <div className="text-xl font-black text-foreground">
                {score}
                <span className="text-text-secondary text-sm font-normal">/{shuffledQuestions.length}</span>
              </div>
            </div>
          </div>

          {/* AI report card */}
          <div className="premium-glass rounded-[14px] p-5 mb-10 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Brain size={14} className="text-primary" />
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">ALPHA REPORT</span>
            </div>
            <p className="text-sm font-bold text-foreground leading-snug mb-1">
              {isPass
                ? '최적 합격 곡선에 근접하고 있습니다. 다음 단계로 진격하십시오.'
                : `[${weakestSubject?.name || '기초영역'}] 파트 집중 보완이 필요합니다.`}
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              {isPass
                ? '전체 밸런스가 이상적입니다. 지속적인 실전 연습으로 합격을 굳히세요.'
                : `${weakestSubject?.name} 단원 오답률이 높습니다. 기출 유형 집중 학습을 권장합니다.`}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex bg-surface border border-white/8 rounded-[10px] p-1 w-fit mx-auto mb-2">
            {(['all', 'correct', 'incorrect'] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setFilter(t); setActiveReviewIdx(null); }}
                className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                  filter === t
                    ? t === 'correct'
                      ? 'bg-[#34c77b]/15 text-[#34c77b]'
                      : t === 'incorrect'
                      ? 'bg-[#f05050]/15 text-[#f05050]'
                      : 'bg-primary/15 text-primary'
                    : 'text-text-secondary hover:text-foreground'
                }`}
              >
                {t === 'all' ? '전체' : t === 'correct' ? '정답' : '오답'}
              </button>
            ))}
          </div>
        </header>

        {/* Review list */}
        <main className="w-full max-w-lg px-5 space-y-2">
          {filteredHistory.map((h, i) => {
            const q = shuffledQuestions[h.idx];
            const isActive = activeReviewIdx === h.idx;
            const correct = h.isCorrect;
            const borderColor = correct ? 'border-[#34c77b]/20' : 'border-[#f05050]/20';
            const badgeClass = correct
              ? 'bg-[#34c77b]/10 text-[#34c77b] border-[#34c77b]/20'
              : 'bg-[#f05050]/10 text-[#f05050] border-[#f05050]/20';

            return (
              <div key={h.idx}>
                <button
                  onClick={() => setActiveReviewIdx(isActive ? null : h.idx)}
                  className={`w-full text-left p-4 rounded-[14px] border transition-all duration-200 ${
                    isActive
                      ? `bg-surface-2 ${borderColor}`
                      : 'bg-surface border-white/8 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-black border ${badgeClass}`}>
                      {i + 1}
                    </div>
                    <p className={`text-[13px] font-bold leading-snug flex-1 ${isActive ? 'text-foreground' : 'text-text-secondary'}`}>
                      {q.question}
                    </p>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/8 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-background rounded-[10px] p-3 border border-white/8">
                              <span className="text-[8px] font-black text-text-secondary uppercase tracking-widest block mb-1">내 선택</span>
                              <p className={`text-xs font-bold ${correct ? 'text-[#34c77b]' : 'text-[#f05050]'}`}>
                                {h.selected !== null ? q.options[h.selected] : '(미응답)'}
                              </p>
                            </div>
                            <div className="bg-[#34c77b]/5 rounded-[10px] p-3 border border-[#34c77b]/15">
                              <span className="text-[8px] font-black text-[#34c77b] uppercase tracking-widest block mb-1">정답</span>
                              <p className="text-xs font-bold text-foreground">{q.options[q.answer]}</p>
                            </div>
                          </div>
                          <div className="p-3 rounded-[10px] bg-background border border-white/8">
                            <div className="text-[9px] font-black text-primary uppercase mb-1.5 flex items-center gap-1.5">
                              <Sparkles size={10} />해설
                            </div>
                            <p className="text-[12px] leading-relaxed text-text-secondary">{q.explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            );
          })}
        </main>

        {/* Bottom actions */}
        <div className="w-full max-w-lg px-5 mt-10 space-y-3">
          <button
            onClick={handleReset}
            className="w-full py-4 rounded-[14px] bg-primary text-black font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <RotateCcw size={18} />
            새로운 문제 도전하기
          </button>
          <Link
            href="/dashboard"
            className="w-full py-4 rounded-[14px] bg-surface border border-white/8 text-foreground font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Home size={18} />
            메인으로
          </Link>
        </div>
      </div>
    );
  }

  // ── Exam screen ────────────────────────────────────────────────
  const answeredCount = Object.values(examAnswers).filter((v) => v !== null).length;
  const timerUrgent = timeLeft < 300;

  return (
    <div className="h-[100dvh] bg-background text-foreground flex flex-col items-center overflow-hidden relative font-sans">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-full h-1/2 bg-primary/4 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="w-full max-w-2xl px-4 pt-5 pb-3 flex justify-between items-center bg-background/80 backdrop-blur-xl border-b border-white/8 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-xl bg-surface border border-white/8">
            <ChevronLeft size={16} className="text-text-secondary" />
          </Link>
          <div>
            <h2 className="text-[12px] font-black leading-none text-foreground">{certificateName}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">
                {currentQuestion?.subject}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOmrOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-surface border border-white/8 text-text-secondary active:scale-95 transition-all"
          >
            <LayoutGrid size={16} />
          </button>
          <div className={`flex items-center gap-1.5 ${timerUrgent ? 'text-[#f05050]' : 'text-text-secondary'}`}>
            <Clock size={13} />
            <span className={`text-sm font-black tracking-widest tabular-nums ${timerUrgent ? 'animate-pulse' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 w-full max-w-7xl flex overflow-hidden lg:px-6 lg:pb-6 lg:pt-4">

        {/* Question panel */}
        <main className="flex-1 flex flex-col p-4 md:p-5 lg:p-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.18 }}
              className="flex-1 flex flex-col bg-surface border border-white/8 rounded-[14px] p-5 md:p-8 overflow-hidden"
            >
              {/* Question */}
              <div className="shrink-0 mb-5 flex justify-between items-start gap-3">
                <div className="flex-1">
                  <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest block mb-2">
                    {currentIdx + 1} / {shuffledQuestions.length}
                  </span>
                  <p className="text-[15px] md:text-base font-bold leading-snug text-foreground">
                    {currentQuestion?.question}
                  </p>
                </div>
                <button
                  onClick={toggleFlag}
                  className={`p-2.5 rounded-xl border transition-all active:scale-90 shrink-0 ${
                    flaggedQuestions.has(currentIdx)
                      ? 'bg-primary/15 border-primary/30 text-primary'
                      : 'bg-surface-2 border-white/8 text-text-secondary'
                  }`}
                >
                  <Bookmark size={16} fill={flaggedQuestions.has(currentIdx) ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Options */}
              <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                {currentQuestion?.options.map((option, idx) => {
                  const isSelected = selected === idx;
                  return (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left p-4 rounded-[10px] border-2 transition-all duration-150 ${
                        isSelected
                          ? 'bg-primary/12 border-primary/50'
                          : 'bg-background border-white/8 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center text-[9px] font-black border transition-all ${
                            isSelected
                              ? 'bg-primary border-primary text-black'
                              : 'bg-surface-2 border-white/8 text-text-secondary'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className={`text-[13px] font-medium leading-tight ${isSelected ? 'text-foreground' : 'text-text-secondary'}`}>
                          {option}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="mt-5 shrink-0 flex gap-2">
                <button
                  onClick={() => {
                    if (currentIdx > 0) {
                      const n = currentIdx - 1;
                      setCurrentIdx(n);
                      setSelected(examAnswers[n] ?? null);
                    }
                  }}
                  disabled={currentIdx === 0}
                  className="px-4 py-3.5 rounded-[10px] bg-surface-2 border border-white/8 text-text-secondary hover:text-foreground disabled:opacity-30 active:scale-95 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3.5 rounded-[10px] bg-primary/10 border border-primary/25 text-primary font-black text-sm active:scale-95 flex items-center justify-center gap-2 transition-all hover:bg-primary/15"
                >
                  {currentIdx < shuffledQuestions.length - 1 ? '다음 문제' : '검토 및 제출'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-80 flex-col ml-4 bg-surface border border-white/8 rounded-[14px] p-5 overflow-hidden">
          {/* Subject tabs */}
          <div className="mb-4">
            <h3 className="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-2">과목 이동</h3>
            <div className="flex flex-wrap gap-1.5">
              {subjectGroups.map((group) => (
                <button
                  key={group.name}
                  onClick={() => { setCurrentIdx(group.startIdx); setSelected(examAnswers[group.startIdx] ?? null); }}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase transition-all border ${
                    currentQuestion?.subject === group.name
                      ? 'bg-primary border-primary text-black'
                      : 'bg-surface-2 border-white/8 text-text-secondary hover:text-foreground'
                  }`}
                >
                  {group.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid tracker */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-2">
              답안 현황 ({answeredCount}/{shuffledQuestions.length})
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {shuffledQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIdx(i); setSelected(examAnswers[i] ?? null); }}
                  className={`h-10 rounded-lg flex items-center justify-center text-[10px] font-black transition-all border ${
                    currentIdx === i
                      ? 'bg-primary border-primary text-black scale-110'
                      : flaggedQuestions.has(i)
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : examAnswers[i] !== null
                      ? 'bg-surface-2 border-white/15 text-foreground'
                      : 'bg-background border-white/8 text-text-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleFinalSubmit}
            className="mt-4 w-full py-4 rounded-[10px] bg-primary text-black font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <CheckCircle2 size={18} />
            최종 제출
          </button>
        </aside>
      </div>

      {/* OMR Modal (mobile) */}
      <AnimatePresence>
        {isOmrOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            <div className="px-5 py-4 border-b border-white/8 flex justify-between items-center">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-text-secondary">
                답안지 ({answeredCount}/{shuffledQuestions.length})
              </h3>
              <button
                onClick={() => setIsOmrOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface border border-white/8 text-[10px] font-black uppercase"
              >
                닫기
              </button>
            </div>

            {/* Subject tabs */}
            <div className="px-5 py-3 overflow-x-auto flex gap-2 border-b border-white/8 no-scrollbar">
              {subjectGroups.map((group) => (
                <button
                  key={group.name}
                  onClick={() => { setCurrentIdx(group.startIdx); setSelected(examAnswers[group.startIdx] ?? null); }}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase shrink-0 border transition-all ${
                    currentQuestion?.subject === group.name
                      ? 'bg-primary border-primary text-black'
                      : 'bg-surface border-white/8 text-text-secondary'
                  }`}
                >
                  {group.name}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid grid-cols-5 gap-3">
                {shuffledQuestions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentIdx(i); setSelected(examAnswers[i] ?? null); setIsOmrOpen(false); }}
                    className={`h-12 rounded-xl flex items-center justify-center text-xs font-black transition-all border ${
                      currentIdx === i
                        ? 'bg-primary border-primary text-black scale-105'
                        : flaggedQuestions.has(i)
                        ? 'bg-primary/10 border-primary/30 text-primary'
                        : examAnswers[i] !== null
                        ? 'bg-surface-2 border-white/15 text-foreground'
                        : 'bg-surface border-white/8 text-text-secondary'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="p-5 border-t border-white/8">
              <button
                onClick={() => { setIsOmrOpen(false); handleFinalSubmit(); }}
                className="w-full py-4 rounded-[14px] bg-primary text-black font-black text-base active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                최종 제출하기
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
    <Suspense
      fallback={
        <div className="h-[100dvh] bg-background flex items-center justify-center">
          <div className="w-10 h-10 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <StudyContent />
    </Suspense>
  );
}
