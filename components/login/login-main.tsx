import { NextImage } from '@components/ui/next-image';
import { CustomIcon } from '@components/ui/custom-icon';
import type { ReactNode } from 'react';

type LoginMainProps = {
  children: ReactNode;
};

export function LoginMain({ children }: LoginMainProps): JSX.Element {
  return (
    <main className='grid grid-cols-[1fr,45vw]'>
      <div className='relative flex items-center justify-center'>
        <NextImage
          imgClassName='object-cover'
          src='/assets/twitter-banner.png'
          alt='Twitter banner'
          layout='fill'
          useSkeleton
        />
        <i className='absolute'>
          <CustomIcon className='h-96 w-96 text-white' iconName='TwitterIcon' />
        </i>
      </div>
      <div className='flex flex-col justify-center gap-6 p-8'>
        <div className='flex flex-col gap-16 font-twitter-chirp-extended'>
          <i>
            <CustomIcon className='h-12 w-12' iconName='TwitterIcon' />
          </i>
          <h1 className='text-6xl'>Happening now</h1>
          <h2 className='text-3xl'>Join Twitter today.</h2>
        </div>
        {children}
      </div>
    </main>
  );
}
