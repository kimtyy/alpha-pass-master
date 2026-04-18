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
    name: 'Alpha Intelligence',
    title: '데이터 분석 코어',
    role: 'dev',
    avatar: '🤖',
    bio: '데이터와 시스템의 정석. 시험 로직과 시간 관리 보좌의 달인입니다.'
  },
  'youngja': {
    id: 'youngja',
    name: 'Alpha Design',
    title: '사용자 경험 전략',
    role: 'design',
    avatar: '✨',
    bio: '가독성과 사용자 감성의 장인. 학습 의욕을 고취시키는 따스한 멘토입니다.'
  }
};

export const STAFF_MESSAGES = {
  exam: {
    welcome: [
      "Alpha AI 시스템 가동. 실전 프로토콜을 시작합니다. 시간 안배에 유의하세요.",
      "실전 모의고사에 오신 것을 환영합니다. 집중력을 최고조로 유지하십시오.",
      "논리적으로 분석하고 과감하게 정답을 선택하십시오. 고성능 엔진이 실시간으로 동기화됩니다."
    ],
    praise: [
      "정답률이 안정적입니다. 시스템이 합격 가능성을 긍정적으로 분석 중입니다.",
      "정밀한 논리 구조에 기반한 선택입니다.",
      "속도와 정확도의 밸런스가 매우 이상적입니다."
    ],
    warning: [
      "잔여 시간이 부족할 수 있습니다. 문항당 소요 시간을 조절하십시오.",
      "해당 문항은 변별력이 높습니다. 다각도로 검토하십시오.",
      "마킹 누락이나 검토되지 않은 문항이 없는지 최종 확인 바랍니다."
    ]
  },
  training: {
    welcome: [
      "Alpha AI 가이드 모드입니다. 핵심 개념을 체계적으로 보완해 드리겠습니다.",
      "분석 데이터 기반의 맞춤형 질의를 시작합니다. 하나씩 정복해 보십시오.",
      "효율적인 학습 디자인을 위해 최적의 동선을 구축했습니다. 지금 시작하세요."
    ],
    praise: [
      "완벽한 정답 추론입니다. 합격 레이더에 포착되었습니다.",
      "이해도가 매우 높습니다. 실전에 즉시 투입 가능한 수준입니다.",
      "탁월한 집중력입니다. 이 페이스라면 조기 합격이 가능합니다."
    ],
    advice: [
      "해당 단원의 키워드 요약본을 대조하며 학습 효율을 높여보십시오.",
      "오답 패턴 분석 결과, 특정 유형의 반복 숙달이 권장됩니다.",
      "잠시 휴식을 통해 뇌를 환기한 후 다음 세션을 진행하십시오."
    ]
  }
};
