type TooltipsProps = {
  tips: string;
};

export function Tooltips({ tips }: TooltipsProps): JSX.Element {
  return (
    <div
      className='delay-0 absolute left-1/2 w-max -translate-x-1/2 translate-y-2.5 rounded
                 bg-tooltips-background px-1 py-0.5 text-xs text-white opacity-0 transition-opacity
                 duration-200 group-hover:opacity-100 group-hover:delay-500'
    >
      <span>{tips}</span>
    </div>
  );
}
