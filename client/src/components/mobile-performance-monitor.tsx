import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { Wifi, WifiOff, Battery, BatteryLow, Zap } from 'lucide-react';

export default function MobilePerformanceMonitor() {
  const { isOnline, networkType, isSlowConnection, batteryInfo, deviceInfo } = useMobileOptimization();
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    // Show monitor if on mobile and there are performance concerns
    if (deviceInfo.isMobile && (isSlowConnection || !isOnline || (batteryInfo.level && batteryInfo.level < 0.2))) {
      setShowMonitor(true);
    } else {
      setShowMonitor(false);
    }
  }, [deviceInfo.isMobile, isSlowConnection, isOnline, batteryInfo.level]);

  if (!showMonitor) return null;

  return (
    <div className="fixed top-16 right-4 z-40 space-y-2">
      {/* Network Status */}
      {!isOnline && (
        <Badge variant="destructive" className="flex items-center space-x-1">
          <WifiOff className="w-3 h-3" />
          <span className="text-xs">Offline</span>
        </Badge>
      )}
      
      {isOnline && isSlowConnection && (
        <Badge variant="outline" className="flex items-center space-x-1 bg-amber-50 text-amber-700 border-amber-200">
          <Wifi className="w-3 h-3" />
          <span className="text-xs">Slow Network</span>
        </Badge>
      )}
      
      {/* Battery Status */}
      {batteryInfo.level && batteryInfo.level < 0.2 && (
        <Badge variant="outline" className="flex items-center space-x-1 bg-red-50 text-red-700 border-red-200">
          <BatteryLow className="w-3 h-3" />
          <span className="text-xs">Low Battery</span>
        </Badge>
      )}
      
      {/* Performance Mode */}
      {(isSlowConnection || (batteryInfo.level && batteryInfo.level < 0.2)) && (
        <Badge variant="outline" className="flex items-center space-x-1 bg-green-50 text-green-700 border-green-200">
          <Zap className="w-3 h-3" />
          <span className="text-xs">Power Saving</span>
        </Badge>
      )}
    </div>
  );
}