import { InputThemeCheckbox } from '@components/input/input-theme-checkbox';
import { NextImage } from '@components/ui/next-image';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';

type DisplayModalProps = {
  closeModal: () => void;
};

export function DisplayModal({ closeModal }: DisplayModalProps): JSX.Element {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex flex-col gap-3 text-center'>
        <h2 className='text-2xl font-bold'>Customize your view</h2>
        <p className='text-secondary'>
          These settings affect all the Twitter accounts on this browser.
        </p>
      </div>
      <article className='mx-8 rounded-2xl border border-border-color px-4 py-3'>
        <div className='grid grid-cols-[auto,1fr] gap-3'>
          <NextImage
            useSkeleton
            className='self-start'
            imgClassName='rounded-full'
            width={48}
            height={48}
            src='/assets/twitter-profile.jpg'
            alt='Twitter'
          />
          <div>
            <div className='flex gap-1'>
              <div className='flex gap-1'>
                <p className='font-bold'>Twitter</p>
                <i>
                  <HeroIcon iconName='CheckBadgeIcon' solid />
                </i>
              </div>
              <p className='text-secondary'>@twitter</p>
              <div className='flex gap-1 text-secondary'>
                <i>·</i>
                <p>26m</p>
              </div>
            </div>
            <p className='whitespace-pre-line break-words'>
              At the heart of Twitter are short messages called Tweets — just
              like this one — which can include photos, videos, links, text,
              hashtags, and mentions like{' '}
              <span className='text-accent-blue'>@twitter</span>.
            </p>
          </div>
        </div>
      </article>
      <div className='flex w-full flex-col gap-1'>
        <p className='text-sm font-bold text-secondary'>Color</p>
        <div
          className='flex justify-around rounded-2xl 
                     bg-sidebar-background py-3'
        >
          <div className='h-10 w-10 rounded-full bg-accent-yellow'></div>
          <div className='h-10 w-10 rounded-full bg-accent-blue'></div>
          <div className='h-10 w-10 rounded-full bg-accent-pink'></div>
          <div className='h-10 w-10 rounded-full bg-accent-purple'></div>
          <div className='h-10 w-10 rounded-full bg-accent-green'></div>
        </div>
      </div>
      <div className='flex w-full flex-col gap-1'>
        <p className='text-sm font-bold text-secondary'>Background</p>
        <div
          className='grid grid-cols-3 gap-3 rounded-2xl bg-sidebar-background
                     px-4 py-3'
        >
          <InputThemeCheckbox type='light' label='Default' />
          <InputThemeCheckbox type='dim' label='Dim' />
          <InputThemeCheckbox type='dark' label='Lights out' />
        </div>
      </div>
      <Button
        className='bg-accent-blue px-4 py-1 hover:bg-accent-blue/90
                   active:bg-accent-blue/75'
        onClick={closeModal}
      >
        Done
      </Button>
    </div>
  );
}
