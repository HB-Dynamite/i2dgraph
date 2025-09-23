// useResizeObserver.js
import { useState, useEffect, useRef } from 'react';

function isElement(node) {
  return !!node && typeof node === 'object' && node.nodeType === 1;
}

export function useResizeObserver(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const el = ref?.current;                         // snapshot element now
    if (!isElement(el) || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) return;
      const { width = 0, height = 0 } = entry.contentRect || {};

      // throttle & avoid micro-update loops
      if (rafId.current) cancelAnimationFrame(rafId.current);
      const w = Math.round(width);
      const h = Math.round(height);
      rafId.current = requestAnimationFrame(() => {
        setDimensions(prev => (prev.width === w && prev.height === h ? prev : { width: w, height: h }));
      });
    });

    try { ro.observe(el); } catch (_) {}

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      try { if (isElement(el)) ro.unobserve(el); } catch (_) {}
      try { ro.disconnect(); } catch (_) {}
    };
    // Re-run only if the actual DOM node instance changes
  }, [ref?.current]);

  return dimensions;
}
