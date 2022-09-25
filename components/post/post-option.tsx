import cn from 'clsx';
import { preventBubbling } from '@lib/utils';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { NumberStats } from './number-stats';
import type { IconName } from '@components/ui/hero-icon';

type PostOptionProps = {
  tip: string;
  move?: number;
  stats?: number;
  iconName: IconName;
  viewPost?: boolean;
  className: string;
  iconClassName: string;
  onClick?: (...args: unknown[]) => unknown;
};

export function PostOption({
  tip,
  move,
  stats,
  viewPost,
  iconName,
  className,
  iconClassName,
  onClick
}: PostOptionProps): JSX.Element {
  return (
    <button
      className={cn(
        `group flex items-center gap-1 p-0 transition-none
         inner:transition inner:duration-200`,
        className
      )}
      onClick={preventBubbling(onClick)}
    >
      <i
        className={cn(
          `relative rounded-full p-2 not-italic
           group-focus-visible:ring-2
           group-focus-visible:ring-white`,
          iconClassName
        )}
      >
        <HeroIcon
          className={viewPost ? 'h-6 w-6' : 'h-5 w-5'}
          iconName={iconName}
        />
        <ToolTip tip={tip} />
      </i>
      {!viewPost && (
        <NumberStats move={move as number} stats={stats as number} />
      )}
    </button>
  );
}
