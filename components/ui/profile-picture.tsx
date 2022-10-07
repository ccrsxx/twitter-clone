import Link from 'next/link';
import cn from 'clsx';
import { NextImage } from './next-image';

type ProfilePictureProps = {
  src: string;
  alt: string;
  size?: number;
  username: string;
  disableLink?: boolean;
};

export function ProfilePicture({
  src,
  alt,
  size,
  username,
  disableLink
}: ProfilePictureProps): JSX.Element {
  const pictureSize = size ?? 48;

  return (
    <Link href={`/user/${username}`}>
      <a
        className={cn(
          'blur-picture self-start',
          disableLink && 'pointer-events-none'
        )}
      >
        <NextImage
          useSkeleton
          imgClassName='rounded-full'
          width={pictureSize}
          height={pictureSize}
          src={src}
          alt={alt}
        />
      </a>
    </Link>
  );
}
