import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

export function useIntersection(
  target: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const intersectionCallback = ([
      { isIntersecting }
    ]: IntersectionObserverEntry[]): void => setActive(isIntersecting);

    const observer = new IntersectionObserver(intersectionCallback, options);

    observer.observe(target.current as HTMLElement);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}
