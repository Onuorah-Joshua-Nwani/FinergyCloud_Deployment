import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlatformSwitcher from "@/components/platform-switcher";
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
  Globe
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section with integrated nav links */}

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Web Platform
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Mobile App
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              AI-Powered
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            FinergyCloud Intelligence
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Platform & Mobile App
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Unified renewable energy investment platform. Access powerful AI predictions, ESG scoring, 
            and portfolio management from web or mobile. Your investment intelligence, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-4 bg-green-600 hover:bg-green-700">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="https://7dd13212-e6ad-4c47-be70-2f844171b442-00-15tmn1l2tiykx.spock.replit.dev/?platform=mobile" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-blue-600 text-blue-600 hover:bg-blue-50">
                Open Mobile App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
          
          {/* Quick Navigation Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-gray-600">
            <Link href="/about" className="hover:text-green-600 transition-colors flex items-center gap-2">
              <Globe className="w-4 h-4" />
              About FinergyCloud
            </Link>
            <Link href="/solutions" className="hover:text-green-600 transition-colors flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Our Solutions
            </Link>
            <Link href="/blog" className="hover:text-green-600 transition-colors flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Insights & Research
            </Link>
            <Link href="/contact" className="hover:text-green-600 transition-colors flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Renewable Energy Investment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights to maximize your renewable energy investment returns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/solutions">
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">AI-Powered Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Advanced XGBoost machine learning models analyze project success probability, 
                    IRR predictions, and risk assessment with high accuracy.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium mt-4">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">ESG Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive Environmental, Social, and Governance assessment 
                  with detailed impact metrics and sustainability benchmarks.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">IRR Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced financial modeling with multi-currency support, 
                  cash flow analysis, and investment performance calculations.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Portfolio Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Interactive charts and dashboards for portfolio performance tracking, 
                  risk analysis, and investment optimization.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Real-time market analysis, industry trends, and regulatory updates 
                  to stay ahead of the renewable energy market.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive risk assessment tools with scenario analysis, 
                  stress testing, and mitigation strategy recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Features Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Investment Intelligence
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to make informed renewable energy investment decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-800 p-8 rounded-xl">
                <Globe className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Advanced Analytics Suite</h3>
                <p className="text-gray-300 mb-6">
                  Leverage our comprehensive analytics tools for deep market insights 
                  and data-driven investment strategies.
                </p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>• AI-powered predictions with 94% accuracy</li>
                  <li>• Comprehensive ESG scoring system</li>
                  <li>• Multi-currency financial modeling</li>
                  <li>• Real-time market intelligence</li>
                </ul>
                <Link href="/solutions">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Explore Our Solutions
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-gray-800 p-8 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Mobile Companion App</h3>
                <p className="text-gray-300 mb-6">
                  Stay connected to your investments on-the-go with our mobile app 
                  featuring real-time monitoring and instant alerts.
                </p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>• Real-time portfolio monitoring</li>
                  <li>• Push notifications for market changes</li>
                  <li>• Quick project insights and analytics</li>
                  <li>• Synchronized with web platform</li>
                </ul>
                <a href="https://7dd13212-e6ad-4c47-be70-2f844171b442-00-15tmn1l2tiykx.spock.replit.dev/?platform=mobile" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Try Mobile App
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Renewable Energy Investments?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of investors already using FinergyCloud's AI-powered platform to maximize their renewable energy investment returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4">
                Start Your Investment Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="https://7dd13212-e6ad-4c47-be70-2f844171b442-00-15tmn1l2tiykx.spock.replit.dev/?platform=mobile" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4">
                Try Mobile App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
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