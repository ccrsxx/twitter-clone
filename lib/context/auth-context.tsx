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
import {
  usersCollection,
  userBookmarksCollection
} from '@lib/firebase/collections';
import { getRandomInt } from '@lib/utils';
import type { ReactNode } from 'react';
import type { User as AuthUser } from 'firebase/auth';
import type { WithFieldValue } from 'firebase/firestore';
import type { User } from '@lib/types/user';
import type { Bookmark } from '@lib/types/bookmark';

type AuthContext = {
  user: User | null;
  error: Error | null;
  loading: boolean;
  isAdmin: boolean;
  userBookmarks: Bookmark[] | null;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const manageUser = async (authUser: AuthUser): Promise<void> => {
      const { uid, displayName, photoURL } = authUser;

      const userSnapshot = await getDoc(doc(usersCollection, uid));

      if (!userSnapshot.exists()) {
        let available = false;
        let randomUsername = '';

        while (!available) {
          const normalizeName = displayName?.replace(/\s/g, '').toLowerCase();
          const randomInt = getRandomInt(1, 10_000);

          randomUsername = `${normalizeName as string}${randomInt}`;

          const randomUserSnapshot = await getDoc(
            doc(usersCollection, randomUsername)
          );

          if (!randomUserSnapshot.exists()) available = true;
        }

        const userData: WithFieldValue<User> = {
          uid,
          bio: null,
          name: displayName as string,
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
          const newUser = (await getDoc(doc(usersCollection, uid))).data();
          setUser(newUser as User);
        } catch (error) {
          setError(error as Error);
        }
      } else {
        const userData = userSnapshot.data();
        setUser(userData);
      }

      setLoading(false);
    };

    const handleUserAuth = (authUser: AuthUser | null): void => {
      setLoading(true);

      if (authUser) void manageUser(authUser);
      else {
        setUser(null);
        setLoading(false);
      }
    };

    onAuthStateChanged(auth, handleUserAuth);
  }, []);

  useEffect(() => {
    if (!user) return;

    const { uid } = user;

    const unsubscribeUser = onSnapshot(doc(usersCollection, uid), (doc) => {
      setUser(doc.data() as User);
    });

    const unsubscribeBookmarks = onSnapshot(
      userBookmarksCollection(uid),
      (snapshot) => {
        const bookmarks = snapshot.docs.map((doc) => doc.data());
        setUserBookmarks(bookmarks);
      }
    );

    return () => {
      unsubscribeUser();
      unsubscribeBookmarks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

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

  const isAdmin = user ? user.username === 'ccrsxx' : false;

  const value = {
    user,
    error,
    loading,
    isAdmin,
    userBookmarks,
    signOut,
    signInWithGoogle
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
