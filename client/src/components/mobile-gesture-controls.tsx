import { useState, useEffect, useRef } from 'react';
import { useLocation, useRouter } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Move,
  Hand
} from 'lucide-react';

interface GestureState {
  isActive: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

export default function MobileGestureControls() {
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
  const [showGestureHint, setShowGestureHint] = useState(false);
  const [gestureHistory, setGestureHistory] = useState<string[]>([]);
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
    router.navigate(newPath);
    setGestureHistory(prev => [...prev.slice(-4), `${direction} → ${newPath}`]);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    setGestureState({
      isActive: true,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      direction: null
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!gestureState.isActive) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - gestureState.startX;
    const deltaY = touch.clientY - gestureState.startY;

    // Determine direction based on dominant movement
    let direction: 'left' | 'right' | 'up' | 'down' | null = null;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 50 ? 'right' : deltaX < -50 ? 'left' : null;
    } else {
      direction = deltaY > 50 ? 'down' : deltaY < -50 ? 'up' : null;
    }

    setGestureState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
      direction
    }));

    // Show visual feedback for valid gestures
    if (direction === 'left' || direction === 'right') {
      e.preventDefault(); // Prevent scrolling during navigation gestures
    }
  };

  const handleTouchEnd = () => {
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

  // Auto-hide gesture hint after 5 seconds
  useEffect(() => {
    if (showGestureHint) {
      const timer = setTimeout(() => setShowGestureHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showGestureHint]);

  return (
    <>
      {/* Gesture Detection Area */}
      <div 
        ref={gestureRef}
        className="fixed inset-0 z-10 pointer-events-auto md:hidden"
        style={{ touchAction: 'pan-y' }}
      />

      {/* Mobile Gesture Controls */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <Card className="bg-white/90 backdrop-blur-sm border shadow-lg">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Hand className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium">Gesture Controls</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGestureHint(!showGestureHint)}
                className="h-6 px-2 text-xs"
              >
                {showGestureHint ? 'Hide' : 'Help'}
              </Button>
            </div>

            {/* Current Gesture Indicator */}
            {gestureState.isActive && (
              <div className="mb-2 p-2 bg-primary/10 rounded text-center">
                <div className="text-xs text-primary font-medium">
                  {gestureState.direction === 'left' && '← Swipe Left: Previous Page'}
                  {gestureState.direction === 'right' && '→ Swipe Right: Next Page'}
                  {gestureState.direction === 'up' && '↑ Swipe Up: Scroll'}
                  {gestureState.direction === 'down' && '↓ Swipe Down: Scroll'}
                  {!gestureState.direction && 'Detecting gesture...'}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateWithGesture('left')}
                className="flex-1 h-8"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateWithGesture('right')}
                className="flex-1 h-8"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Gesture History */}
            {gestureHistory.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                Last: {gestureHistory[gestureHistory.length - 1]}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Gesture Help Overlay */}
      {showGestureHint && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="max-w-sm w-full bg-white">
              <div className="p-6">
                <h3 className="font-semibold mb-4 text-center">Gesture Controls</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <ChevronLeft className="w-4 h-4 text-primary" />
                    </div>
                    <span>Swipe left for previous page</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                    <span>Swipe right for next page</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Move className="w-4 h-4 text-secondary" />
                    </div>
                    <span>Vertical swipes for scrolling</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setShowGestureHint(false)}
                >
                  Got it!
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}