import TextArea from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { HeroIcon } from '@components/ui/hero-icon';
import type {
  ReactNode,
  RefObject,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent
} from 'react';
import type { Variants } from 'framer-motion';

type TweetFormProps = {
  modal?: boolean;
  formId: string;
  children: ReactNode;
  inputRef: RefObject<HTMLTextAreaElement>;
  inputValue: string;
  isValidInput: boolean;
  isFormEnabled: boolean;
  isUploadingImages: boolean;
  sendTweet: () => Promise<void>;
  handleFocus: () => void;
  discardTweet: () => void;
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
    animate: { y: 0, opacity: 1, transition: { type: 'spring' } }
  },
  {
    initial: { x: 25, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring' } }
  }
];

const [top, bottom] = variants;

export function TweetForm({
  modal,
  formId,
  children,
  inputRef,
  inputValue,
  isValidInput,
  isFormEnabled,
  isUploadingImages,
  sendTweet,
  handleFocus,
  discardTweet,
  handleChange,
  handleImageUpload
}: TweetFormProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const handleKeyboardShortcut = ({ ctrlKey, key }: KeyboardEvent): void => {
    const isValidTweet = isValidInput || isUploadingImages;

    if (!modal && key === 'Escape')
      if (isValidTweet) {
        inputRef.current?.blur();
        openModal();
      } else discardTweet();
    else if (ctrlKey && key === 'Enter' && isValidTweet) void sendTweet();
  };

  const handleClose = (): void => {
    discardTweet();
    closeModal();
  };

  return (
    <div className='flex h-full min-h-[48px] w-full flex-col justify-center gap-4'>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xs bg-black w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          title='Discard Tweet?'
          description='This can’t be undone and you’ll lose your draft.'
          mainBtnLabel='Discard'
          action={handleClose}
          closeModal={closeModal}
        />
      </Modal>
      <div className='flex flex-col gap-6'>
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
        <div className='flex items-center'>
          <TextArea
            id={formId}
            className='w-full resize-none bg-transparent text-xl outline-none placeholder:text-secondary'
            value={inputValue}
            placeholder="What's happening?"
            minRows={modal && !isUploadingImages ? 3 : 1}
            maxRows={isUploadingImages ? 5 : 15}
            onFocus={handleFocus}
            onPaste={handleImageUpload}
            onKeyUp={handleKeyboardShortcut}
            onChange={handleChange}
            ref={inputRef}
          />
        </div>
      </div>
      {children}
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
            <HeroIcon className='h-4 w-4' iconName='GlobeAmericasIcon' solid />
            <p className='font-bold'>Everyone can reply</p>
          </button>
        </motion.div>
      )}
    </div>
  );
}
