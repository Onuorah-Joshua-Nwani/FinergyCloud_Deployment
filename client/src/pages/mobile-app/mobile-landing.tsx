import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, TrendingUp, Globe, Shield } from "lucide-react";
import { Link } from "wouter";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FinergyCloud Mobile App
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Access your renewable energy investment portfolio on the go. Monitor projects, track ESG scores, and make data-driven decisions anywhere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login?platform=mobile">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Login to App
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => window.open('/', '_blank')}>
              Visit Website
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Portfolio Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Real-time monitoring of your renewable energy investments with detailed performance metrics and analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-600" />
                ESG Scoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Comprehensive Environmental, Social, and Governance scoring to ensure sustainable investment decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-600" />
                AI Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Advanced machine learning models provide accurate project success predictions and market insights.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* App Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Mobile-Optimized Experience
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our mobile app is designed specifically for renewable energy investors who need quick access to their portfolio data, 
            market insights, and project analytics while on the move.
          </p>
        </div>
      </div>
    </div>
  );
}