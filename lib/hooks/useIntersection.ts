import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

export function useIntersection(
  target: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!target.current) return;

    const intersectionCallback = ([
      { isIntersecting }
    ]: IntersectionObserverEntry[]): void => setActive(isIntersecting);

    const observer = new IntersectionObserver(intersectionCallback, options);

    observer.observe(target.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.current]);

  return active;
}
