"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ChevronRight } from 'lucide-react';
import { EXAM_DATA } from '@/data/exams';
import Link from 'next/link';

const CATEGORY_LABEL: Record<string, string> = {
  Engineer: '기사',
  Craftsman: '기능사',
  Professional: '전문자격',
};

const CATEGORY_COLOR: Record<string, string> = {
  Engineer: 'text-primary bg-primary/10 border-primary/20',
  Craftsman: 'text-[#34c77b] bg-[#34c77b]/10 border-[#34c77b]/20',
  Professional: 'text-[#888899] bg-white/5 border-white/10',
};

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const subjects = useMemo(() => Object.values(EXAM_DATA), []);

  const filtered = useMemo(() => {
    let list = subjects;
    if (activeCategory) list = list.filter((s) => s.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q),
      );
    }
    return list;
  }, [subjects, search, activeCategory]);

  const categories = ['Engineer', 'Craftsman', 'Professional'];

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#34c77b]/3 blur-[130px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl mx-auto px-5 pt-16 pb-40">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-black tracking-[0.2em] bg-gradient-to-b from-foreground to-foreground/30 bg-clip-text text-transparent uppercase mb-1">
            ALPHA PASS
          </h1>
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.35em]">
            자격증 합격 인텔리전스
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-6 group"
        >
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors duration-200"
          />
          <input
            type="search"
            placeholder="자격증 검색..."
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-white/8 rounded-[14px] py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-text-secondary focus:outline-none focus:border-primary/40 focus:bg-surface-2 transition-all"
          />
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex gap-2 mb-8 flex-wrap"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
              !activeCategory
                ? 'bg-primary text-black border-primary'
                : 'bg-surface border-white/8 text-text-secondary hover:text-foreground'
            }`}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                activeCategory === cat
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-surface border-white/8 text-text-secondary hover:text-foreground'
              }`}
            >
              {CATEGORY_LABEL[cat]}
            </button>
          ))}
        </motion.div>

        {/* Certificate cards */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-text-secondary"
            >
              <p className="text-sm font-bold">검색 결과가 없습니다</p>
              <p className="text-[11px] mt-1 opacity-60">다른 키워드로 검색해보세요</p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {filtered.map((sub, idx) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                >
                  <Link
                    href={`/study?id=${sub.id}`}
                    className="flex items-center justify-between p-4 bg-surface border border-white/8 rounded-[14px] hover:bg-surface-2 hover:border-primary/25 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-2 border border-white/8 flex items-center justify-center text-[11px] font-black text-text-secondary group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                          {sub.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wide ${CATEGORY_COLOR[sub.category]}`}>
                            {CATEGORY_LABEL[sub.category]}
                          </span>
                          <span className="text-[10px] text-text-secondary">
                            {sub.questions.length}문항
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-text-secondary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-15">
        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-text-secondary whitespace-nowrap">
          Inspired by UniBook 1998
        </p>
      </div>
    </div>
  );
}
