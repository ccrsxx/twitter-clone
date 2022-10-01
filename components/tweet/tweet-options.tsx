import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { variants } from './tweet';
import { ProgressBar } from './progress-bar';
import type { ChangeEvent, ClipboardEvent } from 'react';
import type { IconName } from '@components/ui/hero-icon';

type Options = {
  name: string;
  iconName: IconName;
  disabled: boolean;
  onClick?: () => void;
}[];

const options: Options = [
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
  reply?: boolean;
  inputLimit: number;
  inputLength: number;
  isValidTweet: boolean;
  isCharLimitExceeded: boolean;
  handleImageUpload: (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ) => void;
};

export function TweetOptions({
  reply,
  inputLimit,
  inputLength,
  isValidTweet,
  isCharLimitExceeded,
  handleImageUpload
}: TweetOptionsProps): JSX.Element {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onClick = (): void => inputFileRef.current?.click();

  let filteredOptions = options;

  if (reply)
    filteredOptions = filteredOptions.filter(
      (_, index) => ![2, 4].includes(index)
    );

  return (
    <motion.div className='flex justify-between' {...variants}>
      <div className='flex text-accent-blue'>
        <input
          className='hidden'
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          ref={inputFileRef}
          multiple
        />
        {filteredOptions.map(({ name, iconName, disabled }, index) => (
          <Button
            className='group relative rounded-full p-2 hover:bg-accent-blue/10 
                       focus-visible:ring-accent-blue-focus active:bg-accent-blue/20'
            onClick={index === 0 ? onClick : undefined}
            disabled={disabled}
            key={name}
          >
            <HeroIcon className='h-5 w-5' iconName={iconName} />
            <ToolTip tip={name} />
          </Button>
        ))}
      </div>
      <div className='flex items-center gap-4'>
        <motion.div
          className='flex items-center gap-4'
          animate={
            inputLength ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
          }
        >
          <ProgressBar
            inputLimit={inputLimit}
            inputLength={inputLength}
            isCharLimitExceeded={isCharLimitExceeded}
          />
          {!reply && (
            <>
              <i className='h-8 w-[1px] bg-[#3e4144]' />
              <Button
                className='group relative rounded-full border border-border-color-secondary 
                       p-[1px] text-accent-blue'
                disabled
              >
                <HeroIcon className='h-5 w-5' iconName='PlusIcon' />
                <ToolTip tip='Add' />
              </Button>
            </>
          )}
        </motion.div>
        <Button
          type='submit'
          className='bg-accent-blue px-4 py-1.5 font-bold text-white
                     transition duration-200 enabled:hover:bg-accent-blue/90
                     enabled:active:bg-accent-blue/75 disabled:brightness-50'
          disabled={!isValidTweet}
        >
          {reply ? 'Reply' : 'Tweet'}
        </Button>
      </div>
    </motion.div>
  );
}
