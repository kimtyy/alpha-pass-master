'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, History, User, Zap } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export function FloatingNav() {
  const pathname = usePathname();
  const { isPremium, isLoaded } = useUser();

  // Hide on study page to maintain focus
  if (pathname === '/study') return null;

  const navItems = [
    { icon: Search, label: 'Explore', href: '/dashboard' },
    { icon: History, label: 'My Pass', href: '/records', premium: true },
    { icon: User, label: 'Account', href: '/account' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-fit px-4">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#121216]/80 backdrop-blur-3xl border border-white/10 rounded-full p-2 flex items-center gap-1 shadow-2xl shadow-black/50"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-full flex items-center gap-2 transition-all group ${
                  isActive 
                    ? 'bg-white text-black font-black' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-black' : 'group-hover:text-primary transition-colors'} />
                <span className={`text-xs font-bold tracking-tight ${isActive ? 'block' : 'hidden md:block'}`}>
                  {item.label}
                </span>
                
                {item.premium && isLoaded && !isPremium && (
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20" />
                      <div className="bg-accent text-black p-1 rounded-full border border-black/20">
                        <Zap size={8} className="fill-current" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
