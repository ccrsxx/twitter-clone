import { useRouter } from 'next/router';
import { UserNavLink } from './user-nav-link';

export function UserNav(): JSX.Element {
  const {
    asPath,
    query: { id }
  } = useRouter();

  const formattedPath = `/user/${id as string}`;

  const userNav = [
    { name: 'Tweets', path: formattedPath },
    { name: 'Tweets & replies', path: `${formattedPath}/with_replies` },
    { name: 'Media', path: `${formattedPath}/media` },
    { name: 'Likes', path: `${formattedPath}/likes` }
  ];

  return (
    <nav className='mt-1 mb-0.5 flex justify-between'>
      {userNav.map(({ name, path }) => (
        <UserNavLink name={name} path={path} asPath={asPath} key={name} />
      ))}
    </nav>
  );
}
