import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  doc,
  limit,
  query,
  where,
  orderBy,
  documentId
} from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { usersCollection } from '@lib/firebase/collections';
import { UserCard } from '@components/user/user-card';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { variants } from './aside-trends';

export function Suggestions(): JSX.Element {
  const { randomSeed } = useAuth();

  const { data: adminData, loading: adminLoading } = useDocument(
    doc(usersCollection, 'Twt0A27bx9YcG4vu3RTsR7ifJzf2'),
    { allowNull: true }
  );

  const { data: suggestionsData, loading: suggestionsLoading } = useCollection(
    query(
      usersCollection,
      where(documentId(), '>=', randomSeed),
      orderBy(documentId()),
      limit(2)
    ),
    { allowNull: true }
  );

  return (
    <section className='hover-animation rounded-md shadow-md bg-white border border-gray-200 dark:bg-zinc-900 dark:border-main-background'>
      {adminLoading || suggestionsLoading ? (
        <Loading className='flex h-52 items-center justify-center p-4' />
      ) : suggestionsData ? (
        <motion.div className='inner:px-4' {...variants}>
          <h2 className='text-xl font-bold py-3'>Quem seguir</h2>
          {adminData && <UserCard {...adminData} />}
          {suggestionsData?.map((userData) => (
            <UserCard {...userData} key={userData.id} />
          ))}
          <Link href='/people' className='custom-button accent-tab hover-card block w-full rounded-t-none py-5 text-center text-main-accent'>
            Mostrar mais
          </Link>
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
