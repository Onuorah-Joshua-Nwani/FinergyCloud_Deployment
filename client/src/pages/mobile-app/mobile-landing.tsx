import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Brain, DollarSign, Globe, Leaf, Shield, TrendingUp, Users, Zap } from "lucide-react";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Mobile App Landing Content */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Mobile Platform
          </Badge>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            AI-Powered
          </Badge>
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            Investment Tools
          </Badge>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          FinergyCloud{" "}
          <span className="text-green-600">Mobile Platform</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
          Access your renewable energy investment portfolio, AI predictions, and ESG analytics 
          on the go. Full-featured mobile experience for professional investors.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
            <a href="/login" className="flex items-center">
              Login to Mobile App <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => window.open('/', '_blank')}
            className="flex items-center"
          >
            Visit FinergyCloud Website <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-blue-200">
          <p className="text-sm text-gray-600 mb-4">
            <strong>New to FinergyCloud?</strong> Explore our comprehensive website first to learn about our mission, solutions, and latest insights.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('/', '_blank')}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Explore FinergyCloud Website →
          </Button>
        </div>
      </section>

      {/* Mobile App Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mobile Investment Tools</h2>
          <p className="text-lg text-gray-600">Professional-grade tools optimized for mobile access</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Real-Time Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your portfolio performance with live updates and interactive charts.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Brain className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>AI Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access machine learning insights and project success predictions on the go.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Leaf className="h-10 w-10 text-emerald-600 mb-2" />
              <CardTitle>ESG Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track sustainability metrics and environmental impact scores.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}