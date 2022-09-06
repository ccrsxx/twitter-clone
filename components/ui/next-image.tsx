import { useState } from 'react';
import Image from 'next/image';
import cn from 'clsx';
import type { ReactNode } from 'react';
import type { ImageProps } from 'next/image';

type NextImageProps = {
  alt: string;
  width?: string | number;
  children?: ReactNode;
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
} & ImageProps;

/**
 *
 * @description Must set width and height, if not add layout='fill'
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export function NextImage({
  src,
  alt,
  width,
  height,
  children,
  className,
  useSkeleton,
  imgClassName,
  blurClassName,
  ...rest
}: NextImageProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(!!useSkeleton);

  const handleLoad = (): void => setIsLoading(false);

  return (
    <figure style={{ width }} className={className}>
      <Image
        className={cn(
          imgClassName,
          isLoading && cn('animate-pulse bg-white', blurClassName)
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={handleLoad}
        layout='responsive'
        {...rest}
      />
      {children}
    </figure>
  );
}
