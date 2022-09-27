import {
  doc,
  query,
  where,
  limit,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  increment,
  arrayUnion,
  arrayRemove,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './app';
import {
  usersCollection,
  statusesCollection,
  userBookmarksCollection
} from './collections';
import type { WithFieldValue } from 'firebase/firestore';
import type { FilesWithId, ImagesPreview } from '@lib/types/file';
import type { Bookmark } from '@lib/types/bookmark';

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

export async function removePost(statusId: string): Promise<void> {
  const docRef = doc(statusesCollection, statusId);
  await deleteDoc(docRef);
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
  statusId: string
): Promise<void> {
  const postRef = doc(statusesCollection, statusId);
  await updateDoc(postRef, {
    userReplies: increment(type === 'increment' ? 1 : -1),
    updatedAt: serverTimestamp()
  });
}

export function manageTweet(
  type: 'tweet' | 'untweet',
  userId: string,
  statusId: string
) {
  return async (): Promise<void> => {
    const postRef = doc(statusesCollection, statusId);
    await updateDoc(postRef, {
      userTweets: type === 'tweet' ? arrayUnion(userId) : arrayRemove(userId),
      updatedAt: serverTimestamp()
    });
  };
}

export function manageLike(
  type: 'like' | 'unlike',
  userId: string,
  statusId: string
) {
  return async (): Promise<void> => {
    const postRef = doc(statusesCollection, statusId);
    await updateDoc(postRef, {
      userLikes: type === 'like' ? arrayUnion(userId) : arrayRemove(userId),
      updatedAt: serverTimestamp()
    });
  };
}

export async function manageBookmark(
  type: 'bookmark' | 'unbookmark',
  userId: string,
  statusId: string
): Promise<void> {
  const bookmarkRef = doc(userBookmarksCollection(userId), statusId);

  if (type === 'bookmark') {
    const bookmarkData: WithFieldValue<Bookmark> = {
      id: statusId,
      ref: doc(statusesCollection, statusId),
      createdAt: serverTimestamp()
    };

    await setDoc(bookmarkRef, bookmarkData);
  } else await deleteDoc(bookmarkRef);
}
