import Link from 'next/link';
import cn from 'clsx';

type UserUsernameProps = {
  username: string;
  className?: string;
  disableLink?: boolean;
};

export function UserUsername({
  username,
  className,
  disableLink
}: UserUsernameProps): JSX.Element {
  return (
    <Link href={`/user/${username}`}>
      <span
        className={cn(
          'truncate text-light-secondary dark:text-dark-secondary',
          className,
          disableLink && 'pointer-events-none'
        )}
        tabIndex={-1}
      >
        @{username}
      </span>
    </Link>
  );
}
