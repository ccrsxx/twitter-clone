import { formatNumber } from '@lib/format';
import { getRandomInt } from '@lib/random';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { Tooltips } from '@components/ui/tooltips';

export function Options(): JSX.Element {
  const getRandomNumber = (): string => formatNumber(getRandomInt(1, 100_000));

  return (
    <div className='flex max-w-md justify-between text-secondary'>
      <Button
        className='group flex items-center gap-1 p-0 transition-none
                   hover:text-accent-blue-secondary inner:transition 
                   inner:duration-200'
      >
        <i
          className='relative rounded-full p-2 not-italic 
                     group-hover:bg-accent-blue-secondary/10 
                     group-active:bg-accent-blue-secondary/20'
        >
          <HeroIcon className='h-5 w-5' iconName='ChatBubbleOvalLeftIcon' />
          <Tooltips tips='Reply' />
        </i>
        <p className='text-sm'>{getRandomNumber()}</p>
      </Button>
      <Button
        className='group flex items-center gap-1 p-0 transition-none
                   hover:text-accent-green inner:transition 
                   inner:duration-200'
      >
        <i
          className='relative rounded-full p-2 not-italic 
                     group-hover:bg-accent-green/10 
                     group-active:bg-accent-green/20'
        >
          <HeroIcon className='h-5 w-5' iconName='ArrowPathRoundedSquareIcon' />
          <Tooltips tips='Retweet' />
        </i>
        <p className='text-sm'>{getRandomNumber()}</p>
      </Button>
      <Button
        className='group flex items-center gap-1 p-0 transition-none
                   hover:text-accent-pink inner:transition 
                   inner:duration-200'
      >
        <i
          className='relative rounded-full p-2 not-italic 
                     group-hover:bg-accent-pink/10 
                     group-active:bg-accent-pink/20'
        >
          <HeroIcon className='h-5 w-5' iconName='HeartIcon' />
          <Tooltips tips='Like' />
        </i>
        <p className='text-sm'>{getRandomNumber()}</p>
      </Button>
      <Button
        className='group flex items-center gap-1 p-0 transition-none
                   hover:text-accent-blue-secondary inner:transition 
                   inner:duration-200'
      >
        <i
          className='relative rounded-full p-2 not-italic 
                     group-hover:bg-accent-blue-secondary/10 
                     group-active:bg-accent-blue-secondary/20'
        >
          <HeroIcon className='h-5 w-5' iconName='ArrowUpTrayIcon' />
          <Tooltips tips='Share' />
        </i>
      </Button>
    </div>
  );
}
