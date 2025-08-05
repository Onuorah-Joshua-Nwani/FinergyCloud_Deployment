import ESGAssessmentForm from "@/components/esg-assessment-form";
import MobileBreadcrumb, { commonBreadcrumbs } from "@/components/mobile-breadcrumb";
import MobileESGCharts from "@/components/mobile-esg-charts";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function MobileESGAssessment() {
  // Check if this is mobile app platform
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';
  const fromSolutions = urlParams.get('from') === 'solutions';
  const [showCharts, setShowCharts] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Mobile Breadcrumb Navigation */}
        <MobileBreadcrumb items={commonBreadcrumbs.esgScoring} />
        
        {/* Header */}
        <div className="mb-6 px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href={fromSolutions ? "/solutions" : (isMobileApp ? "/?platform=mobile" : "/")}>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {isMobileApp ? "ESG Assessment" : "ESG Scoring & Assessment"}
              </h1>
              <p className="text-sm text-gray-600">
                {isMobileApp 
                  ? "Mobile ESG risk analysis for renewable projects"
                  : "Environmental, Social, and Governance assessment"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Toggle Button for Charts */}
        <div className="px-4 mb-4">
          <button
            onClick={() => setShowCharts(!showCharts)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <BarChart3 className="w-5 h-5" />
            {showCharts ? 'Hide ESG Analytics' : 'Show ESG Analytics'}
          </button>
        </div>

        {/* ESG Assessment Form */}
        <ESGAssessmentForm isMobile={true} />

        {/* Technical Charts Section */}
        {showCharts && (
          <div className="mt-8">
            <div className="px-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">ESG Performance Analytics</h2>
              <p className="text-sm text-gray-600">Technical validation data for ESG scoring methodology</p>
            </div>
            <MobileESGCharts chartType="risk-distribution" isMobile={true} />
            <MobileESGCharts chartType="geographic" isMobile={true} />
            <MobileESGCharts chartType="financial" isMobile={true} />
          </div>
        )}
      </div>
    </div>
  );
}