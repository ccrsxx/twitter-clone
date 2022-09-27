import Link from 'next/link';
import { NumberStats } from '@components/status/number-stats';

type ViewStatusStats = {
  statusId: string;
  likeMove: number;
  tweetMove: number;
  replyMove: number;
  currentLikes: number;
  currentTweets: number;
  currentReplies: number;
};

export function ViewStatusStats({
  statusId,
  likeMove,
  tweetMove,
  replyMove,
  currentLikes,
  currentTweets,
  currentReplies
}: ViewStatusStats): JSX.Element {
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
            <Link href={`/post/${statusId}${path ? `/${path}` : ''}`}>
              <a
                className='mt-0.5 mb-[3px] flex h-4 items-center gap-1 border-b border-b-transparent 
                           transition hover:border-b-primary hover:duration-200'
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
