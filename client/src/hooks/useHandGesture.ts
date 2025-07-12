import { useEffect, useRef } from 'react';

interface UseHandGestureProps {
  onZoomChange: (scale: number) => void;
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number;
}

export function useHandGesture({ 
  onZoomChange, 
  minZoom = 0.5, 
  maxZoom = 2.0, 
  initialZoom = 1.0 
}: UseHandGestureProps) {
  const zoomRef = useRef(initialZoom);
  const initialDistanceRef = useRef(0);
  const initialZoomRef = useRef(initialZoom);
  const isZoomingRef = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Prevent default zoom behavior
        e.preventDefault();
        e.stopPropagation();
        
        isZoomingRef.current = true;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        initialDistanceRef.current = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        initialZoomRef.current = zoomRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isZoomingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        if (initialDistanceRef.current > 0) {
          const scale = (currentDistance / initialDistanceRef.current) * initialZoomRef.current;
          const newZoom = Math.max(minZoom, Math.min(maxZoom, scale));
          
          zoomRef.current = newZoom;
          onZoomChange(newZoom);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        isZoomingRef.current = false;
        initialDistanceRef.current = 0;
      }
    };

    const handleTouchCancel = () => {
      isZoomingRef.current = false;
      initialDistanceRef.current = 0;
    };

    // Add event listeners to the entire document for global gesture support
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [onZoomChange, minZoom, maxZoom]);

  const setZoom = (newZoom: number) => {
    zoomRef.current = newZoom;
  };

  const getZoom = () => zoomRef.current;

  return { setZoom, getZoom };
}