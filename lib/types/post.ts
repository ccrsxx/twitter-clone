import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { ImagesPreview } from './file';

export type Post = {
  id: string;
  text: string;
  images: ImagesPreview | null;
  createdBy: string;
  createdAt: Timestamp;
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
