import type { SyntheticEvent } from 'react';

export function preventBubbling(
  callback?: (() => void) | null,
  preventDefault?: boolean
) {
  return (e: SyntheticEvent): void => {
    if (preventDefault) e.preventDefault();
    else e.stopPropagation();

    if (callback) callback();
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
