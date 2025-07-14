import { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
  maxDistance?: number;
}

export default function PullToRefresh({ 
  onRefresh, 
  children, 
  threshold = 80, 
  maxDistance = 120 
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      const scrollTop = container.scrollTop;
      if (scrollTop === 0) {
        setStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isRefreshing) return;
      
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;
      
      if (distance > 0 && container.scrollTop === 0) {
        e.preventDefault();
        const clampedDistance = Math.min(distance, maxDistance);
        setPullDistance(clampedDistance);
        setIsPulling(clampedDistance > threshold);
      }
    };

    const handleTouchEnd = async () => {
      if (isPulling && pullDistance > threshold) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      setIsPulling(false);
      setPullDistance(0);
      setStartY(0);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, pullDistance, threshold, maxDistance, startY, isRefreshing, onRefresh]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-auto touch-manipulation"
      style={{ height: '100%' }}
    >
      {/* Pull to refresh indicator */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-200 ${
          pullDistance > 0 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: `${pullDistance}px`,
          transform: `translateY(-${Math.max(0, pullDistance - 40)}px)`,
        }}
      >
        <div className="flex items-center space-x-2 text-blue-600">
          <RefreshCw 
            className={`w-5 h-5 ${
              isRefreshing ? 'animate-spin' : isPulling ? 'animate-pulse' : ''
            }`} 
          />
          <span className="text-sm font-medium">
            {isRefreshing ? 'Refreshing...' : isPulling ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingTop: pullDistance > 0 ? `${pullDistance}px` : '0' }}>
        {children}
      </div>
    </div>
  );
}