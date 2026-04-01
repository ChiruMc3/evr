// ✅ re-render optimized
import { useState, useCallback } from 'react';

export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const next = useCallback((total) => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, []);

  const prev = useCallback((total) => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, []);

  return { isOpen, currentIndex, open, close, next, prev };
}
