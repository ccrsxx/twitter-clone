import { query, where } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '@lib/context/user-context';
import { useCollection } from '@lib/hooks/useCollection';
import { tweetsCollection } from '@lib/firebase/collections';
import { mergeTweets } from '@lib/merge';
import {
  HomeLayout,
  MainLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { UserLayout } from '@components/layout/user-layout';
import { UserHomeLayout } from '@components/layout/user-home-layout';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { Tweet } from '@components/tweet/tweet';
import type { ReactElement, ReactNode } from 'react';

export default function UserTweets(): JSX.Element {
  const { user: profile } = useUser();

  const { id } = profile ?? {};

  const { data: ownerTweets, loading: ownerLoading } = useCollection(
    query(
      tweetsCollection,
      where('parent', '==', null),
      where('createdBy', '==', id)
    ),
    { includeUser: true, allowNull: true }
  );

  const { data: peopleTweets, loading: peopleLoading } = useCollection(
    query(
      tweetsCollection,
      where('createdBy', '!=', id),
      where('userRetweets', 'array-contains', id)
    ),
    { includeUser: true, allowNull: true }
  );

  const mergedTweets =
    ownerTweets || peopleTweets ? mergeTweets(ownerTweets, peopleTweets) : null;

  return (
    <section>
      {ownerLoading || peopleLoading ? (
        <Loading className='mt-5' />
      ) : !mergedTweets ? (
        <Error message='This user currently has no Tweet.' />
      ) : (
        <AnimatePresence mode='popLayout'>
          {mergedTweets.map((tweet) => (
            <Tweet {...tweet} profile={profile} key={tweet.id} />
          ))}
        </AnimatePresence>
      )}
    </section>
  );
}

UserTweets.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>
        <UserLayout>
          <UserHomeLayout>{page}</UserHomeLayout>
        </UserLayout>
      </HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
