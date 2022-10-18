import type { TweetWithUser } from '@lib/types/tweet';

export function mergeTweets(
  ...tweets: (TweetWithUser[] | null)[]
): TweetWithUser[] | null {
  const validTweets = tweets.filter((tweet) => tweet) as TweetWithUser[][];
  const mergedTweets = validTweets.reduce(
    (acc, tweet) => [...acc, ...tweet],
    []
  );

  return mergedTweets.length
    ? mergedTweets.sort((a, b) => +b.createdAt.toDate() - +a.createdAt.toDate())
    : null;
}
