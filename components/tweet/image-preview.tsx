import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { useModal } from '@lib/hooks/useModal';
import { preventBubbling } from '@lib/event';
import { ImageModal } from '@components/modal/image-modal';
import { Modal } from '@components/modal/modal';
import { NextImage } from '@components/ui/next-image';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import type { Variants } from 'framer-motion';
import type { ImagesPreview, ImageData } from './tweet';

type ImagePreviewProps = {
  previewCount: number;
  imagesPreview: ImagesPreview;
  removeImage: (targetId: number) => () => void;
};

const variants: Variants[] = [
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.5 }
  }
];

const [container, image] = variants;

export function ImagePreview({
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
    <motion.div
      className='grid h-72 grid-cols-2 grid-rows-2 gap-3'
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.15 }}
    >
      <Modal
        modalClassName='flex justify-between w-full items-center'
        open={open}
        closeModal={closeModal}
        closePanelOnClick
      >
        <ImageModal
          imageData={selectedImage as ImageData}
          previewCount={previewCount}
          handleNextIndex={handleNextIndex}
        />
      </Modal>
      <AnimatePresence mode='popLayout'>
        {imagesPreview.map(({ src, alt, id }, index) => (
          <motion.div
            className={cn('relative', {
              'col-span-2 row-span-2': previewCount === 1,
              'row-span-2':
                previewCount === 2 || (index === 0 && previewCount === 3)
            })}
            variants={image}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={preventBubbling(handleSelectedImage(index))}
            layout
            key={id}
          >
            <NextImage
              className='relative h-full w-full cursor-pointer transition 
                         hover:brightness-75 hover:duration-200'
              imgClassName={cn(
                'rounded-2xl',
                previewCount === 1
                  ? 'object-contain !min-w-0 rounded-lg !w-auto !min-h-0 !h-auto'
                  : 'object-cover'
              )}
              layout='fill'
              src={src}
              alt={alt}
            />
            <Button
              className='absolute top-0 translate-x-1 translate-y-1 bg-follow-text-color/75
                         p-1 backdrop-blur-sm hover:bg-image-preview-hover-color/75'
              onClick={preventBubbling(removeImage(id))}
            >
              <HeroIcon className='h-5 w-5 text-white' iconName='XMarkIcon' />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
