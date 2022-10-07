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
  tweetsCollection,
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

export async function managePinnedTweet(
  type: 'pin' | 'unpin',
  userId: string,
  tweetId: string
): Promise<void> {
  const docRef = doc(usersCollection, userId);
  await updateDoc(docRef, {
    updatedAt: serverTimestamp(),
    pinnedTweets: type === 'pin' ? arrayUnion(tweetId) : arrayRemove(tweetId)
  });
}

export async function manageFollow(
  type: 'follow' | 'unfollow',
  userId: string,
  targetUserId: string
): Promise<void> {
  const userDocRef = doc(usersCollection, userId);
  const targetUserDocRef = doc(usersCollection, targetUserId);

  if (type === 'follow')
    await Promise.all([
      updateDoc(userDocRef, {
        following: arrayUnion(targetUserId),
        updatedAt: serverTimestamp()
      }),
      updateDoc(targetUserDocRef, {
        followers: arrayUnion(userId),
        updatedAt: serverTimestamp()
      })
    ]);
  else
    await Promise.all([
      updateDoc(userDocRef, {
        following: arrayRemove(targetUserId),
        updatedAt: serverTimestamp()
      }),
      updateDoc(targetUserDocRef, {
        followers: arrayRemove(userId),
        updatedAt: serverTimestamp()
      })
    ]);
}

export async function removeTweet(tweetId: string): Promise<void> {
  const docRef = doc(tweetsCollection, tweetId);
  await deleteDoc(docRef);
}

export async function uploadImages(
  userId: string,
  files: FilesWithId
): Promise<ImagesPreview | null> {
  if (!files.length) return null;

  const imagesPreview = await Promise.all(
    files.map(async (file) => {
      let src: string;

      const { id, name: alt } = file;

      const storageRef = ref(storage, `images/${userId}/${alt}`);

      try {
        src = await getDownloadURL(storageRef);
      } catch {
        await uploadBytesResumable(storageRef, file);
        src = await getDownloadURL(storageRef);
      }

      return { id, src, alt };
    })
  );

  return imagesPreview;
}

export async function manageReply(
  type: 'increment' | 'decrement',
  tweetId: string
): Promise<void> {
  const postRef = doc(tweetsCollection, tweetId);
  await updateDoc(postRef, {
    userReplies: increment(type === 'increment' ? 1 : -1),
    updatedAt: serverTimestamp()
  });
}

export function manageRetweet(
  type: 'retweet' | 'unretweet',
  userId: string,
  tweetId: string
) {
  return async (): Promise<void> => {
    const postRef = doc(tweetsCollection, tweetId);
    await updateDoc(postRef, {
      userRetweets:
        type === 'retweet' ? arrayUnion(userId) : arrayRemove(userId),
      updatedAt: serverTimestamp()
    });
  };
}

export function manageLike(
  type: 'like' | 'unlike',
  userId: string,
  tweetId: string
) {
  return async (): Promise<void> => {
    const postRef = doc(tweetsCollection, tweetId);
    await updateDoc(postRef, {
      userLikes: type === 'like' ? arrayUnion(userId) : arrayRemove(userId),
      updatedAt: serverTimestamp()
    });
  };
}

export async function manageBookmark(
  type: 'bookmark' | 'unbookmark',
  userId: string,
  tweetId: string
): Promise<void> {
  const bookmarkRef = doc(userBookmarksCollection(userId), tweetId);

  if (type === 'bookmark') {
    const bookmarkData: WithFieldValue<Omit<Bookmark, 'id'>> = {
      ref: doc(tweetsCollection, tweetId),
      createdAt: serverTimestamp()
    };
    await setDoc(bookmarkRef, bookmarkData);
  } else await deleteDoc(bookmarkRef);
}
