import { useUser } from '@lib/context/user-context';
import { useArrayDocument } from '@lib/hooks/useArrayDocument';
import { usersCollection } from '@lib/firebase/collections';
import { SEO } from '@components/common/seo';
import { UserCards } from '@components/user/user-cards';
import type { User } from '@lib/types/user';

type UserFollowProps = {
  type: 'following' | 'followers';
};

export function UserFollow({ type }: UserFollowProps): JSX.Element {
  const { user } = useUser();
  const { name, username, following, followers } = user as User;

  const { data, loading } = useArrayDocument(
    type === 'following' ? following : followers,
    usersCollection
  );

  return (
    <>
      <SEO
        title={`People ${
          type === 'following' ? 'followed by' : 'following'
        } ${name} (@${username}) / Twitter`}
      />
      <UserCards follow data={data} type={type} loading={loading} />
    </>
  );
}
