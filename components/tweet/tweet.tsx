import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { postsCollection } from '@lib/firebase/collections';
import { useAuth } from '@lib/context/auth-context';
import { isValidImage } from '@lib/file';
import { NextImage } from '@components/ui/next-image';
import { Form } from './form';
import { ImagePreview } from './image-preview';
import { Options } from './options';
import type { FormEvent, ChangeEvent, ClipboardEvent } from 'react';

export type ImageData = {
  src: string;
  alt: string;
};

export type ImagesPreview = (ImageData & {
  id: number;
})[];

type FilesWithId = (File & {
  id: number;
})[];

type TweetProps = {
  modal?: boolean;
};

export function Tweet({ modal }: TweetProps): JSX.Element {
  const [tweetHeight, setTweetHeight] = useState(0);
  const [selectedImages, setSelectedImages] = useState<FilesWithId>([]);
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([]);
  const [inputValue, setInputValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const { user } = useAuth();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const previewCount = imagesPreview.length;
  const isUploadingImages = !!previewCount;

  useEffect(
    () => () => imagesPreview.forEach(({ src }) => URL.revokeObjectURL(src)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!inputContainerRef.current) return;
    setTweetHeight(inputContainerRef.current.offsetHeight);
  }, [inputValue, isUploadingImages]);

  const sendTweet = async (): Promise<void> => {
    const tweetData = {
      text: inputValue,
      images: imagesPreview.length ? imagesPreview.map(({ src }) => src) : null,
      userRef: user?.ref,
      createdAt: serverTimestamp()
    };

    try {
      await toast.promise(addDoc(postsCollection, tweetData), {
        loading: 'Sending tweet...',
        success: 'Tweet sent!',
        error: 'Failed to send tweet'
      });

      setInputValue('');
      cleanImage();
    } catch (error) {
      toast.error('Failed to send tweet');
    }
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

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>): void => setInputValue(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void sendTweet();
  };

  const handleFocus = (): void => setIsFocus(true);
  const handleBlur = (): void => setIsFocus(false);

  const formId = modal ? 'tweet-modal' : 'tweet';
  const baseHeight = modal ? 161 : 125;

  const isFormEnabled = isUploadingImages || !!(isFocus || inputValue);
  const isValidInput = !!inputValue.trim().length;

  const totalContainerHeight =
    (isUploadingImages ? tweetHeight + 304 : tweetHeight) + 176;

  return (
    <form onSubmit={handleSubmit}>
      <motion.label
        className='flex gap-4 border-b border-border-color px-4 py-3'
        style={!isFormEnabled ? { height: baseHeight } : undefined}
        animate={{ height: isFormEnabled ? totalContainerHeight : baseHeight }}
        transition={{ type: 'tween', duration: 0.2 }}
        htmlFor={formId}
      >
        <NextImage
          className='shrink-0'
          imgClassName='rounded-full'
          width={48}
          height={48}
          src={user?.photoURL as string}
          alt='ccrsxx'
          useSkeleton
        />
        <div className='flex w-full flex-col gap-4'>
          <Form
            modal={modal}
            formId={formId}
            inputRef={inputRef}
            inputValue={inputValue}
            isFormEnabled={isFormEnabled}
            inputContainerRef={inputContainerRef}
            isUploadingImages={isUploadingImages}
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleChange={handleChange}
            handleImageUpload={handleImageUpload}
          >
            <AnimatePresence>
              {isUploadingImages && (
                <ImagePreview
                  previewCount={previewCount}
                  imagesPreview={imagesPreview}
                  removeImage={removeImage}
                />
              )}
            </AnimatePresence>
          </Form>
          <Options
            inputValue={inputValue}
            isValidInput={isValidInput}
            isUploadingImages={isUploadingImages}
            handleImageUpload={handleImageUpload}
          />
        </div>
      </motion.label>
    </form>
  );
}
