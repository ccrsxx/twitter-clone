import { useState, useEffect, useContext, createContext } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as signOutFirebase
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { auth } from '@lib/firebase/app';
import { usersCollection } from '@lib/firebase/firestore-ref';
import { getRandomInt } from '@lib/random';
import type { ReactNode } from 'react';
import type { User } from 'firebase/auth';
import type { FieldValue } from 'firebase/firestore';

type AuthContext = {
  userData: UserData | null;
  loading: boolean;
  error: Error | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export type UserData = {
  id: string;
  name: string;
  bio: null | string;
  website: null | string;
  location: null | string;
  username: string;
  photoURL: string;
  verified: boolean;
  createdAt: FieldValue;
  updatedAt: null | FieldValue;
};

export const AuthContext = createContext<AuthContext | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createNewUser = async (user: User): Promise<void> => {
      const { uid, displayName, photoURL } = user;

      const userRef = await getDoc(doc(usersCollection, uid));

      if (!userRef.exists()) {
        const normalizeName = displayName?.replace(/\s/g, '').toLowerCase();
        const randomInt = getRandomInt(1, 1000);
        const randomUsername = `${normalizeName as string}${randomInt}`;

        const userData: UserData = {
          id: uid,
          name: displayName as string,
          bio: null,
          website: null,
          location: null,
          photoURL: photoURL as string,
          username: randomUsername,
          verified: false,
          createdAt: serverTimestamp(),
          updatedAt: null
        };

        try {
          await setDoc(doc(usersCollection, uid), userData);
          setUserData(userData);
        } catch (error) {
          setError(error as Error);
        }
      } else {
        const userData = userRef.data() as UserData;
        setUserData(userData);
      }

      setLoading(false);
    };

    const handleUserAuth = (user: User | null): void => {
      setLoading(true);

      if (user) void createNewUser(user);
      else {
        setUserData(null);
        setLoading(false);
      }
    };

    onAuthStateChanged(auth, handleUserAuth);
  }, []);

  useEffect(() => {
    if (!userData) return;

    const unsubscribe = onSnapshot(doc(usersCollection, userData.id), (doc) => {
      setUserData(doc.data() as UserData);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.id]);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error as Error);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await signOutFirebase(auth);
    } catch (error) {
      setError(error as Error);
    }
  };

  const value = {
    userData,
    loading,
    error,
    signInWithGoogle,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
