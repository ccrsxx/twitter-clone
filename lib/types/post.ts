import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { ImagesPreview } from './file';

export type Post = {
  id: string;
  text: string;
  images: ImagesPreview | null;
  userLikes: string[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  userTweets: string[];
  userReplies: string[];
};

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post) {
    return { ...post };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Post;
  }
};
