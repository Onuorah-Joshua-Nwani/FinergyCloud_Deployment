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
    { value: "15,000+", label: "Projects Analyzed", icon: Target },
    { value: "50+", label: "Countries Served", icon: Globe },
    { value: "94%", label: "Prediction Accuracy", icon: Brain },
    { value: "₦120M+", label: "Investment Value", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Mobile First Design */}
      <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            <span className="block">FinergyCloud</span>
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Renewable Energy Intelligence
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Transform your renewable energy investments with advanced AI predictions, comprehensive ESG scoring, 
            and sophisticated portfolio management. Make smarter, data-driven sustainable investment decisions.
          </p>
          
          {/* Hero Illustration */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="w-full max-w-2xl">
              <svg viewBox="0 0 600 400" className="w-full h-auto">
                {/* Background */}
                <defs>
                  <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="100%" stopColor="#E0F6FF" />
                  </linearGradient>
                  <linearGradient id="solarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFA500" />
                  </linearGradient>
                  <linearGradient id="windGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#2E7D32" />
                  </linearGradient>
                </defs>
                
                {/* Sky background */}
                <rect width="600" height="280" fill="url(#skyGradient)" />
                
                {/* Ground */}
                <rect x="0" y="280" width="600" height="120" fill="#8BC34A" />
                
                {/* Sun */}
                <circle cx="500" cy="80" r="40" fill="#FFD700" />
                
                {/* Solar panels */}
                <rect x="100" y="240" width="80" height="40" fill="url(#solarGradient)" rx="5" />
                <rect x="200" y="235" width="80" height="40" fill="url(#solarGradient)" rx="5" />
                <rect x="300" y="245" width="80" height="40" fill="url(#solarGradient)" rx="5" />
                
                {/* Wind turbines */}
                <g transform="translate(450,200)">
                  <rect x="-2" y="0" width="4" height="80" fill="#E0E0E0" />
                  <circle cx="0" cy="0" r="3" fill="#666" />
                  <path d="M0,0 L0,-25 L15,-20 Z" fill="url(#windGradient)" />
                  <path d="M0,0 L20,15 L10,25 Z" fill="url(#windGradient)" />
                  <path d="M0,0 L-20,10 L-25,-10 Z" fill="url(#windGradient)" />
                </g>
                
                <g transform="translate(380,210)">
                  <rect x="-2" y="0" width="4" height="70" fill="#E0E0E0" />
                  <circle cx="0" cy="0" r="3" fill="#666" />
                  <path d="M0,0 L0,-20 L12,-16 Z" fill="url(#windGradient)" />
                  <path d="M0,0 L16,12 L8,20 Z" fill="url(#windGradient)" />
                  <path d="M0,0 L-16,8 L-20,-8 Z" fill="url(#windGradient)" />
                </g>
                
                {/* AI Brain overlay */}
                <g transform="translate(50,50)" opacity="0.8">
                  <circle cx="50" cy="50" r="45" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
                  <path d="M25,40 Q30,25 50,30 Q70,25 75,40 Q70,55 50,50 Q30,55 25,40 Z" fill="#3B82F6" fillOpacity="0.3" />
                  <circle cx="35" cy="45" r="3" fill="#3B82F6" />
                  <circle cx="50" cy="40" r="3" fill="#3B82F6" />
                  <circle cx="65" cy="45" r="3" fill="#3B82F6" />
                  <path d="M35,45 L50,40 L65,45" stroke="#3B82F6" strokeWidth="2" fill="none" />
                  <text x="50" y="75" textAnchor="middle" fontSize="12" fill="#3B82F6" fontWeight="bold">AI</text>
                </g>
                
                {/* Data visualization */}
                <g transform="translate(480,320)">
                  <rect x="0" y="0" width="100" height="60" fill="white" fillOpacity="0.9" rx="8" stroke="#E0E0E0" />
                  <text x="50" y="15" textAnchor="middle" fontSize="10" fill="#666" fontWeight="bold">94% Accuracy</text>
                  <rect x="10" y="20" width="15" height="25" fill="#4CAF50" />
                  <rect x="30" y="15" width="15" height="30" fill="#2196F3" />
                  <rect x="50" y="25" width="15" height="20" fill="#FF9800" />
                  <rect x="70" y="10" width="15" height="35" fill="#9C27B0" />
                </g>
              </svg>
            </div>
          </div>
          
          {/* Mobile-First Button Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 px-4 sm:px-0">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-green-600 hover:bg-green-700 shadow-lg transition-all duration-200">
                Start Free Trial
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
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            
            {/* Company Info */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">FinergyCloud</span>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                Transforming renewable energy investments through artificial intelligence 
                and comprehensive ESG analysis.
              </p>
              <SocialLinks />
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Platform</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link href="/about" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/solutions" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Solutions</Link></li>
                <li><Link href="/blog" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Resources</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><button onClick={() => window.open('/?platform=mobile', '_blank')} className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors text-left">Mobile App</button></li>
                <li><Link href="/login" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Sign In</Link></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="text-sm sm:text-base text-gray-300">United Kingdom</li>
                <li className="text-sm sm:text-base text-gray-300">info@finergycloud.com</li>
                <li className="text-sm sm:text-base text-gray-300">+44 (0) 20 7946 0958</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-0">
              © 2025 FinergyCloud. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}