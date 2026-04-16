export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  diagnostic: {
    correct: string;
    incorrect: string;
  };
}

export interface ExamSubject {
  id: string;
  title: string;
  category: 'Engineer' | 'Craftsman' | 'Professional';
  questions: Question[];
}

export const EXAM_DATA: Record<string, ExamSubject> = {
  'electronic-craftsman': {
    id: 'electronic-craftsman',
    title: '전자기기기능사',
    category: 'Craftsman',
    questions: [
      {
        id: "ec_001",
        question: "반도체 소자 중 '전류의 흐름을 한 방향으로만 흐르게 하는 성질'을 이용한 소자는 무엇입니까?",
        options: ["트랜지스터 (Transistor)", "다이오드 (Diode)", "콘덴서 (Capacitor)", "저항기 (Resistor)"],
        answer: 1,
        explanation: "다이오드는 P형 반도체와 N형 반도체를 접합하여 만든 소자로, 정류 작용을 수행합니다.",
        diagnostic: {
          correct: "정답입니다! 정류 작용의 핵심을 꿰뚫고 계시네요. ✨",
          incorrect: "오답입니다. 다이오드의 한 방향 흐름(정류) 성질을 다시 복습해 보세요! ⚠️"
        }
      },
      {
        id: "ec_002",
        question: "다음 중 증폭 작용과 스위칭 작용을 동시에 수행할 수 있는 반도체 소자는?",
        options: ["다이오드", "트랜지스터", "저항기", "제너 다이오드"],
        answer: 1,
        explanation: "트랜지스터(TR)는 베이스 전류를 조절하여 증폭 및 스위칭 역할을 합니다.",
        diagnostic: {
          correct: "정답입니다! 트랜지스터의 2대 작용을 정확히 이해하셨군요. 🚀",
          incorrect: "오답입니다. 증폭과 스위칭은 트랜지스터의 고유 영역입니다. 🧐"
        }
      }
    ]
  },
  'info-processing-engineer': {
    id: 'info-processing-engineer',
    title: '정보처리기사',
    category: 'Engineer',
    questions: [
      {
        id: "ipe_001",
        question: "디자인 패턴 중 '생성(Creational) 패턴'에 속하지 않는 것은?",
        options: ["Factory Method", "Singleton", "Adapter", "Builder"],
        answer: 2,
        explanation: "Adapter 패턴은 구조(Structural) 패턴에 속합니다.",
        diagnostic: {
          correct: "정답입니다! 디자인 패턴의 분류를 완벽히 파악하고 계시군요. 🎯",
          incorrect: "오답입니다. 생성/구조/행위 패턴의 차이를 다시 한번 체크해 보세요! ⚠️"
        }
      }
    ]
  }
};
