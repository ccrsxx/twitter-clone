import type {
  Timestamp,
  DocumentReference,
  FirestoreDataConverter
} from 'firebase/firestore';
import type { Status } from './status';

export type Bookmark = {
  id: string;
  ref: DocumentReference<Status>;
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
