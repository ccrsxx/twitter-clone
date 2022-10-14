import { useModal } from '@lib/hooks/useModal';
import { Button } from '@components/ui/button';
import { NextImage } from '@components/ui/next-image';
import { Modal } from '@components/modal/modal';
import { ImageModal } from '@components/modal/image-modal';
import type { ImageData } from '@lib/types/file';

type UserProfileProps = {
  profileData?: ImageData | null;
};

export function UserProfile({ profileData }: UserProfileProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  return (
    <div className='mb-16'>
      <Modal open={open} closeModal={closeModal}>
        <ImageModal
          imageData={
            { src: profileData?.src, alt: profileData?.alt } as ImageData
          }
          previewCount={1}
        />
      </Modal>
      <Button
        className='absolute -mt-3 aspect-square w-[144px] -translate-y-1/2 p-0 
                   enabled:hover:brightness-75 disabled:cursor-auto 
                   disabled:brightness-100'
        onClick={openModal}
        disabled={!profileData}
      >
        {profileData ? (
          <NextImage
            useSkeleton
            className='rounded-full bg-black p-1'
            imgClassName='rounded-full'
            src={profileData.src}
            alt={profileData.alt}
            width={144}
            height={144}
          />
        ) : (
          <div className='h-full rounded-full bg-black p-1 inner:h-full inner:rounded-full'>
            <div className='bg-sidebar-background' />
          </div>
        )}
      </Button>
    </div>
  );
}
