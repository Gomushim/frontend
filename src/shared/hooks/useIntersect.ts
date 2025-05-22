import { useCallback, useEffect, useRef } from "react";

type Intersect = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

export const useIntersect = <T extends HTMLElement>(onIntersect: Intersect, loading: boolean) => {
  const ref = useRef<T>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && loading) onIntersect(entry, observer);
      });
    },
    [onIntersect, loading]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return ref;
};
