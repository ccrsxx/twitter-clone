import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  initializeFirestore
} from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';

import { getFirebaseConfig } from './config';

import type { Analytics } from 'firebase/analytics';
import type { Functions } from 'firebase/functions';
import type { FirebaseStorage } from 'firebase/storage';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';

function initialize(): {
  firestore: Firestore;
  auth: Auth;
  firebaseApp: FirebaseApp;
  storage: FirebaseStorage;
  functions: Functions;
} {
  const firebaseApp = initializeApp(getFirebaseConfig());
  const auth = getAuth(firebaseApp);
  const firestore = initializeFirestore(firebaseApp, {
    experimentalAutoDetectLongPolling: true
  });
  const storage = getStorage(firebaseApp);
  const functions = getFunctions(firebaseApp);

  if (typeof window !== 'undefined') {
    const analytics = getAnalytics(firebaseApp);
    return { analytics, firebaseApp, auth, firestore, storage, functions };
  }

  return { firebaseApp, auth, firestore, storage, functions };
}

function connectToEmulators({
  firebaseApp,
  auth,
  firestore,
  storage,
  functions,
  analytics
}: {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
  functions: Functions;
  analytics?: Analytics;
}) {
  if (
    typeof window !== 'undefined' &&
    window.location.hostname === 'localhost' &&
    process.env.NODE_ENV === 'development'
  ) {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true
    });
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);

    return { firebaseApp, auth, firestore, storage, functions };
  }
  return { firebaseApp, auth, firestore, storage, functions, analytics };
}

export function getFirebase(): {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
  functions: Functions;
  analytics?: Analytics;
} {
  const existingApp = getApps().at(0);
  if (existingApp) return initialize();
  const services = connectToEmulators(initialize());
  return services;
}

export const auth = getFirebase().auth;
export const db = getFirebase().firestore;
export const storage = getFirebase().storage;
