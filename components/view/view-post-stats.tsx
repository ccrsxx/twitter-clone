import Link from 'next/link';
import { NumberStats } from '@components/post/number-stats';

type ViewPostStats = {
  postId: string;
  likeMove: number;
  tweetMove: number;
  replyMove: number;
  currentLikes: number;
  currentTweets: number;
  currentReplies: number;
};

export function ViewPostStats({
  postId,
  likeMove,
  tweetMove,
  replyMove,
  currentLikes,
  currentTweets,
  currentReplies
}: ViewPostStats): JSX.Element {
  const allStats: [string, string | null, number, number][] = [
    ['Reply', null, replyMove, currentReplies],
    ['Retweet', 'retweets', tweetMove, currentTweets],
    ['Like', 'likes', likeMove, currentLikes]
  ];

  return (
    <div
      className='flex gap-4 px-1 py-4 text-secondary
                 [&>a>div]:font-bold [&>a>div]:text-white'
    >
      {allStats.map(
        ([title, path, move, stats]) =>
          !!stats && (
            <Link href={`/post/${postId}${path ? `/${path}` : ''}`}>
              <a
                className='custom-underline flex items-center
                           gap-1 hover:decoration-primary'
                key={title}
              >
                <NumberStats move={move} stats={stats} />
                <p>{`${title}${stats > 1 ? 's' : ''}`}</p>
              </a>
            </Link>
          )
      )}
    </div>
  );
}
