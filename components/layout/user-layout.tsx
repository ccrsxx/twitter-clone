import { useRouter } from 'next/router';
import { query, where, limit } from 'firebase/firestore';
import { UserContextProvider } from '@lib/context/user-context';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { UserHeader } from '@components/user/user-header';
import type { LayoutProps } from './common-layout';

export function UserLayout({ children }: LayoutProps): JSX.Element {
  const {
    asPath,
    query: { id },
    back
  } = useRouter();

  const { data, loading } = useCollection(
    query(usersCollection, where('username', '==', id), limit(1)),
    { allowNull: true }
  );

  const user = data ? data[0] : null;

  const isInFollowPage = asPath.includes('/follow');

  return (
    <UserContextProvider value={{ user, loading }}>
      {!user && !loading && <SEO title='User not found / Twitter' />}
      <MainContainer>
        <MainHeader useActionButton action={back}>
          <UserHeader
            user={user}
            follow={isInFollowPage}
            userId={id as string}
            loading={loading}
          />
        </MainHeader>
        {children}
      </MainContainer>
    </UserContextProvider>
  );
}
