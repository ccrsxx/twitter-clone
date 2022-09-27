import { collection } from 'firebase/firestore';
import { userConverter } from '@lib/types/user';
import { statusConverter } from '@lib/types/status';
import { BookmarkConverter } from '@lib/types/bookmark';
import { db } from './app';
import type { CollectionReference } from 'firebase/firestore';
import type { Bookmark } from '@lib/types/bookmark';

export const usersCollection = collection(db, 'users').withConverter(
  userConverter
);

export const statusesCollection = collection(db, 'statuses').withConverter(
  statusConverter
);

export function userBookmarksCollection(
  uid: string
): CollectionReference<Bookmark> {
  return collection(db, `users/${uid}/bookmarks`).withConverter(
    BookmarkConverter
  );
}
