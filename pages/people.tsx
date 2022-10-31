import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { query, where } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { usersCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import {
  MainLayout,
  PeopleLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { UserCard } from '@components/user/user-card';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { variants } from '@components/aside/aside-trends';
import type { ReactElement, ReactNode } from 'react';

export default function People(): JSX.Element {
  const { user } = useAuth();

  const { data, loading } = useCollection(
    query(usersCollection, where('id', '!=', user?.id)),
    {
      allowNull: true
    }
  );

  const { back } = useRouter();

  return (
    <MainContainer>
      <SEO title='People / Twitter' />
      <MainHeader useActionButton title='People' action={back} />
      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : !data ? (
          <Error message='Something went wrong' />
        ) : (
          <motion.div {...variants}>
            {data?.map((userData) => (
              <UserCard {...userData} key={userData.id} follow />
            ))}
          </motion.div>
        )}
      </section>
    </MainContainer>
  );
}

People.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <PeopleLayout>{page}</PeopleLayout>
    </MainLayout>
  </ProtectedLayout>
);
