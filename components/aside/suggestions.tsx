import Link from 'next/link';
import { motion } from 'framer-motion';
import { limit, orderBy, query, where, documentId } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { mergeData } from '@lib/merge';
import { UserCard } from '@components/user/user-card';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { variants } from './aside-trends';

export function Suggestions(): JSX.Element {
  const { user, randomSeed } = useAuth();

  const { data, loading } = useCollection(
    query(
      usersCollection,
      where(documentId(), '>=', randomSeed),
      orderBy(documentId()),
      limit(4)
    ),
    { allowNull: true }
  );

  const filteredUser = data?.filter(({ id }) => id !== user?.id) ?? null;

  const isSuggestionFull = filteredUser ? filteredUser.length === 3 : loading;

  const { data: adminData } = useCollection(
    query(usersCollection, where('username', '==', 'ccrsxx'), limit(1)),
    { allowNull: true, disabled: isSuggestionFull }
  );

  const mergedUser = mergeData(false, adminData, filteredUser);

  return (
    <section className='hover-animation rounded-2xl bg-main-sidebar-background'>
      {loading ? (
        <Loading className='flex h-52 items-center justify-center p-4' />
      ) : mergedUser ? (
        <motion.div className='inner:px-4 inner:py-3' {...variants}>
          <h2 className='text-xl font-bold'>Who to follow</h2>
          {mergedUser?.map((userData) => (
            <UserCard {...userData} key={userData.id} />
          ))}
          <Link href='/people'>
            <a
              className='custom-button smooth-tab hover-card block w-full rounded-2xl
                         rounded-t-none text-center text-main-accent'
            >
              Show more
            </a>
          </Link>
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
