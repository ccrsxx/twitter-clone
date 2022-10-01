import TextArea from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
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
  loading: boolean;
  visited: boolean;
  reply?: boolean;
  children: ReactNode;
  inputRef: RefObject<HTMLTextAreaElement>;
  inputValue: string;
  replyModal?: boolean;
  isValidTweet: boolean;
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

export const [top, bottom] = variants;

export function TweetForm({
  modal,
  reply,
  formId,
  loading,
  visited,
  children,
  inputRef,
  replyModal,
  inputValue,
  isValidTweet,
  isUploadingImages,
  sendTweet,
  handleFocus,
  discardTweet,
  handleChange,
  handleImageUpload
}: TweetFormProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const handleKeyboardShortcut = ({ ctrlKey, key }: KeyboardEvent): void => {
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

  const isVisibilityShown = visited && !reply && !replyModal && !loading;

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
        {isVisibilityShown && (
          <motion.button
            className='custom-button flex items-center gap-1 self-start border border-border-color-secondary
                       py-0 px-3 text-accent-blue hover:bg-accent-blue/10 
                       active:bg-accent-blue/20 disabled:brightness-100'
            {...top}
            disabled
          >
            <p className='font-bold'>Everyone</p>
            <HeroIcon className='h-4 w-4' iconName='ChevronDownIcon' />
          </motion.button>
        )}
        <div className='flex items-center gap-3'>
          <TextArea
            id={formId}
            className='w-full resize-none bg-transparent text-xl outline-none placeholder:text-secondary'
            value={inputValue}
            placeholder={
              reply || replyModal ? 'Tweet your reply' : "What's happening?"
            }
            minRows={loading ? 1 : modal && !isUploadingImages ? 3 : 1}
            maxRows={isUploadingImages ? 5 : 15}
            onFocus={handleFocus}
            onPaste={handleImageUpload}
            onKeyUp={handleKeyboardShortcut}
            onChange={handleChange}
            ref={inputRef}
          />
          {reply && !visited && (
            <Button
              className='bg-accent-blue px-4 py-1.5 font-bold text-white
                         brightness-50 transition duration-200'
              onClick={handleFocus}
            >
              Reply
            </Button>
          )}
        </div>
      </div>
      {children}
      {isVisibilityShown && (
        <motion.div
          className='flex border-b border-border-color pb-2'
          {...bottom}
        >
          <button
            className='custom-button flex items-center gap-1 py-0 px-3 text-accent-blue 
                       hover:bg-accent-blue/10 active:bg-accent-blue/20
                       disabled:brightness-100'
            disabled
          >
            <HeroIcon className='h-4 w-4' iconName='GlobeAmericasIcon' />
            <p className='font-bold'>Everyone can reply</p>
          </button>
        </motion.div>
      )}
    </div>
  );
}
