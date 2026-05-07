'use client';

import { createClient } from '@/lib/supabase/client';

// ── 공용 인터페이스 (기존 코드와 호환 유지) ─────────────────────
export interface StudyRecord {
  id: string;
  subjectId: string;
  subjectTitle: string;
  score: number;
  totalQuestions: number;
  isPass: boolean;
  timestamp: number;
  mode: 'training' | 'exam';
  weakestSubject: string;
  blindspots: number;
  luckyStrikes: number;
  subjectMastery?: Record<string, { total: number; correct: number }>;
}

// session_answers INSERT 시 함께 전달하는 형태
export interface SessionAnswerInput {
  question_id: string;   // questions 테이블 UUID
  user_answer: number;   // 선택한 인덱스 (0-3)
  is_correct: boolean;
  time_spent?: number;   // 초 단위
}

// ── localStorage 폴백 키 ──────────────────────────────────────
const FALLBACK_KEY = 'alpha-pass-records';

// ── 헬퍼: localStorage 읽기 ───────────────────────────────────
function readLocal(): StudyRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(FALLBACK_KEY) || '[]');
  } catch {
    return [];
  }
}

// ── 헬퍼: subjectMastery 변환 ─────────────────────────────────
// DB: { "과목명": 0.85 }  ↔  앱: { "과목명": { total: n, correct: n } }
function masteryToRatio(
  mastery: Record<string, { total: number; correct: number }>,
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(mastery).map(([sub, s]) => [
      sub,
      s.total > 0 ? s.correct / s.total : 0,
    ]),
  );
}

function ratioToMastery(
  ratio: Record<string, number>,
): Record<string, { total: number; correct: number }> {
  return Object.fromEntries(
    Object.entries(ratio).map(([sub, r]) => [sub, { total: 1, correct: r }]),
  );
}

// ── StudyStorage ──────────────────────────────────────────────
export const StudyStorage = {
  /**
   * 세션 저장
   * - 로그인 상태: Supabase study_sessions + session_answers
   * - 비로그인:    localStorage fallback
   */
  saveRecord: async (
    record: Omit<StudyRecord, 'id' | 'timestamp'>,
    answers: SessionAnswerInput[] = [],
  ): Promise<string | null> => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // ── Supabase 경로 ─────────────────────────────────────────
    if (user) {
      // 자격증 ID 조회
      const { data: cert } = await supabase
        .from('certificates')
        .select('id')
        .eq('slug', record.subjectId)
        .single();

      if (!cert) return null;

      const { data: session, error } = await supabase
        .from('study_sessions')
        .insert({
          user_id: user.id,
          certificate_id: cert.id,
          mode: record.mode,
          score: record.score,
          total: record.totalQuestions,
          passed: record.isPass,
          subject_mastery: record.subjectMastery
            ? masteryToRatio(record.subjectMastery)
            : null,
        })
        .select('id')
        .single();

      if (error || !session) {
        console.error('saveRecord error:', error);
        return null;
      }

      // 개별 답변 저장 (트리거가 wrong_answers 자동 처리)
      if (answers.length > 0) {
        const { error: answerError } = await supabase
          .from('session_answers')
          .insert(
            answers.map((a) => ({ ...a, session_id: session.id })),
          );
        if (answerError) console.error('saveAnswers error:', answerError);
      }

      return session.id;
    }

    // ── localStorage 폴백 ─────────────────────────────────────
    const newRecord: StudyRecord = {
      ...record,
      id: Math.random().toString(36).slice(2, 11),
      timestamp: Date.now(),
    };
    const updated = [newRecord, ...readLocal()].slice(0, 50);
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(updated));
    return newRecord.id;
  },

  /**
   * 기록 목록 조회
   * - 로그인: Supabase (최근 50개)
   * - 비로그인: localStorage
   */
  getRecords: async (): Promise<StudyRecord[]> => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('study_sessions')
        .select(
          'id, mode, score, total, passed, created_at, subject_mastery, certificates(slug, name)',
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error || !data) return [];

      return data.map((s: any) => ({
        id: s.id,
        subjectId: s.certificates?.slug ?? '',
        subjectTitle: s.certificates?.name ?? '',
        score: s.score,
        totalQuestions: s.total,
        isPass: s.passed,
        timestamp: new Date(s.created_at).getTime(),
        mode: s.mode,
        weakestSubject: '',
        blindspots: 0,
        luckyStrikes: 0,
        subjectMastery: s.subject_mastery
          ? ratioToMastery(s.subject_mastery)
          : undefined,
      }));
    }

    return readLocal();
  },

  /**
   * 통계 계산 (기존 getStats 와 동일한 반환 형태)
   */
  getStats: async () => {
    const records = await StudyStorage.getRecords();
    if (records.length === 0) return null;

    const pct = (r: StudyRecord) =>
      Math.round((r.score / r.totalQuestions) * 100);
    const scores = records.map(pct);

    const avgScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length,
    );
    const bestScore = Math.max(...scores);
    const totalPasses = records.filter((r) => r.isPass).length;

    const recentAvg =
      scores.slice(0, 3).reduce((a, b) => a + b, 0) /
      Math.max(scores.slice(0, 3).length, 1);
    const prevAvg =
      scores.slice(3, 6).reduce((a, b) => a + b, 0) /
      Math.max(scores.slice(3, 6).length, 1);

    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (scores.length >= 4) {
      if (recentAvg > prevAvg + 5) trend = 'improving';
      else if (recentAvg < prevAvg - 5) trend = 'declining';
    }

    return {
      avgScore,
      bestScore,
      totalPasses,
      count: records.length,
      recent: records.slice(0, 5),
      trend,
    };
  },
};
