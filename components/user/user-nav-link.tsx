import Link from 'next/link';
import cn from 'clsx';

type UserNavLinkProps = {
  name: string;
  path: string;
  asPath: string;
};

export function UserNavLink({
  name,
  path,
  asPath
}: UserNavLinkProps): JSX.Element {
  return (
    <Link href={path} scroll={false}>
      <a
        className='hover-animation smooth-tab flex flex-1 
                       justify-center border-b border-border-color
                       hover:bg-primary/10'
      >
        <div className='w-max px-8'>
          <p
            className={cn(
              'flex flex-col gap-3 pt-3 font-bold transition-colors duration-200',
              asPath === path
                ? 'text-primary [&>i]:scale-100 [&>i]:opacity-100'
                : 'text-secondary'
            )}
          >
            {name}
            <i
              className='h-1 scale-50 rounded-full bg-accent-blue
                             opacity-0 transition duration-200'
            />
          </p>
        </div>
      </a>
    </Link>
  );
}
