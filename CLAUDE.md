@AGENTS.md

# Alpha Pass Master — 프로젝트 컨텍스트

## Supabase 연동 (2026-05-07 완료)

- **Project URL:** https://bpbyouqcowahienkcbvs.supabase.co
- **DB 테이블 8개:** certificates, exam_subjects, exam_rounds, questions, options, study_sessions, session_answers, wrong_answers
- **문제 데이터:** 산업안전기사 51문제 + 204개 보기 입력 완료
- **환경변수:** `.env.local` (gitignore됨) — Vercel 환경변수에 별도 설정 필요
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 변경된 파일

| 파일 | 내용 |
|---|---|
| `src/lib/supabase/client.ts` | 브라우저용 Supabase 클라이언트 |
| `src/lib/supabase/server.ts` | 서버 컴포넌트용 클라이언트 |
| `src/lib/supabase/queries.ts` | DB 쿼리 함수 모음 |
| `src/types/database.ts` | Supabase DB 전체 TypeScript 타입 |
| `src/lib/storage.ts` | localStorage → Supabase 하이브리드 (비로그인은 로컬 폴백) |
| `src/hooks/useUser.ts` | Supabase Auth + Google OAuth, `subscribe` placeholder 포함 |
| `src/app/study/page.tsx` | DB에서 문제 fetch, 세션+답변 Supabase 저장 |
| `src/app/records/page.tsx` | async getRecords/getStats 대응, 로그인 게이트로 변경 |

## 다음 할 일

- [ ] 다크모드 디자인 적용
- [ ] Google 로그인 설정 (Supabase Dashboard → Authentication → Providers → Google)
- [ ] 문제 풀기 화면 DB 연결 확인 (실제 데이터 fetch 테스트)
