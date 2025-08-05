import React from "react";
import AIRiskSimulationResults from "@/components/ai-risk-simulation-results";
import MobileBreadcrumb, { commonBreadcrumbs } from "@/components/mobile-breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Target } from "lucide-react";
import { Link } from "wouter";

export default function AIRiskSimulation() {
  // Check if this is mobile app platform
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';
  const fromSolutions = urlParams.get('from') === 'solutions';
  const fromDemo = urlParams.get('from') === 'demo';

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className={`${isMobileApp ? 'max-w-md mx-auto px-4' : 'max-w-7xl mx-auto px-6'}`}>
        {/* Mobile Breadcrumb Navigation */}
        {isMobileApp && <MobileBreadcrumb items={commonBreadcrumbs.aiModel} />}
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Link href={fromDemo ? "/demo-access" : (fromSolutions ? "/solutions" : "/demo-access")}>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {fromDemo ? "Back to Demo" : (fromSolutions ? "Back to Solutions" : "Back to Demo")}
              </Button>
            </Link>
            <div>
              <h1 className={`${isMobileApp ? 'text-xl' : 'text-3xl'} font-bold text-gray-900`}>
                AI Risk Simulation
              </h1>
              <p className={`${isMobileApp ? 'text-sm' : 'text-base'} text-gray-600 mt-1`}>
                Comparative risk analysis of solar projects across West & East Africa
              </p>
            </div>
          </div>
        </div>

        {/* Introduction Card */}
        <Card className="mb-6 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              XGBoost AI Risk Engine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                Our advanced AI risk simulation engine analyzes multiple renewable energy projects 
                simultaneously, comparing risk factors, financial returns, and ESG impacts across 
                different markets.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span>Multi-country comparison</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span>94% prediction accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span>Real-time risk assessment</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Risk Simulation Results */}
        <AIRiskSimulationResults isMobile={isMobileApp} />
      </div>
    </div>
  );
}