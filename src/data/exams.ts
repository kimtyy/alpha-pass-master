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
      },
      {
        id: "ec_003",
        question: "다음 중 전원 회로에서 출력 전압을 일정하게 유지하기 위해 사용하는 소자는?",
        options: ["발광 다이오드(LED)", "제너 다이오드(Zener Diode)", "터널 다이오드", "포토 다이오드"],
        answer: 1,
        explanation: "제너 다이오드는 항복 전압 특성을 이용하여 전압을 일정하게 유지하는 정전압 회로에 사용됩니다.",
        diagnostic: {
          correct: "퍼펙트! 제너 다이오드의 '정전압' 특성을 잘 알고 계시네요. 💎",
          incorrect: "오답입니다. '일정한 전압' 하면 제너 다이오드를 떠올리세요! ⚠️"
        }
      },
      {
        id: "ec_004",
        question: "연산 증폭기(OP-AMP)의 이상적인 특징이 아닌 것은?",
        options: ["무한대의 입력 임피던스", "영(0)의 출력 임피던스", "무한대의 이득", "좁은 주파수 대역폭"],
        answer: 3,
        explanation: "이상적인 OP-AMP는 무한대의 주파수 대역폭(Bandwidth)을 가져야 합니다.",
        diagnostic: {
          correct: "정확합니다! OP-AMP의 이상적 조건을 완벽히 숙지하고 계시네요. 🧠",
          incorrect: "아쉽습니다. 이상적 증폭기는 모든 주파수를 다룰 수 있어야(무한대 대역폭) 합니다. ⚠️"
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
      },
      {
        id: "ipe_002",
        question: "관계 데이터베이스(RDB)에서 테이블의 열을 뜻하는 용어는?",
        options: ["튜플(Tuple)", "속성(Attribute)", "도메인(Domain)", "인스턴스(Instance)"],
        answer: 1,
        explanation: "테이블의 열(Column)은 속성(Attribute)이라고 부르며, 행(Row)은 튜플(Tuple)이라고 합니다.",
        diagnostic: {
          correct: "기초가 탄탄하시네요! DB 용어의 개념이 명확합니다. ✨",
          incorrect: "오답입니다. 열=속성, 행=튜플! 이 공식은 필수 암기입니다. ✍️"
        }
      },
      {
        id: "ipe_003",
        question: "TCP/IP 모델에서 전송 계층(Transport Layer)에 해당하는 프로토콜은?",
        options: ["IP", "HTTP", "UDP", "ARP"],
        answer: 2,
        explanation: "UDP와 TCP는 전송 계층의 핵심 프로토콜입니다. IP는 네트워크 계층, HTTP는 응용 계층입니다.",
        diagnostic: {
          correct: "정답! 신뢰성의 TCP와 속도의 UDP를 잘 구분하고 계시네요. 🚀",
          incorrect: "오답입니다. 계층별 프로토콜 매칭은 정처기 단골 문제입니다! ⚠️"
        }
      },
      {
        id: "ipe_004",
        question: "소프트웨어 테스트 기법 중 내부 구조를 보지 않고 외부 명세만을 보고 테스트하는 것은?",
        options: ["화이트박스 테스트", "블랙박스 테스트", "리그레션 테스트", "통합 테스트"],
        answer: 1,
        explanation: "입력값과 출력값만 확인하는 테스트는 블랙박스 테스트입니다.",
        diagnostic: {
          correct: "완벽합니다! 블랙박스 테스트의 정의를 정확히 알고 계시네요. 🌑",
          incorrect: "오답입니다. '내부 구조'를 보느냐 아니냐가 화이트와 블랙의 차이입니다. 🧐"
        }
      }
    ]
  },
  'electric-engineer': {
    id: 'electric-engineer',
    title: '전기기사',
    category: 'Engineer',
    questions: [
      {
        id: "ee_001",
        question: "자기회로에서 가해준 자속에 대하여 방해하는 성질을 무엇이라 하는가?",
        options: ["투자율", "자기저항", "정전용량", "콘덕턴스"],
        answer: 1,
        explanation: "전기회로의 저항과 대응되는 자기회로의 개념은 자기저항(Magnetic Reluctance)입니다.",
        diagnostic: {
          correct: "정답! 전기회로와 자기회로의 대응 관계를 잘 이해하고 계시네요. ⚡",
          incorrect: "오답입니다. 자속의 흐름을 방해하는 것은 '자기저항'입니다. ⚠️"
        }
      },
      {
        id: "ee_002",
        question: "변압기의 원리가 되는 법칙은?",
        options: ["오옴의 법칙", "패러데이-렌츠의 법칙", "플레밍의 왼손 법칙", "키르히호프의 법칙"],
        answer: 1,
        explanation: "전자기 유도 현상을 이용하는 변압기는 패러데이-렌츠의 법칙을 기본으로 합니다.",
        diagnostic: {
          correct: "맞습니다! 변압기 작동의 근본 원리를 놓치지 않으셨네요. 🌟",
          incorrect: "오답입니다. 전자기 유도 현상(패러데이-렌츠)이 변압기의 핵심입니다. 🛑"
        }
      }
    ]
  }
};
