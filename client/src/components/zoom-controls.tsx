import { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHandGesture } from '@/hooks/useHandGesture';

interface ZoomControlsProps {
  onZoomChange?: (scale: number) => void;
  minZoom?: number;
  maxZoom?: number;
  step?: number;
}

export default function ZoomControls({ 
  onZoomChange, 
  minZoom = 0.5, 
  maxZoom = 2.0, 
  step = 0.1 
}: ZoomControlsProps) {
  const [zoom, setZoom] = useState(1.0);
  const [isVisible, setIsVisible] = useState(false);

  // Hand gesture support for pinch-to-zoom
  const { setZoom: setGestureZoom } = useHandGesture({
    onZoomChange: (newZoom) => {
      setZoom(newZoom);
      applyZoom(newZoom);
      onZoomChange?.(newZoom);
    },
    minZoom,
    maxZoom,
    initialZoom: zoom
  });

  // Show zoom controls only on mobile devices
  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
      setIsVisible(isMobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle zoom in
  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + step, maxZoom);
    setZoom(newZoom);
    applyZoom(newZoom);
    onZoomChange?.(newZoom);
  };

  // Handle zoom out
  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - step, minZoom);
    setZoom(newZoom);
    applyZoom(newZoom);
    onZoomChange?.(newZoom);
  };

  // Reset zoom
  const handleZoomReset = () => {
    setZoom(1.0);
    applyZoom(1.0);
    onZoomChange?.(1.0);
  };

  // Apply zoom to the main content area
  const applyZoom = (scale: number) => {
    const mainContent = document.querySelector('main') || document.querySelector('.zoom-container');
    if (mainContent) {
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
        e.preventDefault();
        e.stopPropagation();
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
        e.preventDefault();
        e.stopPropagation();
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

    // Prevent default touch behavior on the zoom container
    const handleTouchCancel = () => {
      initialDistance = 0;
      isZooming = false;
    };

    if (isVisible) {
      const zoomContainer = document.querySelector('.zoom-container');
      if (zoomContainer) {
        zoomContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
        zoomContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        zoomContainer.addEventListener('touchend', handleTouchEnd, { passive: false });
        zoomContainer.addEventListener('touchcancel', handleTouchCancel, { passive: false });
      }
    }

    return () => {
      const zoomContainer = document.querySelector('.zoom-container');
      if (zoomContainer) {
        zoomContainer.removeEventListener('touchstart', handleTouchStart);
        zoomContainer.removeEventListener('touchmove', handleTouchMove);
        zoomContainer.removeEventListener('touchend', handleTouchEnd);
        zoomContainer.removeEventListener('touchcancel', handleTouchCancel);
      }
    };
  }, [isVisible, zoom, minZoom, maxZoom, onZoomChange]);

  if (!isVisible) return null;

  return (
    <div className="zoom-controls">
      <Button
        size="icon"
        className="zoom-button"
        onClick={handleZoomIn}
        disabled={zoom >= maxZoom}
        aria-label="Zoom in"
      >
        <Plus className="w-5 h-5" />
      </Button>
      
      <Button
        size="icon"
        className="zoom-button"
        onClick={handleZoomReset}
        aria-label="Reset zoom"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
      
      <Button
        size="icon"
        className="zoom-button"
        onClick={handleZoomOut}
        disabled={zoom <= minZoom}
        aria-label="Zoom out"
      >
        <Minus className="w-5 h-5" />
      </Button>
      
      {/* Zoom level indicator */}
      <div className="bg-white border border-gray-200 rounded-full px-2 py-1 text-xs text-gray-600 text-center shadow-sm">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}