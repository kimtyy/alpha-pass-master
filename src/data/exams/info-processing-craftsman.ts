import { ExamSubject } from '../exams';

export const infoProcessingCraftsman: ExamSubject = {
  id: 'info-processing-craftsman',
  title: '정보처리기능사 (실전 60문항)',
  category: 'Craftsman',
  questions: [
    {
      id: "ipc_001",
      question: "컴퓨터 시스템에서 연산 장치의 주요 구성 요소가 아닌 것은?",
      options: ["가산기 (Adder)", "보수기 (Complementer)", "데이터 레지스터", "인덱스 레지스터"],
      answer: 3,
      explanation: "인덱스 레지스터는 주소의 수정이나 변경에 사용되는 제어 장치 측 레지스터입니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "기초 장치 구조를 정확히 파악하고 계시네요!", incorrect: "연산 장치와 제어 장치의 구성 요소를 다시 비교해 보세요." }
    },
    {
      id: "ipc_002",
      question: "진법 변환에서 10진수 13을 2진수로 변환하면?",
      options: ["1011", "1100", "1101", "1110"],
      answer: 2,
      explanation: "13을 2로 계속 나누면 나머지가 1, 0, 1, 1 순으로 거꾸로 읽어 1101이 됩니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "수치 변환 실력이 뛰어납니다!", incorrect: "2진수 변환 과정을 다시 한 번 연습해 봅시다." }
    },
    {
      id: "ipc_003",
      question: "반가산기(Half-Adder)의 구성으로 옳은 것은?",
      options: ["AND gate 1개, OR gate 1개", "AND gate 1개, XOR gate 1개", "OR gate 1개, XOR gate 1개", "AND gate 2개, OR gate 1개"],
      answer: 1,
      explanation: "반가산기는 합(Sum)을 위한 XOR 게이트와 자리올림(Carry)을 위한 AND 게이트로 구성됩니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "논리 회로 조합을 완벽히 이해하셨습니다.", incorrect: "S=A⊕B, C=AB 공식을 기억하세요!" }
    },
    {
      id: "ipc_004",
      question: "명령어(Instruction)의 구성 단계 중 주소 부분을 지칭하며 기억 장소 내의 위치를 나타내는 것은?",
      options: ["Operand", "Op-Code", "Mode", "Register"],
      answer: 0,
      explanation: "명령어는 '무엇을 할 것인가'를 나타내는 Op-Code와 '데이터의 위치'를 나타내는 Operand로 구성됩니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "명령어 구조의 핵심을 알고 계시네요.", incorrect: "Op-Code와 Operand의 역할을 구분하는 것이 중요합니다." }
    },
    {
      id: "ipc_005",
      question: "인터럽트(Interrupt)가 발생하는 원인 중 외부 인터럽트에 해당하지 않는 것은?",
      options: ["타이머 인터럽트", "정전 인터럽트", "I/O 인터럽트", "0으로 나누기 (Divide by Zero)"],
      answer: 3,
      explanation: "0으로 나누기는 프로그램 내부 오류에 의한 '트랩(Trap)' 또는 내부 인터럽트입니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "인터럽트 분류를 정확히 꿰뚫고 계시네요.", incorrect: "외부/내부 인터럽트의 원인을 다시 한 번 읽어보세요." }
    },
    {
      id: "ipc_006",
      question: "운영체제의 목적 중 '주어진 시간 내에 시스템이 처리할 수 있는 일의 양'을 의미하는 것은?",
      options: ["Throughput (처리능력)", "Turn-around Time (반환시간)", "Availability (사용가능도)", "Reliability (신뢰도)"],
      answer: 0,
      explanation: "처리능력(Throughput)은 단위 시간당 시스템이 처리하는 일의 양을 최대화하는 지표입니다.",
      subject: "운영체제",
      diagnostic: { correct: "운영체제의 성능 지표를 잘 이해하고 계십니다.", incorrect: "수치적 효율성과 시간적 효율성을 구분해 보세요." }
    },
    {
      id: "ipc_007",
      question: "컴퓨터 전원을 켤 때 가장 먼저 실행되어 하드웨어를 점검하고 운영체제를 로드하는 소프트웨어는?",
      options: ["BIOS", "Compiler", "Linker", "Loader"],
      answer: 0,
      explanation: "BIOS는 펌웨어로서 하드웨어 초기화 및 부팅 과정을 담당합니다.",
      subject: "운영체제",
      diagnostic: { correct: "부팅 메커니즘을 정확히 파악하셨군요.", incorrect: "시스템 소프트웨어의 시작점을 다시 확인해 보세요." }
    },
    {
      id: "ipc_008",
      question: "Windows 탐색기에서 파일이나 폴더를 영구 삭제할 때 사용하는 단축키는?",
      options: ["Ctrl + Delete", "Shift + Delete", "Alt + Delete", "Shift + Backspace"],
      answer: 1,
      explanation: "Shift + Delete를 누르면 휴지통을 거치지 않고 바로 영구 삭제됩니다.",
      subject: "운영체제",
      diagnostic: { correct: "실무 단축키 활용 능력이 좋습니다.", incorrect: "윈도우 기본 조작법을 리무인드 해보세요." }
    },
    {
      id: "ipc_009",
      question: "프로세스가 CPU를 점유하고 있다가 시간이 경과하여 다른 프로세스에게 CPU를 넘겨주는 상태 변화는?",
      options: ["Dispatch", "Timeout (Run -> Ready)", "Wake up", "Block"],
      answer: 1,
      explanation: "동작(Run) 상태에서 시간 할당량이 종료되면 준비(Ready) 상태로 돌아가는 것이 Timeout입니다.",
      subject: "운영체제",
      diagnostic: { correct: "프로세스 상태 전이를 완벽히 파악하셨습니다.", incorrect: "5가지 주요 상태 변화를 도식화해 보세요." }
    },
    {
      id: "ipc_010",
      question: "스케줄링 기법 중 '가장 짧은 작업부터 먼저 처리'하는 방식은?",
      options: ["FIFO", "SJF (Shortest Job First)", "RR (Round Robin)", "HRN"],
      answer: 1,
      explanation: "SJF 스케줄링은 실행 시간이 가장 짧은 프로세스에게 CPU를 먼저 할당합니다.",
      subject: "운영체제",
      diagnostic: { correct: "효율성 중심의 스케줄링을 잘 알고 계시네요.", incorrect: "작업의 우선순위 결정 기준을 다시 비교해 보세요." }
    },
    {
      id: "ipc_011",
      question: "데이터베이스의 특징 중 '데이터의 삽입, 삭제, 갱신에 의해 내용이 변해도 정확한 값을 유지'하는 성질은?",
      options: ["실시간 접근성", "계속적인 변화", "동시 공유", "내용에 의한 참조"],
      answer: 1,
      explanation: "데이터베이스는 새로운 정보로 항상 최신 상태를 유지(계속적인 변화)해야 합니다.",
      subject: "데이터베이스",
      diagnostic: { correct: "DB의 본질적 가치를 정확히 이해하셨습니다.", incorrect: "DB의 4대 기본 정의를 다시 읽어봅시다." }
    },
    {
      id: "ipc_012",
      question: "SQL 명령체계 중 '테이블을 생성하거나 구조를 변경'하는 데 사용되는 그룹은?",
      options: ["DDL (정의어)", "DML (조작어)", "DCL (제어어)", "TCL (트랜잭션제어어)"],
      answer: 0,
      explanation: "DDL에는 CREATE, ALTER, DROP 등이 포함되며 스키마나 구조를 다룹니다.",
      subject: "데이터베이스",
      diagnostic: { correct: "SQL 분류에 대한 지식이 명확합니다.", incorrect: "정의/조작/제어의 영어 약자와 용도를 매칭해 보세요." }
    },
    {
      id: "ipc_013",
      question: "개체-관계 모델(E-R Model)에서 '관성(Relationship)'을 나타낼 때 사용하는 도형은?",
      options: ["사각형", "원", "마름모", "직사각형"],
      answer: 2,
      explanation: "E-R 다이어그램에서 개체는 사각형, 속성은 타원/원, 관계는 마름모로 나타냅니다.",
      subject: "데이터베이스",
      diagnostic: { correct: "설계 도구의 기호를 완벽히 숙지하셨습니다.", incorrect: "기본 도형 3가지의 의미를 다시 체크하세요." }
    },
    {
      id: "ipc_014",
      question: "정보 통신에서 신호의 세기가 거리에 따라 약해지는 현상은?",
      options: ["감쇠 (Attenuation)", "왜곡 (Distortion)", "잡음 (Noise)", "지연 (Delay)"],
      answer: 0,
      explanation: "감쇠는 전송 매체를 통해 이동하는 신호가 에너지를 잃어 약해지는 현상입니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "물리적 전송 특성을 잘 알고 계시네요.", incorrect: "감쇠, 왜곡, 잡음의 차이점을 다시 비교해 보세요." }
    },
    {
      id: "ipc_015",
      question: "여러 개의 단말기가 하나의 통신 회선을 공유하기 위해 사용하는 장치는?",
      options: ["모뎀 (Modem)", "멀티플렉서 (Multiplexer)", "라우터 (Router)", "브리지 (Bridge)"],
      answer: 1,
      explanation: "다중화기(Multiplexer)는 여러 채널을 하나의 고속 회선으로 결합하여 효율을 높입니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "네트워크 장비의 핵심 역할을 파악하셨습니다.", incorrect: "회선의 효율적 활용 방법을 다시 생각해 보세요." }
    },
    {
      id: "ipc_016",
      question: "LAN의 토폴로지(Topology) 중 가운데 중앙 제어 노드를 중심으로 별 모양으로 연결된 구조는?",
      options: ["버스형", "링형", "성형 (Star)", "망형"],
      answer: 2,
      explanation: "성형(Star) 구조는 중앙 허브에 모든 노드가 일대일로 연결됩니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "네트워크 구조의 특징을 잘 알고 계시네요.", incorrect: "네트워크 연결 형태별 장단점을 요약해 보세요." }
    },
    {
      id: "ipc_017",
      question: "중앙처리장치(CPU)에서 다음에 실행할 명령어의 번지(Address)를 기억하는 레지스터는?",
      options: ["명령 레지스터 (IR)", "프로그램 카운터 (PC)", "누산기 (AC)", "상태 레지스터"],
      answer: 1,
      explanation: "PC(Program Counter)는 다음에 인출할 명령어의 주소를 저장합니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "PC 레지스터의 역할을 정확히 알고 계시네요.", incorrect: "IR과 PC의 역할 차이를 다시 한 번 확인하세요." }
    },
    {
      id: "ipc_018",
      question: "보조기억장치인 SSD가 HDD에 비해 갖는 장점이 아닌 것은?",
      options: ["빠른 데이터 읽기/쓰기", "저소음 및 저전력", "물리적 충격에 강함", "단위 용량당 저렴한 가격"],
      answer: 3,
      explanation: "SSD는 성능이 좋지만 여전히 HDD에 비해 가성비(단위 용량당 가격)는 떨어집니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "최신 저장 장치 트렌드를 꿰뚫고 계시네요.", incorrect: "성능과 비용의 Trade-off 관계를 생각해보세요." }
    },
    {
      id: "ipc_019",
      question: "불(Boolean) 대수에서 A + 1의 결과는?",
      options: ["A", "1", "0", "A+1"],
      answer: 1,
      explanation: "논리합(OR)에서 하나라도 1이면 결과는 무조건 1입니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "논리 연산 법칙이 탄탄하시네요.", incorrect: "불 대수의 기본 정리들을 다시 체크해봅시다." }
    },
    {
      id: "ipc_020",
      question: "컴퓨터 아키텍처 중 '명령어와 데이터가 하나의 기억장치에 저장되는' 방식은?",
      options: ["폰 노이만 구조", "하버드 구조", "슈퍼 스칼라", "파이프라인"],
      answer: 0,
      explanation: "폰 노이만 구조는 단일 버스를 통해 프로그램 명령어와 데이터를 모두 처리합니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "컴퓨터 구조의 근간을 정확히 알고 계십니다.", incorrect: "폰 노이만 병목 현상에 대해 알아보세요." }
    },
    {
      id: "ipc_021",
      question: "스프레드시트에서 행과 열이 만나는 지점을 무엇이라 하는가?",
      options: ["필드", "레코드", "셀 (Cell)", "시트"],
      answer: 2,
      explanation: "셀은 수치, 텍스트, 공식 등을 입력하는 기본 단위입니다.",
      subject: "패키지 활용",
      diagnostic: { correct: "오피스 기초 개념이 명확합니다.", incorrect: "행(Row)과 열(Column)의 번호 매기기를 복습하세요." }
    },
    {
      id: "ipc_022",
      question: "컴퓨터 그래픽스에서 선이나 원 등의 기하학적 객체로 이미지를 표현하는 방식은?",
      options: ["비트맵", "벡터 (Vector)", "픽셀", "해칭"],
      answer: 1,
      explanation: "벡터 방식은 수학적 수식을 활용하므로 확대해도 테두리가 깨지지 않습니다.",
      subject: "패키지 활용",
      diagnostic: { correct: "이미지 처리 방식의 차이를 정확히 아시네요.", incorrect: "비트맵(래스터)과 벡터의 장단점을 비교해 보세요." }
    },
    {
      id: "ipc_023",
      question: "Windows에서 실행 중인 여러 창 사이를 순서대로 전환할 때 사용하는 단축키는?",
      options: ["Alt + Tab", "Ctrl + Esc", "Alt + F4", "Win + D"],
      answer: 0,
      explanation: "Alt + Tab은 활성화된 창 목록을 보여주며 즉각적인 전환을 돕습니다.",
      subject: "운영체제",
      diagnostic: { correct: "작업 효율성이 높은 조작 지식을 갖추셨네요.", incorrect: "기본 창 전환 키를 잊지 마세요!" }
    },
    {
      id: "ipc_024",
      question: "유닉스(UNIX) 운영체제의 특징이 아닌 것은?",
      options: ["다중 사용자 지원", "다중 작업 지원", "C언어로 작성됨", "단일 프로세스 구조"],
      answer: 3,
      explanation: "UNIX는 강력한 멀티태스킹(다중 프로세스)과 멀티유저 환경을 지원합니다.",
      subject: "운영체제",
      diagnostic: { correct: "UNIX 철학을 정확히 이해하셨습니다.", incorrect: "커널(Kernel)과 쉘(Shell)의 역할을 복습해 보세요." }
    },
    {
      id: "ipc_025",
      question: "도스(DOS)에서 화면에 있는 내용을 모두 삭제하는 명령어는?",
      options: ["CLS", "CD", "DIR", "DEL"],
      answer: 0,
      explanation: "Clear Screen의 약자인 CLS는 화면을 깨끗하게 비웁니다.",
      subject: "운영체제",
      diagnostic: { correct: "CLI 환경의 기초 명령어를 아시네요.", incorrect: "기초 DOS 명령어들을 매칭해 보세요." }
    },
    {
      id: "ipc_026",
      question: "데이터베이스 관리 시스템(DBMS)의 장점이 아닌 것은?",
      options: ["데이터 종속성 증가", "데이터 공유 용이", "무결성 유지", "데이터 중복 최소화"],
      answer: 0,
      explanation: "DBMS는 데이터 독립성을 높이고 종속성을 최소화하는 것이 목적입니다.",
      subject: "데이터베이스",
      diagnostic: { correct: "DBMS 도입 효과를 정확히 아셨군요.", incorrect: "종속성과 독립성의 차이를 다시 한 번 생각하세요." }
    },
    {
      id: "ipc_027",
      question: "하나의 트랜잭션은 모두 성공하거나 모두 실패해야 한다는 성질은?",
      options: ["원자성 (Atomicity)", "일관성 (Consistency)", "격리성 (Isolation)", "지속성 (Durability)"],
      answer: 0,
      explanation: "ACID 원칙 중 원자성은 'All or Nothing'을 의미합니다.",
      subject: "데이터베이스",
      diagnostic: { correct: "트랜잭션 ACID 특성이 완벽합니다.", incorrect: "각 글자의 용어를 사례와 연결해 보세요." }
    },
    {
      id: "ipc_028",
      question: "인터넷 표준 프로토콜은?",
      options: ["OSI 7 Layer", "TCP/IP", "X.25", "IEEE 802"],
      answer: 1,
      explanation: "TCP/IP는 인터넷 환경에서 데이터를 주고받기 위한 통신 규약의 집합입니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "현재 통신 기술의 핵심을 알고 계시네요.", incorrect: "프로토콜의 정의를 다시 확인하세요." }
    },
    {
      id: "ipc_029",
      question: "전자우편(E-Mail)을 보낼 때 사용하는 프로토콜은?",
      options: ["POP3", "IMAP", "SMTP", "FTP"],
      answer: 2,
      explanation: "SMTP(Simple Mail Transfer Protocol)는 메일 발신 시 사용되며, 수신 시에는 POP3/IMAP을 씁니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "응답 계층 프로토콜 구분이 명확합니다.", incorrect: "보낼 때와 받을 때의 프로토콜을 헷갈리지 마세요!" }
    },
    {
      id: "ipc_030",
      question: "데이터 전송 중 오류가 발생했는지 확인하기 위해 데이터 뒤에 붙이는 비트는?",
      options: ["에러 비트", "시작 비트", "패리티 비트", "정지 비트"],
      answer: 2,
      explanation: "패리티 비트는 1의 개수를 홀수/짝수로 맞춰 오류를 검출(검출만 가능)합니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "에러 검출 기법의 기초를 아십니다.", incorrect: "패리티 비트와 해밍 코드의 차이를 알아보세요." }
    },
    {
      id: "ipc_031",
      question: "중앙처리장치(CPU) 내부에서 연산 결과를 일시적으로 저장하는 레지스터는?",
      options: ["누산기 (Accumulator)", "명령 번지 레지스터 (MAR)", "데이터 버퍼 레지스터 (MBR)", "상태 레지스터"],
      answer: 0,
      explanation: "누산기(AC)는 산술 및 논리 연산의 결과를 중간 저장하는 역할을 합니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "연산 장치의 핵심 저장소를 아시네요.", incorrect: "누적 연산 과정과 AC의 관계를 이해하세요." }
    },
    {
      id: "ipc_032",
      question: "주기억장치의 용량이 1GB일 때, 이는 약 몇 바이트(Byte)인가?",
      options: ["1,000 Byte", "1,000,000 Byte", "1,000,000,000 Byte", "1,000,000,000,000 Byte"],
      answer: 2,
      explanation: "1GB는 1024MB, 약 10의 9승 바이트(10억 바이트)에 해당합니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "단위 환산의 개념이 정확하십니다.", incorrect: "K, M, G, T 단위를 다시 순서대로 익히세요." }
    },
    {
      id: "ipc_033",
      question: "기억 장치 중 전원이 꺼져도 내용이 지워지지 않는 것은?",
      options: ["SRAM", "DRAM", "ROM", "레지스터"],
      answer: 2,
      explanation: "ROM(Read Only Memory)은 비휘발성 메모리로 내용을 보존합니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "휘발성과 비휘발성의 차이를 완벽히 아시네요.", incorrect: "Ram과 Rom의 가장 큰 차이점을 기억하세요." }
    },
    {
      id: "ipc_034",
      question: "다음 중 보조기억장치인 하드디스크의 성능과 관련 없는 것은?",
      options: ["RPM (회전수)", "Seek Time (탐색 시간)", "Transfer Rate (전송 속도)", "Refresh (재충전)"],
      answer: 3,
      explanation: "Refresh는 전하를 재충전해야 하는 DRAM의 특징입니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "하드웨어 구동 원리를 깊이 이해하셨습니다.", incorrect: "기계적 장치와 반도체 장치의 특징을 구분하세요." }
    },
    {
      id: "ipc_035",
      question: "인터럽트의 우선순위를 결정하는 방법 중 하드웨어에 의한 방법은?",
      options: ["Polling", "Daisy Chain", "Handshaking", "Switching"],
      answer: 1,
      explanation: "데이지 체인(Daisy Chain)은 직렬로 연결하여 하드웨어적으로 우선순위를 처리합니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "고급 인터럽트 처리 기법을 아시네요.", incorrect: "폴링(소프트웨어)과 데이지체인(하드웨어)을 비교하세요." }
    },
    {
      id: "ipc_036",
      question: "운영체제에서 가상 기억 장치(Virtual Memory)를 구현하는 목적은?",
      options: ["데이터 보안 강화", "CPU 속도 향상", "주기억장치 용량 확대 효과", "파일 압축 용이"],
      answer: 2,
      explanation: "보조기억장치의 일부를 주기억장치처럼 사용하여 큰 프로그램을 실행할 수 있게 합니다.",
      subject: "운영체제",
      diagnostic: { correct: "메모리 관리 기법의 목적을 정확히 파악하셨네요.", incorrect: "물리적 메모리의 한계를 극복하는 방법을 생각해 보세요." }
    },
    {
      id: "ipc_037",
      question: "프로세스들이 서로 상대방의 자원을 가진 채 무한히 기다리는 현상은?",
      options: ["교착 상태 (Deadlock)", "기아 현상 (Starvation)", "오버헤드", "스래싱 (Thrashing)"],
      answer: 0,
      explanation: "데드락은 자원을 점유한 채 대기하는 순환 구조에서 발생합니다.",
      subject: "운영체제",
      diagnostic: { correct: "병행 처리의 가장 큰 리스크를 아시네요.", incorrect: "교착 상태의 4가지 발생 조건을 확인해 보세요." }
    },
    {
      id: "ipc_038",
      question: "기존 시스템을 완전히 대체하여 한꺼번에 새로운 시스템으로 전환하는 방식은?",
      options: ["직접 전환", "병행 전환", "단계적 전환", "파일럿 전환"],
      answer: 0,
      explanation: "직접 전환은 위험이 크지만 비용이 적고 전환 속도가 가장 빠릅니다.",
      subject: "패키지 활용",
      diagnostic: { correct: "시스템 전환 효율성을 잘 파악하셨습니다.", incorrect: "가장 안전한 방법(병행 전환)과 비교해 보세요." }
    },
    {
      id: "ipc_039",
      question: "데이터베이스의 물리적 저장 구조를 정의하는 스키마는?",
      options: ["외부 스키마", "개념 스키마", "내부 스키마", "통합 스키마"],
      answer: 2,
      explanation: "내부 스키마는 저장 장치의 입장에서 데이터를 정의합니다.",
      subject: "데이터베이스",
      diagnostic: { correct: "스키마 3층 구조가 탄탄하시네요.", incorrect: "사용자(외부), 전체(개념), 저장(내부)를 매칭하세요." }
    },
    {
      id: "ipc_040",
      question: "관계 데이터베이스에서 튜플(Tuple)의 집합을 무엇이라 하는가?",
      options: ["릴레이션 (Relation)", "도메인", "어튜리뷰트", "차수"],
      answer: 0,
      explanation: "릴레이션은 논리적인 테이블 그 자체를 지칭합니다.",
      subject: "데이터베이스",
      diagnostic: { correct: "집합적 관점의 DB 용어를 정확히 아시네요.", incorrect: "속성과 튜플이 모여 무엇이 되는지 생각해보세요." }
    },
    {
      id: "ipc_041",
      question: "정보 전송 속도 단위 중 1초당 전송되는 비트 수는?",
      options: ["Baud", "Bps", "Hz", "Pps"],
      answer: 1,
      explanation: "Bps(Bits Per Second)는 디지털 데이터의 전송 속도 표준 단위입니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "속도 측정의 기본 단위를 명확히 아십니다.", incorrect: "보오(Baud)와 Bps의 차이를 확인해보세요." }
    },
    {
      id: "ipc_042",
      question: "OSI 7계층 중 물리적 선로 제어 및 데이터 전송을 담당하는 2계층은?",
      options: ["네트워크 계층", "데이터 링크 계층", "세션 계층", "전송 계층"],
      answer: 1,
      explanation: "데이터 링크 계층은 프레임 전송 및 에러/흐름 제어를 수행합니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "계층별 핵심 기능을 완벽히 외우셨군요.", incorrect: "1층(물리)-2층(링크)-3층(네트워크)를 다시 외우세요." }
    },
    {
      id: "ipc_043",
      question: "송수신측이 동시에 데이터를 주고받을 수 있는 방식은?",
      options: ["단방향 통신 (Simplex)", "반이중 통신 (Half-duplex)", "전이중 통신 (Full-duplex)", "직렬 통신"],
      answer: 2,
      explanation: "전이중 통신은 전화기처럼 쌍방향 동시 전송이 가능합니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "전송 모드 구분이 매우 정확하십니다.", incorrect: "무전기(반이중)와 전화기(전이중)를 비교하세요." }
    },
    {
      id: "ipc_044",
      question: "컴퓨터 바이러스 예방법 중 가장 효율적인 것은?",
      options: ["인터넷 연결 끊기", "정기적인 백신 업데이트", "문서 파일만 사용", "하드디스크 포맷"],
      answer: 1,
      explanation: "백신 엔진의 주기적인 업데이트를 통해 보안 패치를 유지해야 합니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "보안 상식이 훌륭하십니다.", incorrect: "최신 보안 위협을 막는 가장 기본적인 약속입니다." }
    },
    {
      id: "ipc_045",
      question: "중앙처리장치(CPU) 성능을 높인 방식으로 '한 클럭에 여러 명령어'를 처리하는 것은?",
      options: ["CISC", "RISC", "슈퍼 스칼라", "파이프라인"],
      answer: 2,
      explanation: "슈퍼 스칼라는 병렬 처리 유닛을 여러 개 두어 동시 실행력을 높입니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "현대 CPU 설계 기법을 잘 파악하셨습니다.", incorrect: "RISC와 CISC의 철학적 차이를 알아보세요." }
    },
    {
      id: "ipc_046",
      question: "데이터의 보존을 위해 내용을 주기적으로 복사해 두는 작업은?",
      options: ["백업 (Backup)", "리셋", "로그", "덤프"],
      answer: 0,
      explanation: "백업은 장애 발생 시 복구를 위해 데이터를 안전하게 보관하는 절차입니다.",
      subject: "운영체제",
      diagnostic: { correct: "데이터 관리의 기본 원칙을 아십니다.", incorrect: "복구(Restore)를 위한 사전 준비가 무엇인지 생각하세요." }
    },
    {
      id: "ipc_047",
      question: "표준 이더넷(Standard Ethernet)의 전송 속도는?",
      options: ["10Mbps", "100Mbps", "1Gbps", "10Gbps"],
      answer: 0,
      explanation: "초창기 표준 이더넷인 10Base-T 등은 10Mbps 속도를 가졌습니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "네트워크 역사적 규격을 잘 아시네요.", incorrect: "Fast Ethernet과 Giga Ethernet의 속도를 비교해 보세요." }
    },
    {
      id: "ipc_048",
      question: "URL의 구성 요소가 아닌 것은?",
      options: ["프로토콜", "호스트 주소", "포트 번호", "MAC 주소"],
      answer: 3,
      explanation: "MAC 주소는 물리적 하드웨어 고유 번호이며 URL 주소창에는 포함되지 않습니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "웹 주소 체계를 정확히 분석하셨습니다.", incorrect: "도메인과 물리적 주소의 단계를 구분해 보세요." }
    },
    {
      id: "ipc_049",
      question: "부동 소수점(Floating Point) 표현법의 구성이 아닌 것은?",
      options: ["부호 (Sign)", "지수 (Exponent)", "가수 (Mantissa)", "보수 (Complement)"],
      answer: 3,
      explanation: "부동 소수점은 부호, 지수부, 가수부로 이루어집니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "실수 표현 방식을 정확히 아시네요.", incorrect: "고정 소수점과 부동 소수점의 차이를 복습하세요." }
    },
    {
      id: "ipc_050",
      question: "컴퓨터 명령어 세트(Instruction Set)가 단순하고 고정된 길이인 CPU 구조는?",
      options: ["CISC", "RISC", "VLIW", "MISD"],
      answer: 1,
      explanation: "RISC(Reduced Instruction Set Computer)는 처리 속도가 빠르고 전력 효율이 좋습니다.",
      subject: "전자계산기 일반",
      diagnostic: { correct: "명령어 구조 설계 방식을 정확히 구분하시네요.", incorrect: "복잡한 명령어(CISC)와의 차이점을 기억하세요." }
    },
    {
      id: "ipc_051",
      question: "프로세스 스케줄링 중 '먼저 온 프로세스를 먼저 처리'하는 가장 단순한 기법은?",
      options: ["FCFS (First Come First Served)", "SJF", "RR", "우선순위"],
      answer: 0,
      explanation: "FCFS는 대기 큐에 도착한 순서대로 CPU를 할당하는 비선점 방식입니다.",
      subject: "운영체제",
      diagnostic: { correct: "스케줄링의 기초 모델을 잘 아시네요.", incorrect: "줄 서기 방식의 공정성과 효율성을 생각해보세요." }
    },
    {
      id: "ipc_052",
      question: "운영체제가 하드웨어를 직접 제어하는 가장 핵심적인 부분은?",
      options: ["커널 (Kernel)", "쉘 (Shell)", "유틸리티", "컴파일러"],
      answer: 0,
      explanation: "커널은 메모리 관리, 프로세스 관리 등 OS의 심장 역할을 수행합니다.",
      subject: "운영체제",
      diagnostic: { correct: "OS 계층 구조의 본질을 정확히 아셨네요.", incorrect: "사용자와 커널 사이의 다리(쉘)와 구분하세요." }
    },
    {
      id: "ipc_053",
      question: "파일 시스템 중 Windows 10/11의 표준 포맷이며 보안 기능이 강화된 것은?",
      options: ["FAT", "FAT32", "NTFS", "EXT4"],
      answer: 2,
      explanation: "NTFS는 대용량 지원, 권한 관리 등 현대 Windows 환경의 표준입니다.",
      subject: "운영체제",
      diagnostic: { correct: "파일 시스템 트렌드를 정확히 아십니다.", incorrect: "이동식 디스크와 하드디스크 포맷 차이를 확인하세요." }
    },
    {
      id: "ipc_054",
      question: "데이터베이스에서 특정 조건을 만족하는 튜플들을 뽑아내는 연산은?",
      options: ["Select", "Project", "Join", "Division"],
      answer: 0,
      explanation: "Select는 수평적 부분집합(가로 지르기)을 결과로 냅니다.",
      subject: "데이터베이스",
      diagnostic: { correct: "관계 대수의 연산 성격을 정확히 아시네요.", incorrect: "세로로 뽑는 Project와 가로로 뽑는 Select를 구분하세요." }
    },
    {
      id: "ipc_055",
      question: "정규화(Normalization)의 주요 목적이 아닌 것은?",
      options: ["데이터 무결성 유지", "중복 데이터 최소화", "검색 속도의 비약적 향상", "이상 현상 제거"],
      answer: 2,
      explanation: "정규화는 데이터 일관성을 위한 것으로, 과한 경우 조인이 늘어 검색 속도는 다소 느려질 수 있습니다.",
      subject: "데이터베이스",
      diagnostic: { correct: "정규화의 진정한 트레이드 오프를 아시네요.", incorrect: "왜 테이블을 쪼개는지 이유를 생각해 보세요." }
    },
    {
      id: "ipc_056",
      question: "네트워크에서 데이터가 지나가는 길을 선택하는 최적 경로 결정 장비는?",
      options: ["허브", "스위치", "라우터", "리피터"],
      answer: 2,
      explanation: "라우터는 네트워크 계층(3계층)에서 라우팅 테이블을 통해 경로를 지정합니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "네트워크 계층의 핵심 장비를 아시네요.", incorrect: "집까지 오는 길을 안내하는 '길잡이'를 떠올리세요." }
    },
    {
      id: "ipc_057",
      question: "무선 LAN의 표준 규격은?",
      options: ["IEEE 802.3", "IEEE 802.4", "IEEE 802.5", "IEEE 802.11"],
      answer: 3,
      explanation: "IEEE 802.11이 우리가 흔히 쓰는 Wi-Fi의 표준 기술입니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "디지털 기술 표준 번호가 해박하시네요.", incorrect: "유선 이더넷(802.3) 규격과 헷갈리지 마세요!" }
    },
    {
      id: "ipc_058",
      question: "멀티미디어 데이터 중 동영상 압축의 표준 규격은?",
      options: ["JPEG", "GIF", "MPEG", "MP3"],
      answer: 2,
      explanation: "MPEG은 동영상 및 오디오의 고효율 압축을 위한 국제 표준입니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "멀티미디어 확장자 구분이 완벽합니다.", incorrect: "정지 영상(JPEG)과 움직이는 영상(MPEG)을 구분하세요." }
    },
    {
      id: "ipc_059",
      question: "컴퓨터 보안을 위해 외부 침입을 차단하는 보안 시스템은?",
      options: ["방화벽 (Firewall)", "게이트웨이", "바이러스", "클라이언트"],
      answer: 0,
      explanation: "방화벽은 출입 통제 정책에 따라 외부망과 내부망 사이의 통신을 관리합니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "네트워크 보안의 관문을 알고 계시네요.", incorrect: "화재를 막는 '방화벽'의 비유를 명심하세요." }
    },
    {
      id: "ipc_060",
      question: "컴퓨터 소프트웨어 저작권 중 '누구나 소스 코드를 보고 수정할 수 있는' 소프트웨어는?",
      options: ["프리웨어", "쉐어웨어", "오픈 소스 (Open Source)", "상용 소프트웨어"],
      answer: 2,
      explanation: "오픈 소스는 소스 공개를 원칙으로 하며 공동 개발 및 향상이 가능합니다.",
      subject: "정보통신일반",
      diagnostic: { correct: "현대 협업 개발 문화를 잘 이해하고 계십니다.", incorrect: "공짜로 쓰는 것과 소스를 보는 것의 차이를 구분하세요." }
    }
  ]
};
