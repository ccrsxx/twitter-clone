import { toast } from 'react-hot-toast';
import type { FilesWithId, ImagesPreview } from './types/file';

const IMAGE_EXTENSIONS = [
  'apng',
  'avif',
  'gif',
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'svg',
  'webp'
];

export function isValidImage(name: string, bytes: number): boolean {
  return (
    IMAGE_EXTENSIONS.includes(name.split('.').pop() ?? '') &&
    bytes < 20 * Math.pow(1024, 2)
  );
}

export function isValidUsername(
  username: string,
  value: string
): string | null {
  if (value.length < 4) return 'Username must be at least 4 characters';
  if (value.length > 15) return 'Username must be less than 15 characters';
  if (!/^\w+$/i.test(value))
    return 'Username can only contain letters, numbers and _';
  if (!/[a-z]/i.test(value)) return 'Username must include at least one letter';
  if (value === username) return 'This is your current username';

  return null;
}

type ImagesData = {
  imagesPreviewData: ImagesPreview;
  selectedImagesData: FilesWithId;
};

export function getImagesData(
  files: FileList | null,
  currentFiles: number
): ImagesData | null {
  if (!files || !files.length) return null;

  const rawImages = !(currentFiles === 4 || files.length > 4 - currentFiles)
    ? Array.from(files).filter(({ name, size }) => isValidImage(name, size))
    : null;

  if (!rawImages) {
    toast.error('Please choose a GIF or photo up to 4');
    return null;
  }

  const imagesId = rawImages.map((_, index) =>
    Math.floor(Date.now() + Math.random() + index)
  );

  const imagesPreviewData = rawImages.map((image, index) => ({
    id: imagesId[index],
    src: URL.createObjectURL(image),
    alt: image.name
  }));

  const selectedImagesData = rawImages.map((image, index) =>
    Object.assign(image, { id: imagesId[index] })
  );

  return { imagesPreviewData, selectedImagesData };
}
