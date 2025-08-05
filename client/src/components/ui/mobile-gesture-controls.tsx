import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useRouter } from 'wouter';

interface GestureState {
  isActive: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

interface MobileGestureControlsProps {
  disabled?: boolean;
}

export default function MobileGestureControls({ disabled = false }: MobileGestureControlsProps) {
  const [location] = useLocation();
  const router = useRouter();
  const [gestureState, setGestureState] = useState<GestureState>({
    isActive: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    direction: null
  });

  const gestureRef = useRef<HTMLDivElement>(null);

  const navigationPaths = [
    '/dashboard',
    '/kpi',
    '/projects',
    '/market-insights',
    '/ai-model',
    '/irr-calculator',
    '/esg-scoring'
  ];

  const getCurrentPathIndex = () => {
    const index = navigationPaths.findIndex(path => path === location);
    return index !== -1 ? index : 0;
  };

  const navigateWithGesture = (direction: 'left' | 'right') => {
    const currentIndex = getCurrentPathIndex();
    let newIndex;

    if (direction === 'right') {
      newIndex = (currentIndex + 1) % navigationPaths.length;
    } else {
      newIndex = currentIndex === 0 ? navigationPaths.length - 1 : currentIndex - 1;
    }

    const newPath = navigationPaths[newIndex];
    // Use window.location to navigate with mobile platform parameter
    window.location.href = `${newPath}?platform=mobile`;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
    if (disabled) return;
    
    const touch = e.touches[0];
    const screenWidth = window.innerWidth;
    const edgeZone = 50; // Only activate gestures from screen edges
    
    // Only activate gestures if starting from the edges
    if (touch.clientX <= edgeZone || touch.clientX >= screenWidth - edgeZone) {
      setGestureState({
        isActive: true,
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        direction: null
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
    if (!gestureState.isActive) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - gestureState.startX;
    const deltaY = touch.clientY - gestureState.startY;

    // Only process gestures if they're strong enough and horizontal
    const minSwipeDistance = 80; // Increased threshold
    const maxVerticalDeviation = 60; // Allow some vertical movement
    
    // Determine direction based on dominant movement
    let direction: 'left' | 'right' | 'up' | 'down' | null = null;
    
    // Only consider horizontal swipes for navigation
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < maxVerticalDeviation) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
      // Allow vertical scrolling - don't interfere
      direction = deltaY > 0 ? 'down' : 'up';
    }

    setGestureState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
      direction
    }));

    // Only prevent default for confirmed horizontal navigation gestures
    if (direction === 'left' || direction === 'right') {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e?: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
    if (gestureState.direction === 'left' || gestureState.direction === 'right') {
      navigateWithGesture(gestureState.direction);
    }

    setGestureState({
      isActive: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      direction: null
    });
  };

  useEffect(() => {
    const element = gestureRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gestureState.isActive]);

  if (disabled) {
    return null;
  }

  return (
    <>
      {/* Single gesture detection area covering both edges */}
      <div 
        ref={gestureRef}
        className="fixed inset-0 z-10 pointer-events-none md:hidden"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Left edge detection */}
        <div 
          className="fixed inset-y-0 left-0 w-12 pointer-events-auto"
          style={{ touchAction: 'pan-y' }}
        />
        {/* Right edge detection */}
        <div 
          className="fixed inset-y-0 right-0 w-12 pointer-events-auto"
          style={{ touchAction: 'pan-y' }}
        />
      </div>
    </>
  );
}