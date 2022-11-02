import { useAuth } from '@lib/context/auth-context';

type ProfileFollowingProps = {
  userTargetId: string;
};

export function ProfileFollowing({
  userTargetId
}: ProfileFollowingProps): JSX.Element | null {
  const { user } = useAuth();

  const isOwner =
    user?.id !== userTargetId && user?.followers.includes(userTargetId);

  if (!isOwner) return null;

  return (
    <p className='rounded bg-main-search-background px-1 text-xs'>
      Follows you
    </p>
  );
}
