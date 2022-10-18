import { useRef } from 'react';
import cn from 'clsx';
import { MainHeader } from '@components/home/main-header';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { ToolTip } from '@components/ui/tooltip';
import type { ReactNode, ChangeEvent } from 'react';
import type { User } from '@lib/types/user';

type EditProfileModalProps = Pick<
  User,
  'name' | 'photoURL' | 'coverPhotoURL'
> & {
  loading: boolean;
  children: ReactNode;
  inputNameError: string;
  editImage: (
    type: 'cover' | 'profile'
  ) => ({ target: { files } }: ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  updateData: () => Promise<void>;
  removeCoverImage: () => void;
  resetUserEditData: () => void;
};

export function EditProfileModal({
  name,
  loading,
  photoURL,
  children,
  coverPhotoURL,
  inputNameError,
  editImage,
  closeModal,
  updateData,
  removeCoverImage,
  resetUserEditData
}: EditProfileModalProps): JSX.Element {
  const coverInputFileRef = useRef<HTMLInputElement>(null);
  const profileInputFileRef = useRef<HTMLInputElement>(null);

  const handleClick = (type: 'cover' | 'profile') => (): void => {
    if (type === 'cover') coverInputFileRef.current?.click();
    else profileInputFileRef.current?.click();
  };

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
        <div className='ml-auto flex items-center gap-3'>
          <Button
            className='group relative p-2 hover:bg-primary/10 active:bg-primary/20'
            onClick={resetUserEditData}
            disabled={loading}
          >
            <HeroIcon className='h-5 w-5' iconName={'ArrowPathIcon'} />
            <ToolTip tip='Reset' />
          </Button>
          <Button
            className='bg-primary py-1 px-4 font-bold text-follow-text-color 
                       enabled:hover:brightness-90 enabled:active:brightness-75 
                       disabled:brightness-75'
            onClick={updateData}
            disabled={!!inputNameError}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </MainHeader>
      <section
        className={cn(
          'h-full overflow-y-auto',
          loading && 'pointer-events-none brightness-75'
        )}
      >
        <div className='group relative mt-[52px] h-[192px]'>
          <input
            className='hidden'
            type='file'
            accept='image/*'
            ref={coverInputFileRef}
            onChange={editImage('cover')}
          />
          {coverPhotoURL ? (
            <NextImage
              useSkeleton
              className='relative h-full'
              imgClassName='object-cover transition group-hover:brightness-75 group-hover:duration-200'
              src={coverPhotoURL}
              alt={name}
              layout='fill'
            />
          ) : (
            <div className='h-full bg-line-reply-color' />
          )}
          <div className='absolute left-1/2 top-1/2 flex -translate-y-1/2 -translate-x-1/2 gap-4'>
            <Button
              className='group-inner relative bg-follow-text-color/60 p-2 hover:bg-image-preview-hover-color/50'
              onClick={handleClick('cover')}
            >
              <HeroIcon
                className='hover-animation h-6 w-6 group-hover:text-white'
                iconName='CameraIcon'
              />
              <ToolTip groupInner tip='Add photo' />
            </Button>
            {coverPhotoURL && (
              <Button
                className='group-inner relative bg-follow-text-color/60 p-2 hover:bg-image-preview-hover-color/50'
                onClick={removeCoverImage}
              >
                <HeroIcon
                  className='hover-animation h-6 w-6 group-hover:text-white'
                  iconName='XMarkIcon'
                />
                <ToolTip groupInner tip='Remove photo' />
              </Button>
            )}
          </div>
        </div>
        <div className='relative flex flex-col gap-6 px-4 py-3'>
          <div className='mb-14'>
            <input
              className='hidden'
              type='file'
              accept='image/*'
              ref={profileInputFileRef}
              onChange={editImage('profile')}
            />
            <div className='group absolute -translate-y-1/2'>
              <NextImage
                useSkeleton
                className='rounded-full bg-black p-1'
                imgClassName='rounded-full transition group-hover:brightness-75 group-hover:duration-200'
                src={photoURL}
                alt={name}
                width={128}
                height={128}
              />
              <Button
                className='group-inner absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                           bg-follow-text-color/60 p-2 hover:bg-image-preview-hover-color/50'
                onClick={handleClick('profile')}
              >
                <HeroIcon
                  className='hover-animation h-6 w-6 group-hover:text-white'
                  iconName='CameraIcon'
                />
                <ToolTip groupInner tip='Add photo' />
              </Button>
            </div>
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
      </section>
    </>
  );
}
