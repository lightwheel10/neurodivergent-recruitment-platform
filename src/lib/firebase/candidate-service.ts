import { db } from './config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Candidate } from '@/types/candidate';

export async function createCandidate(candidateData: Omit<Candidate, 'id' | 'createdAt'>) {
  try {
    // Validate required fields
    if (!candidateData.name || !candidateData.email || !candidateData.diagnoses) {
      throw new Error('Missing required fields');
    }

    // Ensure diagnoses array exists and has valid assessment data
    const diagnoses = candidateData.diagnoses.map(diagnosis => ({
      ...diagnosis,
      assessment: {
        symptomSeverity: diagnosis.assessment?.symptomSeverity || 1,
        symptomFluctuationLongTerm: diagnosis.assessment?.symptomFluctuationLongTerm || 1,
        symptomFluctuationShortTerm: diagnosis.assessment?.symptomFluctuationShortTerm || 1,
      }
    }));

    const docRef = await addDoc(collection(db, 'candidates'), {
      ...candidateData,
      diagnoses,
      createdAt: serverTimestamp(),
    });
    
    if (!docRef.id) {
      throw new Error('Failed to create candidate');
    }
    
    return docRef.id;
  } catch (error) {
    console.error('Error in createCandidate:', error);
    if (error instanceof Error && error.message.includes('permission')) {
      throw new Error('Database permission error. Please contact support.');
    }
    throw error;
  }
} 