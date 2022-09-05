import { Button } from './button';
import { HeroIcon } from './hero-icon';

export function Error(): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center gap-2 py-5 px-3 text-secondary'>
      <i>
        <HeroIcon className='h-10 w-10' iconName='ExclamationTriangleIcon' />
      </i>
      <p>Something went wrong. Try Loading.</p>
      <Button className='flex items-center gap-2 bg-accent-blue px-3 py-2 font-bold text-white'>
        <HeroIcon className='h-5 w-5' iconName='ArrowUturnLeftIcon' />
        Retry
      </Button>
    </div>
  );
}
