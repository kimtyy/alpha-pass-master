'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import { User, LogIn, LogOut, ShieldCheck, Zap, Mail, ChevronRight, Star, Award } from 'lucide-react';

export default function AccountPage() {
  const { status, login, logout, subscribe, isGuest, isMember, isPremium } = useUser();

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center pt-24 pb-40 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <header className="pt-20 pb-10 px-6 text-center shrink-0">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl relative"
        >
          <User size={48} className="text-white" />
          <div className="absolute inset-0 blur-3xl bg-primary rounded-full opacity-20 animate-pulse" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-black tracking-tighter mb-2"
        >
          {status === 'guest' ? 'Alpha Guest' : status === 'member' ? 'Alpha Member' : 'Alpha Premium'}
        </motion.h1>
        <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.4em]">
          Join the Elite Family
        </p>
      </header>

      <main className="w-full max-w-lg px-6 pb-40">
        {/* Membership Card */}
        <section className="bg-[#12121a]/60 border border-white/5 rounded-[40px] p-8 backdrop-blur-3xl relative overflow-hidden group mb-8">
          <div className="absolute top-0 right-0 p-6">
            <div className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter ${
              isGuest ? 'bg-white/10 text-white' : 'bg-primary text-white'
            }`}>
              {status}
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-200">AI Diagnostic Core</h4>
                <p className="text-[10px] text-gray-500">{isGuest ? 'Gated' : 'Active'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-200">Continuous Mastery</h4>
                <p className="text-[10px] text-gray-500">{isPremium ? 'Active' : 'Gated'}</p>
              </div>
            </div>
          </div>

          {!isPremium && (
            <button 
              onClick={subscribe}
              className="w-full py-4 rounded-2xl bg-accent text-black font-black text-sm flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-95 shadow-xl shadow-accent/20"
            >
              <Zap size={16} className="fill-current" />
              프리미엄 멤버십 업그레이드
            </button>
          )}
        </section>

        {isGuest && (
          <button 
            onClick={login}
            className="w-full py-5 rounded-3xl bg-white text-black font-black text-base flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-95 group shadow-2xl"
          >
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            1초 회원가입 / 로그인
          </button>
        )}

        {!isGuest && (
          <div className="pt-8 text-center">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-4">You are now part of the intelligence ecosystem.</p>
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
