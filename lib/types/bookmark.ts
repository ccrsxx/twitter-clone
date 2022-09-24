import type {
  Timestamp,
  DocumentReference,
  FirestoreDataConverter
} from 'firebase/firestore';
import type { Post } from './post';

export type Bookmark = {
  id: string;
  ref: DocumentReference<Post>;
  createdAt: Timestamp;
};

export const BookmarkConverter: FirestoreDataConverter<Bookmark> = {
  toFirestore(bookmark) {
    return { ...bookmark };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as Bookmark;
  }
};
