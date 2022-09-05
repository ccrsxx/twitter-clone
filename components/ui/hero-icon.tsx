/* eslint-disable import/namespace */

import cn from 'clsx';
import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';

export type IconName =
  | keyof typeof SolidIcons
  | keyof typeof OutlineIcons
  | 'TwitterIcon'
  | 'SpinnerIcon';

type HeroIconProps = {
  iconName: IconName;
  className?: string;
  solid?: boolean;
};

export function HeroIcon({
  iconName,
  className,
  solid
}: HeroIconProps): JSX.Element {
  const Icon =
    iconName === 'TwitterIcon'
      ? Twitter
      : iconName === 'SpinnerIcon'
      ? Spinner
      : solid
      ? SolidIcons[iconName]
      : OutlineIcons[iconName];

  return <Icon className={className ?? 'h-6 w-6'} />;
}

type CustomIconProps = {
  className?: string;
};

function Twitter({ className }: CustomIconProps): JSX.Element {
  return (
    <svg
      className={cn('fill-current', className)}
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <g>
        <path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'></path>
      </g>
    </svg>
  );
}

function Spinner({ className }: CustomIconProps): JSX.Element {
  return (
    <svg
      className={cn('-ml-1 mr-3 animate-spin', className)}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
}
