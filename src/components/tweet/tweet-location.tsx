import Link from 'next/link';
import cn from 'clsx';
import { ToolTip } from '@components/ui/tooltip';
import type { Tweet } from '@lib/types/tweet';

type TweetDateProps = Pick<Tweet, 'location'> & {
  tweetLink: string;
  viewTweet?: boolean;
};

export function TweetLocation({
  location,
  tweetLink,
  viewTweet
}: TweetDateProps): JSX.Element {
  return (
    <div className={cn('flex gap-1', viewTweet && 'py-4')}>
      {!viewTweet && <i>·</i>}
      <div className='group relative'>
        <div className='flex items-center gap-1'>
          <div
            className={cn(
              viewTweet && 'text-light-secondary dark:text-dark-secondary'
            )}
          >
            from
          </div>
          <Link href={tweetLink}>
            <a
              className={cn(
                'custom-underline peer whitespace-pre-line',
                viewTweet && 'text-light-secondary dark:text-dark-secondary'
              )}
            >
              {location.length > 20 ? `${location.slice(0, 20)}...` : location}
            </a>
          </Link>
        </div>

        <ToolTip
          className='translate-y-1 whitespace-pre-line peer-focus:opacity-100
                     peer-focus-visible:visible peer-focus-visible:delay-200'
          tip={location}
        />
      </div>
    </div>
  );
}
