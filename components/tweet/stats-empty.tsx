import cn from 'clsx';
import { NextImage } from '@components/ui/next-image';
import type { ImageData } from '@lib/types/file';

export type StatsEmptyProps = {
  title: string;
  modal?: boolean;
  imageData?: ImageData;
  description: string;
};

export function StatsEmpty({
  title,
  modal,
  imageData,
  description
}: StatsEmptyProps): JSX.Element {
  return (
    <div className={cn('flex justify-center p-8', modal && 'mt-[52px]')}>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col items-center gap-6'>
          {imageData && (
            <NextImage
              width={336}
              height={168}
              src={imageData.src}
              alt={imageData.alt}
            />
          )}
          <div className='flex flex-col gap-2 text-center'>
            <p className='text-3xl font-extrabold'>{title}</p>
            <p className='text-secondary'>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
