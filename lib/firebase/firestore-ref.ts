import { collection } from 'firebase/firestore';
import { db } from './app';

export const usersCollection = collection(db, 'users');
export const postsCollection = collection(db, 'posts');
export const commentsCollection = collection(db, 'comments');
