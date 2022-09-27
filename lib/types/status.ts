import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { ImagesPreview } from './file';

export type Status = {
  id: string;
  text: string;
  images: ImagesPreview | null;
  parent: { id: string; username: string } | null;
  userLikes: string[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  userTweets: string[];
  userReplies: number;
};

export const statusConverter: FirestoreDataConverter<Status> = {
  toFirestore(status) {
    return { ...status };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Status;
  }
};
