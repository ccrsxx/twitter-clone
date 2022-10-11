import { query, where } from 'firebase/firestore';
import { useUser } from '@lib/context/user-context';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { SEO } from '@components/common/seo';
import { UserCards } from '@components/user/user-cards';

type UserFollowProps = {
  type: 'following' | 'followers';
};

export function UserFollow({ type }: UserFollowProps): JSX.Element {
  const { user } = useUser();
  const { name, username, following, followers } = user ?? {};

  const [normalizedFollowing, normalizedFollowers] = [following, followers].map(
    (arr) => (arr?.length ? arr : [null])
  );

  const { data, loading } = useCollection(
    query(
      usersCollection,
      where(
        'id',
        'in',
        type === 'following' ? normalizedFollowing : normalizedFollowers
      )
    ),
    { allowNull: true, persistData: true }
  );

  return (
    <>
      <SEO
        title={`People ${type === 'following' ? 'followed by' : 'following'} ${
          name as string
        } (@${username as string}) / Twitter`}
      />
      <UserCards data={data} type={type} loading={loading} />;
    </>
  );
}
