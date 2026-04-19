import { ExamSubject } from '../exams';

export const infoProcessingEngineer: ExamSubject = {
  id: 'info-processing-engineer',
  title: '정보처리기사',
  category: 'Engineer',
  questions: [
    // 1과목: 소프트웨어 설계 (1-20)
    {
      id: "ipe_001",
      question: "소프트웨어 아키텍처 모델 중 외부에서 들어온 데이터를 순차적으로 처리하여 결과를 다음 단계로 넘겨주는 패턴은?",
      options: ["Layered Style", "Pipe-Filter Style", "Event-Driven Style", "Repository Style"],
      answer: 1,
      explanation: "파이프-필터(Pipe-Filter) 패턴은 데이터 스트림을 생성하고 처리하는 시스템을 위한 구조로, 필터 간 데이터 이동은 파이프를 통해 이루어집니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "아키텍처 패턴의 핵심을 정확히 파악하고 계시네요! 🏗️",
        incorrect: "파이프와 필터의 데이터 흐름 개념을 다시 한번 복습해 보세요. 🧐"
      }
    },
    {
      id: "ipe_002",
      question: "GoF(Gang of Four) 디자인 패턴 중 '기존 클래스를 재사용하기 위해 인터페이스를 변경하여 맞추는' 패턴은?",
      options: ["Bridge", "Adapter", "Decorator", "Composite"],
      answer: 1,
      explanation: "어댑터(Adapter) 패턴은 서로 다른 인터페이스를 가진 클래스들이 함께 작동할 수 있도록 인터페이스를 변환해주는 '클래스 변환기' 역할을 합니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "구조 패턴의 대표 주자, 어댑터를 완벽히 이해하셨습니다! 🔌",
        incorrect: "인터페이스 변환 = 어댑터! 이 공식을 잊지 마세요. ✍️"
      }
    },
    {
      id: "ipe_003",
      question: "유스케이스(Use Case) 다이어그램의 구성 요소가 아닌 것은?",
      options: ["액터(Actor)", "유스케이스(Use Case)", "관계(Relationship)", "메시지(Message)"],
      answer: 3,
      explanation: "메시지는 시퀀스(Sequence) 다이어그램이나 커뮤니케이션 다이어그램의 핵심 요소입니다. 유스케이스는 시스템의 기능적 요구사항을 정의합니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "UML 다이어그램별 특징을 명확히 구분하고 계시군요! 📊",
        incorrect: "유스케이스 다이어그램의 4대 요소(액터, 유스케이스, 관계, 시스템 경계)를 체크하세요! ⚠️"
      }
    },
    {
      id: "ipe_004",
      question: "소프트웨어 설계 시 '내용 결합도(Content Coupling)'가 의미하는 것은?",
      options: ["모듈 간 매개변수로만 데이터를 주고받는 경우", "공통 데이터 영역을 여러 모듈이 참조하는 경우", "한 모듈이 다른 모듈의 내부 논리를 직접 참조하거나 수정하는 경우", "모듈 간의 인터페이스가 제어 요소로 구성되는 경우"],
      answer: 2,
      explanation: "내용 결합도(Content Coupling)는 결합도가 가장 높고 가장 좋지 않은 설계로, 다른 모듈의 내부 기능이나 데이터를 직접 참조하는 상태입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "결합도의 위험성을 정확히 인지하고 계시네요. 클린 코드의 기초입니다! 🧼",
        incorrect: "결합도 순서(내-공-외-제-스-자)와 각 특징을 다시 암기해 봅시다. 🤯"
      }
    },
    {
      id: "ipe_005",
      question: "응집도(Cohesion) 중 동일한 입출력을 사용하여 서로 다른 기능을 수행하는 모듈들의 응집도는?",
      options: ["순차적 응집도", "통신적 응집도", "절차적 응집도", "기능적 응집도"],
      answer: 1,
      explanation: "통신적(Communicational) 응집도는 동일한 입력과 출력을 사용하여 서로 다른 기능을 수행하는 경우입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "응집도의 미세한 차이를 잘 구분해내셨습니다! 🎯",
        incorrect: "통신적 응집도와 순차적 응집도의 차이점을 다시 한번 확인해 보세요. 📚"
      }
    },
    {
      id: "ipe_006",
      question: "람바우(Rumbaugh) 분석 기법에서 시스템의 정적 구조를 표현하는 모델은?",
      options: ["객체 모델링", "동적 모델링", "기능 모델링", "상태 모델링"],
      answer: 0,
      explanation: "람바우 기법의 3대 모델링: 1. 객체 모델링(Information), 2. 동적 모델링(Control), 3. 기능 모델링(Data Flow)입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "고전적이지만 중요한 람바우 기법의 핵심을 짚으셨습니다! 🏛️",
        incorrect: "객(정적)-동(제어)-기(흐름) 공식을 기억하세요! ✍️"
      }
    },
    {
      id: "ipe_007",
      question: "데이터 흐름도(DFD)의 구성 요소 중 '프로세스'를 의미하는 기호는?",
      options: ["화살표", "원(Circle)", "직사각형", "평행선"],
      answer: 1,
      explanation: "원(Circle) 또는 둥근 사각형은 데이터를 가공하는 프로세스를 의미합니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "DFD의 기본 표기법을 숙지하고 계시군요. 정밀한 설계가 기대됩니다! 🎨",
        incorrect: "엔터티(사각형), 프로세스(원), 데이터 흐름(화살표), 창고(평행선)! ⚠️"
      }
    },
    {
      id: "ipe_008",
      question: "사용자 인터페이스(UI) 설계 원칙 중 '누구나 쉽게 이해하고 사용할 수 있어야 함'을 의미하는 것은?",
      options: ["직관성", "유효성", "학습성", "유연성"],
      answer: 0,
      explanation: "직관성(Intuitiveness)은 별도의 학습 없이도 사용자가 쉽게 이해하고 조작할 수 있는 특성입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "UX의 기본 중의 기본을 정확히 알고 계시네요! ✨",
        incorrect: "UI 4대 원칙(직-유-학-유)의 각 정의를 한 번 더 체크하세요. 🧐"
      }
    },
    {
      id: "ipe_009",
      question: "애자일(Agile) 개발 선언문에 해당하지 않는 항목은?",
      options: ["개인과 상호작용보다 프로세스와 도구", "문서보다 동작하는 소프트웨어", "계약 협상보다 고객과의 협력", "계획을 따르기보다 변화에 대응하기"],
      answer: 0,
      explanation: "애자일 선언문은 '프로세스와 도구보다 개인과 상호작용'을 더 가치 있게 여깁니다. (순서가 반대입니다)",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "현대적인 개발 철학을 정확히 관통하고 계십니다! 🚀",
        incorrect: "애자일은 '사람'과 '변화'가 중심입니다. 다시 읽어보세요! 🛡️"
      }
    },
    {
      id: "ipe_010",
      question: "객체지향 설계 원칙(SOLID) 중 '상위 타입의 객체를 하위 타입으로 치환해도 프로그램이 정상 동작해야 한다'는 것은?",
      options: ["SRP", "OCP", "LSP", "ISP"],
      answer: 2,
      explanation: "LSP(Liskov Substitution Principle)는 리스코프 치환 원칙으로, 자식 클래스는 언제나 부모 클래스를 대체할 수 있어야 한다는 원칙입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "정말 중요한 LSP 원칙을 알고 계시네요. 탄탄한 객체지향 설계의 기반입니다! 🧠",
        incorrect: "L(치환)-S(단일)-O(확장)-I(분리)-D(역전)! SOLID를 다시 한번 복습하세요. ⚠️"
      }
    },
    {
      id: "ipe_011",
      question: "HIPO(Hierarchy Input Process Output) 차트의 특징이 아닌 것은?",
      options: ["시스템의 기능을 시각적으로 도식화한다", "하향식 소프트웨어 개발을 위한 도구이다", "상향식 설계에 최적화되어 있다", "가시적 도표, 총괄 도표, 상세 도표로 구성된다"],
      answer: 2,
      explanation: "HIPO는 하향식(Top-Down) 설계 및 분석을 위한 도구입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "설계 도구의 특징을 아주 예리하게 파악하셨습니다! 🔍",
        incorrect: "HIPO는 '위에서 아래로' 흐르는 하향식 구조입니다. 🧐"
      }
    },
    {
      id: "ipe_012",
      question: "메시지 지향 미들웨어(MOM)의 특징으로 옳은 것은?",
      options: ["동기식 통신 방식을 주로 사용한다", "데이터 분실 위험이 실시간 통신보다 높다", "비동기식 전달 방식으로 서비스 간 결합도를 낮춘다", "클라이언트와 서버가 항상 연결되어 있어야 한다"],
      answer: 2,
      explanation: "MOM(Message Oriented Middleware)은 메시지 큐를 활용하여 비동기식(Asynchronous) 통신을 수행하며, 분산 시스템의 결합도를 낮추는 데 효과적입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "미들웨어 아키텍처의 핵심을 정확히 이해하셨네요! 📡",
        incorrect: "메시지 큐(MQ)와 비동기 통신의 이점을 다시 한번 생각해 보세요. ⚠️"
      }
    },
    {
      id: "ipe_013",
      question: "요구사항 분석 단계에서 가장 먼저 수행해야 할 작업은?",
      options: ["데이터 흐름도 작성", "요구사항 구체화", "요구사항 타당성 검토", "요구사항 수집 및 식별"],
      answer: 3,
      explanation: "분석의 시작은 고객으로부터 무엇을 원하는지 수집(Elicitation)하고 식별하는 단계입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "프로젝트 성패를 가르는 첫 단계를 정확히 아시는군요! 🥇",
        incorrect: "수집 후 분류, 모델링, 할당, 협상 순으로 진행됩니다. ✍️"
      }
    },
    {
      id: "ipe_014",
      question: "CASE(Computer Aided Software Engineering)의 주요 기능이 아닌 것은?",
      options: ["모듈 및 인터페이스 설계 지원", "소프트웨어 생명주기 전 단계 연결", "사용자 인터페이스 자동 생성", "복잡하고 난해한 코드 자동 삭제"],
      answer: 3,
      explanation: "CASE는 설계, 자동화, 문서화 등을 돕지만 사용자 코드를 임의로 삭제하는 기능은 포함되지 않습니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "자동화 도구의 범위를 정확히 한정하고 계시네요! 🛠️",
        incorrect: "CASE가 소프트웨어 공학의 어떤 영역을 자동화하는지 다시 체크하세요. 🧐"
      }
    },
    {
      id: "ipe_015",
      question: "디자인 패턴 중 '생성 패턴'이 아닌 것은?",
      options: ["Singleton", "Prototype", "Proxy", "Abstract Factory"],
      answer: 2,
      explanation: "프록시(Proxy) 패턴은 구조(Structural) 패턴에 해당합니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "패턴 분류 마스터! 생성/구조/행위의 차이를 완벽히 아시는군요. 🏗️",
        incorrect: "생성 패턴 5가지(싱-프-빌-팩-추)를 다시 한번 외워봅시다! ✍️"
      }
    },
    {
      id: "ipe_016",
      question: "내결함성(Fault Tolerance)을 위해 시스템의 일부에 결함이 발생하더라도 기능을 유지하는 기능은?",
      options: ["Fail-Soft", "Fail-Safe", "Fail-Over", "Fail-Back"],
      answer: 0,
      explanation: "Fail-Soft는 결함 발생 시 중요도가 낮은 기능을 포기하더라도 핵심 기능은 유지하도록 하는 기법입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "가용성 설계의 고급 개념을 정확히 선택하셨습니다! 🛡️",
        incorrect: "Safe(안전 정지)와 Soft(기능 축소 유지)의 미묘한 차이를 기억하세요. ⚠️"
      }
    },
    {
      id: "ipe_017",
      question: "UML 관계 중 '한 사물의 명세가 바뀌면 다른 사물에 영향을 주는' 일반적인 관계는?",
      options: ["일반화 관계", "의존 관계", "실체화 관계", "포함 관계"],
      answer: 1,
      explanation: "의존(Dependency) 관계는 점선 화살표로 표현하며, 한 사물의 변화가 다른 사물에 미치는 일시적인 관계를 말합니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "UML 관계론의 정수를 파악하고 계시네요! 🔗",
        incorrect: "의존(점선) vs 연관(실선)의 차이를 시각적으로 비교해 보세요. 🧐"
      }
    },
    {
      id: "ipe_018",
      question: "객체지향 기법에서 객체가 메시지를 받아 실행하는 구체적인 연산은?",
      options: ["클래스", "메소드", "속성", "캡슐화"],
      answer: 1,
      explanation: "메소드(Method)는 객체의 행위를 정의하는 구체적인 코드 로직입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "객체지향의 기본용어를 완벽히 정리하셨습니다! 💻",
        incorrect: "메시지는 '요청'이고, 메소드는 그 요청에 대한 '응답 구현체'입니다. 🚦"
      }
    },
    {
      id: "ipe_019",
      question: "스크럼(Scrum) 프레임워크에서 개발 주기를 의미하는 용어는?",
      options: ["백로그(Backlog)", "스프린트(Sprint)", "데일리 미팅", "리트로스펙티브"],
      answer: 1,
      explanation: "스프린트(Sprint)는 보통 1~4주 단위의 반복적인 개발 주기를 뜻합니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "애자일 실무 용어에 아주 밝으시군요! 실무 투입 즉시 적응 가능입니다. 🏃",
        incorrect: "스프린트는 스크럼의 심장과 같은 주기입니다. 기억하세요! 💓"
      }
    },
    {
      id: "ipe_020",
      question: "코드의 가독성을 높이기 위해 수행하는 내부 구조 개선 작업을 무엇이라 하는가?",
      options: ["리팩토링", "리엔지니어링", "마이그레이션", "포팅"],
      answer: 0,
      explanation: "리팩토링(Refactoring)은 기능 변경 없이 코드의 가독성과 유지보수성을 높이는 질적 개선 작업입니다.",
      subject: "소프트웨어 설계",
      diagnostic: {
        correct: "지속 가능한 개발을 위한 최고의 습관을 알고 계시네요! 🧼",
        incorrect: "기능 유지 + 구조 개선 = 리팩토링! 잊지 마세요. ✍️"
      }
    },

    // 2과목: 소프트웨어 개발 (21-40)
    {
      id: "ipe_021",
      question: "단위 테스트(Unit Test) 중 코드의 내부 로직을 경로별로 검증하는 기법은?",
      options: ["블랙박스 테스트", "화이트박스 테스트", "성능 테스트", "보안 테스트"],
      answer: 1,
      explanation: "화이트박스 테스트는 소스 코드의 제어 흐름, 데이터 흐름 등 내부 구조를 직접 보며 테스트하는 방식입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "테스트 기법의 이진 분류를 정확히 꿰뚫고 계시네요! 🔎",
        incorrect: "코드를 보면 White, 명세만 보면 Black입니다. 명쾌하죠? 🌑"
      }
    },
    {
      id: "ipe_022",
      question: "소프트웨어 형상 관리(SCM)의 항목에 포함되지 않는 것은?",
      options: ["소스 코드", "설계 문서", "테스트 계획서", "개발자 급여 명세서"],
      answer: 3,
      explanation: "형상 관리는 소프트웨어를 구성하는 문서, 코드, 라이브러리 등 산출물을 대상으로 합니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "관리 대상(Baseline)의 정의를 정확히 알고 계시군요! 📦",
        incorrect: "소프트웨어 생산 과정의 모든 '산출물'이 형상 관리 대상입니다. ⚠️"
      }
    },
    {
      id: "ipe_023",
      question: "스택(Stack)을 이용한 후위 표기법(Postfix Notation) 계산 시 사용하는 연산 순서는?",
      options: ["LIFO", "FIFO", "LILO", "Random"],
      answer: 0,
      explanation: "스택은 나중에 들어온 것이 먼저 나가는 Last-In First-Out 방식입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "자료구조의 정석, 스택을 완벽히 정복하셨습니다! 📚",
        incorrect: "스택(LIFO) vs 큐(FIFO)! 이 둘은 자료구조 암기의 시작입니다. ✍️"
      }
    },
    {
      id: "ipe_024",
      question: "다음 중 정렬(Sorting) 알고리즘 중에서 평균 시간 복잡도가 O(n log n)인 것은?",
      options: ["버블 정렬", "선택 정렬", "삽입 정렬", "퀵 정렬"],
      answer: 3,
      explanation: "퀵(Quick), 힙(Heap), 병합(Merge) 정렬은 평균적으로 O(n log n)의 효율적인 성능을 보입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "알고리즘 효율 분석 능력이 탁월하시네요! 대용량 처리에 필수적입니다. 🚀",
        incorrect: "정렬별 복잡도(O(n²) vs O(n log n))를 다시 한번 정리하세요! 🤯"
      }
    },
    {
      id: "ipe_025",
      question: "전체 소프트웨어를 구성하는 작은 단위로, 독자적인 기능을 수행하고 재사용이 가능한 것은?",
      options: ["패키지", "모듈", "라이브러리", "컴포넌트"],
      answer: 1,
      explanation: "모듈(Module)은 소프트웨어 설계의 독립적인 최소 단위입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "모듈화의 가치를 잘 알고 계시네요. 좋은 설계자의 자격입니다! 🧱",
        incorrect: "모듈의 독립성과 재사용성이 왜 중요한지 생각해보세요. 🧐"
      }
    },
    {
      id: "ipe_026",
      question: "형상 관리 도구 중 중앙 집중식이 아닌 '분산형 방식'으로 운영되는 도구는?",
      options: ["CVS", "SVN", "Git", "ClearCase"],
      answer: 2,
      explanation: "Git은 로컬 저장소와 원격 저장소가 독립적으로 존재하는 대표적인 분산 제어 시스템입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "현대 개발의 필수 도구, Git의 원리를 꿰뚫고 계시네요! 🌿",
        incorrect: "중앙 집중(SVN)과 분산(Git)의 차이를 명령어 레벨에서 생각해보세요. ⚠️"
      }
    },
    {
      id: "ipe_027",
      question: "블랙박스 테스트 기법 중 입력 데이터 영역의 경계선 부근 값을 선택하여 테스트하는 기법은?",
      options: ["동치 분할 검합", "경계값 분석", "원인-결과 그래프", "오류 예측 검사"],
      answer: 1,
      explanation: "경계값 분석(Boundary Value Analysis)은 오류가 가장 많이 발생하는 0, 1, 99, 100 등 입력 범위의 끝부분을 집중 테스트합니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "경험 많은 테스터의 노하우가 느껴지는 정답입니다! 🎯",
        incorrect: "버그는 가장자리에서 발생한다는 사실을 잊지 마세요! 🧐"
      }
    },
    {
      id: "ipe_028",
      question: "통합 테스트 중 '상위 모듈에서 하위 모듈 방향'으로 제어 경로를 따라 이동하며 테스트하는 기법은?",
      options: ["상향식 통합", "하향식 통합", "백본 통합", "빅뱅 통합"],
      answer: 1,
      explanation: "하향식(Top-Down) 통합은 깊이 우선 또는 너비 우선 방식으로 상위에서 하단으로 통합하며 '스텁(Stub)'을 사용합니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "통합 전략의 방향성을 정확히 이해하셨군요! ⬇️",
        incorrect: "하향식은 스텁(Stub), 상향식은 드라이버(Driver)! 필수 암기입니다. ✍️"
      }
    },
    {
      id: "ipe_029",
      question: "이진 트리(Binary Tree) 순회 방식 중 '왼쪽 자식 -> 오른쪽 자식 -> 루트' 순서로 방문하는 것은?",
      options: ["전위 순회(Pre-order)", "중위 순회(In-order)", "후위 순회(Post-order)", "레벨 순회"],
      answer: 2,
      explanation: "후위 순회는 자식들을 먼저 방문하고 마지막에 루트를 방문합니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "트리 구조 탐색 알고리즘을 완벽히 이해하셨네요! 🌳",
        incorrect: "루트의 위치가 앞(전), 중간(중), 뒤(후)! 간단한 공식입니다. ✨"
      }
    },
    {
      id: "ipe_030",
      question: "메모리 상에 연속적으로 데이터를 배치하여 인덱스를 통한 접근이 가장 빠른 자료구조는?",
      options: ["연결 리스트", "배열", "해시 테이블", "인접 리스트"],
      answer: 1,
      explanation: "배열(Array)은 연속된 메모리 공간을 사용하여 O(1)의 속도로 데이터에 접근할 수 있습니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "기본 중의 기본, 배열의 장점을 잘 활용하시겠네요! ⚡",
        incorrect: "배열의 연속성과 인덱스 계산의 원리를 다시 떠올려보세요. 🧐"
      }
    },
    {
      id: "ipe_031",
      question: "인터페이스 구현 시 보안을 위해 송신 데이터의 노출을 방지하는 기술은?",
      options: ["암호화", "복호화", "캡슐화", "가상화"],
      answer: 0,
      explanation: "암호화(Encryption)는 평문을 알아볼 수 없는 암호문으로 변환하는 과정입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "보안의 첫 단추인 암호화를 정확히 인지하고 계십니다! 🔐",
        incorrect: "공개키/비밀키 등 상세 암호화 방식도 함께 학습해보세요. ⚠️"
      }
    },
    {
      id: "ipe_032",
      question: "애플리케이션 성능 지표 중 '주어진 시간 내에 시스템이 처리할 수 있는 업무량'은?",
      options: ["응답 시간", "경과 시간", "처리량(Throughput)", "자원 사용률"],
      answer: 2,
      explanation: "처리량(Throughput)은 단위 시간당 작업 처리 능력을 의미합니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "성능 분석의 핵심 지표를 정확히 알고 계시네요! 📈",
        incorrect: "응답 시간(돌아오는 시간)과 처리량(해치우는 양)을 구분하세요! 🚦"
      }
    },
    {
      id: "ipe_033",
      question: "테스트 케이스의 구성 요소가 아닌 것은?",
      options: ["입력값", "예상 출력값", "테스트 실행 조건", "개발자의 프로필"],
      answer: 3,
      explanation: "테스트 케이스는 특정 목적을 검증하기 위한 입력, 조건, 결과의 집합입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "문서화의 핵심을 짚으셨습니다. 체계적인 검증이 가능하겠네요! 📝",
        incorrect: "테스트 케이스는 '누가 보더라도 재현 가능'해야 합니다. 🧐"
      }
    },
    {
      id: "ipe_034",
      question: "해시(Hash) 함수에서 서로 다른 입력값에 대해 같은 해시값이 나오는 현상을 무엇이라 하는가?",
      options: ["오류", "충돌(Collision)", "오버플로우", "세그먼테이션"],
      answer: 1,
      explanation: "충돌(Collision)은 해시의 한계로 인해 발생하며, 체이닝이나 개방 주소법으로 해결합니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "해시 자료구조의 고난도 문제를 잘 해결하셨습니다! 💥",
        incorrect: "충돌이 왜 발생하고, 어떻게 해결하는지가 해시 공부의 정수입니다. 🧠"
      }
    },
    {
      id: "ipe_035",
      question: "컴포넌트 저장소에서 필요한 컴포넌트를 찾아 조립하여 개발하는 방식을 무엇이라 하는가?",
      options: ["CBD(Component Based Development)", "Agile", "Waterfall", "DevOps"],
      answer: 0,
      explanation: "CBD는 독립적인 컴포넌트를 조립하여 새로운 시스템을 만드는 효율적인 개발 방법론입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "컴포넌트 중심의 생산성 높은 사고를 가지고 계시네요! 🧩",
        incorrect: "Lego 블록을 조립하는 방식을 상상해보세요! 🏗️"
      }
    },
    {
      id: "ipe_036",
      question: "다음 중 '최소 신장 트리(MST)'를 구하는 알고리즘은?",
      options: ["다익스트라 알고리즘", "크루스칼(Kruskal) 알고리즘", "A* 알고리즘", "정렬 알고리즘"],
      answer: 1,
      explanation: "크루스칼(Kruskal)과 프림(Prim) 알고리즘은 그래프 내의 모든 정점을 최소 비용으로 연결하는 MST를 찾습니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "그래프 이론의 정수를 파악하셨습니다. 네트워크 최적화에 강하시겠네요! 🕸️",
        incorrect: "크루스칼(간선 중심)과 프림(점 중심)을 다시 비교해보세요. ✍️"
      }
    },
    {
      id: "ipe_037",
      question: "디버깅(Debugging)과 테스트(Testing)의 근본적인 차이는?",
      options: ["테스트는 오류를 찾고, 디버깅은 오류를 수정한다", "디버깅은 오류를 찾고, 테스트는 오류를 수정한다", "둘은 완전히 같은 용어이다", "테스트는 개발자가 하고, 디버깅은 사용자가 한다"],
      answer: 0,
      explanation: "테스트는 무결성을 검증하고 결함을 '발견'하는 활동이며, 디버깅은 발견된 결함의 원인을 '분석하고 수정'하는 활동입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "개발 프로세스의 본질적인 역할을 명확히 인지하고 계시네요! 🕵️",
        incorrect: "찾는 것(Test)과 고치는 것(Debug)! 혼동하면 위험합니다. ⚠️"
      }
    },
    {
      id: "ipe_038",
      question: "소프트웨어 배포 시 저작권 보호를 위해 사용되는 기술의 총칭은?",
      options: ["SCM", "DRM(Digital Rights Management)", "IDE", "WAS"],
      answer: 1,
      explanation: "DRM은 콘텐츠의 인가되지 않은 배포와 사용을 막는 저작권 보호 솔루션입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "자산 보호의 중요성을 잘 알고 계시네요. 비즈니스 마인드도 훌륭합니다! 💿",
        incorrect: "패키징, 인증, 키 관리 등 DRM의 구성 요소를 체크하세요. 🧐"
      }
    },
    {
      id: "ipe_039",
      question: "객체지향 테스트 중 클래스의 개별 메소드를 테스트하는 단계는?",
      options: ["유닛 테스트", "클래스 테스트", "통합 테스트", "클러스터 테스트"],
      answer: 1,
      explanation: "객체지향에서의 최소 단위 테스트는 클래스 내의 상태와 행위를 검증하는 클래스(Class) 테스트입니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "객체지향 패러다임에 맞춘 테스트 시각을 확보하셨군요! 🔮",
        incorrect: "클래스 테스트가 기존 단위 테스트와 어떻게 다른지 생각해보세요. 🧐"
      }
    },
    {
      id: "ipe_040",
      question: "JSON(JavaScript Object Notation)의 특징이 아닌 것은?",
      options: ["사람이 읽기 쉬운 텍스트 형식이다", "데이터 교환을 위해 주로 사용된다", "엄격한 XML보다 파싱이 느리다", "Key-Value 쌍으로 이루어져 있다"],
      answer: 2,
      explanation: "JSON은 XML에 비해 가볍고 파싱 속도가 매우 빠릅니다.",
      subject: "소프트웨어 개발",
      diagnostic: {
        correct: "최신 웹 기술 스택의 근간을 정확히 파악하고 계시네요! 🌐",
        incorrect: "JSON이 왜 XML을 밀어내고 표준이 되었는지 속도 측면에서 생각해보세요. 🚀"
      }
    },

    // 3과목: 데이터베이스 구축 (41-60)
    {
      id: "ipe_041",
      question: "관계 데이터베이스에서 릴레이션의 행(Row)을 지칭하는 용어는?",
      options: ["속성(Attribute)", "튜플(Tuple)", "도메인(Domain)", "차수(Degree)"],
      answer: 1,
      explanation: "행(Row)은 튜플(Tuple)이라고 부르며, 한 개체가 가질 수 있는 값의 집합인 레코드와 같은 개념입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "DB의 기본 골격을 정확히 명명하셨습니다! 🏗️",
        incorrect: "행은 튜플, 열은 속성(Attribute)! DB 만국 공통어입니다. ✍️"
      }
    },
    {
      id: "ipe_042",
      question: "데이터의 무결성을 지키기 위해 '기본키(Primary Key)는 NULL일 수 없다'는 제약 조건은?",
      options: ["참조 무결성", "개체 무결성", "도메인 무결성", "사용자 정의 무결성"],
      answer: 1,
      explanation: "개체 무결성(Entity Integrity)은 기본키가 고유해야 하며 NULL을 허용하지 않는다는 규칙입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "데이터 무결성 설계의 1원칙을 완벽히 이해하셨네요! 🛡️",
        incorrect: "기본키와 외래키의 무결성 차이를 다시 한번 짚어보세요. 🧐"
      }
    },
    {
      id: "ipe_043",
      question: "데이터베이스 정규화 과정 중 '모든 도메인이 원자값'이어야 하는 단계는?",
      options: ["제1정규형(1NF)", "제2정규형(2NF)", "제3정규형(3NF)", "BCNF"],
      answer: 0,
      explanation: "1NF는 테이블의 모든 속성값이 원자값(Atomic Value)을 갖도록 분리하는 과정입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "정규화의 기초를 탄탄히 다지셨네요! 효율적인 DB 설계의 시작입니다. ✨",
        incorrect: "정규화 순서(원-부-이-결-다-조)를 암기하고 각 단계를 매칭해보세요. ✍️"
      }
    },
    {
      id: "ipe_044",
      question: "관계 대수(Relational Algebra) 연산 중 릴레이션에서 특정 '열(Column)'을 추출하는 연산은?",
      options: ["Select", "Project", "Join", "Division"],
      answer: 1,
      explanation: "프로젝트(Project, π) 연산은 지정된 속성(열)들만 추려내는 연산입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "관계 대수의 연산 원리를 아주 정확히 파악하셨습니다! 📐",
        incorrect: "행 추출은 Select(σ), 열 추출은 Project(π)! 기호와 함께 기억하세요. ⚠️"
      }
    },
    {
      id: "ipe_045",
      question: "트랜잭션(Transaction)의 4대 특징(ACID) 중 '성공하면 언제나 반영되어야 함'을 의미하는 것은?",
      options: ["Atomicity", "Consistency", "Isolation", "Durability"],
      answer: 3,
      explanation: "지속성(Durability)은 성공 완료된 트랜잭션의 결과가 시스템 오류가 발생하더라도 영구적으로 보존되어야 함을 뜻합니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "DB 트랜잭션의 안정성 원칙을 완벽히 정복하셨네요! 💎",
        incorrect: "ACID(원-일-고-영) 각 용어의 영문 매칭과 정의를 체크하세요! ✍️"
      }
    },
    {
      id: "ipe_046",
      question: "데이터베이스 이상(Anomaly) 현상이 발생하는 근본적인 이유는?",
      options: ["데이터 용량이 너무 커서", "속성이 너무 많아서", "데이터의 중복성 때문에", "서버 성능이 부족해서"],
      answer: 2,
      explanation: "데이터 중복(Redundancy)으로 인해 삽입, 삭제, 갱신 시 논리적 불일치가 생기는 것이 이상 현상입니다. 정규화로 해결합니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "DB 문제 발생의 원인을 정확히 진단하셨습니다. 정규화 전문가가 되시겠네요! 🩺",
        incorrect: "중복은 만악의 근원! 정규화가 왜 필요한지 다시 생각해보세요. 🧐"
      }
    },
    {
      id: "ipe_047",
      question: "SQL 명령어 중 테이블의 구조를 수정하거나 열을 추가할 때 사용하는 명령은?",
      options: ["UPDATE", "ALTER", "MODIFY", "CHANGE"],
      answer: 1,
      explanation: "ALTER TABLE은 기존 테이블의 스키마 구조를 변경(열 추가/삭제/변경)하는 DDL 명령입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "DDL 마스터! DB 구조 설계 역량이 엿보입니다. 🏗️",
        incorrect: "데이터를 바꾸는 UPDATE(DML)와 구조를 바꾸는 ALTER(DDL)를 혼동하면 안 됩니다! ⚠️"
      }
    },
    {
      id: "ipe_048",
      question: "E-R(Entity-Relationship) 다이어그램에서 '개체(Entity)'를 표현하는 기호는?",
      options: ["타원", "직사각형", "마름모", "삼각형"],
      answer: 1,
      explanation: "직사각형은 개체(Entity), 타원은 속성(Attribute), 마름모는 관계(Relationship)를 의미합니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "데이터 모델링의 시각화 규칙을 완벽히 숙지하셨네요! 🎨",
        incorrect: "ERD의 3대 요소(개-속-관) 기호를 다시 한번 매칭해보세요. 🧐"
      }
    },
    {
      id: "ipe_049",
      question: "트랜잭션의 실행 도중 장애가 발생하여 이전의 정상 상태로 되돌리는 연산은?",
      options: ["Commit", "Rollback", "Restore", "Revoke"],
      answer: 1,
      explanation: "Rollback은 트랜잭션의 원자성을 보장하기 위해 모든 변경 사항을 취소하고 이전 상태로 복구하는 명령입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "장애 복구와 무결성 제어 능력이 탁월하시군요! ⚡",
        incorrect: "성공은 Commit, 실패는 Rollback! DB의 기본 트랜잭션 흐름입니다. 🚦"
      }
    },
    {
      id: "ipe_050",
      question: "관계 데이터베이스 설계 단계 중 '특정 DBMS에 맞는 스키마를 설계'하는 단계는?",
      options: ["개념적 설계", "논리적 설계", "물리적 설계", "요구사항 분석"],
      answer: 1,
      explanation: "논리적 설계 단계에서는 개념적 설계를 바탕으로 특정 DBMS가 지원하는 데이터 모델링(예: 관계형)으로 변환합니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "DB 설계 프로세스의 흐름을 아주 정확히 파악하고 계시네요! 🗺️",
        incorrect: "가장 추상적인 것(개념)부터 구체적인 것(물리)으로 나아가는 순서를 기억하세요. ✍️"
      }
    },
    {
      id: "ipe_051",
      question: "인덱스(Index)를 사용하는 주된 목적은?",
      options: ["저장 공간 절약", "데이터 보안 강화", "검색 속도 향상", "데이터 중복 확인"],
      answer: 2,
      explanation: "인덱스는 데이터 탐색을 빠르게 하기 위한 색인 구조로, SELECT 성능을 혁신적으로 높입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "DB 성능 최적화의 핵심 무기를 정확히 고르셨습니다! 🚀",
        incorrect: "인덱스는 빠르지만 삽입/삭제 시 오버헤드가 있다는 단점도 명심하세요. ⚠️"
      }
    },
    {
      id: "ipe_052",
      question: "데이터 스키마(Schema) 중 '일반 사용자의 관점'에서 본 데이터베이스의 논리적 구조는?",
      options: ["개념 스키마", "내부 스키마", "외부 스키마", "통합 스키마"],
      answer: 2,
      explanation: "외부 스키마(External Schema)는 사용자나 개발자가 각자의 관점에서 필요로 하는 데이터를 정의한 뷰(View) 중심의 스키마입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "3단계 스키마 구조의 계층을 완벽히 이해하셨네요! 🎭",
        incorrect: "사용자(외부) -> 설계자(개념) -> 물리장치(내부)! 순서대로 정렬해보세요. 🤓"
      }
    },
    {
      id: "ipe_053",
      question: "SQL의 데이터 제어어(DCL)에 해당하는 명령이 아닌 것은?",
      options: ["GRANT", "REVOKE", "DROP", "COMMIT"],
      answer: 2,
      explanation: "DROP은 테이블 등 객체를 삭제하는 데이터 정의어(DDL)입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "명령어 카테고리를 아주 칼같이 구분하시네요! ⚔️",
        incorrect: "DML(데이터), DDL(구조), DCL(권한/제어)! 각 역할군을 분류해보세요. ✍️"
      }
    },
    {
      id: "ipe_054",
      question: "데이터베이스 분산 기술 중 원본 데이터를 여러 곳에 복제하여 가용성을 높이는 방식은?",
      options: ["샤딩(Sharding)", "복제(Replication)", "파티셔닝", "정규화"],
      answer: 1,
      explanation: "리플리케이션(Replication)은 데이터의 복사본을 유지하여 조회 성능을 분산하고 시스템 안정성을 확보합니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "대규모 분산 시스템 설계의 기초를 정확히 알고 계십니다! 📡",
        incorrect: "Replica와 Shard의 차이를 이해하면 고급 DB 엔지니어가 될 수 있습니다! 🚀"
      }
    },
    {
      id: "ipe_055",
      question: "관계 데이터 모델의 릴레이션 특징 중 '중복된 튜플이 존재할 수 없다'는 것은?",
      options: ["튜플의 무순서", "튜플의 유일성", "속성의 무순서", "속성의 원자성"],
      answer: 1,
      explanation: "모든 튜플은 서로 다른 키 값을 가짐으로써 유일(Uniqueness)해야 합니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "릴레이션의 기본 성질을 아주 정확히 짚으셨습니다! 🧩",
        incorrect: "집합(Set) 이론에서 파생된 릴레이션의 특성을 다시 생각해보세요. 🧐"
      }
    },
    {
      id: "ipe_056",
      question: "DB 보안 기술 중 접근 권한이 있는 사용자라도 데이터를 읽지 못하게 암호로 만드는 것은?",
      options: ["접근 제어", "암호화", "로그 분석", "무결성 검사"],
      answer: 1,
      explanation: "암호화(Encryption)는 데이터 자체를 비가독 상태로 만들어 유출 시 보안을 유지합니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "DB 보안의 최종 방어선을 잘 알고 계시네요! 🔐",
        incorrect: "알고리즘의 종류(AES, RSA 등)도 함께 눈여겨보세요. ⚠️"
      }
    },
    {
      id: "ipe_057",
      question: "분산 데이터베이스 시스템의 투명성(Transparency) 중 '사용자가 데이터의 물리적 위치를 알 필요가 없음'은?",
      options: ["위치 투명성", "중복 투명성", "병행 투명성", "장애 투명성"],
      answer: 0,
      explanation: "위치 투명성(Location Transparency)은 액세스하려는 데이터의 실제 위치 정보를 몰라도 접근할 수 있는 특성입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "분산 DB의 고난도 핵심 개념을 정확히 이해하셨습니다! 🌐",
        incorrect: "투명성 5형제(위-복-단-병-장)의 정의를 하나씩 대조해보세요. 🧐"
      }
    },
    {
      id: "ipe_058",
      question: "기존 관계형 DB의 한계를 극복하기 위해 정형화된 데이터 외에 비정형 데이터를 저장하는 방식은?",
      options: ["Hierarchical DB", "Object DB", "NoSQL", "Legacy DB"],
      answer: 2,
      explanation: "NoSQL(Not Only SQL)은 유연한 스키마와 대규모 분산 처리를 위해 나온 비관계형 DB입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "빅데이터 시대의 필수 트렌드를 정확히 읽고 계시네요! 📊",
        incorrect: "MongoDB, Redis, Cassandra 등 NoSQL의 종류를 생각해보세요. 🚀"
      }
    },
    {
      id: "ipe_059",
      question: "트랜잭션 고립 수준(Isolation Level) 중 '다른 트랜잭션이 수정한 데이터를 커밋 전에도 읽을 수 있는' 가장 낮은 수준은?",
      options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
      answer: 0,
      explanation: "Read Uncommitted는 '더티 리드(Dirty Read)'가 발생하는 가장 낮은 격리 수준입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "동시성 제어의 심오한 영역까지 섭렵하셨네요! 🧠",
        incorrect: "격리 수준이 높을수록 안정적이지만 성능은 떨어진다는 점을 기억하세요! 🚦"
      }
    },
    {
      id: "ipe_060",
      question: "로그 데이터를 이용하여 DB를 장애 직전의 최신 상태로 복구하는 작업(REDO)의 의미는?",
      options: ["모든 작업을 취소하고 처음으로 감", "로그 내용을 토대로 실패한 부분을 재실행함", "데이터를 임의의 지점으로 삭제함", "백업본을 덮어씀"],
      answer: 1,
      explanation: "REDO(재실행)는 장애 발생 시 로그 파일의 정보를 사용해 작업 내용을 다시 적용하는 복구 기법입니다.",
      subject: "데이터베이스 구축",
      diagnostic: {
        correct: "복구 원칙(REDO/UNDO)의 메커니즘을 정확히 파악하셨습니다! ⚙️",
        incorrect: "REDO는 앞으로 가는 것, UNDO는 뒤로 가는 것! 잊지 마세요. ✍️"
      }
    },

    // 4과목: 프로그래밍 언어 활용 (61-80)
    {
      id: "ipe_061",
      question: "C언어에서 메모리 주소를 저장하고 조작하기 위해 사용하는 변수 타입은?",
      options: ["배열", "구조체", "포인터", "열거형"],
      answer: 2,
      explanation: "포인터(Pointer)는 다른 변수의 주소값을 담는 변수이며, C언어 성능의 핵심입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "C언어의 끝판왕, 포인터를 잡아내셨습니다! 시스템 프로그래머의 기질이 보입니다. ⚡",
        incorrect: "주소값(*)과 간접 참조(&)의 기호를 다시 한번 확인해보세요. 🧐"
      }
    },
    {
      id: "ipe_062",
      question: "자바(Java)에서 객체가 생성될 때 자동으로 호출되는 초기화 전용 메소드는?",
      options: ["Main Method", "Initializer", "Constructor(생성자)", "Destructor"],
      answer: 2,
      explanation: "생성자(Constructor)는 클래스명과 동일한 이름을 가지며, 객체 인스턴스화 시 필수적인 초기값 설정을 담당합니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "객체지향 라이프사이클의 시작점을 아주 정확히 알고 계시네요! 🐣",
        incorrect: "생성자는 반환 타입이 없고 클래스 이름과 같다는 특징을 기억하세요! ✍️"
      }
    },
    {
      id: "ipe_063",
      question: "파이썬(Python)의 특징 중 코드를 한 줄씩 읽어서 바로 실행하는 방식은?",
      options: ["컴파일러 방식", "인터프리터 방식", "정적 타이핑", "어셈블러 방식"],
      answer: 1,
      explanation: "파이썬은 컴파일 과정 없이 즉시 실행 가능한 인터프리터(Interpreter) 언어입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "언어별 동작 메커니즘의 차이를 명확히 인지하고 계시군요! 🐍",
        incorrect: "C/자바(컴파일) vs 파이썬/JS(인터프리터)의 장단점을 비교해보세요. 🚀"
      }
    },
    {
      id: "ipe_064",
      question: "프로세스 관리 중 '교착 상태(Deadlock)'의 발생 조건이 아닌 것은?",
      options: ["상호 배제", "점유와 대기", "비선점", "선점"],
      answer: 3,
      explanation: "데드락의 4대 조건은 상호배제, 점유기대, 비선점, 환형대기입니다. '선점'은 데드락을 방지/회복하는 조건에 가깝습니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "OS 자원 관리의 최대 난제를 정확히 뚫고 계시네요! 🛡️",
        incorrect: "데드락 4조건(상-점-비-환)을 노래 부르듯 외워봅시다! ✍️"
      }
    },
    {
      id: "ipe_065",
      question: "다음 중 OSI 7계층에서 '가장 하위 계층'에 해당하는 것은?",
      options: ["데이터 링크 계층", "물리 계층", "네트워크 계층", "전송 계층"],
      answer: 1,
      explanation: "물리 계층(Physical Layer)은 1계층으로, 전기적 신호를 처리하는 최하위 계층입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "네트워크 표준 모델의 기둥을 아주 탄탄히 세우셨습니다! 📡",
        incorrect: "물-데-네-전-세-표-응! 앞 글자만 따서 순서대로 암기해보세요. ✍️"
      }
    },
    {
      id: "ipe_066",
      question: "유닉스(UNIX) 나 리눅스 커널에서 사용자 사이의 인터페이스 역할을 하는 명령어 해석기는?",
      options: ["커널(Kernel)", "쉘(Shell)", "시스템 콜", "유틸리티"],
      answer: 1,
      explanation: "쉘(Shell)은 사용자의 명령을 입력받아 커널에 전달해주는 껍데기이자 가교 역할을 합니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "운용체제 아키텍처의 계층별 역할을 정확히 아시는군요! 🐚",
        incorrect: "핵심 두뇌는 커널, 대화 창구는 쉘! 이 구분을 명확히 하세요. 🧠"
      }
    },
    {
      id: "ipe_067",
      question: "자바스크립트(JS)에서 변수를 선언할 때 '재할당이 불가능한 상수'로 선언하는 키워드는?",
      options: ["var", "let", "const", "static"],
      answer: 2,
      explanation: "const는 한 번 할당하면 값을 바꿀 수 없는 상수를 선언할 때 사용합니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "모던 JS의 문법 규정을 완벽히 따르고 계시네요! 🛡️",
        incorrect: "let(재할당 가능) vs const(불가능)의 차이를 명확히 하세요. 🚦"
      }
    },
    {
      id: "ipe_068",
      question: "운영체제의 스케줄링 중 '준비 큐에 도착한 순서대로 CPU를 할당'하는 방식은?",
      options: ["SJF", "Round Robin", "FIFO(FCFS)", "HRN"],
      answer: 2,
      explanation: "FCFS(First-Come First-Served)는 가장 먼저 들어온 프로세스를 먼저 처리하는 선입 선출 방식입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "공정한(?) 스케줄링의 기초를 정확히 명명하셨습니다! ⏲️",
        incorrect: "기다린 시간에 따른 우선순위 등 다른 알고리즘과 비교해보세요. 🧐"
      }
    },
    {
      id: "ipe_069",
      question: "가상 메모리 관리 기법 중 '최근에 가장 오랫동안 사용되지 않은 페이지를 교체'하는 알고리즘은?",
      options: ["FIFO", "LRU(Least Recently Used)", "LFU", "NUR"],
      answer: 1,
      explanation: "LRU는 '가장 오래전에 썼던 것부터 버리기' 원칙을 가진 효율적인 교체 알고리즘입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "캐시 및 메모리 최적화의 핵심 로직을 잘 알고 계시네요! 🧠",
        incorrect: "최근성(LRU) vs 빈도수(LFU)의 차이를 생각해보세요. 📊"
      }
    },
    {
      id: "ipe_070",
      question: "사용 중인 프로그램을 잠시 중단시키고 응급 상황을 처리한 뒤 복귀하는 OS의 기능은?",
      options: ["스케줄링", "교환기", "인터럽트(Interrupt)", "스와핑"],
      answer: 2,
      explanation: "인터럽트는 하드웨어나 소프트웨어의 요청에 의해 현재 흐름을 중단하고 긴급 처리를 수행하는 메커니즘입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "컴퓨터의 긴급 대응 체계를 아주 정확히 이해하셨네요! 🚨",
        incorrect: "인터럽트가 발생했을 때 PC(Program Counter)가 어디로 가는지 생각해보세요. 🧐"
      }
    },
    {
      id: "ipe_071",
      question: "자료형 중 문자 하나를 저장하기 위해 C언어에서 사용하는 타입은?",
      options: ["int", "float", "char", "double"],
      answer: 2,
      explanation: "char는 1바이트 크기로 아스키(ASCII) 문자 하나를 저장하는 타입입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "데이터 타입의 크기와 용도를 아주 정확히 숙지하셨군요! 🔡",
        incorrect: "다른 기본형(int, float 등)의 메모리 크기도 함께 체크해보세요! ✍️"
      }
    },
    {
      id: "ipe_072",
      question: "TCP/IP 프로토콜 중 '신뢰성 있는 스트림 전송 서비스'를 제공하는 계층 프로토콜은?",
      options: ["UDP", "IP", "TCP", "ICMP"],
      answer: 2,
      explanation: "TCP는 3-Way Handshake를 통해 연결을 설정하고 데이터 유실 없는 신뢰적 전송을 보장합니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "네트워크 통신의 심장, TCP의 신뢰성을 정확히 인지하셨네요! 🚦",
        incorrect: "신뢰성(TCP) vs 속도(UDP)의 상충 관계를 생각해보세요. 🏃"
      }
    },
    {
      id: "ipe_073",
      question: "객체지향 프로언어의 특징 중 '상위 클래스의 기능을 하위 클래스가 물려받아 사용하는 것'은?",
      options: ["다형성", "추상화", "상속성(Inheritance)", "정보 은닉"],
      answer: 2,
      explanation: "상속성(Inheritance)은 코드 재사용을 극대화하고 계층 구조를 형성하는 핵심 기능입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "객체지향의 강력한 재사용 무기를 잘 활용하시겠네요! 🏰",
        incorrect: "상속을 통해 'is-a' 관계가 형성된다는 점을 기억하세요! ✍️"
      }
    },
    {
      id: "ipe_074",
      question: "데이터 통신망 중 근거리(사무실, 학교 등)의 컴퓨터들을 연결하는 네트워크는?",
      options: ["WAN", "MAN", "LAN", "PAN"],
      answer: 2,
      explanation: "LAN(Local Area Network)은 비교적 좁은 지역 내의 디바이스들을 연결하는 고속 통신망입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "네트워크의 물리적 규모별 분류를 아주 정확히 알고 계시네요! 🏢",
        incorrect: "L(Local) -> M(Metro) -> W(Wide) 규모순으로 정렬해보세요. 🗺️"
      }
    },
    {
      id: "ipe_075",
      question: "실행 중인 프로그램이 CPU를 할당받지 못해 무한히 기다리는 현상을 방지하는 기법은?",
      options: ["Busy Waiting", "Aging(에이징)", "Sema-phore", "Mutual Exclusion"],
      answer: 1,
      explanation: "에이징(Aging)은 오래 기다린 프로세스의 우선순위를 높여 기아(Starvation) 현상을 방지하는 기법입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "OS 스케줄링의 고질적 문제를 해결하는 노련함을 보여주셨습니다! ⏲️",
        incorrect: "기다림(Wait)이 길어지면 나이(Age)를 먹어 중요해진다! 이렇게 연상하세요. ✨"
      }
    },
    {
      id: "ipe_076",
      question: "C언어에서 'for(int i=0; i<10; i++)' 루프는 총 몇 번 실행되는가?",
      options: ["9번", "10번", "11번", "0번"],
      answer: 1,
      explanation: "0부터 시작하여 10보다 작을 때까지(0,1,2,3,4,5,6,7,8,9) 총 10회 반복합니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "루프 제어문의 실행 횟수를 아주 정확히 계산하셨네요! 🧮",
        incorrect: "인덱스가 0부터 시작하는지, 등호(< vs <=)가 있는지 항상 주의깊게 보세요! ⚠️"
      }
    },
    {
      id: "ipe_077",
      question: "여러 개의 프로세스가 공유 자원에 동시에 접근할 때 그 결과가 접근 순서에 따라 달라지는 상태는?",
      options: ["경쟁 상태(Race Condition)", "교착 상태", "임계 영역", "동기화"],
      answer: 0,
      explanation: "Race Condition은 동기화가 제대로 되지 않아 데이터의 불일치가 발생하는 위험한 가변적 상태입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "멀티스레딩의 가장 무서운 적을 정확히 짚어내셨습니다! 🏁",
        incorrect: "경주(Race)하듯 자원을 다투는 모습에서 이름이 유래되었습니다. 🏃🏃"
      }
    },
    {
      id: "ipe_078",
      question: "IP 주소를 해당 하드웨어 주소(MAC)로 변환해주는 프로토콜은?",
      options: ["DNS", "DHCP", "ARP", "RARP"],
      answer: 2,
      explanation: "ARP(Address Resolution Protocol)는 논리적 IP를 물리적 MAC 주소로 맵핑해줍니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "네트워크 계층 간의 주소 변환 메커니즘을 정확히 파악하셨네요! 📡",
        incorrect: "반대로 MAC을 IP로 바꾸는 것은 R(Reverse)ARP입니다. ✍️"
      }
    },
    {
      id: "ipe_079",
      question: "운영체제가 하드웨어를 직접 제어하는 대신 실행 환경을 소프트웨어로 구축하는 기술은?",
      options: ["가상화(Virtualization)", "클라우드", "분산 처리", "병렬 처리"],
      answer: 0,
      explanation: "가상화는 하나의 물리적 서버에서 여러 운영체제를 실행할 수 있게 해주는 고효율 자원 관리 기술입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "현대 IT 인프라의 핵심 기술을 아주 정확히 인지하고 계시네요! 🧊",
        incorrect: "하이퍼바이저(Hypervisor)의 역할을 함께 생각해보세요. ⚙️"
      }
    },
    {
      id: "ipe_080",
      question: "조건문 중 '조건이 참일 때와 거짓일 때 실행할 코드를 명확히 구분'하는 구조는?",
      options: ["While", "Switch-Case", "If-Else", "Break"],
      answer: 2,
      explanation: "If-Else 구조는 프로그래밍 분기 처리를 위한 가장 기본적이고 명확한 제어문입니다.",
      subject: "프로그래밍 언어 활용",
      diagnostic: {
        correct: "로직 설계의 기본 논리 구조를 완벽히 이해하셨습니다! 🚦",
        incorrect: "둘 이상의 조건인 경우 Else-If 확장을 고려해보세요! ✍️"
      }
    },

    // 5과목: 정보시스템 구축관리 (81-100)
    {
      id: "ipe_081",
      question: "기업의 가치 있는 내부 정보가 외부로 유출되는 것을 방지하는 기술은?",
      options: ["DLP(Data Loss Prevention)", "IDS", "SIEM", "Anti-Virus"],
      answer: 0,
      explanation: "DLP는 데이터 유출 방지 시스템으로, 메일이나 USB 등으로 기밀 정보가 나가는 것을 감시하고 차단합니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "기업 보안 인프라의 핵심 솔루션을 알고 계시네요! 🛡️",
        incorrect: "유출 방지(DLP)와 침입 탐지(IDS)의 역할을 구분해보세요. 🧐"
      }
    },
    {
      id: "ipe_082",
      question: "보안 공격 중 '많은 양의 데이터를 보내 시스템을 마비시키는' 서비스 거부 공격은?",
      options: ["Phishing", "Sniffing", "DoS(Denial of Service)", "Salami"],
      answer: 2,
      explanation: "DoS는 특정 서버의 자원을 고갈시켜 정상적인 서비스를 불가능하게 만드는 공격입니다. 분산형은 DDoS라 부릅니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "사이버 테러의 가장 대표적인 유형을 잘 파악하고 계시네요! 🚨",
        incorrect: "직접 공격(DoS)과 좀비 PC 동원 공격(DDoS)을 구분하세요! ⚠️"
      }
    },
    {
      id: "ipe_083",
      question: "클라우드 서비스 모델 중 '인프라뿐만 아니라 개발 플랫폼까지 제공'하는 서비스는?",
      options: ["IaaS", "PaaS", "SaaS", "DaaS"],
      answer: 1,
      explanation: "PaaS(Platform as a Service)는 OS, 런타임, 개발 도구 등이 모두 갖춰진 플랫폼 환경을 대여해줍니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "클라우드 서비스 계층 구조의 정수를 정확히 이해하셨네요! ☁️",
        incorrect: "I(인프라)-P(플랫폼)-S(소프트웨어)! 무엇이 포함되는지 다시 체크하세요. ✍️"
      }
    },
    {
      id: "ipe_084",
      question: "데이터 암호화 알고리즘 중 '암호화 키와 복호화 키가 서로 다른' 방식은?",
      options: ["대칭키 암호화", "비대칭키(공개키) 암호화", "해시 알고리즘", "인코딩"],
      answer: 1,
      explanation: "비대칭키 방식(RSA 등)은 공개키로 암호화하고 비밀키로 복호화하여 키 배송 문제를 해결합니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "보안 통신의 핵심 메커니즘을 아주 예리하게 파악하셨습니다! 🔐",
        incorrect: "속도는 대칭키가 빠르고, 관리는 공개키가 편하다는 점을 기억하세요! 🚦"
      }
    },
    {
      id: "ipe_085",
      question: "IT 프로젝트 관리에서 '비용, 기간, 인력' 간의 관계를 수식으로 산정하는 기법은?",
      options: ["COCOMO 모델", "CPM 방식", "Gantt 차트", "WBS"],
      answer: 0,
      explanation: "COCOMO(Constructive Cost Model)는 보헴이 제안한 모델로, 프로그램 규모(Line of Code)에 따라 개발 비용을 산출합니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "비용 산정 알고리즘의 고전을 정확히 기억하고 계시네요! 📊",
        incorrect: "Organic, Semi-Detached, Embedded 등의 개발 규모 분류도 잊지 마세요. 🧐"
      }
    },
    {
      id: "ipe_086",
      question: "소프트웨어 생명주기(SDLC) 모델 중 고전적이며 단계적으로 순차 진행되는 모델은?",
      options: ["나선형 모델", "폭포수 모델(Waterfall)", "프로토타입 모델", "RAD 모델"],
      answer: 1,
      explanation: "폭포수 모델은 분석-설계-개발-테스트가 위에서 아래로 떨어지듯 선형으로 진행됩니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "소프트웨어 공학의 기틀을 마련한 모델을 정확히 알고 계시네요! 🏞️",
        incorrect: "가장 오래되었지만 현재도 명확한 단계 구분이 필요한 곳에 쓰입니다. ✍️"
      }
    },
    {
      id: "ipe_087",
      question: "사용자의 행동이나 심리를 속여 보안 정보를 얻어내는 공격 기법은?",
      options: ["스니핑", "스푸핑", "사회 공학(Social Engineering)", "랜섬웨어"],
      answer: 2,
      explanation: "사회 공학은 기술적 취약점이 아닌 '사람'의 신뢰나 심리적 허점을 공격하는 기법입니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "기술을 넘어선 보안 리스크의 본질을 꿰뚫고 계시네요! 🧠",
        incorrect: "인간이 보안의 가장 약한 고리라는 사실을 잊지 마세요! ⚠️"
      }
    },
    {
      id: "ipe_088",
      question: "빅데이터의 특징인 3V가 아닌 것은?",
      options: ["Volume(데이터 양)", "Velocity(처리 속도)", "Variety(다양성)", "Visibility(가시성)"],
      answer: 3,
      explanation: "빅데이터의 고전적 3V는 양, 속도, 다양성입니다. (최근에는 가치 등으로 확장되기도 함)",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "데이터 사이언스의 기본 소양을 아주 잘 갖추셨습니다! 📊",
        incorrect: "3V는 데이터의 '규모적 특성'을 정의하는 키워드입니다. 🧐"
      }
    },
    {
      id: "ipe_089",
      question: "지정된 한도를 초과하여 데이터를 입력해 인접한 메모리 영역을 덮어쓰는 공격은?",
      options: ["SQL Injection", "XSS", "Buffer Overflow", "Side Channel"],
      answer: 2,
      explanation: "버퍼 오버플로우는 경계 검사를 하지 않는 함수(gets 등)의 취약점을 이용해 제어 흐름을 가로채는 공격입니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "시스템 보안의 고전적이면서도 치명적인 취약점을 잘 알고 계시네요! 💥",
        incorrect: "메모리 안전성(Memory Safety)의 중요성을 다시 한번 생각해보세요. 🛡️"
      }
    },
    {
      id: "ipe_090",
      question: "모바일 포렌식이나 디지털 수사에서 증거가 훼손되지 않았음을 증명하는 원칙은?",
      options: ["무결성의 원칙", "연속성의 원칙", "재현의 원칙", "신속성의 원칙"],
      answer: 0,
      explanation: "무결성의 원칙은 수집된 디지털 증거물이 분석 과정에서 변조되지 않았음을 입증해야 한다는 원칙입니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "디지털 수사의 법적 효력을 좌우하는 핵심 가치를 알고 계시네요! ⚖️",
        incorrect: "해시값을 대조하여 동일성을 증명하는 것이 실무의 핵심입니다. ✍️"
      }
    },
    {
      id: "ipe_091",
      question: "보안의 3대 요소 중 '인가되지 않은 사용자가 정보를 읽을 수 없어야 함'은?",
      options: ["기밀성(Confidentiality)", "무결성", "가용성", "책임성"],
      answer: 0,
      explanation: "기밀성은 정보가 허락된 사람에게만 공개되어야 한다는 원칙입니다. 암호화가 주된 도구입니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "CIA 보안 모델의 첫 번째 기둥을 아주 정확히 세우셨습니다! 🔐",
        incorrect: "기-무-가! 보안 3원칙은 정보보안 시험의 단골 손님입니다. ✍️"
      }
    },
    {
      id: "ipe_092",
      question: "프로젝트 관리 일정 도표 중 '작업 간의 선후 관계를 화살표 노드로 연결한' 정밀 차트는?",
      options: ["Gantt Chart", "PERT/CPM 차트", "WBS", "Burndown Chart"],
      answer: 1,
      explanation: "PERT/CPM은 복잡한 프로젝트의 경로 분석과 임계 경로(Critical Path)를 계산하는 데 효율적입니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "PM의 전문적인 분석 도구를 아주 정확히 알고 계시네요! 📈",
        incorrect: "간트 차트(막대 형태)와 PERT(네트워크 형태)의 차이를 비교해보세요. 🧐"
      }
    },
    {
      id: "ipe_093",
      question: "네트워크 침입 탐지 시스템(IDS) 중 '알려지지 않은 공격 유형'을 탐지하는 방식은?",
      options: ["오용 탐지(Signature)", "이상 탐지(Anomaly)", "로그 분석", "패킷 필터링"],
      answer: 1,
      explanation: "이상 탐지는 평소와 다른 비정상적인 행위 패턴을 감지하여 새로운 공격도 찾아낼 수 있습니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "지능형 보안 시스템의 작동 원리를 정확히 관통하셨습니다! 🧠",
        incorrect: "규칙 기반(오용) vs 행위 기반(이상)! 각각의 장단점을 생각해보세요. 🚦"
      }
    },
    {
      id: "ipe_094",
      question: "개발부터 운영까지의 전 과정을 자동화하고 협업을 극대화하는 문화와 철학은?",
      options: ["DevOps", "ITIL", "SLA", "BPR"],
      answer: 0,
      explanation: "데브옵스(DevOps)는 개발(Dev)과 운영(Ops)의 경계를 허물고 신속한 배포와 높은 품질을 목표로 합니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "현대 IT 산업의 선진적인 조직 문화를 정확히 이해하고 계시네요! 🔁",
        incorrect: "CI/CD 파이프라인이 데브옵스의 핵심 실천 도구입니다. 🚀"
      }
    },
    {
      id: "ipe_095",
      question: "웹 취약점 공격 중 '악의적인 스크립트를 삽입하여 사용자 정보를 탈취'하는 공격은?",
      options: ["SQL Injection", "XSS(Cross Site Scripting)", "CSRF", "Phishing"],
      answer: 1,
      explanation: "XSS는 게시판 등에 스크립트를 심어 해당 페이지를 방문하는 일반 사용자의 쿠키나 세션을 훔치는 공격입니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "웹 보안의 가장 흔하면서도 위험한 공격을 정확히 알고 계시네요! 🕸️",
        incorrect: "서버 공격(SQLi) vs 사용자 공격(XSS)의 차이를 명확히 하세요! 🚦"
      }
    },
    {
      id: "ipe_096",
      question: "IT 시스템 장애 시 복구 목표 시간과 복구 지점을 정의하는 지표(RTO, RPO) 중 '복구 지점'은?",
      options: ["RTO", "RPO(Recovery Point Objective)", "MTBF", "MTTR"],
      answer: 1,
      explanation: "RPO는 데이터의 유실 허용 범위(어느 시점까지 복구할 것인가)를 의미합니다. T(Time)는 시간, P(Point)는 지점!",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "재해 복구 계획(DRP)의 정량적 지표를 아주 정확히 이해하셨습니다! ⏲️",
        incorrect: "얼마나 빨리(RTO)? 얼마나 최근까지(RPO)? 두 질문의 차이입니다. ✍️"
      }
    },
    {
      id: "ipe_097",
      question: "신규 시스템 도입 시 기존 업무 프로세스를 전면적으로 재설계하여 효율을 높이는 것은?",
      options: ["PI", "BPR(Business Process Reengineering)", "ISP", "ERP"],
      answer: 1,
      explanation: "BPR은 근본적인 업무 흐름의 혁신적 재설계를 뜻하며 보통 ERP 도입 전단계로 수행됩니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "경영과 IT를 잇는 거시적인 시각이 아주 뛰어나십니다! 🏙️",
        incorrect: "부분 개선이 아닌 '근본적 재설계'가 BPR의 핵심 키워드입니다. 🧐"
      }
    },
    {
      id: "ipe_098",
      question: "개인정보 보호법상 '개인정보의 수집 및 이용'을 위해 반드시 거쳐야 할 절차는?",
      options: ["정보 주체의 동의", "회사의 내부 결재", "시스템 자동 수집 알림", "백업 서버 구축"],
      answer: 0,
      explanation: "개인정보 수집의 대원칙은 정보의 주인(주체)으로부터 명확한 동의를 받는 것입니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "개인정보 보호의 법률적 기본 소양을 완벽히 갖추셨습니다! ⚖️",
        incorrect: "동의가 없으면 수집도 없다! 개인정보 보호의 성경과 같은 말입니다. 🇰🇷"
      }
    },
    {
      id: "ipe_099",
      question: "최신 보안 추세 중 '아무도 믿지 말고 항상 모든 접근을 검증하라'는 철학은?",
      options: ["Zero Trust", "Open Source", "Security First", "Defense in Depth"],
      answer: 0,
      explanation: "제로 트러스트(Zero Trust)는 신뢰할 수 있는 단말이나 위치가 없다고 가정하고 매번 인증하는 현대 보안의 핵심 패러다임입니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "가장 진보된 보안 철학을 정확히 관통하고 계시네요! 🛡️",
        incorrect: "내부 망은 안전하다는 고정관념을 버리는 것이 제로 트러스트의 시작입니다. 🚦"
      }
    },
    {
      id: "ipe_100",
      question: "보안 취약점 중 오픈소스 라이브러리의 취약점을 관리하는 활동은?",
      options: ["SCA(Software Composition Analysis)", "DLP", "VPN", "SSO"],
      answer: 0,
      explanation: "SCA는 소프트웨어를 구성하는 오픈소스들의 목록(BOM)을 뽑아 알려진 취약점을 전수 점검하는 시스템입니다.",
      subject: "정보시스템 구축관리",
      diagnostic: {
        correct: "공급망 보안(Supply Chain Security)의 최신 기술까지 섭렵하셨네요! ⛓️",
        incorrect: "Log4j 취약점 사태 이후 SCA의 중요성이 극도로 높아졌습니다. 🧐"
      }
    }
  ]
};
