import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { isValidImage } from '@lib/file';
import { NextImage } from '@components/ui/next-image';
import { Form } from './form';
import { ImagesPreview } from './images-preview';
import { Options } from './options';
import type { FormEvent, ChangeEvent, ClipboardEvent } from 'react';

type ImageData = {
  src: string;
  alt: string;
};

export type ImagesPreview = (ImageData & {
  id: number;
})[];

type FilesWithId = (File & {
  id: number;
})[];

export function Tweet(): JSX.Element {
  const [tweetHeight, setTweetHeight] = useState(0);
  const [selectedImages, setSelectedImages] = useState<FilesWithId>([]);
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([]);
  const [inputValue, setInputValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const previewCount = imagesPreview.length;

  useEffect(
    () => () => imagesPreview.forEach(({ src }) => URL.revokeObjectURL(src)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!inputContainerRef.current) return;
    setTweetHeight(inputContainerRef.current.offsetHeight);
  }, [inputValue]);

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

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>): void => setInputValue(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    toast.success(
      `Tweeted ${inputValue}${
        imagesPreview.length
          ? ` ${inputValue ? 'with' : ''} ${imagesPreview.length} photo${
              imagesPreview.length > 1 ? 's' : ''
            }`
          : ''
      }`,
      {
        style: {
          backgroundColor: '#1D9BF0',
          borderRadius: '4px',
          color: 'white'
        }
      }
    );
  };

  const handleFocus = (): void => setIsFocus(true);
  const handleBlur = (): void => setIsFocus(false);

  const isUploadingImages = !!previewCount;

  const isFormEnabled = isUploadingImages || !!(isFocus || inputValue);
  const isValidInput = !!inputValue.trim().length;

  const totalContainerHeight =
    (isUploadingImages ? tweetHeight + 304 : tweetHeight) + 176;

  return (
    <form onSubmit={handleSubmit}>
      <motion.label
        className='flex gap-4 border-b border-border-color px-4 py-3'
        style={!isFormEnabled ? { height: 125 } : undefined}
        animate={{ height: isFormEnabled ? totalContainerHeight : 125 }}
        transition={{ type: 'tween', duration: 0.2 }}
        htmlFor='tweet'
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
          <Form
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
                <ImagesPreview
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
