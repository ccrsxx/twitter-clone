import { functions, firestore, regionalFunctions } from './utils';
import { tweetConverter, bookmarkConverter } from './types';
import type { Tweet } from './types';

export const normalizeStats = regionalFunctions.firestore
  .document('tweets/{tweetId}')
  .onDelete(async (snapshot): Promise<void> => {
    const tweetId = snapshot.id;
    const tweetData = snapshot.data() as Tweet;

    functions.logger.info('normalizeStats from', { tweetId, tweetData });

    const { userRetweets, userLikes } = tweetData;

    const usersStatsToDelete = [...new Set([...userRetweets, ...userLikes])];

    const statsToDelete = usersStatsToDelete.flatMap((userId: string) => {
      functions.logger.info('deleting user stats with', { userId });

      const userStatsRef = firestore()
        .doc(`users/${userId}/stats/stats`)
        .withConverter(tweetConverter);

      const userBookmarkTweetRef = firestore()
        .doc(`users/${userId}/bookmarks/${tweetId}`)
        .withConverter(bookmarkConverter);

      return [
        userStatsRef.update({
          tweets: firestore.FieldValue.arrayRemove(tweetId),
          likes: firestore.FieldValue.arrayRemove(tweetId)
        }),
        userBookmarkTweetRef.delete()
      ];
    });

    await Promise.all(statsToDelete);

    functions.logger.info(`normalizeStats from ${tweetId} is done`);
  });
