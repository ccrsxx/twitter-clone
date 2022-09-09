import { useState, useEffect, useContext, createContext } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as signOutFirebase
} from 'firebase/auth';
import { auth } from '@lib/firebase/app';
import type { ReactNode } from 'react';
import type { AuthError, User } from 'firebase/auth';

type AuthContext = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUserAuth = (user: User | null): void => {
      setUser(user);
      setLoading(false);
    };

    onAuthStateChanged(auth, handleUserAuth);
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error as AuthError);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await signOutFirebase(auth);
    } catch (error) {
      setError(error as AuthError);
    }
  };

  const value = { user, loading, error, signInWithGoogle, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
