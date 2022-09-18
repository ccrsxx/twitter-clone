import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { postsCollection } from '@lib/firebase/collections';
import { uploadImages } from '@lib/firebase/utils';
import { sleep } from '@lib/sleep';
import { useAuth } from '@lib/context/auth-context';
import { isValidImage } from '@lib/file';
import { NextImage } from '@components/ui/next-image';
import { Form } from './form';
import { ImagePreview } from './image-preview';
import { Options } from './options';
import type { FormEvent, ChangeEvent, ClipboardEvent } from 'react';
import type { WithFieldValue } from 'firebase/firestore';
import type { Variants } from 'framer-motion';
import type { Post } from '@lib/types/post';
import type { FilesWithId, ImagesPreview, ImageData } from '@lib/types/file';

type TweetProps = {
  modal?: boolean;
  closeModal?: () => void;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export function Tweet({ modal, closeModal }: TweetProps): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<FilesWithId>([]);
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);

  const { user } = useAuth();

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

  const sendTweet = async (): Promise<void> => {
    inputRef.current?.blur();

    setLoading(true);

    const tweetData: WithFieldValue<Omit<Post, 'id'>> = {
      text: inputValue,
      images: await uploadImages(user?.uid as string, selectedImages),
      createdBy: user?.uid as string,
      createdAt: serverTimestamp()
    };

    await sleep(500);
    await addDoc(postsCollection, tweetData);

    discardTweet();
    setLoading(false);

    if (closeModal) closeModal();
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ): void => {
    const files = 'clipboardData' in e ? e.clipboardData.files : e.target.files;

    if (!files || !files.length) return;

    const rawImages = !(previewCount === 4 || files.length > 4 - previewCount)
      ? Array.from(files).filter(({ name, size }) => isValidImage(name, size))
      : null;

    if (!rawImages) {
      toast.error('Please choose a GIF or photo up to 4', {
        style: {
          backgroundColor: '#1D9BF0',
          borderRadius: '4px',
          color: 'white'
        }
      });
      return;
    }

    const imagesId = rawImages.map((_, index) =>
      Math.floor(Date.now() + Math.random() + index)
    );

    setSelectedImages([
      ...selectedImages,
      ...rawImages.map((image, index) =>
        Object.assign(image, { id: imagesId[index] })
      )
    ]);

    const imagesData = rawImages.map((image, index) => ({
      id: imagesId[index],
      src: URL.createObjectURL(image),
      alt: image.name
    }));

    setImagesPreview([...imagesPreview, ...imagesData]);

    inputRef.current?.focus();
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
    setFocus(false);
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

  const handleFocus = (): void => setFocus(!loading);

  const formId = modal ? 'tweet-modal' : 'tweet';

  const isValidInput = !!inputValue.trim().length;
  const isFormEnabled = focus && !loading;

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      {loading && (
        <motion.i
          className={cn(
            'h-1 animate-pulse bg-accent-blue',
            modal && 'mx-auto w-[calc(100%-0.75rem)] rounded-t-2xl'
          )}
          {...variants}
        />
      )}
      <label
        className={cn(
          'flex gap-3 border-b border-border-color px-4 py-3 transition',
          loading && 'brightness-75'
        )}
        htmlFor={formId}
      >
        <Link href='/user/ccrsxx'>
          <a className='blur-picture shrink-0 self-start'>
            <NextImage
              imgClassName='rounded-full'
              width={48}
              height={48}
              src={user?.photoURL as string}
              useSkeleton
              alt='ccrsxx'
            />
          </a>
        </Link>
        <div className='flex w-full flex-col gap-4'>
          <Form
            modal={modal}
            formId={formId}
            inputRef={inputRef}
            inputValue={inputValue}
            isValidInput={isValidInput}
            isFormEnabled={isFormEnabled}
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
          </Form>
          {!loading && (
            <Options
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
