import { collection } from 'firebase/firestore';
import { userConverter } from '@lib/types/user';
import { postConverter } from '@lib/types/post';
import { db } from './app';

export const usersCollection = collection(db, 'users').withConverter(
  userConverter
);
export const postsCollection = collection(db, 'posts').withConverter(
  postConverter
);
export const commentsCollection = collection(db, 'comments');
