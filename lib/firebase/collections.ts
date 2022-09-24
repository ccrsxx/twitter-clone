import { collection } from 'firebase/firestore';
import { userConverter } from '@lib/types/user';
import { postConverter } from '@lib/types/post';
import { BookmarkConverter } from '@lib/types/bookmark';
import { db } from './app';
import type { CollectionReference } from 'firebase/firestore';
import type { Bookmark } from '@lib/types/bookmark';

export const usersCollection = collection(db, 'users').withConverter(
  userConverter
);
export const postsCollection = collection(db, 'posts').withConverter(
  postConverter
);
export const commentsCollection = collection(db, 'comments');

export function userBookmarksCollection(
  uid: string
): CollectionReference<Bookmark> {
  return collection(db, `users/${uid}/bookmarks`).withConverter(
    BookmarkConverter
  );
}
