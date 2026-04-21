import { ExamSubject } from '../exams';

export const sqld: ExamSubject = {
  id: 'sqld',
  title: 'SQL 개발자 (SQLD)',
  category: 'Professional',
  questions: [
    {
      id: "sqld_101",
      question: "엔터티(Entity)의 특징으로 가장 적절하지 않은 것은?",
      options: [
        "반드시 해당 엔터티만의 고유한 식별자가 있어야 한다.",
        "2개 이상의 인스턴스가 존재해야 한다.",
        "반드시 하나 이상의 속성을 가져야 한다.",
        "속성이 없는 엔터티도 데이터 모델링에서는 허용된다."
      ],
      answer: 3,
      explanation: "엔터티는 반드시 하나 이상의 속성을 가져야 하며, 속성이 없는 엔터티는 유효한 모델링 대상이 아닙니다.",
      subject: "데이터 모델링의 이해",
      diagnostic: {
        correct: "엔터티의 정의와 정체성을 정확히 꿰뚫고 계시네요! 💾",
        incorrect: "엔터티라면 최소한 하나의 특징(속성)은 있어야겠죠? 다시 확인해보세요. 🧐"
      }
    },
    {
      id: "sqld_102",
      question: "관계(Relationship) 모델링 시 유의사항으로 가장 적절하지 않은 것은?",
      options: [
        "관련 있는 엔터티 간에 관계를 설정한다.",
        "관계 명칭은 능동형이나 수동형으로 명명한다.",
        "선택 참여 관계는 점선으로 표시한다.",
        "중복된 관계가 발생하지 않도록 한다."
      ],
      answer: 1,
      explanation: "관계 명칭은 현재형 어미를 사용하는 것을 권장하며, 능동형/수동형 명칭보다는 명확한 동사형을 사용합니다.",
      subject: "데이터 모델링의 이해",
      diagnostic: {
        correct: "ERD의 미학적, 논리적 규칙을 완벽하게 이해하고 계십니다! 🔗",
        incorrect: "관계의 이름은 '지금의 상태'를 나타내는 현재형이 핵심입니다! ✍️"
      }
    },
    {
      id: "sqld_201",
      question: "SQL의 연산 순서로 가장 적절한 것은?",
      options: [
        "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY",
        "FROM -> SELECT -> WHERE -> GROUP BY -> HAVING -> ORDER BY",
        "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
        "SELECT -> WHERE -> FROM -> GROUP BY -> HAVING -> ORDER BY"
      ],
      answer: 2,
      explanation: "SQL 실행 순서: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY 순입니다.",
      subject: "SQL 기본 및 활용",
      diagnostic: {
        correct: "SQL 엔진의 내부 작동 원리를 정확히 파악하고 계시네요! ⚙️",
        incorrect: "주문(ORDER BY)은 가장 마지막에! 데이터 추출(FROM)이 가장 처음입니다. 📋"
      }
    },
    {
      id: "sqld_202",
      question: "NULL 값에 대한 설명으로 옳은 것은?",
      options: [
        "NULL + 100의 결과는 100이다.",
        "NULL과 NULL을 비교하면 TRUE를 반환한다.",
        "집계 함수(SUM, AVG 등) 계산 시 NULL은 0으로 간주된다.",
        "IS NULL 연산자를 통해서만 NULL 여부를 확인할 수 있다."
      ],
      answer: 3,
      explanation: "NULL은 알 수 없는 값으로, 산술 연산 결과는 항상 NULL이며 비 연산자는 IS NULL 또는 IS NOT NULL만 유효합니다.",
      subject: "SQL 기본 및 활용",
      diagnostic: {
        correct: "데이터베이스의 가장 까다로운 NULL 처리를 완벽하게 마스터하셨네요! 🕳️",
        incorrect: "NULL은 0이 아닌 '모르는 값'입니다! 연산 결과도 '모름'이 됩니다. 🔍"
      }
    },
    {
      id: "sqld_203",
      question: "계층형 질의(Hierarchical Query)에서 루트 노드를 지정할 때 사용하는 구문은?",
      options: [
        "LEVEL",
        "CONNECT BY",
        "START WITH",
        "PRIOR"
      ],
      answer: 2,
      explanation: "START WITH 구문은 계층 구조의 시작점(루트 노드)을 지정할 때 사용합니다.",
      subject: "SQL 기본 및 활용",
      diagnostic: {
        correct: "복잡한 트리 구조 데이터 추출의 달인이시군요! 🌳",
        incorrect: "시작이 반! START WITH가 바로 그 시작점입니다. 📍"
      }
    },
    {
      id: "sqld_204",
      question: "서브쿼리(Subquery)에 대한 설명으로 가장 적절하지 않은 것은?",
      options: [
        "서브쿼리는 반드시 괄호로 감싸야 한다.",
        "서브쿼리에서는 ORDER BY 절을 사용할 수 없다(일부 DBMS 제외).",
        "다중 행 서브쿼리는 IN, ANY, ALL 연산자와 함께 사용한다.",
        "메인쿼리는 서브쿼리의 컬럼을 자유롭게 참조할 수 있다."
      ],
      answer: 3,
      explanation: "서브쿼리는 메인쿼리의 컬럼을 참조할 수 있지만, 메인쿼리는 서브쿼리의 컬럼을 직접 참조할 수 없습니다.",
      subject: "SQL 기본 및 활용",
      diagnostic: {
        correct: "서브쿼리의 스코프와 참조 규칙을 아주 정밀하게 이해하고 계시네요! 🔬",
        incorrect: "부모(메인)는 자식(서브)의 속을 들여다볼 수 없다는 모델링 원칙을 기억하세요! ✍️"
      }
    },
    {
      id: "sqld_205",
      question: "트랜잭션(Transaction)의 특성 중 '성공적으로 완료된 트랜잭션의 결과는 영구적으로 반영되어야 한다'는 것은?",
      options: [
        "Atomicity (원자성)",
        "Consistency (일관성)",
        "Isolation (고립성)",
        "Durability (영속성)"
      ],
      answer: 3,
      explanation: "Durability(영속성)는 시스템 장애 시에도 완료된 트랜잭션의 결과가 보존됨을 의미합니다.",
      subject: "SQL 기본 및 활용",
      diagnostic: {
        correct: "데이터 무결성(ACID)의 수호자이십니다! 완벽합니다. 🛡️",
        incorrect: "한번 커밋(Commit) 된 것은 영원히! Durability(영속성)입니다. 💾"
      }
    }
  ]
};
