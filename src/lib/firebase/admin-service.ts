import { db } from './config';
import { collection, getDocs, query, orderBy, Timestamp, doc, updateDoc } from 'firebase/firestore';
import type { Candidate } from '@/types/candidate';

interface DashboardStats {
  totalCandidates: number;
  pendingReview: number;
  successfulMatches: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const candidatesRef = collection(db, 'candidates');
    const querySnapshot = await getDocs(candidatesRef);
    
    const total = querySnapshot.size;
    const pending = querySnapshot.docs.filter(doc => !doc.data().reviewed).length;
    const matched = querySnapshot.docs.filter(doc => doc.data().matched).length;

    return {
      totalCandidates: total,
      pendingReview: pending,
      successfulMatches: matched
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

export async function getAllCandidates(): Promise<Candidate[]> {
  try {
    const candidatesRef = collection(db, 'candidates');
    const q = query(candidatesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        age: data.age,
        email: data.email,
        phoneNumber: data.phoneNumber,
        diagnoses: data.diagnoses || [],
        superpowers: data.superpowers || [],
        vulnerabilities: data.vulnerabilities || [],
        createdAt: (data.createdAt as Timestamp).toDate(),
        matched: data.matched || false,
        reviewed: data.reviewed || false
      } as Candidate;
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
}

export async function confirmCandidate(candidateId: string): Promise<void> {
  try {
    const candidateRef = doc(db, 'candidates', candidateId);
    await updateDoc(candidateRef, {
      reviewed: true,
      matched: true,
      reviewedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error confirming candidate:', error);
    throw error;
  }
} 