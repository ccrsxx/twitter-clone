import Link from 'next/link';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';

type MenuLink = {
  href: string;
  className?: string;
  children: ReactNode;
};

// eslint-disable-next-line react/display-name
export const MenuLink = forwardRef<HTMLAnchorElement, MenuLink>(
  ({ href, className, children, ...rest }, ref) => {
    return (
      <Link href={href}>
        <a className={className} ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
);
