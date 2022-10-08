import type { TweetWithUser } from '@lib/types/tweet';

export function mergeTweets(
  tweets: TweetWithUser[] | null,
  anotherTweets: TweetWithUser[] | null
): TweetWithUser[] {
  const mergedTweets = [...(tweets ?? []), ...(anotherTweets ?? [])];

  return mergedTweets.sort(
    (a, b) => +b.createdAt.toDate() - +a.createdAt.toDate()
  );
}
