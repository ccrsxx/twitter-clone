import type {
  Timestamp,
  DocumentReference,
  FirestoreDataConverter
} from 'firebase-admin/firestore';
import type { Tweet } from './tweet';

type Bookmark = {
  ref: DocumentReference<Tweet>;
  createdAt: Timestamp;
};

export const bookmarkConverter: FirestoreDataConverter<Bookmark> = {
  toFirestore(bookmark) {
    return { ...bookmark };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    return { ...data } as Bookmark;
  }
};
