import Link from 'next/link';
import { useState, useEffect, useRef, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as emoji from 'node-emoji';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { trendsCollection, tweetsCollection } from '@lib/firebase/collections';
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
import type { Trend } from '@lib/types/trend';
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

  const { user, isAdmin } = useAuth();
  const { name, username, photoURL } = user as User;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const previewCount = imagesPreview.length;
  const isUploadingImages = !!previewCount;

  useEffect(
    () => {
      if (modal) inputRef.current?.focus();
      return cleanImage;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sendTweet = async (): Promise<void> => {
    try {
      inputRef.current?.blur();
      const trendRegex = /#\w+/g;

      setLoading(true);

      const isReplying = reply ?? replyModal;

      const userId = user?.id as string;

      const tweetData: WithFieldValue<Omit<Tweet, 'id'>> = {
        text: emoji.emojify(inputValue.trim()) || null,
        parent: isReplying && parent ? parent : null,
        images: await uploadImages(userId, selectedImages),
        userLikes: [],
        createdBy: userId,
        createdAt: serverTimestamp(),
        updatedAt: null,
        userReplies: 0,
        userRetweets: []
      };

      await sleep(500);

      const trends = tweetData?.text?.toString().match(trendRegex);
      const trendsQueries = trends?.map((trend) =>
        query(trendsCollection, where('text', '==', trend))
      );

      const trendsUpdated =
        trendsQueries &&
        (await Promise.all(
          trendsQueries?.map(async (trendQuery) => {
            const querySnapshot = await getDocs(trendQuery);
            const docToUpdate = querySnapshot.docs[0];
            if (docToUpdate) {
              const trendRef = doc(trendsCollection, docToUpdate.id);

              await updateDoc(trendRef, {
                updatedAt: new Date(),
                counter: (docToUpdate.data().counter || 0) + 1
              });

              return docToUpdate.data();
            }
          })
        ));

      const trendsToCreate =
        trends?.filter(
          (trend) => !trendsUpdated?.find((nTrend) => nTrend?.text === trend)
        ) ?? [];

      await Promise.all(
        trendsToCreate.map(
          async (trend) =>
            await addDoc(trendsCollection, {
              text: trend,
              parent: isReplying && parent ? parent : null,
              createdBy: userId,
              createdAt: serverTimestamp(),
              updatedAt: null,
              counter: 0
            } as WithFieldValue<Omit<Trend, 'id'>>)
        )
      );

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
            <Link
              href={`/${username}/status/${tweetId}`}
              className='custom-underline font-bold'
            >
              View
            </Link>
          </span>
        ),
        { duration: 6000 }
      );
    } catch (err) {
      toast.error(
        () => (
          <span className='flex gap-2'>Oops, we couldn’t send your Tweet</span>
        ),
        { duration: 6000 }
      );
    }
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

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>): void => setInputValue(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void sendTweet();
  };

  const handleFocus = (): void => setVisited(!loading);

  const formId = useId();

  const inputLimit = isAdmin ? 560 : 280;

  const inputLength = inputValue.length;
  const isValidInput = !!inputValue.trim().length;
  const isCharLimitExceeded = inputLength > inputLimit;

  const isValidTweet =
    !isCharLimitExceeded && (isValidInput || isUploadingImages);

  return (
    <form
      className={cn('flex flex-col', {
        '-mx-4': reply,
        'gap-2': replyModal,
        '': disabled
      })}
      onSubmit={handleSubmit}
    >
      {loading && (
        <motion.i className='h-1 animate-pulse bg-main-accent' {...variants} />
      )}
      {children}
      {reply && visited && (
        <motion.p
          className='-mb-2 ml-[75px] mt-2 text-light-secondary dark:text-dark-secondary'
          {...fromTop}
        >
          Replying to{' '}
          <Link
            href={`/${parent?.username as string}`}
            className='custom-underline text-main-accent'
          >
            {parent?.username as string}
          </Link>
        </motion.p>
      )}
      <label
        className={cn(
          'hover-animation grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3',
          reply
            ? 'pb-1 pt-3'
            : replyModal
            ? 'pt-0'
            : 'border-b-2 border-light-border dark:border-dark-border',
          (disabled || loading) && 'pointer-events-none opacity-50'
        )}
        htmlFor={formId}
      >
        <UserAvatar src={photoURL} alt={name ?? username} username={username} />
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
            sendTweet={sendTweet}
            handleFocus={handleFocus}
            discardTweet={discardTweet}
            handleChange={handleChange}
            handleImageUpload={handleImageUpload}
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
              />
            )}
          </AnimatePresence>
        </div>
      </label>
    </form>
  );
}
