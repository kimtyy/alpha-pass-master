'use client';

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
  subjectMastery?: Record<string, { total: number, correct: number }>;
}

const STORAGE_KEY = 'alpha-pass-records';

export const StudyStorage = {
  saveRecord: (record: Omit<StudyRecord, 'id' | 'timestamp'>) => {
    if (typeof window === 'undefined') return;

    const newRecord: StudyRecord = {
      ...record,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };

    const existing = StudyStorage.getRecords();
    const updated = [newRecord, ...existing];
    
    // Keep max 50 records
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
    return newRecord;
  },

  getRecords: (): StudyRecord[] => {
    if (typeof window === 'undefined') return [];
    
    const data = localStorage.getItem(STORAGE_KEY);
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse study records', e);
      return [];
    }
  },

  getStats: () => {
    const records = StudyStorage.getRecords();
    if (records.length === 0) return null;

    const totalScore = records.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0);
    const avgScore = Math.round(totalScore / records.length);
    const bestScore = Math.max(...records.map(r => Math.round((r.score / r.totalQuestions) * 100)));
    const totalPasses = records.filter(r => r.isPass).length;

    // Subject breakdown
    const subjectMastery: Record<string, { total: number, correct: number }> = {};
    records.forEach(r => {
      // In a real scenario, we'd store subject breakdown in the record itself
      // For now, we'll use the 'weakestSubject' as a proxy for per-session insight
    });

    // Trend Tracking
    const recentScores = records.slice(0, 3).map(r => (r.score / r.totalQuestions) * 100);
    const previousScores = records.slice(3, 6).map(r => (r.score / r.totalQuestions) * 100);
    
    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (recentScores.length > 0 && previousScores.length > 0) {
      const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
      const previousAvg = previousScores.reduce((a, b) => a + b, 0) / previousScores.length;
      if (recentAvg > previousAvg + 5) trend = 'improving';
      else if (recentAvg < previousAvg - 5) trend = 'declining';
    }

    return {
      avgScore,
      bestScore,
      totalPasses,
      count: records.length,
      recent: records.slice(0, 5),
      trend,
    };
  }
};
