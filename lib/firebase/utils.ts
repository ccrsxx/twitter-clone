import {
  doc,
  query,
  where,
  limit,
  getDocs,
  updateDoc,
  deleteDoc,
  increment,
  arrayUnion,
  arrayRemove,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-hot-toast';
import { storage } from './app';
import { usersCollection, postsCollection } from './collections';
import type { FilesWithId, ImagesPreview } from '@lib/types/file';

export async function checkUsernameAvailability(
  username: string
): Promise<boolean> {
  const { empty } = await getDocs(
    query(usersCollection, where('username', '==', username), limit(1))
  );
  return empty;
}

export async function updateUsername(
  userId: string,
  username?: string
): Promise<void> {
  const docRef = doc(usersCollection, userId);
  await updateDoc(docRef, {
    updatedAt: serverTimestamp(),
    ...(username && { username })
  });
}

export async function removePost(postId: string): Promise<void> {
  const docRef = doc(postsCollection, postId);
  await deleteDoc(docRef);

  toast.success('Your Tweet was deleted');
}

export async function uploadImages(
  userId: string,
  files: FilesWithId
): Promise<ImagesPreview | null> {
  if (!files.length) return null;

  const imagesPreview = await Promise.all(
    files.map(async (file) => {
      const { id, name: alt } = file;

      const storageRef = ref(storage, `images/${userId}/${alt}`);

      await uploadBytesResumable(storageRef, file);

      const src = await getDownloadURL(storageRef);

      return { id, src, alt };
    })
  );

  return imagesPreview;
}

export async function manageReply(
  type: 'increment' | 'decrement',
  postId: string
): Promise<void> {
  const postRef = doc(postsCollection, postId);
  await updateDoc(postRef, {
    userReplies: increment(type === 'increment' ? 1 : -1),
    updatedAt: serverTimestamp()
  });
}

export function manageTweet(
  type: 'tweet' | 'untweet',
  userId: string,
  postId: string
) {
  return async (): Promise<void> => {
    const postRef = doc(postsCollection, postId);
    await updateDoc(postRef, {
      userTweets: type === 'tweet' ? arrayUnion(userId) : arrayRemove(userId),
      updatedAt: serverTimestamp()
    });
  };
}

export function manageLike(
  type: 'like' | 'unlike',
  userId: string,
  postId: string
) {
  return async (): Promise<void> => {
    const postRef = doc(postsCollection, postId);
    await updateDoc(postRef, {
      userLikes: type === 'like' ? arrayUnion(userId) : arrayRemove(userId),
      updatedAt: serverTimestamp()
    });
  };
}
