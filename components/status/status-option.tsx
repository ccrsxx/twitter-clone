import cn from 'clsx';
import { preventBubbling } from '@lib/utils';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { NumberStats } from './number-stats';
import type { IconName } from '@components/ui/hero-icon';

type StatusOption = {
  tip: string;
  move?: number;
  stats?: number;
  iconName: IconName;
  className: string;
  viewStatus?: boolean;
  iconClassName: string;
  onClick?: (...args: unknown[]) => unknown;
};

export function StatusOption({
  tip,
  move,
  stats,
  iconName,
  className,
  viewStatus,
  iconClassName,
  onClick
}: StatusOption): JSX.Element {
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
          className={viewStatus ? 'h-6 w-6' : 'h-5 w-5'}
          iconName={iconName}
        />
        <ToolTip tip={tip} />
      </i>
      {!viewStatus && (
        <NumberStats move={move as number} stats={stats as number} />
      )}
    </button>
  );
}
