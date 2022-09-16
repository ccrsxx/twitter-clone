import type {
  Timestamp,
  SnapshotOptions,
  DocumentReference,
  QueryDocumentSnapshot,
  FirestoreDataConverter
} from 'firebase/firestore';

export type Post = {
  id: string;
  text: string;
  images: null | string[];
  userRef: DocumentReference;
  createdAt: Timestamp;
};

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(user: Post): Post {
    return { ...user };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Post {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Post;
  }
};
