import Link from 'next/link';
import type { ComponentPropsWithRef, ReactNode } from 'react';

type MenuLinkProps = ComponentPropsWithRef<'a'> & {
  href: string;
};

export function MenuLink({
  href,
  className,
  children,
  ...rest
}: MenuLinkProps): JSX.Element {
  return (
    <Link href={href}>
      <a className={className} {...rest}>
        {children}
      </a>
    </Link>
  );
}
