// ================================================================
// Alpha Pass Master — Database Types (스키마 자동 반영)
// supabase gen types typescript 로 재생성 가능
// ================================================================

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Category = 'Engineer' | 'Craftsman' | 'Professional'
export type StudyMode = 'training' | 'exam'
export type MediaType = 'text' | 'photo' | 'video' | 'illustration'

// ── Row 타입 (DB에서 읽을 때) ─────────────────────────────────

export interface Certificate {
  id: string
  slug: string
  name: string
  category: Category
  field: string
  is_active: boolean
  created_at: string
}

export interface ExamSubjectRow {
  id: string
  certificate_id: string
  name: string
  order_index: number
  target_per_round: number
  created_at: string
}

export interface ExamRound {
  id: string
  certificate_id: string
  year: number
  round: number
  exam_date: string | null
  total_questions: number | null
  created_at: string
}

export interface Question {
  id: string
  certificate_id: string
  exam_round_id: string | null
  exam_subject_id: string
  question_number: number | null
  content: string
  answer_index: number
  explanation: string | null
  media_type: MediaType | null
  media_url: string | null
  diagnostic_correct: string | null
  diagnostic_incorrect: string | null
  created_at: string
}

export interface Option {
  id: string
  question_id: string
  order_index: number
  content: string
}

export interface StudySession {
  id: string
  user_id: string
  certificate_id: string
  exam_round_id: string | null
  mode: StudyMode
  score: number
  total: number
  passed: boolean
  time_spent: number | null
  subject_mastery: Record<string, number> | null
  created_at: string
}

export interface SessionAnswer {
  id: string
  session_id: string
  question_id: string
  user_answer: number
  is_correct: boolean
  time_spent: number | null
  created_at: string
}

export interface WrongAnswer {
  id: string
  user_id: string
  question_id: string
  wrong_count: number
  last_wrong_at: string
  last_session_id: string | null
  memo: string | null
  is_resolved: boolean
  created_at: string
  updated_at: string
}

// ── Insert 타입 (DB에 쓸 때, id/created_at 제외) ─────────────

export type InsertStudySession = Omit<StudySession, 'id' | 'created_at'>
export type InsertSessionAnswer = Omit<SessionAnswer, 'id' | 'created_at'>
export type InsertWrongAnswer   = Omit<WrongAnswer, 'id' | 'created_at' | 'updated_at'>

// ── Update 타입 ───────────────────────────────────────────────

export type UpdateWrongAnswer = Partial<Pick<WrongAnswer, 'memo' | 'is_resolved'>>

// ── Join 타입 (쿼리에서 함께 가져올 때) ─────────────────────

export interface QuestionWithOptions extends Question {
  options: Option[]
}

export interface QuestionWithContext extends QuestionWithOptions {
  exam_subjects: Pick<ExamSubjectRow, 'name' | 'order_index'>
  exam_rounds:   Pick<ExamRound, 'year' | 'round'> | null
}

export interface WrongAnswerWithQuestion extends WrongAnswer {
  questions: QuestionWithOptions
}

export interface StudySessionWithAnswers extends StudySession {
  session_answers: SessionAnswer[]
}

// ── Database 타입 맵 (Supabase client generic용) ─────────────

export interface Database {
  public: {
    Tables: {
      certificates: {
        Row:    Certificate
        Insert: Omit<Certificate, 'id' | 'created_at'>
        Update: Partial<Omit<Certificate, 'id' | 'created_at'>>
      }
      exam_subjects: {
        Row:    ExamSubjectRow
        Insert: Omit<ExamSubjectRow, 'id' | 'created_at'>
        Update: Partial<Omit<ExamSubjectRow, 'id' | 'created_at'>>
      }
      exam_rounds: {
        Row:    ExamRound
        Insert: Omit<ExamRound, 'id' | 'created_at'>
        Update: Partial<Omit<ExamRound, 'id' | 'created_at'>>
      }
      questions: {
        Row:    Question
        Insert: Omit<Question, 'id' | 'created_at'>
        Update: Partial<Omit<Question, 'id' | 'created_at'>>
      }
      options: {
        Row:    Option
        Insert: Omit<Option, 'id'>
        Update: Partial<Omit<Option, 'id'>>
      }
      study_sessions: {
        Row:    StudySession
        Insert: InsertStudySession
        Update: Partial<InsertStudySession>
      }
      session_answers: {
        Row:    SessionAnswer
        Insert: InsertSessionAnswer
        Update: Partial<InsertSessionAnswer>
      }
      wrong_answers: {
        Row:    WrongAnswer
        Insert: InsertWrongAnswer
        Update: UpdateWrongAnswer
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      category:   Category
      study_mode: StudyMode
      media_type: MediaType
    }
  }
}
