import { collection } from 'firebase/firestore';
import { userConverter } from '@lib/types/user';
import { tweetConverter } from '@lib/types/tweet';
import { bookmarkConverter } from '@lib/types/bookmark';
import { notificationConverter } from '@lib/types/notification';
import { statsConverter } from '@lib/types/stats';
import { trendConverter } from '@lib/types/trend';
import { conversationConverter } from '@lib/types/conversation';
import { messageConverter } from '@lib/types/message';
import { db } from './app';
import type { CollectionReference } from 'firebase/firestore';
import type { Bookmark } from '@lib/types/bookmark';
import type { Stats } from '@lib/types/stats';

export const usersCollection = collection(db, 'users').withConverter(
  userConverter
);

export const conversationsCollection = collection(
  db,
  'conversations'
).withConverter(conversationConverter);

export const messagesCollection = collection(db, 'messages').withConverter(
  messageConverter
);

export const tweetsCollection = collection(db, 'tweets').withConverter(
  tweetConverter
);

export const trendsCollection = collection(db, 'trends').withConverter(
  trendConverter
);

export const notificationsCollection = collection(
  db,
  'notifications'
).withConverter(notificationConverter);

export function userBookmarksCollection(
  id: string
): CollectionReference<Bookmark> {
  return collection(db, `users/${id}/bookmarks`).withConverter(
    bookmarkConverter
  );
}

export function userStatsCollection(id: string): CollectionReference<Stats> {
  return collection(db, `users/${id}/stats`).withConverter(statsConverter);
}
