import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  Database,
  QuestionWithOptions,
  WrongAnswerWithQuestion,
  InsertStudySession,
  InsertSessionAnswer,
} from '../../types/database'

type Client = SupabaseClient<Database>

// ── 자격증 ────────────────────────────────────────────────────

export async function getCertificates(db: Client) {
  const { data, error } = await db
    .from('certificates')
    .select('*')
    .eq('is_active', true)
    .order('name')
  if (error) throw error
  return data
}

// ── 문제 조회 ─────────────────────────────────────────────────

/** 자격증의 전체 문제 + 보기 (문제 은행) */
export async function getQuestionsByCertificate(
  db: Client,
  certificateSlug: string,
): Promise<QuestionWithOptions[]> {
  const { data, error } = await db
    .from('questions')
    .select(`
      *,
      options ( id, order_index, content ),
      exam_subjects!inner ( certificate_id, certificates!inner ( slug ) )
    `)
    .eq('exam_subjects.certificates.slug', certificateSlug)
    .order('created_at')
  if (error) throw error
  return data as QuestionWithOptions[]
}

/** 특정 회차 문제 + 보기 */
export async function getQuestionsByRound(
  db: Client,
  certificateSlug: string,
  year: number,
  round: number,
): Promise<QuestionWithOptions[]> {
  const { data, error } = await db
    .from('questions')
    .select(`
      *,
      options ( id, order_index, content ),
      exam_rounds!inner ( year, round, certificates!inner ( slug ) )
    `)
    .eq('exam_rounds.certificates.slug', certificateSlug)
    .eq('exam_rounds.year', year)
    .eq('exam_rounds.round', round)
    .order('question_number')
  if (error) throw error
  return data as QuestionWithOptions[]
}

// ── 학습 세션 ─────────────────────────────────────────────────

/** 세션 저장 + 개별 답변 일괄 저장 (트랜잭션 대용) */
export async function saveStudySession(
  db: Client,
  session: InsertStudySession,
  answers: Omit<InsertSessionAnswer, 'session_id'>[],
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: sessionData, error: sessionError } = await (db as any)
    .from('study_sessions')
    .insert(session)
    .select('id')
    .single()
  if (sessionError) throw sessionError

  const sessionId = (sessionData as { id: string }).id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: answersError } = await (db as any)
    .from('session_answers')
    .insert(answers.map((a) => ({ ...a, session_id: sessionId })))
  if (answersError) throw answersError

  // wrong_answers는 트리거(fn_upsert_wrong_answer)가 자동 처리
  return sessionId
}

/** 내 학습 기록 목록 (최근 20개) */
export async function getMySessions(db: Client, userId: string) {
  const { data, error } = await db
    .from('study_sessions')
    .select(`
      id, mode, score, total, passed, time_spent, created_at,
      certificates ( slug, name )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)
  if (error) throw error
  return data
}

// ── 오답노트 ──────────────────────────────────────────────────

/** 미해결 오답 목록 + 문제 상세 */
export async function getWrongAnswers(
  db: Client,
  userId: string,
  certificateSlug?: string,
): Promise<WrongAnswerWithQuestion[]> {
  let query = db
    .from('wrong_answers')
    .select(`
      *,
      questions (
        *,
        options ( id, order_index, content ),
        exam_subjects ( name )
      )
    `)
    .eq('user_id', userId)
    .eq('is_resolved', false)
    .order('last_wrong_at', { ascending: false })

  if (certificateSlug) {
    // certificate slug 필터는 questions → exam_subjects → certificates join 필요
    query = query.eq('questions.exam_subjects.certificates.slug', certificateSlug)
  }

  const { data, error } = await query
  if (error) throw error
  return data as WrongAnswerWithQuestion[]
}

/** 오답 해결됨 표시 */
export async function resolveWrongAnswer(
  db: Client,
  userId: string,
  questionId: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (db as any)
    .from('wrong_answers')
    .update({ is_resolved: true })
    .eq('user_id', userId)
    .eq('question_id', questionId)
  if (error) throw error
}

/** 오답노트 메모 저장 */
export async function updateWrongAnswerMemo(
  db: Client,
  userId: string,
  questionId: string,
  memo: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (db as any)
    .from('wrong_answers')
    .update({ memo })
    .eq('user_id', userId)
    .eq('question_id', questionId)
  if (error) throw error
}

// ── 통계 ──────────────────────────────────────────────────────

/** 자격증별 과목 마스터리 집계 (최근 5회 평균) */
export async function getSubjectMastery(
  db: Client,
  userId: string,
  certificateSlug: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any)
    .from('study_sessions')
    .select('subject_mastery, created_at, certificates!inner(slug)')
    .eq('user_id', userId)
    .eq('certificates.slug', certificateSlug)
    .order('created_at', { ascending: false })
    .limit(5)
  if (error) throw error

  const rows = data as Array<{ subject_mastery: Record<string, number> | null }>
  if (!rows.length) return null

  const merged: Record<string, number[]> = {}
  rows.forEach((s) => {
    if (!s.subject_mastery) return
    Object.entries(s.subject_mastery).forEach(([subject, score]) => {
      merged[subject] = [...(merged[subject] ?? []), score as number]
    })
  })

  return Object.fromEntries(
    Object.entries(merged).map(([subject, scores]) => [
      subject,
      scores.reduce((a, b) => a + b, 0) / scores.length,
    ]),
  )
}
