import { MainHeader } from '@components/home/main-header';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import type { ReactNode } from 'react';
import type { User } from '@lib/types/user';

type EditProfileModalProps = Pick<
  User,
  'name' | 'photoURL' | 'coverPhotoURL'
> & {
  children: ReactNode;
  closeModal: () => void;
  updateData: () => Promise<void>;
};

export function EditProfileModal({
  name,
  photoURL,
  children,
  coverPhotoURL,
  closeModal,
  updateData
}: EditProfileModalProps): JSX.Element {
  return (
    <>
      <MainHeader
        useActionButton
        disableSticky
        iconName='XMarkIcon'
        tip='Close'
        className='fixed flex w-[561px] items-center gap-6 rounded-tl-2xl'
        title='Edit profile'
        action={closeModal}
      >
        <Button
          className='ml-auto bg-primary py-1 px-4 font-bold text-follow-text-color 
                     hover:brightness-90 active:brightness-75'
          onClick={updateData}
        >
          Save
        </Button>
      </MainHeader>
      <div className='h-full overflow-y-auto'>
        <div className='mt-[52px] h-[192px] rounded-t-2xl'>
          {coverPhotoURL ? (
            <NextImage
              useSkeleton
              className='relative h-full'
              imgClassName='object-cover'
              src={coverPhotoURL}
              alt={name}
              layout='fill'
            />
          ) : (
            <div className='h-full bg-line-reply-color' />
          )}
        </div>
        <div className='relative flex flex-col gap-6 px-4 py-3'>
          <div className='mb-14'>
            <NextImage
              useSkeleton
              className='absolute -translate-y-1/2 rounded-full bg-black p-1'
              imgClassName='rounded-full'
              src={photoURL}
              alt={name}
              width={128}
              height={128}
            />
          </div>
          {children}
          <Button
            className='-mx-4 mb-4 flex items-center justify-between rounded-none
                       py-2 hover:bg-primary/10 active:bg-primary/20 disabled:brightness-100'
            disabled
          >
            <span className='mx-2 text-xl'>Switch to professional</span>
            <i>
              <HeroIcon
                className='h-6 w-6 text-secondary'
                iconName='ChevronRightIcon'
              />
            </i>
          </Button>
        </div>
      </div>
    </>
  );
}
