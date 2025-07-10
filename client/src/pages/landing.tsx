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
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                FinergyCloud
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/login">
                <Button>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

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
            <a href="/login">
              <Button size="lg" className="text-lg px-8 py-4 bg-green-600 hover:bg-green-700">
                Access Web Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-blue-600 text-blue-600 hover:bg-blue-50">
              Download Mobile App
            </Button>
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
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">AI-Powered Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced XGBoost machine learning models analyze project success probability, 
                  IRR predictions, and risk assessment with high accuracy.
                </p>
              </CardContent>
            </Card>

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

      {/* Mobile App Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Available on All Your Devices
            </h2>
            <p className="text-xl text-gray-300">
              Access your investment intelligence from web browser or mobile device - fully synchronized
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-800 p-8 rounded-xl">
                <Globe className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Web Platform</h3>
                <p className="text-gray-300 mb-6">
                  Full-featured desktop experience with advanced analytics, comprehensive dashboards, 
                  and detailed project management tools.
                </p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>• Advanced AI predictions and modeling</li>
                  <li>• Comprehensive ESG scoring dashboards</li>
                  <li>• Multi-currency IRR calculator</li>
                  <li>• Detailed project analytics</li>
                </ul>
                <a href="/api/login">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Access Web Platform
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <div className="bg-gray-800 p-8 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Mobile App</h3>
                <p className="text-gray-300 mb-6">
                  On-the-go access with push notifications, offline capabilities, 
                  and seamless sync with your web platform data.
                </p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>• Real-time portfolio monitoring</li>
                  <li>• Push notifications for alerts</li>
                  <li>• Quick project insights</li>
                  <li>• Offline data access</li>
                </ul>
                <div className="flex gap-3">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                    Download iOS
                  </Button>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                    Download Android
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Investment Intelligence Journey
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join investors using FinergyCloud's unified platform for smarter renewable energy decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/api/login">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
                Access Web Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600 text-lg px-8 py-4">
              Get Mobile App
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Access Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access FinergyCloud's powerful renewable energy investment tools from any device
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold text-center mb-4">Web Platform</h3>
              <PlatformSwitcher currentPlatform="web" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-center mb-4">Mobile App</h3>
              <PlatformSwitcher currentPlatform="mobile" />
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connect with FinergyCloud
          </h2>
          <p className="text-gray-600 mb-8">
            Follow our journey in renewable energy innovation and stay updated with the latest insights
          </p>
          <SocialLinks showLabels className="justify-center" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FinergyCloud</span>
          </div>
          <p className="text-gray-400 mb-4">
            Developed by O.J. Nwani • Powering the future of renewable energy investment analysis
          </p>
          <div className="mb-4">
            <SocialLinks variant="footer" className="justify-center" />
          </div>
          <p className="text-sm text-gray-500">
            © 2025 FinergyCloud. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}