import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { useModal } from '@lib/hooks/useModal';
import { preventBubbling } from '@lib/utils';
import { ImageModal } from '@components/modal/image-modal';
import { Modal } from '@components/modal/modal';
import { NextImage } from '@components/ui/next-image';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import type { MotionProps } from 'framer-motion';
import type { ImagesPreview, ImageData } from '@lib/types/file';

type ImagePreviewProps = {
  status?: boolean;
  previewCount: number;
  imagesPreview: ImagesPreview;
  removeImage?: (targetId: number) => () => void;
};

const variants: MotionProps = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, scale: 0.5 },
  transition: { type: 'spring', duration: 0.5 }
};

type PostImageBorderRadius = {
  [key: number]: string[];
};

const postImageBorderRadius: PostImageBorderRadius = {
  1: ['rounded-2xl'],
  2: ['rounded-tl-2xl rounded-bl-2xl', 'rounded-tr-2xl rounded-br-2xl'],
  3: ['rounded-tl-2xl rounded-bl-2xl', 'rounded-tr-2xl', 'rounded-br-2xl'],
  4: ['rounded-tl-2xl', 'rounded-tr-2xl', 'rounded-bl-2xl', 'rounded-br-2xl']
};

export function ImagePreview({
  status,
  previewCount,
  imagesPreview,
  removeImage
}: ImagePreviewProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    const imageData = imagesPreview[selectedIndex];
    setSelectedImage(imageData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const handleSelectedImage = (index: number) => () => {
    setSelectedIndex(index);
    openModal();
  };

  const handleNextIndex = (type: 'prev' | 'next') => () => {
    const nextIndex =
      type === 'prev'
        ? selectedIndex === 0
          ? previewCount - 1
          : selectedIndex - 1
        : selectedIndex === previewCount - 1
        ? 0
        : selectedIndex + 1;

    setSelectedIndex(nextIndex);
  };

  return (
    <div
      className={cn(
        'grid h-72 grid-cols-2 grid-rows-2',
        status ? 'mt-2 gap-0.5' : 'gap-3'
      )}
    >
      <Modal
        modalClassName={cn(
          'flex justify-between w-full items-center',
          status && 'h-full'
        )}
        open={open}
        closeModal={closeModal}
        closePanelOnClick
      >
        <ImageModal
          status={status}
          imageData={selectedImage as ImageData}
          previewCount={previewCount}
          selectedIndex={selectedIndex}
          handleNextIndex={handleNextIndex}
        />
      </Modal>
      <AnimatePresence mode='popLayout'>
        {imagesPreview.map(({ id, src, alt }, index) => (
          <motion.button
            type='button'
            className={cn(
              'smooth-tab relative transition-none transition-[box-shadow]',
              status
                ? postImageBorderRadius[previewCount][index]
                : 'rounded-2xl',
              {
                'col-span-2 row-span-2': previewCount === 1,
                'row-span-2':
                  previewCount === 2 || (index === 0 && previewCount === 3)
              }
            )}
            {...variants}
            onClick={preventBubbling(handleSelectedImage(index))}
            layout={!status ? true : false}
            key={id}
          >
            <NextImage
              className='relative h-full w-full cursor-pointer transition 
                         hover:brightness-75 hover:duration-200'
              imgClassName={cn(
                status
                  ? postImageBorderRadius[previewCount][index]
                  : 'rounded-2xl'
              )}
              previewCount={previewCount}
              layout='fill'
              src={src}
              alt={alt}
              useSkeleton={status}
            />
            {removeImage && (
              <Button
                className='absolute top-0 left-0 translate-x-1 translate-y-1
                           bg-follow-text-color/75 p-1 backdrop-blur-sm 
                           hover:bg-image-preview-hover-color/75'
                onClick={preventBubbling(removeImage(id))}
              >
                <HeroIcon className='h-5 w-5 text-white' iconName='XMarkIcon' />
              </Button>
            )}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
