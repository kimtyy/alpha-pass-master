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
    },
    {
      id: "arc_021",
      question: "콘크리트 구조에서 '피복 두께'를 유지해야 하는 가장 주된 목적은?",
      options: ["디자인 미관", "철근의 부식 방지 및 내화성 확보", "콘크리트 소요량 절감", "시공 속도 향상"],
      answer: 1,
      explanation: "피복 두께는 철근이 외부 공기나 습기에 노출되어 부식되는 것을 막고, 화재 시 철근을 보호하는 핵심 역할을 합니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "건물 수명과 안전을 결정하는 피복의 중요성을 완벽히 이해하셨네요! 🏗️",
        incorrect: "철근의 '보호막'입니다! 녹슬지 않게, 불에 타지 않게 감싸주는 두께입니다. 🛡️"
      }
    },
    {
      id: "arc_022",
      question: "도면에서 '지중선(땅 속의 선)'을 표현할 때 주로 사용하는 선은?",
      options: ["실선", "파선 (점선)", "일점쇄선", "이점쇄선"],
      answer: 1,
      explanation: "보이지 않는 땅속의 기초나 구조물을 나타낼 때는 숨은선인 파선(점선)을 사용합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "도면의 투시적 표현 규약을 아주 정확히 숙지하셨네요! 📐",
        incorrect: "보이지 않는 건 점선으로! 파선이 땅속의 비밀을 알려줍니다. ✍️"
      }
    },
    {
      id: "arc_023",
      question: "실내 투시도 작성 시 '눈의 높이(Eye Level)'를 결정하는 기준은?",
      options: ["천장 높이", "바닥에서 약 1.5m 높이", "건물 전체 높이의 절반", "창문 상단 높이"],
      answer: 1,
      explanation: "투시도는 사람의 시각을 기준으로 하므로, 보통 바닥에서 1.5m 전후를 눈높이로 설정합니다.",
      subject: "건축계획",
      diagnostic: {
        correct: "인간 중심의 공간 지각 설계를 아주 잘 이해하고 계시네요! 👀",
        incorrect: "서 있는 사람의 시선! 보통 1.5m 높이가 가장 자연스러운 소점의 기준입니다. ✍️"
      }
    },
    {
      id: "arc_024",
      question: "한랭지에서 기초의 깊이를 결정할 때 고려해야 하는 가장 중요한 기준은?",
      options: ["수평 기준선", "동결선 (Frost Line)", "지표면 높이", "암반 높이"],
      answer: 1,
      explanation: "겨울철 땅이 어는 깊이(동결선)보다 깊게 기초를 설치해야 지반 팽창에 의한 붕괴를 막을 수 있습니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "지표면 아래의 환경적 제약 사항을 아주 완벽히 파악하셨네요! ❄️",
        incorrect: "얼어붙은 땅이 녹으면서 기초를 밀어올릴 수 있습니다. 동결선 아래로 내려가세요! 🛑"
      }
    },
    {
      id: "arc_025",
      question: "단열재 중 '스티로폼'이라 불리며 가볍고 가공이 쉬운 재료의 정식 명칭은?",
      options: ["유리면 (Glass wool)", "발포 폴리스티렌 (EPS)", "우레탄 폼", "암면 (Rock wool)"],
      answer: 1,
      explanation: "EPS(Expanded Poly-Styrene)는 건축 현장에서 가장 널리 쓰이는 가성비 높은 단열재입니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "현장 실무에서 쓰이는 재료의 정확한 명칭과 특성을 잘 알고 계시네요! 🧊",
        incorrect: "EPS! 가볍고 하얀 알갱이들이 모인 그 단열재를 생각해보세요. ✍️"
      }
    },
    {
      id: "arc_026",
      question: "도면에서 '절단선'을 표시할 때 선의 양 끝에 자르는 방향을 나타내는 것은?",
      options: ["동그라미", "삼각형", "화살표", "X표"],
      answer: 2,
      explanation: "절단선 끝에는 화살표를 표시하여 어느 쪽에서 바라본 단면인지를 명시합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "도면 간의 연계 관계를 해석하는 능력이 아주 뛰어납니다! 📐",
        incorrect: "어디를 보고 있는지 알려줘야죠! 화살표 방향이 단면도의 시선입니다. 🏹"
      }
    },
    {
      id: "arc_027",
      question: "석재 중 '화강암'의 특징으로 틀린 것은?",
      options: ["강도가 높다", "내마모성이 우수하다", "내화성이 뛰어나다", "외장재로 널리 쓰인다"],
      answer: 2,
      explanation: "화강암은 강도는 높으나 화재 시 균열이 생기기 쉬워 내화성은 다소 떨어지는 편입니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "석재의 장단점을 과학적으로 아주 잘 구분하시네요! 💎",
        incorrect: "철근만큼 단단하지만 불에는 약합니다. 열에 의한 팽창률이 크기 때문이죠. 🛑"
      }
    },
    {
      id: "arc_028",
      question: "지상에서 '기준점(Bench Mark)'을 설정할 때 유의사항으로 옳은 것은?",
      options: ["공사 진행에 방해가 되는 곳에 설치한다", "이동이나 파손의 염려가 없는 곳에 설치한다", "나무 기둥에 임시로 표시한다", "매일 위치를 바꾼다"],
      answer: 1,
      explanation: "기준점은 공사 내내 변하지 않아야 하므로 견고하고 안전한 곳에 설치해야 합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "현장 측량의 기초인 기준의 불변성을 아주 정확히 아시는군요! 📍",
        incorrect: "흔들리면 안 됩니다! 공사 끝날 때까지 꿋꿋이 자리를 지킬 곳을 찾으세요. ✍️"
      }
    },
    {
      id: "arc_029",
      question: "창호 기호 중 'W'가 의미하는 것은?",
      options: ["Wall (벽)", "Window (창문)", "Water (급수)", "Wire (전선)"],
      answer: 1,
      explanation: "Window의 첫 글자인 W를 사용하여 창문을 표시합니다. (예: W1, W2)",
      subject: "건축제도",
      diagnostic: {
        correct: "가장 기본적인 도면 기호를 완벽히 숙지하셨네요! 📝",
        incorrect: "W는 Window! 문의 경우는 D(Door)를 쓴다는 점도 기억해두세요. ✍️"
      }
    },
    {
      id: "arc_030",
      question: "실내 채광을 고르게 하기 위해 주로 사용하는 창의 형태는?",
      options: ["측창", "천창 (Top Light)", "고창", "정면창"],
      answer: 1,
      explanation: "천창은 지붕에 설치하여 실내 중앙까지 빛을 고르게 전달하는 효과가 뛰어납니다.",
      subject: "건축계획",
      diagnostic: {
        correct: "빛의 설계와 공간의 쾌적성을 아주 명석하게 분석하셨네요! ☀️",
        incorrect: "하늘에서 직접 쏟아지는 빛! 측면 창보다 채광 효율이 3배나 높습니다. ✨"
      }
    },
    {
      id: "arc_031",
      question: "목재의 건조 방법 중 '시간은 오래 걸리나 품질이 안정적인' 방식은?",
      options: ["인공 건조법", "자원 건조법 (Natural seasoning)", "증기 건조법", "훈연 건조법"],
      answer: 1,
      explanation: "자연 건조는 바람과 햇빛을 이용하므로 시간이 서서히 흐르며 뒤틀림이 적습니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "재료 본연의 성질을 살리는 정통 가공법을 잘 알고 계시네요! 🌲",
        incorrect: "기다림의 미학! 자연스럽게 말려야 목재가 편안해집니다. 🌬️"
      }
    },
    {
      id: "arc_032",
      question: "도면의 크기 중 'A2' 용지의 실제 규격은?",
      options: ["210 x 297mm", "297 x 420mm", "420 x 594mm", "594 x 841mm"],
      answer: 2,
      explanation: "A4(210x297)의 2배가 A3, A3의 2배가 A2입니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "도면 규격과 표준 용지 사이즈를 완벽히 마스터하셨네요! 📐",
        incorrect: "A3를 두 장 붙이면 A2! 숫자가 작아질수록 크기는 2배씩 커집니다. ✍️"
      }
    },
    {
      id: "arc_033",
      question: "철골 구조에서 '리벳'이나 '볼트' 대신 부재를 녹여 붙이는 가장 진보된 접합법은?",
      options: ["나사 접합", "핀 접합", "용접 접합 (Welding)", "꺽쇠 접합"],
      answer: 2,
      explanation: "용접은 부재를 일체화하여 강성이 크고 소음이 적은 현대적인 접합 방식입니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "현대 건축의 일체 구조화 공법을 아주 정확히 파악하셨습니다! 🔥",
        incorrect: "구멍을 뚫지 않고 통째로 붙인다! 일체감이 가장 뛰어난 방식입니다. ⛓️"
      }
    },
    {
      id: "arc_034",
      question: "CAD 작업 시 '도면에 그린 객체를 일정 간격으로 평행하게 띄우는' 명령은?",
      options: ["Copy", "Mirror", "Offset", "Array"],
      answer: 2,
      explanation: "Offset은 지정한 거리만큼 객체를 그대로 평행 이동시켜 복제하는 핵심 기능입니다.",
      subject: "전산기초",
      diagnostic: {
        correct: "CAD 활용 능력이 아주 능숙하시네요! 실무 효율이 높으실 것 같습니다. 💻",
        incorrect: "벽체선을 그릴 때 필수! '간격 띄우기'를 생각해보세요. ✍️"
      }
    },
    {
      id: "arc_035",
      question: "실내 디자인 원리 중 '유사하거나 선명한 차이가 반복되어 시각적 즐거움'을 주는 것은?",
      options: ["조화", "대비", "리듬", "강조"],
      answer: 2,
      explanation: "리듬은 규칙적인 반복이나 점진적인 변화를 통해 시각적인 역동성을 부여하는 원리입니다.",
      subject: "건축계획",
      diagnostic: {
        correct: "디자인의 미적 원리와 공간의 흐름을 아주 감각적으로 이해하시네요! 🎨",
        incorrect: "음악처럼 시각에도 박자가 있다! 반복되는 패턴이 주는 즐거움입니다. ✨"
      }
    },
    {
      id: "arc_036",
      question: "천연 재료인 '석회'를 주원료로 하며 공기 중의 탄산가스와 반응하여 굳는 것은?",
      options: ["수경성 재료", "기경성 재료 (식회 등)", "가열성 재료", "혼합성 재료"],
      answer: 1,
      explanation: "공기(기)와 반응하여 굳는 성질을 기경성이라고 합니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "재료의 경화 원리를 화학적으로 아주 완벽히 파악하셨네요! 🧪",
        incorrect: "물이 없어도 공기만 있으면 굳습니다! 석회의 독특한 성질이죠. 🌬️"
      }
    },
    {
      id: "arc_037",
      question: "건축 제도의 투상법 중 '3개의 축이 120도'를 이루며 입체적으로 보여주는 방식은?",
      options: ["정투상법", "등각투상법 (Isommetric)", "사투상법", "투시투상법"],
      answer: 1,
      explanation: "등각투상법은 실제 크기를 비교하기 쉬워 부품도나 시공 상세도에 자주 쓰입니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "입체 도면의 기하학적 구성 원리를 아주 명석하게 인지하고 계시네요! 📐",
        incorrect: "모든 각도가 똑같다! 입체감을 주면서도 치수를 재기 편한 방식입니다. ✍️"
      }
    },
    {
      id: "arc_038",
      question: "콘크리트 구조물의 균열을 방지하기 위해 '일정 간격으로 미리 끊어주는' 줄눈은?",
      options: ["신축 줄눈 (Expansion Joint)", "시공 줄눈", "조절 줄눈", "미끄럼 줄눈"],
      answer: 0,
      explanation: "신축 줄눈은 온도 변화에 따른 팽창과 수축을 흡수하여 전체적인 균열을 방지합니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "구조물의 거동과 내구성 확보를 위한 세심한 설계를 잘 아시네요! 🏗️",
        incorrect: "건물도 숨을 쉰다! 늘어났다 줄어들 때 건물이 안 다치게 미리 길을 내준 겁니다. ✍️"
      }
    },
    {
      id: "arc_039",
      question: "도면 하단에 '축척 1/50'이라 적혀 있을 때, 도면상 20mm는 실제 얼마인가?",
      options: ["100mm", "500mm", "1,000mm (1m)", "2,000mm"],
      answer: 2,
      explanation: "1/50 축척이므로 도면 치수에 50을 곱합니다. (20 * 50 = 1,000)",
      subject: "건축제도",
      diagnostic: {
        correct: "도면 치수와 실제 규모의 환산 능력이 아주 신속하고 정확하시네요! 📐",
        incorrect: "50배 줌 아웃! 20mm를 50배 하면 1m가 됩니다. ✍️"
      }
    },
    {
      id: "arc_040",
      question: "건축 계획에서 'LDK'형 평면 구성이 의미하는 구성 요소가 아닌 것은?",
      options: ["Livingroom (거실)", "Diningroom (식당)", "Kitchen (부엌)", "Library (서재)"],
      answer: 3,
      explanation: "LDK는 가족의 공용 공간인 거실, 식당, 부엌을 일체화한 현대적 주거 형태입니다.",
      subject: "건축계획",
      diagnostic: {
        correct: "주거 공간의 기능적 결합 모델을 완벽히 이해하고 계시네요! 🏠",
        incorrect: "삼위일체! 거실(L)·식당(D)·부엌(K)이 하나로 연결된 트렌디한 구조입니다. ✨"
      }
    },
    {
      id: "arc_041",
      question: "CAD에서 '원을 그리는' 가장 기본적인 명령은?",
      options: ["Arc", "Circle", "Line", "Polygon"],
      answer: 1,
      explanation: "Circle 명령을 실행한 후 중심점과 반지름(또는 지름)을 입력하여 원을 그립니다.",
      subject: "전산기초",
      diagnostic: {
        correct: "가장 기초적인 전산 제도 명령어를 정확히 알고 계시네요! 💻",
        incorrect: "이름 그대로! 'C'만 쳐도 원을 그릴 준비가 됩니다. ✍️"
      }
    },
    {
      id: "arc_042",
      question: "건축 구조 중 '공사 기간이 가장 단축되는' 방식은?",
      options: ["일체식 구조 (콘크리트)", "가구식 구조 (목재/철골)", "조적식 구조 (벽돌)", "조립식 구조 (Pre-fab)"],
      answer: 3,
      explanation: "조립식 구조는 공장에서 미리 제작한 부재를 현장에서 끼워 맞추기만 하므로 속도가 압도적입니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "현대 건축 시공의 효율성과 속도 중심 공법을 잘 인지하고 계시네요! 🏗️",
        incorrect: "레고 블록처럼! 밖에서 다 만들어와서 합치면 제일 빠릅니다. 🚀"
      }
    },
    {
      id: "arc_043",
      question: "지붕 재료 중 '기와'를 올릴 때 지붕의 물매는 최소 얼마 이상이어야 하는가?",
      options: ["1/10", "4/10", "6/10", "8/10"],
      answer: 1,
      explanation: "기와 지붕은 빗물 역류를 방지하기 위해 보통 4/10(4물매) 이상의 급경사가 필요합니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "재료에 따른 시공 기준 수치를 아주 세밀하게 파고드시는군요! 📐",
        incorrect: "기와는 무거우니까 물이 더 빨리 내려가게 각도를 세워줘야 합니다. ✍️"
      }
    },
    {
      id: "arc_044",
      question: "CAD에서 '한 번에 선택한 객체들을 하나의 그룹으로 묶거나 면적을 채우는' 기능은?",
      options: ["Block", "Hatch", "Explode", "Erase"],
      answer: 1,
      explanation: "Hatch는 단면의 재질 표시나 영역을 무늬로 채울 때 사용하는 핵심 명령입니다.",
      subject: "전산기초",
      diagnostic: {
        correct: "도면의 시인성을 높이는 고급 채우기 기능을 완벽히 이해하셨네요! 💻",
        incorrect: "벽돌이나 콘크리트 무늬로 꽉 채워주는 그 기능! 'H'를 기억하세요. ✍️"
      }
    },
    {
      id: "arc_045",
      question: "목재의 결 중 '나무의 나이테가 평행하게 보이는' 결은?",
      options: ["곧은결", "너울결", "무늬결", "옹이결"],
      answer: 0,
      explanation: "곧은결(Quarter-sawn)은 나이테가 곧게 뻗어 보여 변형이 적고 무늬가 단정합니다.",
      subject: "건축재료",
      diagnostic: {
        correct: "고급 목재의 미적·물리적 특성을 아주 탁월하게 분석하셨습니다! 🌲",
        incorrect: "쭉쭉 뻗은 줄무늬! 휘지 않고 튼튼한 고급 가구에 주로 쓰입니다. ✨"
      }
    },
    {
      id: "arc_046",
      question: "실내 환경의 4요소가 아닌 것은?",
      options: ["열 환경", "빛 환경", "음 환경", "가구 환경"],
      answer: 3,
      explanation: "실내 환경의 기본 요소는 열, 빛, 소리(음), 공기(환경)입니다.",
      subject: "건축계획",
      diagnostic: {
        correct: "건물 내부의 쾌적함을 구성하는 물리적 변수를 정확히 알고 계시네요! 🌡️",
        incorrect: "온도, 조명, 소음, 공기질! 이 네 가지가 살기 좋은 집의 기준입니다. ✨"
      }
    },
    {
      id: "arc_047",
      question: "콘크리트 내의 기포를 뽑아내어 밀도를 높이는 장비는?",
      options: ["바이브레이터 (진동기)", "믹서기", "펌프카", "크레인"],
      answer: 0,
      explanation: "봉형 진동기 등을 사용하여 콘크리트 사이의 공기를 제거해야 강도가 높아집니다.",
      subject: "건축구조",
      diagnostic: {
        correct: "현장 품질 관리의 핵심적인 시공 장비 활용을 잘 이해하시네요! 🏗️",
        incorrect: "바르르 떨어서 빈틈없이 꽉 채워줍니다! 진동은 필수 공정입니다. 🔨"
      }
    },
    {
      id: "arc_048",
      question: "도면에서 '변경 전의 원래 모양'을 가상으로 표현할 때 사용하는 선은?",
      options: ["파선", "가느다란 실선", "이점쇄선", "굵은 실선"],
      answer: 2,
      explanation: "이점쇄선(Phantom line)은 가상선으로 활용하여 기준의 위치나 예전 모양을 나타냅니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "도면상의 상징적인 언어 체계를 아주 깊이 있게 인지하고 계시네요! 📏",
        incorrect: "점 두 개짜리 쇄선! 옛 기억을 담거나 미래 위치를 알려주는 '가상'의 선입니다. ✍️"
      }
    },
    {
      id: "arc_049",
      question: "건축물에서 '물의 침투'를 가장 완벽히 막아야 하는 부분의 기호는?",
      options: ["WP (Water Proofing)", "AV (Air Vent)", "SD (Smoke Detector)", "EL (Elevation)"],
      answer: 0,
      explanation: "WP는 방수 처리를 의미하는 약어입니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "부위별 특수 공정 필요 기호를 아주 명확히 판독하시네요! 💧",
        incorrect: "방수(Water Proof)! 옥상이나 욕실 도면에서 이 기호를 찾아보세요. 🛡️"
      }
    },
    {
      id: "arc_050",
      question: "도면을 보관할 때 '가장 바깥쪽 면'에 보이도록 접어야 하는 정보는?",
      options: ["도면의 중앙부", "축척 표시부", "표제란 (Titile Block)", "단면 기호부"],
      answer: 2,
      explanation: "표제란이 밖으로 나와야 도면을 펼치지 않고도 어떤 내용인지 바로 확인할 수 있습니다.",
      subject: "건축제도",
      diagnostic: {
        correct: "도면 관리의 실무적인 예절과 효율성을 완벽히 갖추셨습니다! 📁",
        incorrect: "이름표가 얼굴입니다! 표제란이 보이게 접는 게 기술자의 상식입니다. ✍️"
      }
    }
  ]
};
