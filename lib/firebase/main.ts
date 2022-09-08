import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './app';

export function signInWithGoogle(): void {
  const provider = new GoogleAuthProvider();
  void signInWithPopup(auth, provider);
}
