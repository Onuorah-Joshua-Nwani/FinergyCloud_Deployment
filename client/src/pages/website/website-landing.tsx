import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SocialLinks from "@/components/social-links";
import Footer from "@/components/footer";
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Leaf, 
  ArrowRight, 
  Brain,
  BarChart3,
  Calculator,
  Globe,
  Smartphone,
  CheckCircle,
  Star,
  Users,
  Target,
  Award,
  PlayCircle,
  ChevronRight
} from "lucide-react";

export default function WebsiteLanding() {
  const features = [
    {
      icon: Brain,
      title: "XGBoost Risk Engine",
      description: "Django-based prediction engine trained on 200+ historical projects. Still in beta but showing promising results.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Leaf,
      title: "ESG Risk Scoring",
      description: "Financial and ESG dimension scoring to improve transparency and accelerate investment decisions.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Calculator,
      title: "Financial Models",
      description: "IRR calculations and CAPEX/OPEX ratio analysis for renewable energy project assessment.",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: BarChart3,
      title: "Power BI Dashboards",
      description: "Basic analytics dashboard - we're working on better visualizations based on user feedback.",
      gradient: "from-red-500 to-pink-600"
    }
  ];

  const stats = [
    { value: "MVP", label: "Working Platform", icon: Target },
    { value: "10", label: "Beta Users", icon: Users },
    { value: "Django", label: "Python Backend", icon: Brain },
    { value: "Nigeria/Ghana", label: "Target Markets", icon: Globe }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile First Design */}
      <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='5'/%3E%3Ccircle cx='53' cy='53' r='5'/%3E%3Ccircle cx='53' cy='7' r='5'/%3E%3Ccircle cx='7' cy='53' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Mobile-First Badge Design */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Badge className="bg-green-100 text-green-800 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium">
              🌱 Renewable Energy
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium">
              🤖 AI-Powered
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium">
              📊 Investment Intelligence
            </Badge>
          </div>
          
          {/* Mobile-First Typography */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            <span className="block">FinergyCloud</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Renewable Energy Intelligence
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            We're building AI tools to help investors assess renewable energy projects in Nigeria and Ghana. 
            Currently in beta with 10 users - looking for more pilot customers to test our risk assessment platform.
          </p>
          
          {/* Hero Illustration */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="w-full max-w-2xl">
              <img src="/assets/ai-platform-hub.svg" alt="FinergyCloud AI Platform Hub" className="w-full h-auto" />
            </div>
          </div>
          
          {/* Mobile-First Button Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 px-4 sm:px-0">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-green-600 hover:bg-green-700 shadow-lg transition-all duration-200">
                Join Beta Program
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-200"
              onClick={() => window.open('/?platform=mobile', '_blank')}
            >
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Mobile App
            </Button>
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-gray-300 hover:bg-gray-50 shadow-lg transition-all duration-200">
                <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Mobile-First Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 px-4 sm:px-0">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-green-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Mobile First */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Comprehensive Renewable Energy Solutions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empower your investment decisions with our cutting-edge AI technology, comprehensive ESG analysis, 
              and advanced financial modeling tools designed specifically for renewable energy projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Mobile First */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Renewable Energy Investments?
          </h2>
          <p className="text-base sm:text-lg text-green-100 mb-8 sm:mb-10 leading-relaxed">
            Join thousands of investors using FinergyCloud to make smarter, data-driven decisions 
            in the renewable energy sector. Start your journey towards sustainable investing today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-white text-green-600 hover:bg-gray-50 shadow-xl transition-all duration-200">
                Get Started Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-white text-white hover:bg-white/10 shadow-xl transition-all duration-200">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}