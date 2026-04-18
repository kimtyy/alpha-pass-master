export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  subject: string;
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
        subject: "반도체 소자",
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
        subject: "반도체 소자",
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
        subject: "반도체 소자",
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
        subject: "연산 증폭기",
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
        subject: "소프트웨어 공학",
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
        subject: "데이터베이스",
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
        subject: "네트워크",
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
        subject: "소프트웨어 공학",
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
        subject: "자기 회로",
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
        subject: "전기 기기",
        diagnostic: {
          correct: "맞습니다! 변압기 작동의 근본 원리를 놓치지 않으셨네요. 🌟",
          incorrect: "오답입니다. 전자기 유도 현상(패러데이-렌츠)이 변압기의 핵심입니다. 🛑"
        }
      }
    ]
  },
  'industrial-safety-engineer': {
    id: 'industrial-safety-engineer',
    title: '산업안전기사',
    category: 'Engineer',
    questions: [
      {
        id: "ise_001",
        question: "산업재해 예방의 4원칙 중 '재해는 여러 가지 원인이 복합되어 발생한다'는 원칙은?",
        options: ["예방가능의 원칙", "손실우연의 원칙", "원인계기의 원칙", "대책선정의 원칙"],
        answer: 2,
        explanation: "원인계기(원인연쇄)의 원칙은 사고가 우연히 발생하는 것이 아니라 반드시 원인이 있고, 그 원인들이 연쇄적으로 작용한다는 원칙입니다.",
        subject: "산업재해 예방",
        diagnostic: {
          correct: "정확합니다! 하인리히의 재해 예방 원칙을 관통하고 계시네요. 🛡️",
          incorrect: "오답입니다. 사고의 '원인 연쇄'를 다시 한번 체크해 보세요. ⚠️"
        }
      },
      {
        id: "ise_002",
        question: "하인리히의 사고 발생 5단계 중 제 3단계에 해당하는 것은?",
        options: ["유전적 요소 및 사회적 환경", "개인적 결함", "불안전한 상태 및 불안전한 행동", "사고"],
        answer: 2,
        explanation: "1단계 유전/환경 -> 2단계 개인결함 -> 3단계 불안전 행동/상태 -> 4단계 사고 -> 5단계 상해 순입니다.",
        subject: "산업재해 예방",
        diagnostic: {
          correct: "퍼펙트! 3단계를 직접 제어하는 것이 재해 예방의 핵심이죠! 🚀",
          incorrect: "아쉽습니다. 3단계가 사고로 이어지는 가장 직접적인 원인입니다. 🧐"
        }
      }
    ]
  },
  'logistics-management-engineer': {
    id: 'logistics-management-engineer',
    title: '물류관리사',
    category: 'Professional',
    questions: [
      {
        id: "lme_001",
        question: "다음 중 물류의 5대 활동에 해당하지 않는 것은?",
        options: ["운송", "보관", "하역", "판매"],
        answer: 3,
        explanation: "물류의 5대 활동은 운송, 보관, 하역, 포장, 정보입니다. 판매는 마케팅/영업 활동에 해당합니다.",
        subject: "물류 총론",
        diagnostic: {
          correct: "정답! 물류 전문가로서의 기본기가 탄탄하시네요. 📦",
          incorrect: "오답입니다. 물류는 '흐름'에 집중하고, 판매는 그 이후의 과정입니다! ⚠️"
        }
      }
    ]
  },
  'info-processing-craftsman': {
    id: 'info-processing-craftsman',
    title: '정보처리기능사',
    category: 'Craftsman',
    questions: [
      {
        id: "ipc_001",
        question: "컴퓨터 시스템에서 CPU와 주기억장치 사이의 속도 차이를 해결하기 위해 사용하는 고속 메모리는?",
        options: ["레지스터(Register)", "캐시 메모리(Cache Memory)", "가상 메모리(Virtual Memory)", "보조기억장치"],
        answer: 1,
        explanation: "캐시 메모리는 CPU와 주기억장치 사이의 속도 차이를 완화하여 시스템 전체의 효율을 높입니다.",
        subject: "전자계산기 일반",
        diagnostic: {
          correct: "하드웨어의 핵심을 정확히 찌르셨네요! 시스템 효율의 마스터입니다. 🚀",
          incorrect: "오답입니다. '속도 차이 해결' 하면 캐시 메모리를 먼저 떠올리세요. ⚠️"
        }
      }
    ]
  },
  'hair-design-craftsman': {
    id: 'hair-design-craftsman',
    title: '미용사(일반)',
    category: 'Craftsman',
    questions: [
      {
        id: "hdc_001",
        question: "두피의 유형 중 피지 분비가 과다하여 번들거림이 심하고 각질이 엉겨 붙기 쉬운 유형은?",
        options: ["건성 두피", "지성 두피", "민감성 두피", "노화 두피"],
        answer: 1,
        explanation: "지성 두피는 피지 분비가 왕성하여 전문적인 세정 및 관리가 필요합니다.",
        subject: "피부학",
        diagnostic: {
          correct: "정확한 진단입니다! 고객의 피부 타입을 파악하는 능력이 뛰어나시네요. ✨",
          incorrect: "오답입니다. 피지 과다 분비는 '지성'의 대표적인 특징입니다. 🧐"
        }
      }
    ]
  },
  'cook-korean-craftsman': {
    id: 'cook-korean-craftsman',
    title: '한식조리기능사',
    category: 'Craftsman',
    questions: [
      {
        id: "ckc_001",
        question: "식품의 냉동 시 얼음 결정이 커져 조직이 파괴되는 것을 방지하기 위한 가장 좋은 방법은?",
        options: ["완만 냉동", "급속 냉동", "자연 냉동", "송풍 냉동"],
        answer: 1,
        explanation: "급속 냉동은 최대 빙결정 생성대를 빠르게 통과하여 조직 파괴를 최소화합니다.",
        subject: "식품위생 및 조리원리",
        diagnostic: {
          correct: "완벽한 조리 상식입니다! 식재료의 선도를 지키는 마스터의 손길이 느껴지네요. 🍳",
          incorrect: "아쉽습니다. 조직 파괴를 막으려면 최대한 빨리 얼려야(급속) 합니다! ⚠️"
        }
      }
    ]
  },
  'architectural-craftsman': {
    id: 'architectural-craftsman',
    title: '전산응용건축제도기능사',
    category: 'Craftsman',
    questions: [
      {
        id: "arc_001",
        question: "건축 도면에서 물체의 보이지 않는 부분을 나타낼 때 사용하는 선의 종류는?",
        options: ["실선", "파선(숨은선)", "일점쇄선", "이점쇄선"],
        answer: 1,
        explanation: "파선은 대상을 투영했을 때 보이지 않는 부분(숨은 부분)을 표시하는 데 사용됩니다.",
        subject: "제도 및 평면 계획",
        diagnostic: {
          correct: "정확합니다! 도면의 약속을 완벽히 이해하고 계시네요. 📐",
          incorrect: "오답입니다. 보이지 않는 숨은 곳은 '파선'으로 표현하는 것이 규칙입니다. ✍️"
        }
      }
    ]
  },
  'real-estate-agent': {
    id: 'real-estate-agent',
    title: '공인중개사(1차)',
    category: 'Professional',
    questions: [
      {
        id: "rea_001",
        question: "부동산 물권 중 '물건의 점유를 요건으로 하지 않는' 물권은?",
        options: ["저당권", "전세권", "유치권", "질권"],
        answer: 0,
        explanation: "저당권은 점유를 이전하지 않고 담보가치만을 파악하는 권리입니다.",
        subject: "민법 및 민사특별법",
        diagnostic: {
          correct: "법률 전문가의 식견이 느껴지네요! 물권법의 핵심을 잘 알고 계십니다. ⚖️",
          incorrect: "오답입니다. 저당권의 비점유적 성격을 다시 체크해 보세요. ⚠️"
        }
      }
    ]
  },
  'civil-service-9-general': {
    id: 'civil-service-9-general',
    title: '9급 공무원(국어)',
    category: 'Professional',
    questions: [
      {
        id: "cs9_001",
        question: "다음 중 한글 맞춤법이 올바른 것은?",
        options: ["어의가 없다", "어이가 없다", "어잌후", "어이 가 없다"],
        answer: 1,
        explanation: "'일이 너무 뜻밖이어서 기가 막히다'는 뜻의 표준어는 '어이가 없다'입니다.",
        subject: "국어 문법",
        diagnostic: {
          correct: "정확합니다! 공직자로서의 완벽한 국어 실력을 갖추셨군요. 🇰🇷",
          incorrect: "오답입니다. 올바른 맞춤법은 성실한 공직 생활의 기본입니다! 🧐"
        }
      }
    ]
  }
};
