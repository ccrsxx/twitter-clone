import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirebaseConfig } from './config';

initializeApp(getFirebaseConfig());

export const auth = getAuth();
export const db = getFirestore();
