import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { preventBubbling } from '@lib/utils';
import type { NavLink } from './sidebar';

type SidebarLinkProps = NavLink & {
  username?: string;
  count?: number;
};

export function SidebarLink({
  href,
  username,
  icon,
  linkName,
  disabled,
  count,
  canBeHidden
}: SidebarLinkProps): JSX.Element {
  const { asPath } = useRouter();
  const isActive = username ? asPath.includes(username) : asPath === href;

  console.log(count);

  return (
    <Link href={href}>
      <span
        className={cn(
          'group py-1 outline-none',
          canBeHidden ? 'hidden xs:flex' : 'flex',
          disabled && 'cursor-not-allowed'
        )}
        onClick={disabled ? preventBubbling() : undefined}
      >
        <div
          className={cn(
            `custom-button flex items-center justify-center gap-4 self-start p-2 text-xl transition 
             duration-200 group-hover:bg-light-primary/10 group-focus-visible:ring-2 
             group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 
             dark:group-focus-visible:ring-white xs:p-3 xl:pr-5`,
            isActive && 'font-bold'
          )}
        >
          {icon}
          <p className='hidden xl:block'>{linkName}</p>
          <AnimatePresence>
            {count && count !== 0 ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className='hidden h-4 w-4 items-center justify-center rounded-full bg-white xl:flex'
              >
                <p className='text-xs text-black'>{count}</p>
              </motion.div>
            ) : (
              <></>
            )}
          </AnimatePresence>
        </div>
      </span>
    </Link>
  );
}
