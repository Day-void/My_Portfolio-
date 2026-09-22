import { useState, useEffect, useRef } from "react";

/**
 * Tells you when an element is on screen.
 * Takes primitive options (not an options object) so the observer is only
 * created once instead of being rebuilt on every render.
 *
 * @param {Object} options
 * @param {number} options.threshold - 0..1 share of the element that must be visible
 * @param {string} options.rootMargin
 * @param {boolean} options.once - stay "visible" after the first time it appears
 */
export function useOnScreen({ threshold = 0, rootMargin = "0px", once = false } = {}) {
  const ref = useRef(null);
  // No IntersectionObserver (very old browsers): show everything immediately.
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
