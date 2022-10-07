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
        className='absolute -mt-3 -translate-y-1/2 p-0 enabled:hover:brightness-75 
                   disabled:cursor-auto disabled:brightness-100'
        onClick={openModal}
        disabled={!profileData}
      >
        {profileData ? (
          <>
            <NextImage
              className='rounded-full bg-black p-1'
              imgClassName='rounded-full'
              src={profileData.src}
              alt={profileData.alt}
              width={150}
              height={150}
            />
          </>
        ) : (
          <div className='aspect-square w-[150px] rounded-full bg-sidebar-background' />
        )}
      </Button>
    </div>
  );
}
