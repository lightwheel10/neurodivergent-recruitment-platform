export interface AssessmentScores {
  symptomSeverity: number;
  symptomFluctuationLongTerm: number;
  symptomFluctuationShortTerm: number;
}

export interface DiagnosisWithAssessment {
  type: DiagnosisType;
  assessment: AssessmentScores;
}

export interface Candidate {
  id?: string;
  name: string;
  age: number;
  email: string;
  phoneNumber?: string;
  diagnoses: DiagnosisWithAssessment[];
  superpowers: string[];
  vulnerabilities: string[];
  createdAt: Date;
  matched?: boolean;
  reviewed?: boolean;
}

export type DiagnosisType = 'Bipolar' | 'ADHD' | 'PTSD';

export const PREDEFINED_SUPERPOWERS = {
  Bipolar: ['Periods of high production', 'Creative thinking', 'Intense focus'],
  ADHD: ['Thinking outside the box', 'Energetic', 'Hyperfocus'],
  PTSD: ['High awareness', 'Empathy', 'Resilience']
} as const;

export const PREDEFINED_VULNERABILITIES = {
  Bipolar: ['Mood swings', 'Irregular sleep patterns', 'Periods of low production'],
  ADHD: ['Difficulty with routine', 'Time management challenges', 'Easily distracted'],
  PTSD: ['Anxiety in certain situations', 'Stress sensitivity', 'Sleep difficulties']
} as const; 