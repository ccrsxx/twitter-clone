import { motion } from 'framer-motion';
import { useUser } from '@lib/context/user-context';
import { Loading } from '@components/ui/loading';
import { UserNav } from '@components/user/user-nav';
import { variants } from '@components/user/user-header';
import type { LayoutProps } from './common-layout';

export function UserFollowLayout({ children }: LayoutProps): JSX.Element {
  const { user: userData, loading } = useUser();

  return (
    <>
      <motion.section {...variants}>
        {loading ? (
          <Loading className='mt-5 w-full' />
        ) : !userData ? (
          <div className='w-full p-8 text-center'>
            <p className='text-3xl font-bold'>This account doesn’t exist</p>
            <p className='text-secondary'>Try searching for another.</p>
          </div>
        ) : null}
      </motion.section>
      {userData && (
        <>
          <UserNav follow />
          {children}
        </>
      )}
    </>
  );
}
