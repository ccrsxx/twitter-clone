import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'clsx';

export function UserNav(): JSX.Element {
  const { asPath } = useRouter();

  const userNav = [
    { name: 'Tweets', path: asPath },
    { name: 'Tweets & replies', path: `${asPath}/with_replies` },
    { name: 'Media', path: `${asPath}/media` },
    { name: 'Likes', path: `${asPath}/likes` }
  ];

  return (
    <nav className='mt-1 flex justify-between'>
      {userNav.map(({ name, path }) => (
        <Link href={path} key={name}>
          <a
            className='hover-animation flex flex-1 justify-center 
                       border-b border-border-color
                       hover:bg-primary/10 active:bg-primary/20 '
          >
            <div className='w-max px-8'>
              <p
                className={cn(
                  'flex flex-col gap-3 pt-3 font-bold',
                  asPath === path ? 'text-primary' : 'text-secondary'
                )}
              >
                {name}
                {asPath === path && (
                  <i className='h-1 w-full rounded-full bg-accent-blue' />
                )}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </nav>
  );
}
