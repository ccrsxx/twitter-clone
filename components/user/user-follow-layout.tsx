import { useRouter } from 'next/router';
import { query, where, limit } from 'firebase/firestore';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { UserContextProvider } from '@lib/context/user-context';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { Loading } from '@components/ui/loading';
import { UserHeader } from './user-header';
import { UserNavLink } from './user-nav-link';
import type { ReactNode } from 'react';

type UserFollowLayoutProps = {
  children: ReactNode;
};

export function UserFollowLayout({
  children
}: UserFollowLayoutProps): JSX.Element {
  const {
    asPath,
    query: { id },
    back
  } = useRouter();

  const { data, loading } = useCollection(
    query(usersCollection, where('username', '==', id), limit(1)),
    { allowNull: true }
  );

  const userData = data ? data[0] : null;

  const userPath = `/user/${id as string}`;

  const followNav = [
    { name: 'Following', path: `${userPath}/following` },
    { name: 'Followers', path: `${userPath}/followers` }
  ];

  return (
    <MainContainer>
      <MainHeader useActionButton action={back}>
        <UserHeader
          follow
          userId={id as string}
          loading={loading}
          userData={userData}
        />
      </MainHeader>
      <nav className='flex justify-between'>
        {loading ? (
          <Loading className='mt-5 w-full' />
        ) : !userData ? (
          <div className='w-full p-8 text-center'>
            <p className='text-3xl font-bold'>This account doesn’t exist</p>
            <p className='text-secondary'>Try searching for another.</p>
          </div>
        ) : (
          followNav.map(({ name, path }) => (
            <UserNavLink name={name} path={path} asPath={asPath} key={name} />
          ))
        )}
      </nav>
      {userData && (
        <UserContextProvider
          value={{
            following: userData.following,
            followers: userData.followers
          }}
        >
          {children}
        </UserContextProvider>
      )}
    </MainContainer>
  );
}
