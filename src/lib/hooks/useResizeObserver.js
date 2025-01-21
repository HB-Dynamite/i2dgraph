// useResizeObserver.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to measure the size of a DOM element using ResizeObserver.
 */
export function useResizeObserver(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.unobserve(ref.current);
      resizeObserver.disconnect();
    };
  }, [ref]);
  //print(dimensions)
  return dimensions;
}