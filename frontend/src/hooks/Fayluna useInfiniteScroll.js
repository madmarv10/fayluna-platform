import { useEffect, useRef } from 'react';

/**
 * useInfiniteScroll
 * Triggers a callback when the user scrolls near the bottom of the target.
 *
 * @param {Function} callback - The function to call when near bottom.
 * @param {boolean} hasMore - Whether more content is available to load.
 * @param {boolean} isLoading - Whether a request is currently in progress.
 * @param {number} threshold - How close (in px) to the bottom before triggering.
 * @returns {Object} - A ref to attach to the bottom sentinel element.
 */
const useInfiniteScroll = (callback, hasMore, isLoading, threshold = 300) => {
  const observerRef = useRef();

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      { rootMargin: `0px 0px ${threshold}px 0px` }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [callback, hasMore, isLoading, threshold]);

  return observerRef;
};

export default useInfiniteScroll;
