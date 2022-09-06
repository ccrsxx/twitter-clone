import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { NextImage } from '@components/ui/next-image';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import type { ImagesPreview } from './tweet';

type ImagesPreviewProps = {
  previewCount: number;
  imagesPreview: ImagesPreview;
  removeImage: (targetId: number) => () => void;
};

export function ImagesPreview({
  previewCount,
  imagesPreview,
  removeImage
}: ImagesPreviewProps): JSX.Element {
  return (
    <motion.div
      className='grid h-72 grid-cols-2 grid-rows-2 gap-3'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence mode='popLayout'>
        {imagesPreview.map(({ src, alt, id }, index) => (
          <motion.div
            className={cn('relative', {
              'col-span-2 row-span-2': previewCount === 1,
              'row-span-2':
                previewCount === 2 || (index === 0 && previewCount === 3)
            })}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', duration: 0.5 }}
            layout
            key={id}
          >
            <NextImage
              imgClassName={cn(
                'rounded-2xl',
                previewCount === 1
                  ? 'object-contain !min-w-0 rounded-lg !w-auto !min-h-0 !h-auto'
                  : 'object-cover'
              )}
              layout='fill'
              src={src}
              alt={alt}
            >
              <Button
                className='absolute translate-x-1 translate-y-1 bg-follow-text-color/75
                           p-1 backdrop-blur-sm hover:bg-image-preview-hover-color/75'
                onClick={removeImage(id)}
              >
                <HeroIcon className='h-5 w-5 text-white' iconName='XMarkIcon' />
              </Button>
            </NextImage>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
