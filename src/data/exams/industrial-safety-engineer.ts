import { ExamSubject } from '../exams';

export const industrialSafetyEngineer: ExamSubject = {
  id: 'industrial-safety-engineer',
  title: '산업안전기사',
  category: 'Engineer',
  questions: [
    {
      id: "ise_001",
      question: "산업재해 예방의 4원칙 중 '재해의 발생에는 반드시 원인이 있다'는 원칙은?",
      options: ["예방가능의 원칙", "손실우연의 원칙", "원인계기의 원칙", "대책선정의 원칙"],
      answer: 2,
      explanation: "원인계기(원인구명)의 원칙은 사고와 원인 사이에는 반드시 인과관계가 존재한다는 원칙입니다.",
      subject: "안전관리론",
      diagnostic: {
        correct: "재해 예방의 기본 철학을 정확히 이해하고 계시네요! 🛡️",
        incorrect: "모든 사고에는 원인이 있습니다. 하인리히의 원칙을 다시 체크해보세요. ✍️"
      }
    },
    {
      id: "ise_002",
      question: "하인리히(Heinrich)의 재해 구성 비율 '1 : 29 : 300'에서 1이 의미하는 것은?",
      options: ["경상해", "무상해 사고", "중상 또는 사망", "아차 사고"],
      answer: 2,
      explanation: "하인리히 법칙에서 1은 중상 또는 사망, 29는 경상, 300은 무상해 사고(아차 사고)를 의미합니다.",
      subject: "안전관리론",
      diagnostic: {
        correct: "안전 전문가의 필수 상식, 하인리히 법칙을 완벽히 마스터하셨군요! 🎯",
        incorrect: "1은 가장 큰 사고! 잊지 마세요. 1-29-300은 안전의 황금률입니다. 📏"
      }
    },
    {
      id: "ise_003",
      question: "무재해 운동 추진의 3기둥이 아닌 것은?",
      options: ["최고 경영자의 안전 경영 자세", "라인의 관리감독자에 의한 안전보건 추진", "직장 소집단 활동의 활성화", "정부의 강력한 단속"],
      answer: 3,
      explanation: "무재해 운동 3기둥은 경영층의 자세, 관리감독자의 추진, 자율적인 소집단 활동입니다.",
      subject: "안전관리론",
      diagnostic: {
        correct: "조직 내 안전 문화의 핵심 요소를 정확히 알고 계시네요! 🏢",
        incorrect: "자율적인 조직 문화가 핵심입니다. 외부 단속보다는 내부 의지가 중요해요! 🤝"
      }
    },
    {
      id: "ise_004",
      question: "인간공학에서 '조절 범위'를 설계할 때 주로 사용하는 백분위수(Percentile) 기준은?",
      options: ["5피트 ~ 95피트", "5th ~ 95th Percentile", "50th Percentile", "1st ~ 99th Percentile"],
      answer: 1,
      explanation: "일반적으로 조절식 설계(의자 높이 등)에서는 인구의 5%에서 95% 범위를 수용하도록 설계합니다.",
      subject: "인간공학",
      diagnostic: {
        correct: "사용자 중심 설계의 표준 수치를 아주 잘 알고 계시네요! 📏",
        incorrect: "극단치(5% 미만, 95% 초과)를 제외한 대다수를 수용하는 범위를 기억하세요! 🧐"
      }
    },
    {
      id: "ise_005",
      question: "시스템 안전 분석 기법 중 '연역적, 정량적' 분석이 가능한 것은?",
      options: ["FMEA", "FTA (Fault Tree Analysis)", "HAZOP", "Checklist"],
      answer: 1,
      explanation: "FTA는 결함 계통 분석으로, 하향식(연역적)이며 각 단계의 확률을 곱해 정량적 분석이 가능합니다.",
      subject: "시스템안전공학",
      diagnostic: {
        correct: "복잡한 시스템 분석 기법의 특징을 정확히 구분하셨습니다! 💻",
        incorrect: "FTA는 '연역적/정량적', FMEA는 '귀납적/정성적'! 이 차이가 핵심입니다. ✍️"
      }
    },
    {
      id: "ise_006",
      question: "프레스 기계의 방호장치 중 손이 위험지역에 들어가면 광선을 차단하여 급정지시키는 장치는?",
      options: ["수인식", "손쳐내기식", "광전자식", "가드식"],
      answer: 2,
      explanation: "광전자식 방호장치는 투광부와 수광부 사이의 광선이 차단되면 기계를 정지시키는 방식입니다.",
      subject: "기계위험방지기술",
      diagnostic: {
        correct: "프레스 안전 장치의 종류를 아주 완벽하게 숙지하셨네요! ⚙️",
        incorrect: "빛(광)을 이용해 비접촉으로 감지하는 장치를 찾아보세요! 🚦"
      }
    },
    {
      id: "ise_007",
      question: "보일러의 폭발 사고를 방지하기 위해 설치하는 필수 안전 장치가 아닌 것은?",
      options: ["압력방출장치", "고저수위 조절장치", "화염 검출기", "과부하 차단기"],
      answer: 3,
      explanation: "과부하 차단기는 주로 전동기 보호용이며, 보일러는 압력, 수위, 화염 상태를 감시해야 합니다.",
      subject: "기계위험방지기술",
      diagnostic: {
        correct: "압력 용기 안전 관리의 핵심을 정확히 짚으셨습니다! 🏗️",
        incorrect: "보일러의 3대 안전장치(압력, 수위, 화염)를 다시 한번 복습합시다. ⚠️"
      }
    },
    {
      id: "ise_008",
      question: "전기 설비의 접지 목적 중 가장 중요한 것은?",
      options: ["전력 손실 감소", "절연 내력 향상", "누전에 의한 감전 방지", "역률 개선"],
      answer: 2,
      explanation: "접지의 가장 큰 목적은 누전 시 외함의 전위를 대지 전위와 같게 하여 인명 감전을 방지하는 것입니다.",
      subject: "전기위험방지기술",
      diagnostic: {
        correct: "전기 안전의 기본 중의 기본, 접지의 원리를 잘 아시는군요! ⚡",
        incorrect: "안전 시험에서 접지는 항상 '인명 보호'가 1순위입니다. 🛡️"
      }
    },
    {
      id: "ise_009",
      question: "폭발 범위(연소 범위)가 2.1% ~ 9.5%인 가스는?",
      options: ["아세틸렌", "메탄", "프로판", "수소"],
      answer: 2,
      explanation: "프로판의 폭발 범위는 약 2.1% ~ 9.5%입니다. (메탄 5~15%, 아세틸렌 2.5~81%)",
      subject: "화학설비위험방지기술",
      diagnostic: {
        correct: "가스별 위험 특성 수치를 아주 정밀하게 암기하고 계시네요! 🧪",
        incorrect: "주요 가스의 연소 범위는 시험에 단골로 출제되니 꼭 정리해두세요! ✍️"
      }
    },
    {
      id: "ise_010",
      question: "건설 현장에서 사다리식 통로의 기울기는 몇 도 이하로 해야 하는가?",
      options: ["60도", "75도", "80도", "90도"],
      answer: 1,
      explanation: "산업안전보건기준에 따라 사다리식 통로의 기울기는 75도 이하로 유지해야 합니다.",
      subject: "건설안전기술",
      diagnostic: {
        correct: "가설 구조물의 안전 기준 수치를 정확히 알고 계시네요! 🏗️",
        incorrect: "사다리는 너무 가파르면 위험합니다. 75도를 기억하세요! 📐"
      }
    },
    {
      id: "ise_011",
      question: "산업재해 발생 시 조치 순서로 옳은 것은?",
      options: ["사고조사 -> 원인분석 -> 대책수립 -> 실시", "재해발생 -> 긴급조치 -> 재해조사 -> 원인강구", "원인분석 -> 대책수립 -> 긴급조치 -> 실시", "긴급조치 -> 재해조사 -> 실시 -> 평가"],
      answer: 1,
      explanation: "재해 발생 시에는 무엇보다 인명 구조를 위한 긴급조치가 최우선이며, 이후 조사와 원인 규명이 따릅니다.",
      subject: "안전관리론",
      diagnostic: {
        correct: "재해 대응의 골든 타임과 절차를 완벽히 숙지하셨습니다! 🚑",
        incorrect: "사람부터 구해야죠! 긴급조치가 항상 1번입니다. 🛑"
      }
    },
    {
      id: "ise_012",
      question: "안전보건표지 중 '노란색' 바탕에 '검은색' 테두리와 그림이 들어간 표지는?",
      options: ["금지표지", "경고표지", "지시표지", "안내표지"],
      answer: 1,
      explanation: "경고표지는 삼각형 형태의 노란색 바탕을 사용하여 위험을 알리는 역할을 합니다.",
      subject: "안전관리론",
      diagnostic: {
        correct: "안전 색채 및 표지의 의미를 아주 명확하게 구분하시네요! 🚦",
        incorrect: "노란색은 주의/경고! 빨간색은 금지! 파란색은 지시입니다. 🎨"
      }
    },
    {
      id: "ise_013",
      question: "인간의 실수(Human Error) 중 '의도는 올바르나 행동이 잘못된 경우'는?",
      options: ["Mistake", "Slip", "Lapse", "Violation"],
      answer: 1,
      explanation: "Slip(슬립)은 목표는 맞지만 조작이나 실행 단계에서 발생하는 실수입니다.",
      subject: "인간공학",
      diagnostic: {
        correct: "휴먼 에러의 심리학적 분류를 정확히 파악하고 계시네요! 🧠",
        incorrect: "의도가 틀리면 Mistake, 의도는 맞는데 손이 미끄러지면 Slip입니다! ✍️"
      }
    },
    {
      id: "ise_014",
      question: "연삭 숫돌의 파손 원인으로 거리가 먼 것은?",
      options: ["숫돌에 균열이 있는 경우", "회전 속도가 너무 빠른 경우", "작업 시작 전 시운전을 충분히 한 경우", "플랜지가 너무 작은 경우"],
      answer: 2,
      explanation: "충분한 시운전은 숫돌의 이상 여부를 확인하는 안전 규정이며, 파손 원인이 아닙니다.",
      subject: "기계위험방지기술",
      diagnostic: {
        correct: "회전 기계 작업의 안전 수칙을 아주 논리적으로 파악하셨네요! 🌀",
        incorrect: "안전 수칙을 지키는 것은 사고를 막는 방법이지, 원인이 아닙니다! 🛡️"
      }
    },
    {
      id: "ise_015",
      question: "가스 집합 용접 장치에서 역화(Backfire)를 방지하기 위해 설치하는 장치는?",
      options: ["압력 조정기", "안전기 (역화방지기)", "호스 밴드", "토치"],
      answer: 1,
      explanation: "역화방지기는 화염이 호스를 타고 용기 쪽으로 거꾸로 타들어 가는 것을 막는 필수 장치입니다.",
      subject: "기계위험방지기술",
      diagnostic: {
        correct: "용접 작업의 치명적 위험 요소를 잘 알고 계시네요! 🔥",
        incorrect: "불꽃이 거꾸로 가는 걸 막아야 하니 '역화방지'를 찾아보세요! 🛡️"
      }
    },
    {
      id: "ise_016",
      question: "심실세동을 일으키는 통전 전류에 의한 에너지 한계값(Dalziel 식)에 가장 큰 영향을 주는 요소는?",
      options: ["전압의 크기", "통전 시간", "피부의 저항", "주위의 온도"],
      answer: 1,
      explanation: "전기 쇼크의 위험도는 전류의 크기뿐만 아니라 전류가 흐르는 시간(t)에 결정적으로 의존합니다.",
      subject: "전기위험방지기술",
      diagnostic: {
        correct: "감전의 물리적 메커니즘을 아주 전문적으로 이해하고 계시네요! 🧪",
        incorrect: "에너지는 전력 x 시간! 흐르는 시간이 길수록 더 위험합니다. ⚡"
      }
    },
    {
      id: "ise_017",
      question: "화동적 화재의 3요소가 아닌 것은?",
      options: ["가연물", "점화원", "산소공급원", "질소공급원"],
      answer: 3,
      explanation: "연소의 3요소는 가연물, 점화원, 산소공급원입니다. (질소는 무관)",
      subject: "화학설비위험방지기술",
      diagnostic: {
        correct: "불이 붙는 원리를 기초부터 아주 탄탄하게 알고 계시네요! 🔥",
        incorrect: "공기 중의 산소가 타는 걸 도와준다는 사실을 기억하세요! 💨"
      }
    },
    {
      id: "ise_018",
      question: "토사 붕괴 원인 중 내부적 요인에 해당하는 것은?",
      options: ["경사면의 경사 증가", "토사 중량의 증가", "토석의 강도 저하", "지표수의 침투"],
      answer: 2,
      explanation: "토석 자체의 전단 강도가 약해지는 것은 내부적 요인이며, 무거워지거나 가팔라지는 것은 외부적 요인입니다.",
      subject: "건설안전기술",
      diagnostic: {
        correct: "흙의 성질과 붕괴 메커니즘을 아주 예리하게 분석하셨네요! 🚜",
        incorrect: "흙 '자체'가 약해지는 것이 내부적인 요인입니다. 🧐"
      }
    },
    {
      id: "ise_019",
      question: "달비계의 가공 들말 등을 만드는 와이어로프의 안전율은 얼마 이상인가?",
      options: ["3 이상", "5 이상", "10 이상", "15 이상"],
      answer: 2,
      explanation: "근로자가 탑승하거나 매달리는 와이어로프의 안전율은 10 이상의 높은 기준을 적용합니다.",
      subject: "건설안전기술",
      diagnostic: {
        correct: "건설 현장의 엄격한 안전 계수 기준을 잘 숙지하고 계시네요! 🏗️",
        incorrect: "사람 생명이 걸린 줄은 보통보다 훨씬 튼튼해야 합니다. 10! 잊지 마세요. ⚓"
      }
    },
    {
      id: "ise_020",
      question: "다음 중 안전 관리의 3E에 해당하지 않는 것은?",
      options: ["Engineering (기술)", "Education (교육)", "Enforcement (독려/집행)", "Efficiency (효율)"],
      answer: 3,
      explanation: "안전 관리의 3E는 기술(Engineering), 교육(Education), 관리/집행(Enforcement)입니다.",
      subject: "안전관리론",
      diagnostic: {
        correct: "안전 관리 3대 대책의 핵심 키워드를 완벽히 정복하셨군요! 🛡️",
        incorrect: "기술, 교육, 규제! 이 세 가지가 합쳐져야 사고가 안 납니다. ✍️"
      }
    }
  ]
};
