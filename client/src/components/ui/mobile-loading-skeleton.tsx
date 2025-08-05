import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface MobileLoadingSkeletonProps {
  type?: 'dashboard' | 'list' | 'card' | 'chart' | 'form';
  count?: number;
}

export default function MobileLoadingSkeleton({ type = 'dashboard', count = 1 }: MobileLoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'dashboard':
        return (
          <div className="animate-pulse space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="h-8 bg-gray-200 rounded w-12 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Chart Area */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="h-5 bg-gray-200 rounded w-32"></div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          </div>
        );

      case 'list':
        return (
          <div className="animate-pulse space-y-3">
            {[...Array(count)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        );

      case 'card':
        return (
          <div className="animate-pulse">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'chart':
        return (
          <div className="animate-pulse">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="h-5 bg-gray-200 rounded w-32"></div>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          </div>
        );

      case 'form':
        return (
          <div className="animate-pulse space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-28"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        );

      default:
        return (
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        );
    }
  };

  return (
    <div className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        {renderSkeleton()}
      </div>
    </div>
  );
}