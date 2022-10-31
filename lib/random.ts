import { randomBytes } from 'crypto';

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomId(): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const maxMultiple = Math.floor(256 / chars.length) * chars.length;

  let autoId = '';

  const targetLength = 20;

  while (autoId.length < targetLength) {
    const bytes = randomBytes(40);
    for (let i = 0; i < bytes.length; ++i)
      if (autoId.length < targetLength && bytes[i] < maxMultiple)
        autoId += chars.charAt(bytes[i] % chars.length);
  }

  return autoId;
}
