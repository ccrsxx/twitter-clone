import { query, where } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { notificationsCollection } from '@lib/firebase/collections';
import type { NavLink } from './sidebar';

type SidebarLinkProps = NavLink & {
  username?: string;
};

export function SidebarLinkWrapper({
  Component,
  ...rest
}: SidebarLinkProps & {
  Component: React.FC<any>;
}): JSX.Element {
  const { user } = useAuth();
  const { data } = useCollection(
    query(
      notificationsCollection,
      where('targetUserId', '==', user?.id),
      where('isChecked', '==', false)
    )
  );

  return <Component {...rest} count={data?.length} />;
}
