export interface CertificateInfo {
  id: string;
  name: string;
  category: 'Engineer' | 'Craftsman' | 'Professional';
  field: string;
}

export const CERTIFICATE_LIST: CertificateInfo[] = [
  // IT / Computing
  { id: 'info-processing-engineer', name: '정보처리기사', category: 'Engineer', field: 'IT' },
  { id: 'info-processing-industrial-engineer', name: '정보처리산업기사', category: 'Engineer', field: 'IT' },
  { id: 'info-processing-craftsman', name: '정보처리기능사', category: 'Craftsman', field: 'IT' },
  { id: 'computer-systems-applied-engineer', name: '컴퓨터시스템응용기술사', category: 'Professional', field: 'IT' },
  { id: 'information-management-engineer', name: '정보관리기술사', category: 'Professional', field: 'IT' },
  { id: 'security-engineer', name: '정보보안기사', category: 'Engineer', field: 'IT' },
  { id: 'security-industrial-engineer', name: '정보보안산업기사', category: 'Engineer', field: 'IT' },
  
  // Electrical / Electronic
  { id: 'electric-engineer', name: '전기기사', category: 'Engineer', field: 'Electrical' },
  { id: 'electric-industrial-engineer', name: '전기산업기사', category: 'Engineer', field: 'Electrical' },
  { id: 'electric-craftsman', name: '전기기능사', category: 'Craftsman', field: 'Electrical' },
  { id: 'electronic-craftsman', name: '전자기기기능사', category: 'Craftsman', field: 'Electronic' },
  { id: 'electricity-safety-engineer', name: '전기안전기술사', category: 'Professional', field: 'Electrical' },
  { id: 'electric-construction-engineer', name: '전기공사기사', category: 'Engineer', field: 'Electrical' },
  { id: 'forklift-operator-craftsman', name: '지게차운전기능사', category: 'Craftsman', field: 'Machinery' },
  { id: 'driver-license-general', name: '운전면허(1/2종 보통)', category: 'Professional', field: 'Service' },
  
  
  // Safety / Environment
  { id: 'industrial-safety-engineer', name: '산업안전기사', category: 'Engineer', field: 'Safety' },
  { id: 'industrial-safety-industrial-engineer', name: '산업안전산업기사', category: 'Engineer', field: 'Safety' },
  { id: 'fire-fighting-engineer-machinery', name: '소방설비기사(기계)', category: 'Engineer', field: 'Safety' },
  { id: 'fire-fighting-engineer-electrical', name: '소방설비기사(전기)', category: 'Engineer', field: 'Safety' },
  { id: 'construction-safety-engineer', name: '건설안전기사', category: 'Engineer', field: 'Safety' },
  { id: 'gas-engineer', name: '가스기사', category: 'Engineer', field: 'Safety' },
  { id: 'environmental-engineer-water', name: '수질환경기사', category: 'Engineer', field: 'Environment' },
  { id: 'environmental-engineer-air', name: '대기환경기사', category: 'Engineer', field: 'Environment' },
  
  // Machinery / Manufacturing
  { id: 'general-machinery-engineer', name: '일반기계기사', category: 'Engineer', field: 'Machinery' },
  { id: 'machinery-design-industrial-engineer', name: '기계설계산업기사', category: 'Engineer', field: 'Machinery' },
  { id: 'computer-aided-manufacturing-craftsman', name: '컴퓨터응용선반기능사', category: 'Craftsman', field: 'Machinery' },
  { id: 'computer-aided-milling-craftsman', name: '컴퓨터응용밀링기능사', category: 'Craftsman', field: 'Machinery' },
  { id: 'welding-craftsman', name: '용접기능사', category: 'Craftsman', field: 'Manufacturing' },
  
  // Construction / Architecture
  { id: 'architectural-engineer', name: '건축기사', category: 'Engineer', field: 'Construction' },
  { id: 'civil-engineering-engineer', name: '토목기사', category: 'Engineer', field: 'Construction' },
  { id: 'interior-design-engineer', name: '실내건축기사', category: 'Engineer', field: 'Construction' },
  { id: 'architectural-craftsman', name: '전산응용건축제도기능사', category: 'Craftsman', field: 'Construction' },
  
  // Logistics / Quality
  { id: 'logistics-management-engineer', name: '물류관리사', category: 'Professional', field: 'Logistics' },
  { id: 'quality-management-engineer', name: '품질경영기사', category: 'Engineer', field: 'Quality' },
  
  // Language / Others
  { id: 'tour-guide-english', name: '관광통역안내사(영어)', category: 'Professional', field: 'Service' },
  { id: 'social-worker-1', name: '사회복지사1급', category: 'Professional', field: 'Safety' },
  { id: 'hair-design-craftsman', name: '미용사(일반)', category: 'Craftsman', field: 'Service' },
  { id: 'cook-korean-craftsman', name: '조리기능사(한식)', category: 'Craftsman', field: 'Service' }
];
