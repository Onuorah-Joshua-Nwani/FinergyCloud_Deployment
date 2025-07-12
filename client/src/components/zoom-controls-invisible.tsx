import { useState, useEffect } from 'react';

interface ZoomControlsProps {
  onZoomChange?: (zoom: number) => void;
  minZoom?: number;
  maxZoom?: number;
}

export default function ZoomControls({ 
  onZoomChange, 
  minZoom = 0.5, 
  maxZoom = 2.0
}: ZoomControlsProps) {
  const [zoom, setZoom] = useState(1.0);
  const [isVisible, setIsVisible] = useState(false);

  // Detect if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 1024 || 
                       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsVisible(isMobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apply zoom transformation to content
  const applyZoom = (scale: number) => {
    const zoomContainer = document.querySelector('.zoom-container');
    if (zoomContainer) {
      (zoomContainer as HTMLElement).style.transform = `scale(${scale})`;
    }
    
    // Also apply to main content for broader compatibility
    const mainContent = document.querySelector('main');
    if (mainContent && mainContent.classList.contains('zoom-container')) {
      (mainContent as HTMLElement).style.transform = `scale(${scale})`;
    }
  };

  // Enhanced touch gesture handling for pinch-to-zoom
  useEffect(() => {
    let initialDistance = 0;
    let initialZoom = zoom;
    let isZooming = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Only prevent default for two-finger gestures (pinch-to-zoom)
        e.preventDefault();
        isZooming = true;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        initialZoom = zoom;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isZooming) {
        // Only prevent default for pinch gestures, allow scrolling for single finger
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        if (initialDistance > 0) {
          const scale = (currentDistance / initialDistance) * initialZoom;
          const newZoom = Math.max(minZoom, Math.min(maxZoom, scale));
          setZoom(newZoom);
          applyZoom(newZoom);
          onZoomChange?.(newZoom);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        initialDistance = 0;
        isZooming = false;
      }
    };

    const handleTouchCancel = () => {
      initialDistance = 0;
      isZooming = false;
    };

    // Add event listeners to document for global gesture support
    if (isVisible) {
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });
      document.addEventListener('touchcancel', handleTouchCancel, { passive: false });
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [isVisible, zoom, minZoom, maxZoom, onZoomChange]);

  // This component handles gesture zoom invisibly - no UI elements rendered
  return null;
}