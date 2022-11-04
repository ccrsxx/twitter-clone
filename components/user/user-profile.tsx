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
        className='accent-tab absolute -mt-3 aspect-square w-[144px] -translate-y-1/2 overflow-hidden
                   p-0 disabled:cursor-auto disabled:opacity-100 [&:hover>figure>span]:brightness-75'
        onClick={openModal}
        disabled={!profileData}
      >
        {profileData ? (
          <NextImage
            useSkeleton
            className='hover-animation bg-main-background p-1 [&>span]:rounded-full 
                       [&>span]:transition [&>span]:duration-200'
            imgClassName='rounded-full'
            src={profileData.src}
            alt={profileData.alt}
            width={144}
            height={144}
            key={profileData.src}
          />
        ) : (
          <div className='h-full rounded-full bg-main-background p-1'>
            <div className='h-full rounded-full bg-main-sidebar-background' />
          </div>
        )}
      </Button>
    </div>
  );
}
