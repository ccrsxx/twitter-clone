import TextArea from 'react-textarea-autosize';
import { AnimatePresence, motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { HeroIcon } from '@components/ui/hero-icon';
import type { ReactNode, RefObject, ChangeEvent, ClipboardEvent } from 'react';

type FormProps = {
  children: ReactNode;
  inputRef: RefObject<HTMLTextAreaElement>;
  inputValue: string;
  isFormEnabled: boolean;
  inputContainerRef: RefObject<HTMLDivElement>;
  isUploadingImages: boolean;
  handleBlur: () => void;
  handleFocus: () => void;
  handleChange: ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => void;
  handleImageUpload: (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ) => void;
};

export function Form({
  children,
  inputRef,
  inputValue,
  isFormEnabled,
  inputContainerRef,
  isUploadingImages,
  handleBlur,
  handleFocus,
  handleChange,
  handleImageUpload
}: FormProps): JSX.Element {
  return (
    <div className='flex h-full min-h-[48px] w-full flex-col justify-center gap-4'>
      <div className='flex flex-col gap-6'>
        <AnimatePresence>
          {isFormEnabled && (
            <motion.button
              className='flex items-center gap-1 self-start rounded-full border border-border-color-secondary
                         px-3 text-accent-blue-secondary disabled:cursor-not-allowed'
              disabled
              {...setTransition({ direction: 'top', distance: 25 })}
            >
              <p className='font-bold'>Everyone</p>
              <HeroIcon className='h-4 w-4' iconName='ChevronDownIcon' />
            </motion.button>
          )}
        </AnimatePresence>
        <div className='flex items-center' ref={inputContainerRef}>
          <TextArea
            className='w-full resize-none bg-transparent text-xl outline-none
                       placeholder:text-secondary'
            value={inputValue}
            placeholder="What's happening?"
            maxRows={isUploadingImages ? 5 : 15}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onPaste={handleImageUpload}
            ref={inputRef}
          />
        </div>
      </div>
      {children}
      <AnimatePresence>
        {isFormEnabled && (
          <motion.div
            className='flex border-b border-border-color'
            {...setTransition({ direction: 'right', distance: 25 })}
          >
            <button
              className='flex items-center gap-1 pb-2 text-accent-blue-secondary 
                         disabled:cursor-not-allowed'
              disabled
            >
              <HeroIcon
                className='h-4 w-4'
                iconName='GlobeAmericasIcon'
                solid
              />
              <p className='font-bold'>Everyone can reply</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
