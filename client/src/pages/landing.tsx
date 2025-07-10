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

export default function Landing() {
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

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Investment Director",
      company: "Green Capital Partners",
      content: "FinergyCloud's AI predictions have transformed our investment strategy. The 94% accuracy rate speaks for itself.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Portfolio Manager",
      company: "Sustainable Ventures",
      content: "The ESG scoring system is incredibly comprehensive. It helps us make decisions that align with our sustainability goals.",
      rating: 5
    },
    {
      name: "Dr. Amara Okafor",
      role: "Research Analyst",
      company: "African Energy Fund",
      content: "The multi-currency IRR calculator has been invaluable for our cross-border renewable energy investments.",
      rating: 5
    }
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
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              No Credit Card Required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              14-Day Free Trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Enterprise Security
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Renewable Energy Investors Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Proven results across emerging markets and developed economies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
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
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4">
              Platform Capabilities
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI-Driven Investment Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines advanced financial modeling with sustainability metrics to transform renewable energy investment decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md cursor-pointer h-full">
                  <CardHeader>
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    <div className="flex items-center text-blue-600 font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/solutions">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                Explore All Features
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mb-4">
              Customer Success
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by renewable energy professionals worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gray-800 text-white px-4 py-2 text-sm font-medium mb-4">
              Platform Experience
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Investment Intelligence
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to make informed renewable energy investment decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                <Globe className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Web Platform</h3>
                <p className="text-gray-300 mb-6">
                  Comprehensive analytics and investment intelligence designed for professional renewable energy investors and fund managers.
                </p>
                <ul className="text-gray-300 space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    AI-powered predictions with 94% accuracy
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Comprehensive ESG scoring system
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Multi-currency financial modeling
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Real-time market intelligence
                  </li>
                </ul>
                <Link href="/solutions">
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                    Explore Web Platform
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Mobile App</h3>
                <p className="text-gray-300 mb-6">
                  Stay connected to your investments on-the-go with our mobile app featuring real-time monitoring and instant insights.
                </p>
                <ul className="text-gray-300 space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Real-time portfolio monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Push notifications for market changes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Quick project insights and analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Synchronized with web platform
                  </li>
                </ul>
                <Link href="/?platform=mobile">
                  <Button className="bg-green-600 hover:bg-green-700 w-full">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Try Mobile App
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Renewable Energy Investments?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of investors already using FinergyCloud's AI-powered platform to maximize their renewable energy investment returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 shadow-lg">
                Start Your Investment Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/?platform=mobile">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 shadow-lg">
                <Smartphone className="w-4 h-4 mr-2" />
                Try Mobile App
              </Button>
            </Link>
          </div>
          
          {/* Quick Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-green-100">
            <Link href="/about" className="hover:text-white transition-colors">
              Learn About Us
            </Link>
            <Link href="/solutions" className="hover:text-white transition-colors">
              Explore Solutions
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Read Our Blog
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FinergyCloud</span>
              </div>
              <p className="text-gray-300 mb-6">
                Empowering renewable energy investment through AI-powered analytics and comprehensive market intelligence.
              </p>
              <SocialLinks variant="footer" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Explore</h3>
              <div className="space-y-3">
                <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                  About FinergyCloud
                </Link>
                <Link href="/solutions" className="block text-gray-300 hover:text-white transition-colors">
                  Our Solutions
                </Link>
                <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors">
                  Blog & Insights
                </Link>
                <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Get Started</h3>
              <div className="space-y-3">
                <Link href="/login">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-gray-900">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FinergyCloud. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}