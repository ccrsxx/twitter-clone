import type {
  Timestamp,
  FieldValue,
  SnapshotOptions,
  DocumentReference,
  QueryDocumentSnapshot,
  FirestoreDataConverter
} from 'firebase/firestore';

export type User = {
  id: string;
  name: string;
  bio: string | null;
  ref: DocumentReference;
  website: string | null;
  location: string | null;
  username: string;
  photoURL: string;
  verified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
};

export type ServerUser = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue;
  updatedAt: FieldValue | null;
};

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: ServerUser): ServerUser {
    return { ...user };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);
    return { ...data } as User;
  }
};
