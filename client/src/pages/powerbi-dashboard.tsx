import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, RefreshCw } from "lucide-react";
import { Link, useLocation } from "wouter";
import PowerBIESGDashboard from "@/components/powerbi-esg-dashboard";
import MobileBreadcrumb, { commonBreadcrumbs } from "@/components/mobile-breadcrumb";

export default function PowerBIDashboardPage() {
  const [location] = useLocation();

  // Check if this is mobile app platform
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';
  const fromSolutions = urlParams.get('from') === 'solutions';
  const fromKPI = urlParams.get('from') === 'kpi';
  const fromDemo = urlParams.get('from') === 'demo';

  // Determine back navigation - prioritize demo context
  const getBackPath = () => {
    if (fromDemo) return '/demo-access';
    if (fromSolutions) return '/solutions';
    if (fromKPI) return '/kpi';
    if (isMobileApp) return '/demo-access';
    return '/demo-access'; // Default to demo for website users
  };

  const getBackLabel = () => {
    if (fromDemo) return 'Back to Demo';
    if (fromSolutions) return 'Back to Solutions';
    if (fromKPI) return 'Back to KPI Dashboard';
    return 'Back to Demo'; // Default to demo for website users
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Breadcrumb */}
      {isMobileApp && (
        <MobileBreadcrumb 
          items={[
            { 
              label: "PowerBI Dashboard", 
              current: true 
            }
          ]} 
        />
      )}

      {/* Header */}
      <div className={`bg-white border-b ${isMobileApp ? 'sticky top-0 z-10' : ''}`}>
        <div className={`${isMobileApp ? 'px-4 py-3' : 'max-w-7xl mx-auto px-6 py-4'}`}>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Link href={getBackPath()}>
                    <Button variant="outline" size="sm" className="shrink-0">
                      <ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm">{getBackLabel()}</span>
                    </Button>
                  </Link>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 truncate">
                      PowerBI ESG Dashboard
                    </h1>
                  </div>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-tight pl-0 sm:pl-0">
                  Real-time investor dashboard with comprehensive analytics
                </p>
              </div>
              
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <RefreshCw className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden md:inline">Refresh</span>
                </Button>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <Download className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden md:inline">Export</span>
                </Button>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <Share2 className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden md:inline">Share</span>
                </Button>
              </div>
            </div>
            
            {/* Mobile Action Buttons */}
            <div className="flex sm:hidden items-center gap-2 overflow-x-auto">
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PowerBI Dashboard */}
      <div className={`${isMobileApp ? 'p-4' : 'max-w-7xl mx-auto p-6'}`}>
        <PowerBIESGDashboard 
          isMobile={isMobileApp} 
          showTitle={false} 
        />
      </div>

      {/* Quick Actions Footer */}
      <div className={`bg-white border-t mt-8 ${isMobileApp ? 'p-4' : 'py-6'}`}>
        <div className={`${isMobileApp ? '' : 'max-w-7xl mx-auto px-6'}`}>
          <div className={`grid ${isMobileApp ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-6'}`}>
            <div className="text-center">
              <h4 className={`font-semibold ${isMobileApp ? 'text-sm' : 'text-base'} text-gray-900 mb-2`}>
                Real-Time Updates
              </h4>
              <p className={`${isMobileApp ? 'text-xs' : 'text-sm'} text-gray-600`}>
                Dashboard refreshes every 2 minutes with latest portfolio data
              </p>
            </div>
            
            <div className="text-center">
              <h4 className={`font-semibold ${isMobileApp ? 'text-sm' : 'text-base'} text-gray-900 mb-2`}>
                AI-Powered Insights
              </h4>
              <p className={`${isMobileApp ? 'text-xs' : 'text-sm'} text-gray-600`}>
                XGBoost machine learning with 94.2% prediction accuracy
              </p>
            </div>
            
            <div className="text-center">
              <h4 className={`font-semibold ${isMobileApp ? 'text-sm' : 'text-base'} text-gray-900 mb-2`}>
                Interactive Analytics
              </h4>
              <p className={`${isMobileApp ? 'text-xs' : 'text-sm'} text-gray-600`}>
                Click elements for detailed breakdowns and risk analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}