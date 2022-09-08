import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirebaseConfig } from './config';

initializeApp(getFirebaseConfig());

export const auth = getAuth();
