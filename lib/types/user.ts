import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

export type User = {
  id: string;
  bio: string | null;
  name: string;
  website: string | null;
  location: string | null;
  username: string;
  photoURL: string;
  verified: boolean;
  following: string[];
  followers: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  totalTweets: number;
  pinnedTweet: string | null;
  coverPhotoURL: string | null;
};

export type EditableData = 'name' | 'bio' | 'location' | 'website';
export type EditableUserData = Pick<User, EditableData>;

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user) {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as User;
  }
};
