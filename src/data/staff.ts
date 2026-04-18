export type StaffRole = 'dev' | 'design';

export interface StaffPersona {
  id: string;
  name: string;
  title: string;
  role: StaffRole;
  avatar: string; // Emoji or short description for icon
  bio: string;
}

export const ALPHA_STAFF: Record<string, StaffPersona> = {
  'kidari': {
    id: 'kidari',
    name: '키다리부장',
    title: '개발/운영 총괄 부장',
    role: 'dev',
    avatar: '👨‍💻',
    bio: '데이터와 시스템의 정석. 시험 로직과 시간 관리 보좌의 달인입니다.'
  },
  'youngja': {
    id: 'youngja',
    name: '영자실장',
    title: '디자인/UX 전략 실장',
    role: 'design',
    avatar: '👩‍🎨',
    bio: '가독성과 사용자 감성의 장인. 학습 의욕을 고취시키는 따스한 멘토입니다.'
  }
};

export const STAFF_MESSAGES = {
  exam: {
    welcome: [
      "키다리부장입니다. 실전 프로토콜을 가동합니다. 시간 안배에 유의하세요.",
      "실전에 오신 것을 환영합니다. 마킹 실수는 곧 실력입니다. 집중하십시오.",
      "냉정하게 분석하고 과감하게 정답을 고르세요. 제가 뒤에서 데이터를 체크하겠습니다."
    ],
    praise: [
      "정답률이 좋습니다. 시스템이 당신의 합격 가능성을 상향 조정 중입니다.",
      "논리적인 선택이군요. 키다리부장이 인정하는 실력입니다.",
      "속도와 정확도의 밸런스가 완벽합니다."
    ],
    warning: [
      "시간이 부족할 수 있습니다. 모르는 문제는 일단 넘어가세요.",
      "이 문항은 변별력이 매우 높습니다. 신중하게 접근하세요.",
      "마킹 누락이 없는지 다시 한번 확인해주시기 바랍니다."
    ]
  },
  training: {
    welcome: [
      "영자실장이에요! 오늘은 눈이 편안한 환경에서 즐겁게 공부해봐요. ✨",
      "와주셨군요! 가장 예쁜 해설들로 준비해두었으니 하나하나 천천히 익혀보세요.",
      "공부도 디자인처럼! 깔끔하게 하나씩 정복해나가는 재미를 느껴보세요. ^^"
    ],
    praise: [
      "와! 정답 행렬이 너무 아름다워요! 합격의 기운이 디자인되는 중이에요. 💖",
      "어머, 풀이가 너무 세련되셨는데요? 실력이 쑥쑥 늘고 있는 게 보여요!",
      "완벽해요! 이 페이스라면 어떤 시험도 예쁘게 통과하실 거예요."
    ],
    advice: [
      "해설 디자인을 가독성 있게 정리했으니, 키워드 위주로 쏙쏙 읽어보세요.",
      "이 문제는 조금 복잡해 보이지만, 영자실장과 함께라면 어렵지 않아요!",
      "잠시 눈을 쉬어주시는 건 어떨까요? 예쁜 풍경 한 번 보고 다시 힘내요! 🌱"
    ]
  }
};
