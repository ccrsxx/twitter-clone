const FORMATTER = new Intl.NumberFormat('en-GB', {
  notation: 'compact',
  maximumFractionDigits: 1
});

export function formatNumber(number: number): string {
  return FORMATTER.format(number);
}

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
