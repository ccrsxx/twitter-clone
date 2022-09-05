import { motion } from 'framer-motion';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { Tooltips } from '@components/ui/tooltips';
import { TweetProgress } from './tweet-progress';
import type { IconName } from '@components/ui/hero-icon';

type TweetOptions = {
  name: string;
  iconName: IconName;
  disabled: boolean;
}[];

const tweetOptions: TweetOptions = [
  {
    name: 'Media',
    iconName: 'PhotoIcon',
    disabled: false
  },
  {
    name: 'GIF',
    iconName: 'GifIcon',
    disabled: true
  },
  {
    name: 'Poll',
    iconName: 'ChartBarIcon',
    disabled: true
  },
  {
    name: 'Emoji',
    iconName: 'FaceSmileIcon',
    disabled: true
  },
  {
    name: 'Schedule',
    iconName: 'CalendarDaysIcon',
    disabled: true
  },
  {
    name: 'Location',
    iconName: 'MapPinIcon',
    disabled: true
  }
];

type TweetOptionsProps = {
  inputValue: string;
  isValidInput: boolean;
};

export function TweetOptions({
  inputValue,
  isValidInput
}: TweetOptionsProps): JSX.Element {
  const isCharLimitExceeded = inputValue.length > 280;

  return (
    <div className='flex justify-between'>
      <div className='text-accent-blue-secondary'>
        {tweetOptions.map(({ name, iconName, disabled }) => (
          <Button
            className='group relative rounded-full p-2 hover:bg-accent-blue-secondary/10'
            disabled={disabled}
            key={name}
          >
            <HeroIcon className='h-5 w-5' iconName={iconName} />
            <Tooltips tips={name} />
          </Button>
        ))}
      </div>
      <div className='flex items-center gap-4'>
        <motion.div
          className='flex items-center gap-4'
          animate={
            inputValue ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
          }
        >
          <TweetProgress
            inputValue={inputValue}
            isCharLimitExceeded={isCharLimitExceeded}
          />
          <i className='h-8 border-l border-l-border-color' />
          <Button
            className='group relative rounded-full border border-border-color-secondary 
                       p-[1px] text-accent-blue-secondary'
            disabled
          >
            <HeroIcon className='h-5 w-5' iconName='PlusIcon' />
            <Tooltips tips='Add' />
          </Button>
        </motion.div>
        <Button
          className='bg-accent-blue-secondary px-4 py-1.5 font-bold text-white
                     transition duration-200 disabled:brightness-50'
          disabled={!isValidInput || isCharLimitExceeded}
        >
          Tweet
        </Button>
      </div>
    </div>
  );
}
