'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import { User, LogOut, ShieldCheck, Zap, BookOpen, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { status, login, logout, subscribe, isGuest, isMember, isPremium } = useUser();

  const statusLabel = isGuest ? 'Guest' : isMember && !isPremium ? 'Member' : 'Premium';

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-[-10%] w-[55%] h-[50%] bg-primary/5 blur-[160px] rounded-full" />
      </div>

      <div className="w-full max-w-md mx-auto px-5 pt-16 pb-40">

        {/* Avatar + Status */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-10 pt-8"
        >
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center shadow-lg shadow-primary/20">
              <User size={36} className="text-black" />
            </div>
            <span className={`absolute -bottom-2 -right-2 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide ${
              isGuest
                ? 'bg-surface-2 border border-white/8 text-text-secondary'
                : 'bg-primary text-black'
            }`}>
              {statusLabel}
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-foreground mb-0.5">
            {isGuest ? '게스트 모드' : 'Alpha Member'}
          </h1>
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.35em]">
            {isGuest ? 'Join the Elite Family' : 'Intelligence Ecosystem Active'}
          </p>
        </motion.div>

        {/* Feature list */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-surface border border-white/8 rounded-[14px] p-1 mb-4"
        >
          {[
            {
              icon: ShieldCheck,
              label: 'AI 진단 리포트',
              desc: '시험 후 약점 분석',
              active: !isGuest,
              color: 'text-primary',
              bg: 'bg-primary/10',
              href: '/records',
            },
            {
              icon: BookOpen,
              label: '학습 기록',
              desc: '합격 데이터 영구 저장',
              active: isMember || isPremium,
              color: 'text-[#34c77b]',
              bg: 'bg-[#34c77b]/10',
              href: '/records',
            },
            {
              icon: Zap,
              label: '프리미엄 분석',
              desc: '과목별 마스터리 차트',
              active: isPremium,
              color: 'text-primary',
              bg: 'bg-primary/10',
              href: null,
            },
          ].map((item) => {
            const inner = (
              <>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}>
                  <item.icon size={18} className={item.color} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground leading-none mb-0.5">{item.label}</p>
                  <p className="text-[10px] text-text-secondary">{item.desc}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                    item.active
                      ? 'bg-[#34c77b]/10 text-[#34c77b]'
                      : 'bg-white/5 text-text-secondary/50'
                  }`}>
                    {item.active ? 'ON' : 'OFF'}
                  </span>
                  {item.href && (
                    <ChevronRight size={14} className="text-text-secondary/40" />
                  )}
                </div>
              </>
            );
            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3.5 rounded-[10px] hover:bg-white/5 transition-colors"
              >
                {inner}
              </Link>
            ) : (
              <div key={item.label} className="flex items-center gap-3 px-4 py-3.5 rounded-[10px]">
                {inner}
              </div>
            );
          })}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-3"
        >
          {isGuest && (
            <button
              onClick={login}
              className="w-full py-4 rounded-[14px] bg-primary text-black font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <ArrowRight size={18} />
              Google로 1초 로그인
            </button>
          )}

          {!isGuest && !isPremium && (
            <button
              onClick={subscribe}
              className="w-full py-4 rounded-[14px] bg-primary text-black font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <Zap size={18} className="fill-current" />
              프리미엄 업그레이드
            </button>
          )}

          {!isGuest && (
            <button
              onClick={logout}
              className="w-full py-4 rounded-[14px] bg-surface border border-white/8 text-text-secondary font-bold text-sm flex items-center justify-center gap-2 hover:border-[#f05050]/30 hover:text-[#f05050] active:scale-95 transition-all"
            >
              <LogOut size={16} />
              로그아웃
            </button>
          )}
        </motion.div>

        {!isGuest && (
          <p className="text-center text-[10px] text-text-secondary/50 mt-8 font-medium">
            support@alphapass.master
          </p>
        )}
      </div>
    </div>
  );
}
