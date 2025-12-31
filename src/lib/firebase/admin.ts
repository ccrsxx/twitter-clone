import admin from 'firebase-admin';
import { env } from '@/lib/env';

const serviceAccount: admin.ServiceAccount = {
  projectId: env.FIREBASE_PROJECT_ID,
  privateKey: env.FIREBASE_PRIVATE_KEY,
  clientEmail: env.FIREBASE_CLIENT_EMAIL
};

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });

export const adminAuth = admin.auth();
export const adminDB = admin.firestore();
