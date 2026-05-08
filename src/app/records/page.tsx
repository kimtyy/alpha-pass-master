'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import {
  Lock, Zap, TrendingUp, TrendingDown, Minus,
  Activity, ArrowRight, Target, Award, BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { StudyStorage, StudyRecord } from '@/lib/storage';

function pct(r: StudyRecord) {
  return Math.round((r.score / r.totalQuestions) * 100);
}

export default function RecordsPage() {
  const { isMember, isLoaded, login } = useUser();
  const [records, setRecords] = React.useState<StudyRecord[]>([]);
  const [stats, setStats] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      const [data, s] = await Promise.all([
        StudyStorage.getRecords(),
        StudyStorage.getStats(),
      ]);
      setRecords(data);
      setStats(s);
    })();
  }, [isMember]);

  if (!isLoaded) return null;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute bottom-0 left-[-5%] w-[50%] h-[40%] bg-[#34c77b]/4 blur-[140px] rounded-full" />
      </div>

      <div className="w-full max-w-md mx-auto px-5 pt-16 pb-40">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-8 mb-10"
        >
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-1">My Pass</h1>
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.35em]">
            Continuous Mastery Records
          </p>
        </motion.div>

        {/* Login gate */}
        {!isMember ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-white/8 rounded-[14px] p-8 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />
            <div className="w-16 h-16 rounded-[20px] bg-surface-2 border border-white/8 flex items-center justify-center mx-auto mb-6">
              <Lock size={28} className="text-text-secondary" />
            </div>
            <h2 className="text-xl font-black mb-3 leading-tight">
              학습 기록은<br />
              <span className="text-primary">로그인 후</span> 이용 가능합니다
            </h2>
            <p className="text-text-secondary text-xs leading-relaxed mb-8 max-w-[260px] mx-auto">
              모든 기기에서 합격 데이터를 영구 저장하고<br />AI 분석 리포트를 받아보세요.
            </p>
            <button
              onClick={login}
              className="w-full py-4 rounded-[14px] bg-primary text-black font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <Zap size={16} className="fill-current" />
              Google로 로그인하기
            </button>
          </motion.div>
        ) : records.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface border border-white/8 rounded-[14px] p-10 text-center"
          >
            <Activity size={32} className="mx-auto mb-4 text-text-secondary opacity-50" />
            <h3 className="text-sm font-bold text-foreground mb-2">아직 학습 기록이 없습니다</h3>
            <p className="text-[11px] text-text-secondary mb-8 leading-relaxed">
              모의고사를 완료하면 여기에<br />합격 데이터가 기록됩니다
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black text-[11px] font-black rounded-[10px] active:scale-95 transition-all"
            >
              학습 시작하기 <ArrowRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Stats grid */}
            <section className="grid grid-cols-2 gap-3">
              <div className="bg-surface border border-white/8 rounded-[14px] p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <Target size={11} className="text-text-secondary" />
                  <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">평균 점수</span>
                </div>
                <div className="text-3xl font-black text-primary tracking-tighter">
                  {stats?.avgScore ?? 0}%
                </div>
              </div>
              <div className="bg-surface border border-white/8 rounded-[14px] p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <Award size={11} className="text-text-secondary" />
                  <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">최고 점수</span>
                </div>
                <div className="text-3xl font-black text-[#34c77b] tracking-tighter">
                  {stats?.bestScore ?? 0}%
                </div>
              </div>
              <div className="bg-surface border border-white/8 rounded-[14px] p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <BarChart3 size={11} className="text-text-secondary" />
                  <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">합격 횟수</span>
                </div>
                <div className="text-3xl font-black text-foreground tracking-tighter">
                  {stats?.totalPasses ?? 0}
                  <span className="text-sm text-text-secondary ml-1 font-bold">회</span>
                </div>
              </div>
              <div className="bg-surface border border-white/8 rounded-[14px] p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  {stats?.trend === 'improving' ? (
                    <TrendingUp size={11} className="text-[#34c77b]" />
                  ) : stats?.trend === 'declining' ? (
                    <TrendingDown size={11} className="text-[#f05050]" />
                  ) : (
                    <Minus size={11} className="text-text-secondary" />
                  )}
                  <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">추이</span>
                </div>
                <div className={`text-lg font-black tracking-tight ${
                  stats?.trend === 'improving'
                    ? 'text-[#34c77b]'
                    : stats?.trend === 'declining'
                    ? 'text-[#f05050]'
                    : 'text-text-secondary'
                }`}>
                  {stats?.trend === 'improving' ? '상승 중' : stats?.trend === 'declining' ? '하락 중' : '안정'}
                </div>
              </div>
            </section>

            {/* Records list */}
            <section>
              <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3">
                Activity History
              </h3>
              <div className="space-y-2">
                {records.map((record, idx) => {
                  const score = pct(record);
                  const pass = record.isPass;
                  return (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="bg-surface border border-white/8 rounded-[14px] p-4 flex items-center gap-4"
                    >
                      {/* Score badge */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                        pass
                          ? 'bg-[#34c77b]/10 text-[#34c77b] border border-[#34c77b]/20'
                          : 'bg-[#f05050]/10 text-[#f05050] border border-[#f05050]/20'
                      }`}>
                        {score}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate leading-none mb-1">
                          {record.subjectTitle}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                            pass
                              ? 'bg-[#34c77b]/10 text-[#34c77b]'
                              : 'bg-[#f05050]/10 text-[#f05050]'
                          }`}>
                            {pass ? 'PASS' : 'FAIL'}
                          </span>
                          <span className="text-[10px] text-text-secondary">
                            {new Date(record.timestamp).toLocaleDateString('ko-KR', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Score fraction */}
                      <div className="text-right shrink-0">
                        <p className="text-xs font-black text-foreground">
                          {record.score}
                          <span className="text-text-secondary font-normal">/{record.totalQuestions}</span>
                        </p>
                        {record.weakestSubject && (
                          <p className="text-[9px] text-text-secondary mt-0.5 max-w-[80px] truncate text-right">
                            {record.weakestSubject}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
