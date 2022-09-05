import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NextImage } from '@components/ui/next-image';
import { TweetForm } from './tweet-form';
import { TweetOptions } from './tweet-options';
import type { ChangeEvent } from 'react';

export function Tweet(): JSX.Element {
  const [tweetHeight, setTweetHeight] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inputContainer.current) return;
    setTweetHeight(inputContainer.current.offsetHeight + 168);
  }, [inputValue]);

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>): void => setInputValue(value);

  const handleFocus = (): void => setIsFocus(true);
  const handleBlur = (): void => setIsFocus(false);

  const isFormEnabled = !!(isFocus || inputValue);
  const isValidInput = !!inputValue.trim().length;

  return (
    <form>
      <motion.label
        className='flex gap-4 border-b border-border-color px-4 py-3'
        style={!isFormEnabled ? { height: 125 } : undefined}
        animate={{ height: isFormEnabled ? tweetHeight : 125 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <NextImage
          className='shrink-0'
          imgClassName='rounded-full'
          width={48}
          height={48}
          src='/placeholder/yagakimi.jpg'
          alt='ccrsxx'
          useSkeleton
        />
        <div className='flex w-full flex-col gap-4'>
          <TweetForm
            inputRef={inputRef}
            inputValue={inputValue}
            isFormEnabled={isFormEnabled}
            inputContainer={inputContainer}
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleChange={handleChange}
          />
          <TweetOptions inputValue={inputValue} isValidInput={isValidInput} />
        </div>
      </motion.label>
    </form>
  );
}
