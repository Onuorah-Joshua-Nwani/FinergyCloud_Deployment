import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PowerBIESGDashboard from "@/components/powerbi-esg-dashboard";

export default function ESGResult() {
  const [location] = useLocation();
  const [isMobileApp, setIsMobileApp] = useState(false);
  const [returnUrl, setReturnUrl] = useState('/demo-access');

  // Check platform and navigation context
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const platform = urlParams.get('platform');
    const fromParam = urlParams.get('from');
    
    setIsMobileApp(platform === 'mobile');
    
    // Determine return URL based on context
    if (fromParam === 'demo') {
      setReturnUrl('/demo-access');
    } else if (platform === 'mobile' && fromParam !== 'demo') {
      setReturnUrl('/?platform=mobile');
    } else {
      setReturnUrl('/demo-access');
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile App Header */}
      {isMobileApp && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href={returnUrl}>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {returnUrl === '/demo-access' ? 'Back to Demo' : 'Back to Dashboard'}
                </Button>
              </Link>
              <div className="text-center">
                <h1 className="text-lg font-bold text-gray-900">ESG Results</h1>
                <p className="text-sm text-gray-600">PowerBI Dashboard</p>
              </div>
              <div className="w-[120px]"></div> {/* Spacer for alignment */}
            </div>
          </div>
        </div>
      )}

      {/* Non-Mobile Header */}
      {!isMobileApp && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/esg-scoring">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to ESG Scoring
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ESG Analytics Dashboard</h1>
                  <p className="text-sm text-gray-600">PowerBI-Style Investment Analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PowerBI ESG Dashboard Content */}
      <div className={`${isMobileApp ? 'px-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} py-6`}>
        <PowerBIESGDashboard />
      </div>
    </div>
  );
}