import { VerifiedName } from '@components/ui/verified-name';
import type { User } from '@lib/types/user';

type UserHeaderProps = {
  userData: User | null;
  loading: boolean;
};

export function UserHeader({
  loading,
  userData
}: UserHeaderProps): JSX.Element {
  return (
    <>
      {loading ? (
        <div className='-mb-1 inner:animate-pulse inner:rounded-lg inner:bg-white'>
          <div className='mb-1 -mt-1 h-5 w-24' />
          <div className='h-4 w-12' />
        </div>
      ) : !userData ? (
        <h2 className='text-xl font-bold'>Profile</h2>
      ) : (
        <div className='-mb-1'>
          <VerifiedName
            className='-mt-1'
            iconClassName='w-6 h-6'
            verified={userData.verified}
          >
            <h2 className='text-xl font-bold'>{userData.name}</h2>
          </VerifiedName>
          <p className='text-xs text-secondary'>
            {userData.totalTweets
              ? `${userData.totalTweets} ${`Tweet${
                  userData.totalTweets > 1 ? 's' : ''
                }`}`
              : 'No Tweet'}
          </p>
        </div>
      )}
    </>
  );
}
