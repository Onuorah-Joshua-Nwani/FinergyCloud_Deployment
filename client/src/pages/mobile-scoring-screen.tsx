import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  ArrowLeft,
  BarChart3,
  Wifi,
  WifiOff,
  PieChart
} from "lucide-react";
import { Link, useLocation } from "wouter";
import ESGAssessmentForm from "@/components/esg-assessment-form";
import PowerBIESGDashboard from "@/components/powerbi-esg-dashboard";
import MobileBreadcrumb, { commonBreadcrumbs } from "@/components/mobile-breadcrumb";

export default function MobileScoringScreen() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [location] = useLocation();
  const [showBackButton, setShowBackButton] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showPowerBI, setShowPowerBI] = useState(false);

  // Monitor online/offline status
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

  // Check if coming from solutions page or demo
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from');
    setShowBackButton(fromParam === 'solutions' || fromParam === 'demo');
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header - Hide when coming from demo */}
      {(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const fromParam = urlParams.get('from');
        
        // Don't show header navigation when coming from demo
        if (fromParam === 'demo') {
          return null;
        }
        
        return (
          <div className="bg-white border-b sticky top-0 z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const platformParam = urlParams.get('platform');
                  
                  // Mobile app context: return to mobile dashboard
                  if (platformParam === 'mobile') {
                    return (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Return to Dashboard"
                        onClick={() => window.location.href = '/?platform=mobile'}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    );
                  }
                  
                  // Default: back to demo
                  return (
                    <Link href="/demo-access">
                      <Button variant="ghost" size="sm" title="Back to Demo">
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    </Link>
                  );
                })()}
                <div>
                  <h1 className="font-bold text-lg">Mobile ESG Scoring</h1>
                  <p className="text-xs text-gray-600">Offline-enabled assessment</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-500" />
                    <Badge variant="secondary" className="text-xs">Online</Badge>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-red-500" />
                    <Badge variant="outline" className="text-xs">Offline</Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      <div className="max-w-md mx-auto p-4">
        {/* Mobile Breadcrumb Navigation */}
        {(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const fromParam = urlParams.get('from');
          const platformParam = urlParams.get('platform');
          
          // Demo context: no breadcrumb navigation
          if (fromParam === 'demo') {
            return null;
          }
          
          // Mobile app context: show breadcrumb navigation
          if (platformParam === 'mobile') {
            return <MobileBreadcrumb items={commonBreadcrumbs.esgScoring} />;
          }
          
          return null;
        })()}
        {/* Connection Status */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                ) : (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
                <span className="text-sm font-medium">
                  {isOnline ? "Connected" : "Offline Mode"}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {isOnline ? "Real-time scoring" : "Cached data available"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Toggles */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button
            onClick={() => setShowAnalytics(!showAnalytics)}
            variant={showAnalytics ? "default" : "outline"}
            className="text-sm"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button
            onClick={() => setShowPowerBI(!showPowerBI)}
            variant={showPowerBI ? "default" : "outline"}
            className="text-sm"
          >
            <PieChart className="w-4 h-4 mr-2" />
            PowerBI
          </Button>
        </div>

        {/* ESG Assessment Form */}
        <ESGAssessmentForm isMobile={true} />

        {/* PowerBI Dashboard Section */}
        {showPowerBI && (
          <div className="mt-6">
            <PowerBIESGDashboard isMobile={true} showTitle={true} />
          </div>
        )}

        {/* Analytics Section */}
        {showAnalytics && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">ESG Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Technical validation data for ESG scoring methodology
              </p>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Model Accuracy</span>
                    <Badge variant="secondary">94.2%</Badge>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Response Time</span>
                    <Badge variant="secondary">247ms</Badge>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Data Freshness</span>
                    <Badge variant="secondary">{isOnline ? "Live" : "Cached"}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}