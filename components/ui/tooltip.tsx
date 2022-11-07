import cn from 'clsx';

type ToolTipProps = {
  tip: string;
  className?: string;
  groupInner?: boolean;
};

export function ToolTip({
  tip,
  className,
  groupInner
}: ToolTipProps): JSX.Element {
  return (
    <div
      className={cn(
        `invisible absolute left-1/2 hidden w-max -translate-x-1/2 rounded bg-[#666666] px-1 py-0.5 text-xs 
         text-white opacity-0 [transition:visibility_0ms_ease_200ms,opacity_200ms_ease] dark:bg-[#495A69] xs:block`,
        groupInner
          ? `group-inner-hover:visible group-inner-hover:opacity-100 group-inner-hover:delay-500 
             group-inner-focus-visible:visible group-inner-focus-visible:opacity-100 group-inner-focus-visible:delay-200`
          : `group-hover:visible group-hover:opacity-100 group-hover:delay-500 group-focus-visible:visible 
             group-focus-visible:opacity-100`,
        className ?? 'translate-y-3'
      )}
    >
      <span>{tip}</span>
    </div>
  );
}
