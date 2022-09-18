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
