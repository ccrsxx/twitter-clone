import cn from 'clsx';

type ToolTipProps = {
  tip: string;
  className?: string;
};

export function ToolTip({ tip, className }: ToolTipProps): JSX.Element {
  return (
    <div
      className={cn(
        `invisible absolute left-1/2 w-max -translate-x-1/2 rounded bg-tooltips-background px-1 py-0.5 text-xs 
         text-white opacity-0 [transition:visibility_0ms_ease_200ms,opacity_200ms_ease] group-hover:visible
         group-hover:opacity-100 group-hover:delay-500 group-focus-visible:visible group-focus-visible:opacity-100
         group-focus-visible:delay-200`,
        className ?? 'translate-y-3'
      )}
    >
      <span>{tip}</span>
    </div>
  );
}
