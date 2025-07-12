import { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  // Touch gesture handling for pinch-to-zoom
  useEffect(() => {
    let initialDistance = 0;
    let initialZoom = zoom;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
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
      if (e.touches.length === 2) {
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
      }
    };

    if (isVisible) {
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
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