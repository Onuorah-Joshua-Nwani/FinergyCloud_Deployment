import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Brain, DollarSign, Globe, Leaf, Shield, TrendingUp, Users, Zap } from "lucide-react";

export default function MarketingLanding() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Advanced XGBoost models analyze 50+ variables to predict project success with 94% accuracy",
      badge: "Machine Learning"
    },
    {
      icon: Leaf,
      title: "ESG Scoring Engine",
      description: "Comprehensive Environmental, Social, and Governance scoring for sustainable investment decisions",
      badge: "Sustainability"
    },
    {
      icon: DollarSign,
      title: "Multi-Currency IRR Calculator",
      description: "Advanced financial modeling with support for NGN, GBP, and EUR currencies",
      badge: "Financial Tools"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Interactive dashboards with live market data and portfolio performance tracking",
      badge: "Analytics"
    },
    {
      icon: Globe,
      title: "Emerging Markets Focus",
      description: "Specialized intelligence for renewable energy investments in Nigeria and Africa",
      badge: "Market Intelligence"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Comprehensive risk profiling with heat maps and scenario analysis tools",
      badge: "Risk Management"
    }
  ];

  const stats = [
    { value: "94%", label: "Prediction Accuracy" },
    { value: "$2.1B+", label: "Projects Analyzed" },
    { value: "15+", label: "African Markets" },
    { value: "500+", label: "Active Investors" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">FinergyCloud</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
            <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">Contact</a>
          </nav>
          <Button asChild>
            <a href="/app">Launch Platform</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
          MBA Distinction Project to Startup Innovation
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          AI-Driven Risk Intelligence for{" "}
          <span className="text-green-600">Renewable Energy</span> Investments
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your renewable energy investment decisions with smart analytics, 
          ESG scoring, and AI-powered risk profiling. From emerging market intelligence 
          to IRR simulation - make informed decisions that drive sustainable returns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
            <a href="/app" className="flex items-center">
              Try Platform Free <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#demo">Watch Demo</a>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Smart Energy Investments
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and intelligence designed specifically for renewable energy 
            investors navigating emerging markets.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-10 w-10 text-green-600" />
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Platform Preview */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">See FinergyCloud in Action</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the power of AI-driven renewable energy investment intelligence
          </p>
          <div className="bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <p className="text-lg">Interactive Platform Demo</p>
                <Button className="mt-4 bg-white text-gray-900 hover:bg-gray-100" asChild>
                  <a href="/app">Launch Platform</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">From Academic Excellence to Market Innovation</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-4">Born from Research Excellence</h3>
              <p className="text-gray-600 mb-6">
                FinergyCloud originated as an MBA distinction project, combining rigorous academic 
                research with real-world market needs. Our platform bridges the gap between 
                theoretical investment models and practical renewable energy decision-making.
              </p>
              <div className="flex items-center space-x-4">
                <Users className="h-6 w-6 text-green-600" />
                <span className="text-gray-700">Built by renewable energy investment experts</span>
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
              <p className="text-gray-600">
                Democratizing access to sophisticated renewable energy investment intelligence, 
                enabling smarter decisions that accelerate the global transition to clean energy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Investment Strategy?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of investors using FinergyCloud to make smarter renewable energy decisions
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
            <a href="/app" className="flex items-center">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold">FinergyCloud</span>
              </div>
              <p className="text-gray-400">
                AI-driven renewable energy investment intelligence platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/app" className="hover:text-white">Dashboard</a></li>
                <li><a href="/app/ai-model" className="hover:text-white">AI Predictions</a></li>
                <li><a href="/app/esg-scoring" className="hover:text-white">ESG Scoring</a></li>
                <li><a href="/app/irr-calculator" className="hover:text-white">IRR Calculator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
                <li><a href="/security" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="https://www.finergycloud.com" className="hover:text-white">Website</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FinergyCloud. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}