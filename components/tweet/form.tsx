import TextArea from 'react-textarea-autosize';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroIcon } from '@components/ui/hero-icon';
import type { ReactNode, RefObject, ChangeEvent, ClipboardEvent } from 'react';
import type { Variants } from 'framer-motion';

type FormProps = {
  modal?: boolean;
  formId: string;
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

const variants: Variants[] = [
  {
    initial: { y: -25, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring' } },
    exit: { y: -25, opacity: 0, transition: { type: 'tween' } }
  },
  {
    initial: { x: 25, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring' } },
    exit: { x: 25, opacity: 0, transition: { type: 'tween' } }
  }
];

const [top, bottom] = variants;

export function Form({
  modal,
  formId,
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
              className='custom-button flex items-center gap-1 self-start border border-border-color-secondary
                         py-0 px-3 text-accent-blue-secondary hover:bg-accent-blue-secondary/10 
                         active:bg-accent-blue-secondary/20 disabled:brightness-100'
              {...top}
              disabled
            >
              <p className='font-bold'>Everyone</p>
              <HeroIcon className='h-4 w-4' iconName='ChevronDownIcon' />
            </motion.button>
          )}
        </AnimatePresence>
        <div className='flex items-center' ref={inputContainerRef}>
          <TextArea
            id={formId}
            className='w-full resize-none bg-transparent text-xl outline-none placeholder:text-secondary'
            value={inputValue}
            placeholder="What's happening?"
            minRows={modal && !isUploadingImages ? 3 : 1}
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
            className='flex border-b border-border-color pb-2'
            {...bottom}
          >
            <button
              className='custom-button flex items-center gap-1 py-0 px-3 text-accent-blue-secondary 
                         hover:bg-accent-blue-secondary/10 active:bg-accent-blue-secondary/20
                         disabled:brightness-100'
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
