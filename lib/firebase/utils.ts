import {
  doc,
  query,
  where,
  limit,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
