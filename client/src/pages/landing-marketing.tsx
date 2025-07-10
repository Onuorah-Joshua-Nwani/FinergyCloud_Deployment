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
    { value: "15,000+", label: "Investment Simulations", subtitle: "With 87% prediction accuracy" },
    { value: "₦120M+", label: "Analyzed Investment Value", subtitle: "Across 12 solar projects" },
    { value: "3", label: "Strategic Partnerships", subtitle: "In Nigeria and Kenya" },
    { value: "150+", label: "GitHub Commits", subtitle: "Open source development" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">FinergyCloud Mobile App</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-green-600 transition-colors">Visit Website</a>
            <a href="/login" className="text-gray-600 hover:text-green-600 transition-colors">Login</a>
          </nav>
          <Button asChild>
            <a href="/">Visit Website</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            UK Registered
          </Badge>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            AI-Powered
          </Badge>
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            Africa-Focused
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
        
        {/* Key Metrics */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">15.2%</div>
            <div className="text-sm text-gray-600">Average IRR</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">15,000+</div>
            <div className="text-sm text-gray-600">Simulations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">₦120M+</div>
            <div className="text-sm text-gray-600">Pilot Funding</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
            <a href="/login" className="flex items-center">
              Login to Mobile App <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/" className="flex items-center">
              Visit FinergyCloud Website <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-blue-200">
          <p className="text-sm text-gray-600 mb-4">
            <strong>New to FinergyCloud?</strong> Explore our comprehensive website first to learn about our mission, solutions, and latest insights.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="/" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Explore FinergyCloud Website →
            </a>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Validation & Traction</h2>
          <p className="text-lg text-gray-600">Quantifiable impact across multiple African markets</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
              <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.subtitle}</div>
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

      {/* Technical Stack */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Built with Cutting-Edge Technology</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform combines proven technologies with innovative AI approaches for maximum reliability and performance
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Frontend Technology</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• React.js with TypeScript</li>
              <li>• Modern ES6+ JavaScript</li>
              <li>• Responsive Design</li>
              <li>• Interactive Dashboards</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">AI Engine (2025)</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• XGBoost Predictive Models</li>
              <li>• NLP Document Analysis</li>
              <li>• Machine Learning Pipeline</li>
              <li>• Real-time Processing</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Data Infrastructure</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• PostgreSQL Database</li>
              <li>• RESTful API Architecture</li>
              <li>• Real-time Data Processing</li>
              <li>• Secure Authentication</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-xl text-gray-600">Feedback from our users and partners</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-6 text-lg">
                "We used FinergyCloud to score ₦50M in solar projects – it simplified our risk decisions."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  IM
                </div>
                <div>
                  <div className="font-semibold">Investment Manager</div>
                  <div className="text-gray-600 text-sm">Renewable Energy Firm, Nigeria</div>
                  <Badge className="mt-1 bg-green-100 text-green-800">Live on GitHub</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-6 text-lg">
                "The ESG integration and emerging market focus are particularly valuable for our investment decisions."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  BU
                </div>
                <div>
                  <div className="font-semibold">Beta User</div>
                  <div className="text-gray-600 text-sm">Renewable Energy Investment Firm</div>
                  <Badge className="mt-1 bg-blue-100 text-blue-800">2024</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Founder's Note</h2>
                <p className="text-gray-600 mb-6">
                  FinergyCloud was founded by O.J. Nwani, a UK-based SAP & AI consultant and clean energy innovator. 
                  The company was officially registered in the UK in June 2025 to scale its mission of unlocking 
                  sustainable energy financing in Africa using artificial intelligence.
                </p>
                <p className="text-gray-600 mb-6">
                  Now headquartered in the UK, FinergyCloud plans to collaborate with UK-based clean energy 
                  investors and climate tech researchers to expand the platform's reach and impact.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    ON
                  </div>
                  <div>
                    <div className="font-semibold">O.J. Nwani</div>
                    <div className="text-gray-600">Founder & CEO</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                  <Globe className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">UK Registration & Global Vision</h3>
                </div>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Company Registration:</span>
                    <span className="font-semibold">UK - June 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus Markets:</span>
                    <span className="font-semibold">Nigeria & Kenya</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technology Base:</span>
                    <span className="font-semibold">AI & Machine Learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MVP Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Explore Our MVP</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Our Minimum Viable Product is already live and functional on GitHub. Explore the code, 
            test the IRR calculator, and see our ESG scoring framework in action.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">150+</div>
              <div className="text-gray-400">Commits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">12</div>
              <div className="text-gray-400">Releases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-2">5</div>
              <div className="text-gray-400">Beta Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">87%</div>
              <div className="text-gray-400">Accuracy</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <a href="https://github.com/Onuorah-Joshua-Nwani/ojn-msp-1-finergycloud" target="_blank">
                View on GitHub
              </a>
            </Button>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <a href="/app">Try Live Platform</a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900" asChild>
              <a href="https://www.youtube.com/@FinergyCloud_official" target="_blank">Watch Demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Investment Process?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join forward-thinking investors who are already using FinergyCloud to make smarter, 
            faster decisions in renewable energy investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <a href="/contact">Book Demo</a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600" asChild>
              <a href="/app">Try Platform Free</a>
            </Button>
          </div>
          <p className="text-sm opacity-75">
            Free demo • No commitment • Expert guidance • Video tutorials available
          </p>
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
              <h4 className="font-semibold mb-4">Website Pages</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white">About FinergyCloud</a></li>
                <li><a href="/solutions" className="hover:text-white">Solutions</a></li>
                <li><a href="/blog" className="hover:text-white">Blog & Insights</a></li>
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform Access</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white text-green-400">🌐 Visit Main Website</a></li>
                <li><a href="/login" className="hover:text-white">📱 Login to Mobile App</a></li>
                <li><a href="https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud" target="_blank" className="hover:text-white">💻 View Source Code</a></li>
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