import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

export type User = {
  uid: string;
  bio: string | null;
  name: string;
  website: string | null;
  location: string | null;
  username: string;
  photoURL: string;
  verified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
};

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user) {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as User;
  }
};
