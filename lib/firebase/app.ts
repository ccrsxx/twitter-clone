import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFirebaseConfig } from './config';

initializeApp(getFirebaseConfig());

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
