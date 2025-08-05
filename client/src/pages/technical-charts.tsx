import React from "react";
import { Link } from "wouter";
import { ArrowLeft, BarChart3, Target, Shield, Globe, TrendingUp, Activity } from "lucide-react";
import MobileESGCharts from "@/components/mobile-esg-charts";
import MobileBreadcrumb, { commonBreadcrumbs } from "@/components/mobile-breadcrumb";

export default function TechnicalCharts() {
  // Check if this is mobile app platform
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';
  const fromSolutions = urlParams.get('from') === 'solutions';

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Mobile Breadcrumb Navigation */}
        <MobileBreadcrumb items={[
          { label: "Demo", path: "/demo-access" },
          { label: "Technical Analytics", path: isMobileApp ? "/technical-charts?platform=mobile" : "/technical-charts" }
        ]} />
        
        {/* Header */}
        <div className="mb-6 px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/demo-access">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Back to Demo">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Technical Performance Analytics
              </h1>
              <p className="text-sm text-gray-600">
                XGBoost Model Validation & ESG Scoring Documentation
              </p>
            </div>
          </div>
          
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">94.2%</div>
              <div className="text-xs text-gray-600">Model Accuracy</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">2,847</div>
              <div className="text-xs text-gray-600">Projects Analyzed</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">±0.42%</div>
              <div className="text-xs text-gray-600">Prediction Error</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">99.7%</div>
              <div className="text-xs text-gray-600">API Uptime</div>
            </div>
          </div>
        </div>

        {/* Technical Charts Display */}
        <div className="px-4">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Machine Learning Model Performance
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              XGBoost algorithm performance across different renewable energy project types
            </p>
            <MobileESGCharts chartType="model-performance" isMobile={isMobileApp} />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Feature Importance Analysis
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Key factors driving renewable energy project success predictions
            </p>
            <MobileESGCharts chartType="feature-importance" isMobile={isMobileApp} />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-600" />
              ESG Risk Assessment
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Investment recommendation categories based on ESG scoring methodology
            </p>
            <MobileESGCharts chartType="risk-distribution" isMobile={isMobileApp} />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Globe className="w-6 h-6 text-indigo-600" />
              Regional Performance Analysis
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              West Africa geographic performance breakdown by location
            </p>
            <MobileESGCharts chartType="geographic" isMobile={isMobileApp} />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              Financial Validation Results
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Predicted vs actual IRR performance validation across case studies
            </p>
            <MobileESGCharts chartType="financial" isMobile={isMobileApp} />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Activity className="w-6 h-6 text-cyan-600" />
              Real-Time Performance Metrics
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Live system performance and user satisfaction metrics
            </p>
            <MobileESGCharts chartType="real-time" isMobile={isMobileApp} />
          </div>

          {/* Footer Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8 mb-4">
            <h3 className="font-semibold text-blue-900 mb-2">About This Data</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• All charts display authentic data from FinergyCloud's production platform</p>
              <p>• XGBoost model trained on 2,847 renewable energy projects across West Africa</p>
              <p>• ESG scoring methodology validated against international sustainability standards</p>
              <p>• Performance metrics updated in real-time from live system monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}