import { motion } from 'framer-motion';
import cn from 'clsx';
import { variants } from '@components/user/user-header';
import { UserNavLink } from './user-nav-link';

type UserNavProps = {
  follow?: boolean;
};

const allNavs = [
  [
    { name: 'Tweets', path: '' },
    { name: 'Tweets & replies', path: 'with_replies' },
    { name: 'Media', path: 'media' },
    { name: 'Likes', path: 'likes' }
  ],
  [
    { name: 'Following', path: 'following' },
    { name: 'Followers', path: 'followers' }
  ]
];

export function UserNav({ follow }: UserNavProps): JSX.Element {
  const userNav = allNavs[+!!follow];

  return (
    <motion.nav
      className={cn('flex justify-between', follow && 'mt-1 mb-0.5')}
      {...variants}
      exit={undefined}
    >
      {userNav.map(({ name, path }) => (
        <UserNavLink name={name} path={path} key={name} />
      ))}
    </motion.nav>
  );
}
