import Link from 'next/link';
import { useState, useEffect, useRef, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { tweetsCollection } from '@lib/firebase/collections';
import {
  manageReply,
  uploadImages,
  manageTotalTweets,
  manageTotalPhotos
} from '@lib/firebase/utils';
import { useAuth } from '@lib/context/auth-context';
import { sleep } from '@lib/utils';
import { getImagesData } from '@lib/validation';
import { UserAvatar } from '@components/user/user-avatar';
import { InputForm, fromTop } from './input-form';
import { ImagePreview } from './image-preview';
import { InputOptions } from './input-options';
import { Modal } from '@components/modal/modal';
import { useModal } from '@lib/hooks/useModal';
import { LocationModal } from '@components/modal/location-modal';
import { LocationCombobox } from '@components/input/location-combobox';
import type { ReactNode, FormEvent, ChangeEvent, ClipboardEvent } from 'react';
import type { WithFieldValue } from 'firebase/firestore';
import type { Variants } from 'framer-motion';
import type { User } from '@lib/types/user';
import type { Tweet } from '@lib/types/tweet';
import type { FilesWithId, ImagesPreview, ImageData } from '@lib/types/file';

type InputProps = {
  modal?: boolean;
  reply?: boolean;
  parent?: { id: string; username: string };
  disabled?: boolean;
  children?: ReactNode;
  replyModal?: boolean;
  closeModal?: () => void;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export function Input({
  modal,
  reply,
  parent,
  disabled,
  children,
  replyModal,
  closeModal
}: InputProps): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<FilesWithId>([]);
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [visited, setVisited] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [locationInputValue, setLocationInputValue] = useState('');

  const { user, isAdmin } = useAuth();
  const { name, username, photoURL } = user as User;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const previewCount = imagesPreview.length;
  const isUploadingImages = !!previewCount;

  const {
    open,
    openModal: openLocationModal,
    closeModal: closeLocationModal
  } = useModal();

  useEffect(
    () => {
      if (modal) inputRef.current?.focus();
      return cleanImage;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sendTweet = async (): Promise<void> => {
    inputRef.current?.blur();

    setLoading(true);

    const isReplying = reply ?? replyModal;

    const userId = user?.id as string;

    const tweetData: WithFieldValue<Omit<Tweet, 'id'>> = {
      text: inputValue.trim() || null,
      parent: isReplying && parent ? parent : null,
      images: await uploadImages(userId, selectedImages),
      userLikes: [],
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: null,
      userReplies: 0,
      userRetweets: [],
      location: location
    };

    await sleep(500);

    const [tweetRef] = await Promise.all([
      addDoc(tweetsCollection, tweetData),
      manageTotalTweets('increment', userId),
      tweetData.images && manageTotalPhotos('increment', userId),
      isReplying && manageReply('increment', parent?.id as string)
    ]);

    const { id: tweetId } = await getDoc(tweetRef);

    if (!modal && !replyModal) {
      discardTweet();
      setLoading(false);
    }

    if (closeModal) closeModal();

    toast.success(
      () => (
        <span className='flex gap-2'>
          Your Tweet was sent
          <Link href={`/tweet/${tweetId}`}>
            <a className='custom-underline font-bold'>View</a>
          </Link>
        </span>
      ),
      { duration: 6000 }
    );
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ): void => {
    const isClipboardEvent = 'clipboardData' in e;

    if (isClipboardEvent) {
      const isPastingText = e.clipboardData.getData('text');
      if (isPastingText) return;
    }

    const files = isClipboardEvent ? e.clipboardData.files : e.target.files;

    const imagesData = getImagesData(files, {
      currentFiles: previewCount,
      allowUploadingVideos: true
    });

    if (!imagesData) {
      toast.error('Please choose a GIF or photo up to 4');
      return;
    }

    const { imagesPreviewData, selectedImagesData } = imagesData;

    setImagesPreview([...imagesPreview, ...imagesPreviewData]);
    setSelectedImages([...selectedImages, ...selectedImagesData]);

    inputRef.current?.focus();
  };

  const removeImage = (targetId: string) => (): void => {
    setSelectedImages(selectedImages.filter(({ id }) => id !== targetId));
    setImagesPreview(imagesPreview.filter(({ id }) => id !== targetId));

    const { src } = imagesPreview.find(
      ({ id }) => id === targetId
    ) as ImageData;

    URL.revokeObjectURL(src);
  };

  const cleanImage = (): void => {
    imagesPreview.forEach(({ src }) => URL.revokeObjectURL(src));

    setSelectedImages([]);
    setImagesPreview([]);
  };

  const discardTweet = (): void => {
    setInputValue('');
    setVisited(false);
    cleanImage();

    inputRef.current?.blur();
  };

  const toggleShowLocation = () => {
    if (!showLocation) {
      setShowLocation(true);
    }
    openLocationModal();
  };

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>): void => setInputValue(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void sendTweet();
  };

  const handleFocus = (): void => setVisited(!loading);

  const onSetLocation = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLocation(locationInputValue);
    closeLocationModal();
    setLocationInputValue('');
  };

  const cancelSetLocation = (): void => {
    setLocationInputValue('');
    if (showLocation && location === '') {
      setShowLocation(false);
    }
    closeLocationModal();
  };

  const removeSetLocation = (): void => {
    setLocationInputValue('');
    setLocation('');
    setShowLocation(false);
    closeLocationModal();
  };

  const handleLocationChange = (location: string): void =>
    setLocationInputValue(location);

  const formId = useId();

  const inputLimit = isAdmin ? 560 : 280;

  const inputLength = inputValue.length;
  const isValidInput = !!inputValue.trim().length;
  const isCharLimitExceeded = inputLength > inputLimit;

  const isValidTweet =
    !isCharLimitExceeded && (isValidInput || isUploadingImages);

  return (
    <>
      <form
        className={cn('flex flex-col', {
          '-mx-4': reply,
          'gap-2': replyModal,
          'cursor-not-allowed': disabled
        })}
        onSubmit={handleSubmit}
      >
        {loading && (
          <motion.i
            className='h-1 animate-pulse bg-main-accent'
            {...variants}
          />
        )}
        {children}
        {reply && visited && (
          <motion.p
            className='ml-[75px] -mb-2 mt-2 text-light-secondary dark:text-dark-secondary'
            {...fromTop}
          >
            Replying to{' '}
            <Link href={`/user/${parent?.username as string}`}>
              <a className='custom-underline text-main-accent'>
                {parent?.username as string}
              </a>
            </Link>
          </motion.p>
        )}
        <label
          className={cn(
            'hover-animation grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3',
            reply
              ? 'pt-3 pb-1'
              : replyModal
              ? 'pt-0'
              : 'border-b-2 border-light-border dark:border-dark-border',
            (disabled || loading) && 'pointer-events-none opacity-50'
          )}
          htmlFor={formId}
        >
          <UserAvatar src={photoURL} alt={name} username={username} />
          <div className='flex w-full flex-col gap-4'>
            <InputForm
              modal={modal}
              reply={reply}
              formId={formId}
              visited={visited}
              loading={loading}
              inputRef={inputRef}
              replyModal={replyModal}
              inputValue={inputValue}
              isValidTweet={isValidTweet}
              isUploadingImages={isUploadingImages}
              location={location}
              showLocation={showLocation}
              sendTweet={sendTweet}
              handleFocus={handleFocus}
              discardTweet={discardTweet}
              handleChange={handleChange}
              handleImageUpload={handleImageUpload}
              onToggleShowLocation={toggleShowLocation}
            >
              {isUploadingImages && (
                <ImagePreview
                  imagesPreview={imagesPreview}
                  previewCount={previewCount}
                  removeImage={!loading ? removeImage : undefined}
                />
              )}
            </InputForm>
            <AnimatePresence initial={false}>
              {(reply ? reply && visited && !loading : !loading) && (
                <InputOptions
                  reply={reply}
                  modal={modal}
                  inputLimit={inputLimit}
                  inputLength={inputLength}
                  isValidTweet={isValidTweet}
                  isCharLimitExceeded={isCharLimitExceeded}
                  handleImageUpload={handleImageUpload}
                  onToggleShowLocation={toggleShowLocation}
                />
              )}
            </AnimatePresence>
          </div>
        </label>
      </form>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xl bg-main-background w-full p-8 rounded-2xl flex-grow'
        open={open}
        closeModal={cancelSetLocation}
      >
        <LocationModal
          loading={loading}
          onSetLocation={onSetLocation}
          removeSetLocation={removeSetLocation}
        >
          <LocationCombobox
            defaultLocation={location}
            handleLocationChange={handleLocationChange}
          />
        </LocationModal>
      </Modal>
    </>
  );
}
