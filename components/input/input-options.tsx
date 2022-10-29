import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { variants } from './input';
import { ProgressBar } from './progress-bar';
import type { ChangeEvent, ClipboardEvent } from 'react';
import type { IconName } from '@components/ui/hero-icon';

type Options = {
  name: string;
  iconName: IconName;
  disabled: boolean;
  onClick?: () => void;
}[];

const options: Readonly<Options> = [
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

type InputOptionsProps = {
  reply?: boolean;
  inputLimit: number;
  inputLength: number;
  isValidTweet: boolean;
  isCharLimitExceeded: boolean;
  handleImageUpload: (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ) => void;
};

export function InputOptions({
  reply,
  inputLimit,
  inputLength,
  isValidTweet,
  isCharLimitExceeded,
  handleImageUpload
}: InputOptionsProps): JSX.Element {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onClick = (): void => inputFileRef.current?.click();

  let filteredOptions = options;

  if (reply)
    filteredOptions = filteredOptions.filter(
      (_, index) => ![2, 4].includes(index)
    );

  return (
    <motion.div className='flex justify-between' {...variants}>
      <div className='flex text-main-accent'>
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
            className='focus-visible:ring-main-accent-focus group relative rounded-full p-2 
                       hover:bg-main-accent/10 active:bg-main-accent/20'
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
              <i className='h-8 w-[1px] bg-[#B9CAD3] dark:bg-[#3E4144]' />
              <Button
                className='group relative rounded-full border border-light-line-reply
                           p-[1px] text-main-accent dark:border-light-secondary'
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
          className='bg-main-accent px-4 py-1.5 font-bold text-white
                     enabled:hover:bg-main-accent/90
                     enabled:active:bg-main-accent/75'
          disabled={!isValidTweet}
        >
          {reply ? 'Reply' : 'Tweet'}
        </Button>
      </div>
    </motion.div>
  );
}
