import { ExamSubject } from '../exams';

export const architecturalCraftsman: ExamSubject = {
  id: 'architectural-craftsman',
  title: '전산응용건축제도기능사',
  category: 'Craftsman',
  questions: [
    {
      id: "arc_001",
      question: "도면의 척도 중 '물체보다 크게 그리는' 도면은?",
      options: ["배척", "실척", "축척", "임의척"],
      answer: 0,
      explanation: "배척(Enlargement scale)은 작은 부품 등을 상세히 보여주기 위해 실제보다 크게 그리는 것을 말합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "제도의 기본인 척도 개념을 아주 정확히 파악하고 계시네요! 📏",
        incorrect: "배(Double)로 늘린다! 배척을 잊지 마세요. ✍️"
      }
    },
    {
      id: "arc_002",
      question: "건축 도면에서 '단면선'으로 주로 사용되는 선의 종류는?",
      options: ["가느다란 실선", "굵은 실선", "굵은 1점 쇄선", "파선"],
      answer: 1,
      explanation: "단면선(물체를 자른 단면의 외곽선)은 눈에 잘 띄도록 굵은 실선을 사용합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "선의 종류에 따른 도면 해독 능력이 탁월하시네요! ✍️",
        incorrect: "단면은 가장 중요한 정보! 그래서 굵은 실선으로 강조합니다. 📏"
      }
    },
    {
      id: "arc_003",
      question: "목재의 함수율 중 '대기 중의 습도와 평형을 이룬 상태'에서의 함수율은?",
      options: ["섬유포화점", "평형함수율", "전건상태", "기건상태"],
      answer: 1,
      explanation: "평형함수율(Equilibrium Moisture Content)은 목재가 주위 공기의 온습도와 안정한 상태를 이룬 때의 수분 함량입니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "건축 재료의 물리적 안정성 개념을 아주 잘 이해하고 계시네요! 🌲",
        incorrect: "공기와 수분 균형을 맞춘 '평형' 상태를 생각해보세요! ⚖️"
      }
    },
    {
      id: "arc_004",
      question: "철근 콘크리트 구조에서 '철근'이 주로 담당하는 힘은?",
      options: ["압축력", "인장력", "전단력", "비틀림력"],
      answer: 1,
      explanation: "콘크리트는 압축력에 강하고 인장력에 약하므로, 이를 보완하기 위해 인장력에 강한 철근을 넣습니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "철근콘크리트의 상보적 원리를 완벽히 파악하셨습니다! 🏗️",
        incorrect: "콘크리트 = 누르는 힘, 철근 = 당기는(인장) 힘! 잊지 마세요. ⛓️"
      }
    },
    {
      id: "arc_005",
      question: "창호의 기호 중 'SS'가 의미하는 것은?",
      options: ["Steel Door (철재문)", "Steel Sash (철재창)", "Sliding Sash (미서기창)", "Special Screen (특수망)"],
      answer: 1,
      explanation: "도면 기호상 S(Steel)와 S(Sash)가 결합하여 철제 창을 의미합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "도면 약호를 아주 능숙하게 읽어내시네요! 도면 마스터의 자질이 보입니다. 📝",
        incorrect: "SS는 Steel Sash! 약어의 첫 글자들을 연결해보세요. ✍️"
      }
    },
    {
      id: "arc_006",
      question: "건축물의 하중 중 '고정 하중'에 해당하는 것은?",
      options: ["적설 하중", "적재 하중 (가구 등)", "건축물 자체의 중량", "풍하중"],
      answer: 2,
      explanation: "고정 하중(Dead Load)은 보, 기둥, 바닥판 등 건축물 자체의 무게를 의미합니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "구조 계산의 기본인 하중 분류를 정확히 알고 계시네요! 🏗️",
        incorrect: "움직이지 않고 항상 그 자리에 있는 무게를 생각해보세요. 🕰️"
      }
    },
    {
      id: "arc_007",
      question: "콘크리트의 강도에 가장 큰 영향을 미치는 요소는?",
      options: ["자갈의 크기", "물-시멘트비 (W/C ratio)", "시멘트의 제조사", "모래의 색상"],
      answer: 1,
      explanation: "물-시멘트비가 낮을수록(물이 적을수록) 콘크리트의 강도는 높아집니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "콘크리트 배합 원리와 강도의 상관관계를 완벽히 파악하셨네요! 🏗️",
        incorrect: "물은 적당히! 물이 너무 많으면 콘크리트가 약해진다는 점을 기억하세요. 💧"
      }
    },
    {
      id: "arc_008",
      question: "평면도 작성 시 '바닥에서 약 얼마 높이'에서 잘라 내려다본 모양을 그리는가?",
      options: ["0.5m", "1.2m ~ 1.5m", "2.0m", "천장 바로 아래"],
      answer: 1,
      explanation: "일반적으로 평면도는 창문이 보이는 높이인 약 1.2m ~ 1.5m 높이에서 절단한 가상 평면입니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "도면 작성의 표준 가이드라인을 아주 정확히 파악하셨습니다! 📐",
        incorrect: "창문 높이를 생각해보세요. 허리보다 조금 높은 지점입니다! ✍️"
      }
    },
    {
      id: "arc_009",
      question: "벽돌쌓기 방법 중 '가장 튼튼하고 모서리에 반절이나 칠오토막을 사용하는' 방식은?",
      options: ["영식 쌓기", "화식 쌓기", "미식 쌓기", "네덜란드식 쌓기"],
      answer: 0,
      explanation: "영식 쌓기는 가장 견고한 쌓기 방법으로 실무에서 널리 쓰입니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "조적조의 다양한 공법과 특징을 아주 잘 구분하시네요! 🧱",
        incorrect: "영식(English bond)은 가장 튼튼하다! 구조 시험의 단골 문제입니다. ✍️"
      }
    },
    {
      id: "arc_010",
      question: "유리의 열처리 중 '급랭시켜 강도를 3~5배 높인' 유리는?",
      options: ["망입 유리", "복층 유리", "강화 유리", "접합 유리"],
      answer: 2,
      explanation: "강화 유리는 고온으로 가열 후 급속히 냉각시켜 표면 강도를 극대화한 유리입니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "특수 유리의 제작 공정과 성능 차이를 완벽히 이해하셨네요! 💎",
        incorrect: "이름 그대로 '강화'된 유리! 깨질 때도 알갱이로 깨져 안전합니다. ✨"
      }
    },
    {
      id: "arc_011",
      question: "실내 디자인의 5대 요소 중 '심리적인 크기와 중량감'을 나타내는 것은?",
      options: ["형태", "질감", "색채", "공간"],
      answer: 2,
      explanation: "색채는 온도감, 거리감뿐만 아니라 물체의 무게감에도 큰 영향을 미칩니다.",
      subject: "건축계획",
      diagnostic: {
        correct: "디자인 요소가 인간 심리에 미치는 영향을 아주 잘 알고 계시네요! 🎨",
        incorrect: "검은색은 무겁고 흰색은 가벼운 느낌! 색채 효과를 기억하세요. 🌈"
      }
    },
    {
      id: "arc_012",
      question: "지붕의 경사를 나타낼 때 '물매가 4/10'라는 의미는?",
      options: ["수평 10에 수직 4", "수평 4에 수직 10", "각도 40도", "수평 10에 대각선 4"],
      answer: 0,
      explanation: "물매는 수평 거리 10을 기준으로 한 수직 높이의 비율로 표시합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "지붕 설계의 핵심 지표인 물매 계산법을 정확히 숙지하셨네요! 📐",
        incorrect: "수평이 10일 때 높이가 얼마인지! 분수로 생각해보세요. ✍️"
      }
    },
    {
      id: "arc_013",
      question: "철근의 이음과 정착 위치로 가장 부적절한 곳은?",
      options: ["인장력이 작은 곳", "압축력이 큰 곳", "응력이 큰 곳", "이음이 겹치지 않는 곳"],
      answer: 2,
      explanation: "철근은 힘을 가장 많이 받는(응력이 큰) 곳에서 이음을 하는 것을 피해야 합니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "철근 배근의 안전 원칙을 아주 전문적으로 이해하고 계시네요! ⛓️",
        incorrect: "제일 힘든 부분에서 손을 잡고 있으면 끊어지기 쉽겠죠? 응력 큰 곳은 피하세요! 🛑"
      }
    },
    {
      id: "arc_014",
      question: "단열재의 구비 조건으로 틀린 것은?",
      options: ["열전도율이 커야 한다", "흡수성이 작아야 한다", "내화성이 있어야 한다", "가공이 쉬워야 한다"],
      answer: 0,
      explanation: "단열재는 열을 차단해야 하므로 열전도율이 낮을수록 우수한 제품입니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "건물의 에너지 효율을 결정하는 재료 특성을 정확히 짚으셨습니다! 🧊",
        incorrect: "열이 잘 전달되면 안 되죠! 전도율은 '낮을수록' 좋습니다. 📉"
      }
    },
    {
      id: "arc_015",
      question: "건축제도 시 '숨은선'으로 표현되는 선은?",
      options: ["단면선", "중심선", "점선 (파선)", "일점쇄선"],
      answer: 2,
      explanation: "보이지 않는 부분의 모양을 나타내는 숨은선은 점선(파선)으로 그립니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "투상법의 기본 규칙을 아주 정확히 이해하고 계시네요! 📐",
        incorrect: "보이지 않지만 존재하는 선! 점선으로 표시해 주세요. ✍️"
      }
    },
    {
      id: "arc_016",
      question: "콘크리트의 '슬럼프 시험'은 무엇을 측정하기 위한 것인가?",
      options: ["강도", "점성", "시공 연도 (Workability)", "공기량"],
      answer: 2,
      explanation: "슬럼프 시험은 굳지 않은 콘크리트의 반죽 질기(시공 연도)를 측정하여 작업 편의성을 확인합니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "현장 품질 관리의 가장 대표적인 시험법을 잘 알고 계시네요! 🏗️",
        incorrect: "얼마나 잘 비벼졌는지, 작업하기 편한지 확인하는 시험입니다! 💧"
      }
    },
    {
      id: "arc_017",
      question: "목재의 이음 중 '길이 방향으로 길게 연결하는' 방법은?",
      options: ["이음", "맞춤", "쪽매", "바탕"],
      answer: 0,
      explanation: "길이 방향 연결은 '이음', 직각이나 경사 방향 연결은 '맞춤'이라고 합니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "전통 및 현대 목구조의 결합 방식을 명확히 구분하셨습니다! 🌲",
        incorrect: "한 줄로 길게 잇는 것이니까 '이음'입니다! ✍️"
      }
    },
    {
      id: "arc_018",
      question: "표준 벽돌(190x90x57mm)을 0.5비(B) 두께로 쌓을 때 줄눈 두께의 표준은?",
      options: ["5mm", "10mm", "15mm", "20mm"],
      answer: 1,
      explanation: "일반적으로 벽돌 쌓기에서 가로 및 세로 줄눈의 표준 두께는 10mm로 합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "조적조 설계의 미세한 치수 기준까지 완벽하게 숙지하셨네요! 🧱",
        incorrect: "1cm(10mm)의 황금 비율을 기억하세요! 📏"
      }
    },
    {
      id: "arc_019",
      question: "창의 면적이 커질 때 실내 환경에 미치는 영향이 아닌 것은?",
      options: ["채광량 증가", "조망권 확보", "냉난방 부하 감소", "환기 유리"],
      answer: 2,
      explanation: "창이 커지면 유리 면적을 통한 열 손실이 많아지므로 냉난방 부하는 증가합니다.",
      subject: "건축계획",
      diagnostic: {
        correct: "환경 친화적인 건축 설계의 득과 실을 정확히 분석하셨습니다! ☀️",
        incorrect: "창이 크면 시원해 보이지만, 냉기나 온기가 빠져나가기 쉬워집니다! 📉"
      }
    },
    {
      id: "arc_020",
      question: "도면에서 '물체의 실제 치수'를 기입할 때 사용하는 단위는?",
      options: ["m", "cm", "mm", "km"],
      answer: 2,
      explanation: "건축 도면에서 별도의 표시가 없는 한 모든 치수 단위는 mm(밀리미터)를 원칙으로 합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "설계 도면의 약속된 기본 단위를 아주 정확히 알고 계시네요! 📏",
        incorrect: "도면 읽기의 첫걸음! 모든 숫자는 mm로 읽어주세요. ✍️"
      }
    }
  ]
};
