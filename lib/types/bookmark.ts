import type {
  Timestamp,
  DocumentReference,
  FirestoreDataConverter
} from 'firebase/firestore';
import type { Tweet } from './tweet';

export type Bookmark = {
  id: string;
  ref: DocumentReference<Tweet>;
  createdAt: Timestamp;
};

export const bookmarkConverter: FirestoreDataConverter<Bookmark> = {
  toFirestore(bookmark) {
    return { ...bookmark };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as Bookmark;
  }
};
