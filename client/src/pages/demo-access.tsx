import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, ArrowRight, Shield, BarChart3, TrendingUp, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/footer";

export default function DemoAccess() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto-authenticate for demo access
    const autoLogin = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Demo authentication error:", error);
        setIsLoading(false);
      }
    };

    autoLogin();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Setting up demo access...</h3>
            <p className="text-gray-600 text-sm">Preparing your FinergyCloud experience</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Back to Solutions Button */}
        <div className="mb-6">
          <Link href="/solutions">
            <Button variant="outline" className="flex items-center gap-2 bg-white hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4" />
              Back to Solutions/Platform
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Comprehensive Investment Intelligence</h1>
          <p className="text-xl text-gray-600">
            Leverage cutting-edge AI and data analytics to make informed renewable energy investment decisions
          </p>
        </div>

        {/* Demo Access Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-green-600" />
                ESG Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Comprehensive ESG scoring dashboard with detailed analytics, risk assessment, and investment recommendations.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Project comparison and analysis
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Interactive charts and visualizations
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-500" />
                  Investment recommendations
                </li>
              </ul>
              <Link href="/web-esg-dashboard">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Access ESG Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                Mobile ESG Scoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Offline-enabled mobile interface for ESG scoring with real-time assessment capabilities and PWA support.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  Offline scoring capabilities
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  Real-time ESG assessment
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                  Mobile-optimized interface
                </li>
              </ul>
              <Link href="/mobile-scoring?platform=mobile&from=demo">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Access Mobile Scoring
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                KPI Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Real-time performance metrics and analytics dashboard with comprehensive portfolio insights and risk assessment.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  Portfolio performance tracking
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  Multi-currency support
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  Risk dashboard analytics
                </li>
              </ul>
              <Link href="/kpi?from=demo">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Access KPI Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Additional Platform Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/esg-assessment">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <Leaf className="w-6 h-6 text-green-600" />
                  <span>ESG Assessment Form</span>
                </Button>
              </Link>
              
              <Link href="/powerbi-dashboard?from=demo">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                  <span>PowerBI Dashboard</span>
                </Button>
              </Link>
              
              <Link href="/technical-charts">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <span>Technical Analytics</span>
                </Button>
              </Link>
              
              <Link href="/ai-risk-simulation?from=demo">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                  <span>AI Risk Simulation</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Note */}
        <div className="text-center mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> You're accessing FinergyCloud with full demonstration capabilities. 
            All features are available for exploration without registration requirements.
          </p>
        </div>
      </div>
    </div>
  );
}