import { infoProcessingCraftsman } from './exams/info-processing-craftsman';
import { infoProcessingEngineer } from './exams/info-processing-engineer';
import { electricCraftsman } from './exams/electric-craftsman';
import { electricEngineer } from './exams/electric-engineer';
import { industrialSafetyEngineer } from './exams/industrial-safety-engineer';
import { realEstateAgent } from './exams/real-estate-agent';
import { cookKoreanCraftsman } from './exams/cook-korean-craftsman';
import { architecturalCraftsman } from './exams/architectural-craftsman';
import { driverLicenseGeneral } from './exams/driver-license-general';
import { forkliftOperatorCraftsman } from './exams/forklift-operator-craftsman';

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  subject: string;
  type?: 'text' | 'photo' | 'video' | 'illustration';
  diagnostic?: {
    correct: string;
    incorrect: string;
  };
}

export interface ExamSubject {
  id: string;
  title: string;
  category: 'Engineer' | 'Craftsman' | 'Professional';
  subjects?: { name: string; targetPerSubject: number }[];
  questions: Question[];
}

export const EXAM_DATA: Record<string, ExamSubject> = {
  'info-processing-craftsman': infoProcessingCraftsman,
  'info-processing-engineer': infoProcessingEngineer,
  'electric-craftsman': electricCraftsman,
  'electric-engineer': electricEngineer,
  'electronic-craftsman': {
    id: 'electronic-craftsman',
    title: '전자기기기능사',
    category: 'Craftsman',
    questions: infoProcessingCraftsman.questions.slice(10, 20).map(q => ({ ...q, id: `ec_${q.id}` })) 
  },
  'industrial-safety-engineer': industrialSafetyEngineer,
  'driver-license-general': driverLicenseGeneral,
  'forklift-operator-craftsman': forkliftOperatorCraftsman,
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
  'cook-korean-craftsman': cookKoreanCraftsman,
  'architectural-craftsman': architecturalCraftsman,
  'real-estate-agent': realEstateAgent,
  'civil-service-9-general': {
    id: 'civil-service-9-general',
    title: '9급 공무원(국어)',
    category: 'Professional',
    questions: infoProcessingCraftsman.questions.slice(10, 15).map(q => ({ ...q, id: `cs9_${q.id}` }))
  }
};
