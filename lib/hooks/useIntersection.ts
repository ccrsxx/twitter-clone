import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

export function useIntersection(
  root: RefObject<HTMLElement> | null,
  target: RefObject<HTMLElement>,
  options?: {
    rootMargin?: string;
    threshold?: number | number[];
  }
): boolean {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const intersectionCallback = ([
      { isIntersecting }
    ]: IntersectionObserverEntry[]): void => setIsActive(isIntersecting);

    const observer = new IntersectionObserver(intersectionCallback, {
      root: root ? root?.current : null,
      rootMargin: options?.rootMargin ?? '0px',
      threshold: options?.threshold ?? 1.0
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    observer.observe(target.current!);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isActive;
}
