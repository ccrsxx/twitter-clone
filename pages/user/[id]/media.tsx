import { AnimatePresence } from 'framer-motion';
import { query, where } from 'firebase/firestore';
import { useCollection } from '@lib/hooks/useCollection';
import { tweetsCollection } from '@lib/firebase/collections';
import { useUser } from '@lib/context/user-context';
import { mergeTweets } from '@lib/merge';
import {
  MainLayout,
  ProfileLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { SEO } from '@components/common/seo';
import { UserLayout } from '@components/layout/user-layout';
import { UserHomeLayout } from '@components/layout/user-home-layout';
import { Tweet } from '@components/tweet/tweet';
import { Loading } from '@components/ui/loading';
import { StatsEmpty } from '@components/tweet/stats-empty';
import type { ReactElement, ReactNode } from 'react';

export default function UserMedia(): JSX.Element {
  const { user } = useUser();

  const { id, name, username } = user ?? {};

  const { data, loading } = useCollection(
    query(
      tweetsCollection,
      where('createdBy', '==', id),
      where('images', '!=', null)
    ),
    { includeUser: true, allowNull: true }
  );

  const sortedTweets = mergeTweets(data);

  return (
    <section>
      <SEO
        title={`Media Tweets by ${name as string} (@${
          username as string
        }) / Twitter`}
      />
      {loading ? (
        <Loading className='mt-5' />
      ) : !sortedTweets ? (
        <StatsEmpty
          title={`@${username as string} hasn't Tweeted Media`}
          description='Once they do, those Tweets will show up here.'
          imageData={{ src: '/assets/no-media.png', alt: 'No media' }}
        />
      ) : (
        <AnimatePresence mode='popLayout'>
          {sortedTweets.map((tweet) => (
            <Tweet {...tweet} key={tweet.id} />
          ))}
        </AnimatePresence>
      )}
    </section>
  );
}

UserMedia.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <ProfileLayout>
        <UserLayout>
          <UserHomeLayout>{page}</UserHomeLayout>
        </UserLayout>
      </ProfileLayout>
    </MainLayout>
  </ProtectedLayout>
);
