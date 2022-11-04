import Link from 'next/link';
import cn from 'clsx';
import { NextImage } from './next-image';

type ProfilePictureProps = {
  src: string;
  alt: string;
  size?: number;
  username?: string;
};

export function ProfilePicture({
  src,
  alt,
  size,
  username
}: ProfilePictureProps): JSX.Element {
  const pictureSize = size ?? 48;

  return (
    <Link href={username ? `/user/${username}` : '#'}>
      <a
        className={cn(
          'blur-picture flex self-start',
          !username && 'pointer-events-none'
        )}
        tabIndex={username ? 0 : -1}
      >
        <NextImage
          useSkeleton
          imgClassName='rounded-full'
          width={pictureSize}
          height={pictureSize}
          src={src}
          alt={alt}
          key={src}
        />
      </a>
    </Link>
  );
}
