import type {
  Timestamp,
  FirestoreDataConverter
} from 'firebase-admin/firestore';

type Bookmark = {
  id: string;
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
