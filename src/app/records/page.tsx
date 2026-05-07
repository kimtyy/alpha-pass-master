'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import { History, Lock, Zap, BookOpen, Star, TrendingUp, Calendar, ChevronRight, BarChart3, Target, Activity } from 'lucide-react';
import Link from 'next/link';
import { StudyStorage, StudyRecord } from '@/lib/storage';
import { AIAssistant } from '@/components/AIAssistant';

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
    <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center pt-24 pb-48 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <header className="pt-20 pb-10 px-6 text-center shrink-0">
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-black tracking-tighter"
          >
            My Pass
          </motion.h1>
          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
            <History size={20} />
          </div>
        </div>
        <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.4em]">
          Continuous Mastery Records
        </p>
      </header>

      <main className="w-full max-w-lg px-6 pb-40">
        {!isMember ? (
          /* LOGIN GATE */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0d0d12]/80 border border-white/10 rounded-[40px] p-10 backdrop-blur-3xl text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 text-gray-700 shadow-inner">
              <Lock size={40} />
            </div>

            <h2 className="text-2xl font-black mb-6 leading-tight">학습 기록은<br/><span className="text-accent">로그인 후</span> 이용 가능합니다</h2>
            <p className="text-gray-500 text-xs leading-relaxed mb-10 max-w-[280px] mx-auto">
              구글 계정으로 로그인하면 모든 기기에서 합격 데이터를 영구 저장하고 분석할 수 있습니다.
            </p>

            <button
              onClick={login}
              className="w-full py-5 rounded-3xl bg-accent text-black font-black flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-2xl shadow-accent/20 active:scale-95"
            >
              <Zap size={18} className="fill-current" />
              Google로 로그인하기
            </button>
          </motion.div>
        ) : (
          /* MEMBER CONTENT (HISTORY) */
          records.length === 0 ? (
            <div className="text-center py-20 px-10 bg-white/[0.02] border border-white/5 rounded-[40px]">
              <Activity size={40} className="mx-auto mb-4 text-gray-700" />
              <h3 className="text-sm font-bold text-gray-400 mb-2">아직 학습 기록이 없습니다</h3>
              <p className="text-[10px] text-gray-600 mb-8 uppercase tracking-widest leading-relaxed">
                모의고사나 훈련을 시작하여<br/>합격 데이터를 쌓아보세요
              </p>
              <Link href="/dashboard" className="inline-flex px-8 py-3 bg-white text-black text-[10px] font-black rounded-xl uppercase tracking-tighter">
                학습 시작하기
              </Link>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
              {/* Stats Summary Area */}
              <section className="grid grid-cols-2 gap-4">
                <div className="bg-[#12121a] border border-white/5 rounded-[32px] p-6 group hover:border-primary/40 transition-all duration-500">
                  <div className="text-[9px] font-black text-gray-500 uppercase mb-2 tracking-widest flex items-center gap-1.5">
                    <Target size={10} />
                    Avg Rate
                  </div>
                  <div className="text-3xl font-black text-primary tracking-tighter">{stats?.avgScore || 0}%</div>
                </div>
                <div className="bg-[#12121a] border border-white/5 rounded-[32px] p-6 group hover:border-accent/40 transition-all duration-500">
                  <div className="text-[9px] font-black text-gray-500 uppercase mb-2 tracking-widest flex items-center gap-1.5">
                    <Star size={10} />
                    Top Rate
                  </div>
                  <div className="text-3xl font-black text-accent tracking-tighter">{stats?.bestScore || 0}%</div>
                </div>
              </section>

              {/* Management Insight Area */}
              <section className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Master Management Console</h3>
                  <TrendingUp size={14} className="text-secondary" />
                </div>
                <AIAssistant
                  staffId="kidari"
                  message={records.length > 2
                    ? `지속적 관리 데이터 ${records.length}건이 확보되었습니다. 현재 평균 정답률은 ${stats?.avgScore}%이며, 성적 추이는 '${stats?.trend === 'improving' ? '상승세' : stats?.trend === 'declining' ? '하락세' : '안정적'}'입니다. ${stats?.trend === 'improving' ? '흐름이 좋습니다. 이대로 정진하십시오.' : '패턴 분석이 필요합니다. 취약 단원을 집중 보완하십시오.'}`
                    : "데이터가 아직 부족합니다. 최소 3회 이상의 모의고사를 통해 정밀한 합격 곡선을 설계하십시오."
                  }
                  context="exam"
                />
              </section>

              {/* Recent History List */}
              <section className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Activity History</h3>
                  <Link href="#" className="text-[9px] font-black text-gray-600 uppercase hover:text-white transition-colors">See All</Link>
                </div>

                <div className="space-y-3">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 flex items-center justify-between group hover:bg-white/[0.05] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                          record.isPass ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {Math.round((record.score / record.totalQuestions) * 100)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm tracking-tight text-gray-200">{record.subjectTitle}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${record.mode === 'exam' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                              {record.mode}
                            </span>
                            <span className="text-[10px] text-gray-600 font-medium">
                              {new Date(record.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Weakness</span>
                        <span className="text-[10px] font-bold text-gray-400">{record.weakestSubject || '-'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )
        )}
      </main>
    </div>
  );
}
