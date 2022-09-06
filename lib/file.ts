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
