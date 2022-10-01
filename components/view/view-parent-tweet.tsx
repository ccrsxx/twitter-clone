import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { useDocument } from '@lib/hooks/useDocument';
import { statusesCollection } from '@lib/firebase/collections';
import { Status } from '@components/status/status';

type ViewParentTweetProps = {
  parentId: string;
};

// TODO: add an intersection observer so that when user is at the top
// ! of the page, sot that the the main tweet is not refocused

export function ViewParentTweet({
  parentId
}: ViewParentTweetProps): JSX.Element | null {
  const { data, loading } = useDocument(doc(statusesCollection, parentId), {
    includeUser: true,
    allowNull: true
  });

  // const tweetRef = useRef<HTMLDivElement>(null);
  // const isAtTop = useIntersection(tweetRef, {
  //   rootMargin: '-80px 0px 0px 0px'
  // });

  useEffect(() => {
    if (!loading) {
      const tweetRef = document.getElementById('tweet');
      tweetRef?.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id, loading]);

  if (loading) return null;
  if (!data)
    return (
      <div className='px-4 pt-3 pb-2'>
        <p className='rounded-2xl bg-sidebar-background py-3 px-1 pl-4 text-secondary'>
          This Tweet was deleted by the Tweet author.{' '}
          <a
            className='custom-underline text-accent-blue'
            href='https://help.twitter.com/rules-and-policies/notices-on-twitter'
            target='_blank'
            rel='noreferrer'
          >
            Learn more
          </a>
        </p>
      </div>
    );

  return <Status parentTweet {...data} />;
}
