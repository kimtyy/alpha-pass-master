'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import { User, LogIn, LogOut, ShieldCheck, Zap, Mail, ChevronRight, Star, Award } from 'lucide-react';

export default function AccountPage() {
  const { status, login, logout, subscribe, isGuest, isMember, isPremium } = useUser();

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center px-6 pt-24 pb-40 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <header className="w-full max-w-sm text-center mb-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl relative"
        >
          <User size={48} className="text-white relative z-10" />
          {isPremium && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-[-4px] border border-accent/30 rounded-[36px] border-dashed"
            />
          )}
        </motion.div>
        <h1 className="text-3xl font-black tracking-tighter mb-2">
          {isGuest ? 'Alpha Guest' : isPremium ? 'Premium Alpha' : 'Alpha Member'}
        </h1>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
          {isGuest ? 'Join the Elite Family' : 'Elite Intelligence Active'}
        </p>
      </header>

      <main className="w-full max-w-sm space-y-6">
        {/* Current Plan Card */}
        <section className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 backdrop-blur-3xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Membership Tier</span>
            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${
              isPremium ? 'bg-accent text-black' : 'bg-primary/20 text-primary'
            }`}>
              {status}
            </span>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">AI Diagnostic Core</h3>
                <p className="text-[10px] text-gray-500">{isGuest ? 'Gated' : 'Active'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent border border-white/5">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">Continuous Mastery</h3>
                <p className="text-[10px] text-gray-500">{isPremium ? 'Active' : 'Gated'}</p>
              </div>
            </div>
          </div>

          {!isPremium && (
            <button 
              onClick={subscribe}
              className="w-full py-4 rounded-2xl bg-accent text-black font-black text-xs hover:scale-[1.02] transition-transform shadow-xl flex items-center justify-center gap-2"
            >
              <Star size={14} className="fill-current" />
              프리미엄 멤버십 업그레이드
            </button>
          )}
        </section>

        {/* Action Buttons */}
        <section className="space-y-3 pt-4">
          {isGuest ? (
            <button 
              onClick={login}
              className="w-full py-5 rounded-[28px] bg-white text-black font-black text-base flex items-center justify-center gap-3 shadow-2xl hover:bg-primary hover:text-white transition-all group"
            >
              <LogIn size={20} />
              1초 회원가입 / 로그인
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              onClick={logout}
              className="w-full py-5 rounded-[28px] bg-white/5 border border-white/10 text-gray-400 font-black text-base flex items-center justify-center gap-3 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
            >
              <LogOut size={20} />
              로그아웃
            </button>
          )}

          <div className="pt-6 text-center">
            <p className="text-[10px] text-gray-600 font-medium">관리자의 도움이 필요하신가요?</p>
            <button className="text-[10px] text-primary font-bold underline mt-1">support@alphapass.master</button>
          </div>
        </section>
      </main>

      {/* Decorative Accents */}
      {isPremium && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[50%] bg-accent/5 blur-[150px] -z-20 rotate-12"
        />
      )}
    </div>
  );
}
