import { db } from './config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Candidate } from '@/types/candidate';

const COLLECTION_NAME = 'candidates';

export async function createCandidate(candidateData: Omit<Candidate, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...candidateData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding candidate:', error);
    throw error;
  }
} 