/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { preventBubbling } from '@lib/utils';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { Loading } from '@components/ui/loading';
import { backdrop, modal } from './modal';
import type { VariantLabels } from 'framer-motion';
import type { ImageData } from '@lib/types/file';
import type { IconName } from '@components/ui/hero-icon';

type ImageModalProps = {
  tweet?: boolean;
  imageData: ImageData;
  previewCount: number;
  selectedIndex: number;
  handleNextIndex: (type: 'prev' | 'next') => () => void;
};

const arrowButtons: ['prev' | 'next', string | null, IconName][] = [
  ['prev', null, 'ArrowLeftIcon'],
  ['next', 'order-1', 'ArrowRightIcon']
];

export function ImageModal({
  tweet,
  imageData,
  previewCount,
  selectedIndex,
  handleNextIndex
}: ImageModalProps): JSX.Element {
  const [indexes, setIndexes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const { src, alt } = imageData;

  const requireArrows = previewCount > 1;

  useEffect(() => {
    if (tweet && !indexes.includes(selectedIndex)) {
      setLoading(true);
      setIndexes([...indexes, selectedIndex]);
    }

    const image = new Image();
    image.src = src;
    image.onload = (): void => setLoading(false);
  }, [...(tweet && previewCount > 1 ? [src] : [])]);

  useEffect(() => {
    if (!requireArrows) return;

    const handleKeyDown = ({ key }: KeyboardEvent): void => {
      const callback =
        key === 'ArrowLeft'
          ? handleNextIndex('prev')
          : key === 'ArrowRight'
          ? handleNextIndex('next')
          : null;

      if (callback) callback();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleNextIndex]);

  return (
    <>
      {requireArrows &&
        arrowButtons.map(([name, className, iconName]) => (
          <Button
            className={cn(
              'hover:bg-primary/10 active:bg-primary/20',
              className
            )}
            onClick={preventBubbling(handleNextIndex(name))}
            key={name}
          >
            <HeroIcon iconName={iconName} />
          </Button>
        ))}
      <AnimatePresence mode='wait'>
        {loading ? (
          <motion.div
            className='mx-auto'
            {...backdrop}
            exit={tweet ? (backdrop.exit as VariantLabels) : undefined}
            transition={{ duration: 0.15 }}
          >
            <Loading iconClassName='w-20 h-20' />
          </motion.div>
        ) : (
          <motion.div className='relative mx-auto' {...modal} key={src}>
            <picture className='group relative'>
              <source srcSet={src} type='image/*' />
              <img
                className='max-h-[75vh] max-w-3xl rounded-md object-contain md:max-h-[80vh]'
                src={src}
                alt={alt}
                onClick={preventBubbling()}
              />
              <a
                className='trim-alt smooth-tab absolute bottom-0 right-0 mx-2 mb-2 translate-y-4
                           rounded-md bg-black/40 px-2 py-1 text-sm text-primary/80 opacity-0
                           transition hover:bg-accent-blue hover:text-primary focus-visible:translate-y-0
                           focus-visible:bg-accent-blue focus-visible:text-primary focus-visible:opacity-100
                           group-hover:translate-y-0 group-hover:opacity-100'
                href={src}
                target='_blank'
                rel='noreferrer'
                onClick={preventBubbling(null, true)}
              >
                {alt}
              </a>
            </picture>
            <a
              className='custom-underline absolute left-0 -bottom-7 text-primary/80
                         decoration-transparent underline-offset-2 transition hover:text-primary
                         hover:underline hover:decoration-primary'
              href={src}
              target='_blank'
              rel='noreferrer'
              onClick={preventBubbling(null, true)}
            >
              Open original
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
