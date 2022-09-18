import cn from 'clsx';

type TooltipsProps = {
  className?: string;
  tips: string;
};

export function Tooltips({ tips, className }: TooltipsProps): JSX.Element {
  return (
    <div
      className={cn(
        'delay-0 absolute left-1/2 -z-10 w-max -translate-x-1/2 rounded bg-tooltips-background',
        'px-1 py-0.5 text-xs text-white opacity-0 transition-opacity duration-200',
        'group-hover:z-10 group-hover:opacity-100 group-hover:delay-500',
        className ?? 'translate-y-2.5'
      )}
    >
      <span>{tips}</span>
    </div>
  );
}
