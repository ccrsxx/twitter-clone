import cn from 'clsx';
import { ToolTip } from '@components/ui/tooltip';

type ProgressBarProps = {
  inputLimit: number;
  inputLength: number;
  isCharLimitExceeded: boolean;
};

const baseOffset = [56.5487, 87.9646] as const;

const circleStyles = [
  {
    container: null,
    viewBox: '0 0 20 20',
    stroke: 'stroke-main-accent',
    r: 9
  },
  {
    container: 'scale-150',
    viewBox: '0 0 30 30',
    stroke: 'stroke-accent-yellow',
    r: 14
  }
] as const;

export function ProgressBar({
  inputLimit,
  inputLength,
  isCharLimitExceeded
}: ProgressBarProps): JSX.Element {
  const isCloseToLimit = inputLength >= inputLimit - 20;
  const baseCircle = baseOffset[+isCloseToLimit];

  const inputPercentage = (inputLength / inputLimit) * 100;
  const circleLength = baseCircle - (baseCircle * inputPercentage) / 100;

  const remainingCharacters = inputLimit - inputLength;
  const isHittingCharLimit = remainingCharacters <= 0;

  const { container, viewBox, stroke, r } = circleStyles[+isCloseToLimit];

  return (
    <button className='group relative cursor-pointer outline-none' disabled>
      <i
        className={cn(
          'flex h-5 w-5 -rotate-90 items-center justify-center transition',
          container,
          remainingCharacters <= -10 && 'opacity-0'
        )}
      >
        <svg
          className='overflow-visible'
          width='100%'
          height='100%'
          viewBox={viewBox}
        >
          <circle
            className='stroke-light-border dark:stroke-dark-border'
            cx='50%'
            cy='50%'
            fill='none'
            strokeWidth='2'
            r={r}
          />
          <circle
            className={cn(
              'transition-colors',
              isHittingCharLimit ? 'stroke-accent-red' : stroke
            )}
            cx='50%'
            cy='50%'
            fill='none'
            strokeWidth='2'
            r={r}
            strokeLinecap='round'
            style={{
              strokeDashoffset: !isCharLimitExceeded ? circleLength : 0,
              strokeDasharray: baseCircle
            }}
          />
        </svg>
      </i>
      <span
        className={cn(
          `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%]
           scale-50 text-xs opacity-0`,
          {
            'scale-100 opacity-100 transition': isCloseToLimit,
            'text-accent-red': isHittingCharLimit
          }
        )}
      >
        {remainingCharacters}
      </span>
      <ToolTip
        tip={
          isCharLimitExceeded
            ? 'You have exceeded the character limit'
            : `${remainingCharacters} characters remaining`
        }
      />
    </button>
  );
}
