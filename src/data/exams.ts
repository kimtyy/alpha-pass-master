import { infoProcessingCraftsman } from './exams/info-processing-craftsman';

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
  'info-processing-craftsman': infoProcessingCraftsman,
  'info-processing-engineer': {
    id: 'info-processing-engineer',
    title: '정보처리기사',
    category: 'Engineer',
    questions: infoProcessingCraftsman.questions.slice(0, 10).map(q => ({ ...q, id: `ipe_${q.id}` })) // Placeholder
  },
  'electronic-craftsman': {
    id: 'electronic-craftsman',
    title: '전자기기기능사',
    category: 'Craftsman',
    questions: infoProcessingCraftsman.questions.slice(10, 20).map(q => ({ ...q, id: `ec_${q.id}` })) 
  },
  'electric-engineer': {
    id: 'electric-engineer',
    title: '전기기사',
    category: 'Engineer',
    questions: infoProcessingCraftsman.questions.slice(20, 30).map(q => ({ ...q, id: `ee_${q.id}` }))
  },
  'industrial-safety-engineer': {
    id: 'industrial-safety-engineer',
    title: '산업안전기사',
    category: 'Engineer',
    questions: infoProcessingCraftsman.questions.slice(30, 40).map(q => ({ ...q, id: `ise_${q.id}` }))
  },
  'logistics-management-engineer': {
    id: 'logistics-management-engineer',
    title: '물류관리사',
    category: 'Professional',
    questions: infoProcessingCraftsman.questions.slice(40, 50).map(q => ({ ...q, id: `lme_${q.id}` }))
  },
  'hair-design-craftsman': {
    id: 'hair-design-craftsman',
    title: '미용사(일반)',
    category: 'Craftsman',
    questions: infoProcessingCraftsman.questions.slice(50, 55).map(q => ({ ...q, id: `hdc_${q.id}` }))
  },
  'cook-korean-craftsman': {
    id: 'cook-korean-craftsman',
    title: '한식조리기능사',
    category: 'Craftsman',
    questions: infoProcessingCraftsman.questions.slice(55, 60).map(q => ({ ...q, id: `ckc_${q.id}` }))
  },
  'architectural-craftsman': {
    id: 'architectural-craftsman',
    title: '전산응용건축제도기능사',
    category: 'Craftsman',
    questions: infoProcessingCraftsman.questions.slice(0, 5).map(q => ({ ...q, id: `arc_${q.id}` }))
  },
  'real-estate-agent': {
    id: 'real-estate-agent',
    title: '공인중개사(1차)',
    category: 'Professional',
    questions: infoProcessingCraftsman.questions.slice(5, 10).map(q => ({ ...q, id: `rea_${q.id}` }))
  },
  'civil-service-9-general': {
    id: 'civil-service-9-general',
    title: '9급 공무원(국어)',
    category: 'Professional',
    questions: infoProcessingCraftsman.questions.slice(10, 15).map(q => ({ ...q, id: `cs9_${q.id}` }))
  }
};
