import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SocialLinks from "@/components/social-links";
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
      title: "AI-Powered Predictions",
      description: "Advanced XGBoost machine learning models with 94% accuracy in renewable energy project success predictions.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Leaf,
      title: "ESG Scoring",
      description: "Comprehensive Environmental, Social, and Governance assessment with detailed impact metrics.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Calculator,
      title: "IRR Calculator",
      description: "Multi-currency financial modeling with real-time exchange rates for NGN, GBP, and EUR.",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: BarChart3,
      title: "Portfolio Analytics",
      description: "Real-time performance tracking and investment portfolio optimization with interactive dashboards.",
      gradient: "from-red-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive risk assessment and mitigation strategies for renewable energy investments.",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Industry insights, regulatory updates, and market trend analysis for informed decision-making.",
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  const stats = [
    { value: "5,000+", label: "Projects Analyzed", icon: Target },
    { value: "50+", label: "Countries Served", icon: Globe },
    { value: "94%", label: "Prediction Accuracy", icon: Brain },
    { value: "$2.5B", label: "Investment Value", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='5'/%3E%3Ccircle cx='53' cy='53' r='5'/%3E%3Ccircle cx='53' cy='7' r='5'/%3E%3Ccircle cx='7' cy='53' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center items-center gap-3 mb-8">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium">
              🌱 Renewable Energy
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
              🤖 AI-Powered
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-medium">
              📊 Investment Intelligence
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">FinergyCloud</span>
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Renewable Energy Intelligence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Transform your renewable energy investments with advanced AI predictions, comprehensive ESG scoring, 
            and sophisticated portfolio management. Make smarter, data-driven sustainable investment decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login">
              <Button size="lg" className="text-lg px-10 py-5 bg-green-600 hover:bg-green-700 shadow-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/?platform=mobile">
              <Button size="lg" className="text-lg px-10 py-5 bg-blue-600 hover:bg-blue-700 shadow-lg">
                <Smartphone className="w-5 h-5 mr-2" />
                Mobile App
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="text-lg px-10 py-5 border-2 border-gray-300 hover:bg-gray-50 shadow-lg">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Investment Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with deep industry expertise 
              to deliver unparalleled insights for renewable energy investments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Investments?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Join thousands of investors who trust FinergyCloud for their renewable energy investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-10 py-5 bg-white text-green-600 hover:bg-gray-100 shadow-lg">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/?platform=mobile">
              <Button size="lg" variant="outline" className="text-lg px-10 py-5 border-2 border-white text-white hover:bg-white hover:text-green-600 shadow-lg">
                <Smartphone className="w-5 h-5 mr-2" />
                Try Mobile App
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}