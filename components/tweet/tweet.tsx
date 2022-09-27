import Link from 'next/link';
import { useState, useEffect, useRef, useId } from 'react';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { statusesCollection } from '@lib/firebase/collections';
import { manageReply, uploadImages } from '@lib/firebase/utils';
import { useAuth } from '@lib/context/auth-context';
import { sleep } from '@lib/utils';
import { getImagesData } from '@lib/file';
import { NextImage } from '@components/ui/next-image';
import { TweetForm, top } from './tweet-form';
import { ImagePreview } from './image-preview';
import { TweetOptions } from './tweet-options';
import type { FormEvent, ChangeEvent, ClipboardEvent } from 'react';
import type { WithFieldValue } from 'firebase/firestore';
import type { Variants } from 'framer-motion';
import type { User } from '@lib/types/user';
import type { Status } from '@lib/types/status';
import type { FilesWithId, ImagesPreview, ImageData } from '@lib/types/file';

type TweetProps = {
  modal?: boolean;
  reply?: boolean;
  parent?: { id: string; username: string };
  closeModal?: () => void;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export function Tweet({
  modal,
  reply,
  parent,
  closeModal
}: TweetProps): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<FilesWithId>([]);
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [visited, setVisited] = useState(false);

  const { user } = useAuth();
  const { name, username, photoURL } = user as User;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const previewCount = imagesPreview.length;
  const isUploadingImages = !!previewCount;

  useEffect(
    () => {
      if (modal) inputRef.current?.focus();
      return () => imagesPreview.forEach(({ src }) => URL.revokeObjectURL(src));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sendTweet = async (reply?: boolean): Promise<void> => {
    inputRef.current?.blur();

    setLoading(true);

    const tweetData: WithFieldValue<Omit<Status, 'id'>> = {
      text: inputValue.trim(),
      parent: reply && parent ? parent : null,
      images: await uploadImages(user?.uid as string, selectedImages),
      userLikes: [],
      createdBy: user?.uid as string,
      createdAt: serverTimestamp(),
      updatedAt: null,
      userTweets: [],
      userReplies: 0
    };

    await sleep(500);

    const [statusRef] = await Promise.all([
      addDoc(statusesCollection, tweetData),
      reply ? manageReply('increment', parent?.id as string) : null
    ]);

    const { id } = await getDoc(statusRef);

    discardTweet();
    setLoading(false);

    if (closeModal) closeModal();

    toast.success(
      () => (
        <span className='flex gap-2'>
          Your Tweet was sent.
          <Link href={`/post/${id}`}>
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
    const files = 'clipboardData' in e ? e.clipboardData.files : e.target.files;

    const imagesData = getImagesData(files, previewCount);

    if (imagesData) {
      const { imagesPreviewData, selectedImagesData } = imagesData;

      setImagesPreview([...imagesPreview, ...imagesPreviewData]);
      setSelectedImages([...selectedImages, ...selectedImagesData]);

      inputRef.current?.focus();
    }
  };

  const removeImage = (targetId: number) => (): void => {
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
    void sendTweet(reply);
  };

  const handleFocus = (): void => setVisited(!loading);

  const formId = useId();

  const isValidInput = !!inputValue.trim().length;

  return (
    <form
      className={cn('flex flex-col', reply && '-mx-4')}
      onSubmit={handleSubmit}
    >
      {loading && (
        <motion.i
          className={cn(
            'h-1 animate-pulse bg-accent-blue',
            modal && 'mx-auto w-[calc(100%-0.75rem)] rounded-t-2xl'
          )}
          {...variants}
        />
      )}
      {reply && visited && (
        <motion.p className='ml-[75px] -mb-2 mt-2 text-secondary' {...top}>
          Replying to{' '}
          <Link href={`/user/${parent?.username as string}`}>
            <a className='custom-underline text-accent-blue'>
              {parent?.username as string}
            </a>
          </Link>
        </motion.p>
      )}
      <label
        className={cn(
          'grid grid-cols-[auto,1fr] gap-3 px-4 py-3 transition',
          reply ? 'pt-3 pb-1' : ' border-b border-border-color',
          loading && 'pointer-events-none brightness-75'
        )}
        htmlFor={formId}
      >
        <Link href={`/user/${username}`}>
          <a className='blur-picture self-start'>
            <NextImage
              imgClassName='rounded-full'
              width={48}
              height={48}
              src={photoURL}
              alt={name}
              useSkeleton
            />
          </a>
        </Link>
        <div className='flex w-full flex-col gap-4'>
          <TweetForm
            modal={modal}
            reply={reply}
            formId={formId}
            visited={visited}
            loading={loading}
            inputRef={inputRef}
            inputValue={inputValue}
            isValidInput={isValidInput}
            isUploadingImages={isUploadingImages}
            sendTweet={sendTweet}
            handleFocus={handleFocus}
            discardTweet={discardTweet}
            handleChange={handleChange}
            handleImageUpload={handleImageUpload}
          >
            {isUploadingImages && (
              <ImagePreview
                previewCount={previewCount}
                imagesPreview={imagesPreview}
                removeImage={!loading ? removeImage : undefined}
              />
            )}
          </TweetForm>
          {(reply ? reply && visited && !loading : !loading) && (
            <TweetOptions
              reply={reply}
              inputValue={inputValue}
              isValidInput={isValidInput}
              isUploadingImages={isUploadingImages}
              handleImageUpload={handleImageUpload}
            />
          )}
        </div>
      </label>
    </form>
  );
}
