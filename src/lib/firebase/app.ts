import { getApps, initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { getFirebaseConfig } from './config';
import type { Auth } from 'firebase/auth';
import type { Analytics } from 'firebase/analytics';
import type { Functions } from 'firebase/functions';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import type { FirebaseStorage } from 'firebase/storage';

type Firebase = {
  auth: Auth;
  storage: FirebaseStorage;
  firestore: Firestore;
  functions: Functions;
  analytics?: Analytics;
  firebaseApp: FirebaseApp;
};

function initialize(): Firebase {
  const firebaseApp = initializeApp(getFirebaseConfig());

  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const functions = getFunctions(firebaseApp);

  if (typeof window !== 'undefined') {
    const analytics = getAnalytics(firebaseApp);
    return { analytics, firebaseApp, auth, firestore, storage, functions };
  }

  return { firebaseApp, auth, firestore, storage, functions };
}

function connectToEmulators({
  auth,
  storage,
  firestore,
  functions,
  analytics,
  firebaseApp
}: Firebase): Firebase {
  if (
    typeof window !== 'undefined' &&
    window.location.hostname === 'localhost' &&
    process.env.NODE_ENV === 'development'
  ) {
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true
    });
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectFunctionsEmulator(functions, 'localhost', 5001);

    return { firebaseApp, auth, firestore, storage, functions };
  }

  return { firebaseApp, auth, firestore, storage, functions, analytics };
}

export function getFirebase(): Firebase {
  const existingApp = getApps().at(0);
  if (existingApp) return initialize();
  const services = connectToEmulators(initialize());
  return services;
}

export const { firestore: db, auth, storage } = getFirebase();
