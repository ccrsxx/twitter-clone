import { TextStats } from './text-stats';

type ViewPostStats = {
  likeMove: number;
  tweetMove: number;
  replyMove: number;
  currentLikes: number;
  currentTweets: number;
  currentReplies: number;
};

export function ViewPostStats({
  likeMove,
  tweetMove,
  replyMove,
  currentLikes,
  currentTweets,
  currentReplies
}: ViewPostStats): JSX.Element {
  const stats: [string, number, number][] = [
    ['Reply', replyMove, currentReplies],
    ['Retweet', tweetMove, currentTweets],
    ['Like', likeMove, currentLikes]
  ];

  return (
    <div
      className='flex gap-4 px-1 text-secondary
                 inner:flex inner:items-center inner:gap-1
                 [&>div>div]:font-bold [&>div>div]:text-white'
    >
      {stats.map(
        ([title, move, stats]) =>
          !!stats && (
            <div key={title}>
              <TextStats move={move} stats={stats} />
              <p>{`${title}${stats > 1 ? 's' : ''}`}</p>
            </div>
          )
      )}
    </div>
  );
}
