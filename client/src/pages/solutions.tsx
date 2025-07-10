import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialLinks from "@/components/social-links";
import PlatformSwitcher from "@/components/platform-switcher";
import { 
  Brain, 
  Leaf, 
  Calculator, 
  BarChart3, 
  Globe, 
  Shield,
  Zap,
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  Home,
  ChevronRight
} from "lucide-react";

export default function Solutions() {
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Solutions", path: "/solutions" }
  ];
  
  const solutions = [
    {
      icon: Brain,
      title: "AI-Powered Risk Intelligence",
      description: "Advanced XGBoost machine learning models delivering 94% accuracy in renewable energy project success prediction",
      features: [
        "Proprietary XGBoost prediction algorithms",
        "Multi-factor risk probability assessment",
        "Long-term performance forecasting",
        "Real-time market trend analysis",
        "Scenario-based stress testing"
      ],
      badge: "Core AI Technology",
      color: "from-blue-500 to-purple-600",
      metrics: { accuracy: "94%", projects: "15,000+", speed: "Real-time" }
    },
    {
      icon: Leaf,
      title: "ESG Impact Assessment",
      description: "Comprehensive Environmental, Social, and Governance scoring framework specifically designed for emerging market renewable energy projects",
      features: [
        "Environmental impact quantification",
        "Social governance evaluation matrix",
        "Carbon footprint tracking & offsetting",
        "Regulatory compliance scoring",
        "Community impact assessment"
      ],
      badge: "Sustainability Framework",
      color: "from-green-500 to-emerald-600",
      metrics: { factors: "50+", coverage: "Global", precision: "±5%" }
    },
    {
      icon: Calculator,
      title: "Multi-Currency Financial Modeling",
      description: "Advanced IRR simulation and financial modeling suite supporting NGN, GBP, and EUR with real-time exchange rate integration",
      features: [
        "Real-time multi-currency conversion",
        "Advanced cash flow projections",
        "ROI optimization algorithms",
        "Risk-adjusted return calculations",
        "Sensitivity analysis tools"
      ],
      badge: "Financial Intelligence",
      color: "from-yellow-500 to-orange-600",
      metrics: { currencies: "3", accuracy: "99.5%", speed: "Instant" }
    },
    {
      icon: BarChart3,
      title: "Portfolio Analytics & Optimization",
      description: "Real-time portfolio performance tracking with AI-driven optimization recommendations for renewable energy investments",
      features: [
        "Interactive portfolio dashboards",
        "Performance benchmarking tools",
        "Risk diversification analysis",
        "AI-powered investment recommendations",
        "Custom KPI tracking"
      ],
      badge: "Portfolio Intelligence",
      color: "from-red-500 to-pink-600",
      metrics: { visualization: "Interactive", updates: "Real-time", insights: "AI-driven" }
    },
    {
      icon: Globe,
      title: "Emerging Market Intelligence",
      description: "Specialized market analysis and regulatory intelligence focused on African and emerging market renewable energy opportunities",
      features: [
        "Emerging market trend analysis",
        "Regulatory change monitoring",
        "Local market opportunity identification",
        "Risk profiling for developing economies",
        "Investment climate assessment"
      ],
      badge: "Market Intelligence",
      color: "from-indigo-500 to-blue-600",
      metrics: { markets: "50+", coverage: "Africa-focused", updates: "Daily" }
    },
    {
      icon: Shield,
      title: "Advanced Risk Management",
      description: "Comprehensive risk assessment framework with predictive analytics and mitigation strategy recommendations",
      features: [
        "Project risk scoring",
        "Scenario modeling",
        "Risk mitigation planning",
        "Insurance optimization"
      ],
      badge: "Risk Management",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  const industries = [
    {
      name: "Solar Energy",
      icon: "☀️",
      description: "Photovoltaic and concentrated solar power projects",
      projects: "2,500+ projects analyzed"
    },
    {
      name: "Wind Power",
      icon: "💨",
      description: "Onshore and offshore wind energy developments",
      projects: "1,800+ projects analyzed"
    },
    {
      name: "Hydroelectric",
      icon: "🌊",
      description: "Small and large-scale hydroelectric installations",
      projects: "950+ projects analyzed"
    },
    {
      name: "Energy Storage",
      icon: "🔋",
      description: "Battery and grid-scale energy storage solutions",
      projects: "650+ projects analyzed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.path} className="hover:text-green-600 transition-colors flex items-center">
                    {index === 0 && <Home className="w-4 h-4 mr-1" />}
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Intelligent Solutions for
            <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Renewable Energy Investment
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-green-100">
            Leverage AI-driven insights, comprehensive ESG scoring, and advanced financial modeling 
            to maximize returns in the renewable energy sector
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-green-50">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Investment Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our integrated platform provides end-to-end solutions for renewable energy investment analysis, 
              risk assessment, and portfolio optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-br ${solution.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{solution.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {solution.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized analysis and insights across all major renewable energy sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <CardTitle className="text-xl">{industry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {industry.projects}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Investment Strategy?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join leading investors who use FinergyCloud to make smarter renewable energy investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-green-50">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/?platform=mobile">
              <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
                Try Mobile App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Access */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access FinergyCloud Solutions
            </h2>
            <p className="text-gray-600">
              Choose your preferred platform to get started with intelligent renewable energy investment
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">Web Platform</h3>
              <PlatformSwitcher currentPlatform="web" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">Mobile App</h3>
              <PlatformSwitcher currentPlatform="mobile" />
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Stay Connected
          </h3>
          <p className="text-gray-600 mb-6">
            Follow FinergyCloud for the latest updates and insights
          </p>
          <SocialLinks showLabels className="justify-center" />
        </div>
      </section>
    </div>
  );
}