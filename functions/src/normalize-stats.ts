import { functions, firestore, regionalFunctions } from './lib/utils';
import { tweetConverter, bookmarkConverter } from './types';
import type { Tweet } from './types';

export const normalizeStats = regionalFunctions.firestore
  .document('tweets/{tweetId}')
  .onDelete(async (snapshot): Promise<void> => {
    const tweetId = snapshot.id;
    const tweetData = snapshot.data() as Tweet;

    functions.logger.info(`Normalizing stats from tweet ${tweetId}`);

    const { userRetweets, userLikes } = tweetData;

    const usersStatsToDelete = new Set([...userRetweets, ...userLikes]);

    const batch = firestore().batch();

    usersStatsToDelete.forEach((userId) => {
      functions.logger.info(`Deleting stats from ${userId}`);

      const userStatsRef = firestore()
        .doc(`users/${userId}/stats/stats`)
        .withConverter(tweetConverter);

      batch.update(userStatsRef, {
        tweets: firestore.FieldValue.arrayRemove(tweetId),
        likes: firestore.FieldValue.arrayRemove(tweetId)
      });
    });

    const bookmarksQuery = firestore()
      .collectionGroup('bookmarks')
      .where('id', '==', tweetId)
      .withConverter(bookmarkConverter);

    const docsSnap = await bookmarksQuery.get();

    functions.logger.info(`Deleting ${docsSnap.size} bookmarks`);

    docsSnap.docs.forEach(({ id, ref }) => {
      functions.logger.info(`Deleting bookmark ${id}`);
      batch.delete(ref);
    });

    await batch.commit();

    functions.logger.info(`Normalizing stats for tweet ${tweetId} is done`);
  });
