import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MobileErrorBoundaryProps {
  error?: Error;
  onRetry?: () => void;
  type?: 'network' | 'api' | 'general';
  fallback?: React.ReactNode;
}

export default function MobileErrorBoundary({ 
  error, 
  onRetry, 
  type = 'general',
  fallback 
}: MobileErrorBoundaryProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getErrorConfig = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        title: 'No Internet Connection',
        message: 'Please check your internet connection and try again.',
        actionText: 'Retry',
        showOfflineMessage: true
      };
    }

    switch (type) {
      case 'network':
        return {
          icon: Wifi,
          title: 'Network Error',
          message: 'Unable to connect to FinergyCloud servers. Please check your connection.',
          actionText: 'Retry Connection',
          showOfflineMessage: false
        };
      
      case 'api':
        return {
          icon: AlertTriangle,
          title: 'Service Unavailable',
          message: 'FinergyCloud API is temporarily unavailable. Please try again in a moment.',
          actionText: 'Retry Request',
          showOfflineMessage: false
        };
      
      default:
        return {
          icon: AlertTriangle,
          title: 'Something went wrong',
          message: error?.message || 'An unexpected error occurred. Please try again.',
          actionText: 'Try Again',
          showOfflineMessage: false
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {config.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            {config.message}
          </p>
          
          {config.showOfflineMessage && (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-800">
                You're currently offline. Some features may not work until you reconnect.
              </p>
            </div>
          )}
          
          <div className="space-y-3">
            <Button 
              onClick={handleRetry} 
              className="w-full bg-blue-600 hover:bg-blue-700 min-h-[44px] touch-manipulation"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {config.actionText}
            </Button>
            
            {retryCount > 2 && (
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/?platform=mobile'}
                className="w-full min-h-[44px] touch-manipulation"
              >
                Return to Dashboard
              </Button>
            )}
          </div>
          
          {retryCount > 0 && (
            <p className="text-xs text-gray-500">
              Retry attempt: {retryCount}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}