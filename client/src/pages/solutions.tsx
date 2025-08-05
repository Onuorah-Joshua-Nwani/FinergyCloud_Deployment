import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import Footer from "@/components/footer";
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
  ChevronRight,
  X
} from "lucide-react";
import { useState } from "react";

export default function Solutions() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Platform", path: "/solutions" }
  ];

  const handleFeatureClick = (featureName: string) => {
    setSelectedFeature(featureName);
    setIsDialogOpen(true);
  };

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case 'esg-dashboard':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">ESG Dashboard</h3>
              <p className="text-gray-600">Comprehensive ESG scoring and investment analysis</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Project Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Real-time ESG scoring (8.2/10 average)</li>
                    <li>• Risk assessment matrix visualization</li>
                    <li>• Project comparison tools</li>
                    <li>• Investment recommendations</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Portfolio Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Interactive charts and visualizations</li>
                    <li>• Multi-currency support (NGN, GBP, EUR)</li>
                    <li>• Performance tracking</li>
                    <li>• Risk diversification analysis</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link href="/web-esg-dashboard?from=solutions">
                <Button className="bg-green-600 hover:bg-green-700">
                  Open Full Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        );
        
      case 'mobile-scoring':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mobile ESG Scoring</h3>
              <p className="text-gray-600">Offline-enabled mobile interface for ESG assessment</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Offline Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Work without internet connection</li>
                    <li>• Local data caching</li>
                    <li>• Sync when online</li>
                    <li>• PWA support</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Real-time Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Instant ESG scoring</li>
                    <li>• Mobile-optimized interface</li>
                    <li>• Touch-friendly controls</li>
                    <li>• Quick project evaluation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link href="/mobile-scoring?from=solutions">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Open Mobile Scoring
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        );
        
      case 'esg-assessment':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">ESG Assessment Form</h3>
              <p className="text-gray-600">Comprehensive project evaluation and scoring</p>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Environmental</h4>
                      <p className="text-sm text-gray-600">Carbon impact, renewable capacity, grid stability</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Social</h4>
                      <p className="text-sm text-gray-600">Community engagement, job creation, local benefits</p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Governance</h4>
                      <p className="text-sm text-gray-600">Corporate structure, transparency, compliance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link href="/esg-assessment?from=solutions">
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        );
        
      case 'technical-analytics':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Technical Analytics</h3>
              <p className="text-gray-600">Advanced technical charts and XGBoost model insights</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    XGBoost Models
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 94% prediction accuracy</li>
                    <li>• Machine learning insights</li>
                    <li>• Model performance metrics</li>
                    <li>• Feature importance analysis</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    Performance Charts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Real-time performance tracking</li>
                    <li>• Portfolio distribution analysis</li>
                    <li>• Investment performance trends</li>
                    <li>• Risk assessment visualizations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link href="/technical-charts?from=solutions">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View Technical Charts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        );
        
      case 'mobile-dashboard':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mobile Dashboard</h3>
              <p className="text-gray-600">Complete mobile business intelligence platform</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    KPI Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Real-time portfolio performance</li>
                    <li>• Investment distribution charts</li>
                    <li>• Risk dashboard visualization</li>
                    <li>• Mobile-optimized interface</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Mobile Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Touch-friendly controls</li>
                    <li>• Offline capability</li>
                    <li>• PWA installation</li>
                    <li>• Push notifications</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  console.log('Open Mobile Dashboard - Leaving Solutions page for mobile app');
                  console.log('Open Mobile Dashboard - Current URL:', window.location.href);
                  console.log('Open Mobile Dashboard - Target URL: /?platform=mobile');
                  // Force navigation to mobile app platform
                  window.location.href = '/?platform=mobile';
                }}
              >
                Open Mobile Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );
        
      default:
        return <div>Feature information not available</div>;
    }
  };

  // Hero Section Data
  const heroFeatures = [
    "AI-Powered ESG Investment Analysis",
    "94% Success Prediction Accuracy",
    "Real-Time West African Market Intelligence",
    "Multi-Currency Portfolio Management"
  ];



  // Industries We Serve
  const industriesServed = [
    {
      icon: Zap,
      title: "Solar Energy",
      description: "Large-scale solar farms and distributed solar installations across Nigeria and Ghana",
      projects: "45+ Projects",
      capacity: "2.1 GW"
    },
    {
      icon: TrendingUp,
      title: "Wind Power", 
      description: "Onshore and offshore wind energy developments in West African coastal regions",
      projects: "28+ Projects", 
      capacity: "1.8 GW"
    },
    {
      icon: Leaf,
      title: "Hydroelectric",
      description: "Small and medium-scale hydro projects leveraging West Africa's water resources",
      projects: "35+ Projects",
      capacity: "1.2 GW"
    },
    {
      icon: Target,
      title: "Biomass & Biogas",
      description: "Agricultural waste-to-energy and biogas facilities supporting rural communities",
      projects: "22+ Projects",
      capacity: "0.8 GW"
    }
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
      metrics: { accuracy: "94%", status: "Beta Users: 10", validation: "Django Platform" }
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
      metrics: { factors: "50+", coverage: "West Africa", precision: "Nigeria/Ghana" }
    },
    {
      icon: Calculator,
      title: "CAPEX/OPEX Financial Analysis",
      description: "IRR calculations, CAPEX/OPEX ratio analysis, and developer track record assessment with Power BI integration for West African markets",
      features: [
        "CAPEX/OPEX ratio optimization",
        "Developer track record scoring",
        "Power BI dashboard integration",
        "Multi-currency modeling (NGN, GBP, EUR)",
        "Risk-adjusted return calculations"
      ],
      badge: "Financial Intelligence",
      color: "from-yellow-500 to-orange-600",
      metrics: { ratios: "CAPEX/OPEX", powerbi: "Integrated", markets: "West Africa" }
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
      metrics: { focus: "Nigeria", markets: "MVP Phase", target: "Africa" }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="block mb-4">Intelligent Solutions for</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Renewable Energy Investment
            </span>
          </h1>
          <p className="text-base md:text-lg mb-16 max-w-4xl mx-auto text-green-100 leading-relaxed">
            Leverage AI-driven insights, comprehensive ESG scoring, and advanced financial modeling 
            to maximize returns in the renewable energy sector
          </p>
          
          {/* Solutions Page Illustration */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-2xl">
              <svg viewBox="0 0 600 350" className="w-full h-auto">
                <defs>
                  <linearGradient id="solutionsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#2196F3" />
                  </linearGradient>
                  <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9C27B0" />
                    <stop offset="100%" stopColor="#3F51B5" />
                  </linearGradient>
                </defs>
                
                {/* Background */}
                <rect width="600" height="350" fill="rgba(255,255,255,0.1)" rx="20" />
                
                {/* Central hub (AI brain) */}
                <g transform="translate(300,175)">
                  <circle cx="0" cy="0" r="50" fill="url(#techGradient)" opacity="0.9" />
                  <circle cx="0" cy="0" r="35" fill="rgba(255,255,255,0.2)" />
                  <text x="0" y="5" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">AI</text>
                  <text x="0" y="-15" textAnchor="middle" fontSize="10" fill="white">CORE</text>
                </g>
                
                {/* Solution nodes around the hub */}
                <g transform="translate(150,100)">
                  <circle cx="0" cy="0" r="25" fill="#FFD700" />
                  <path d="M-10,-10 L10,10 M10,-10 L-10,10" stroke="white" strokeWidth="3" />
                  <text x="0" y="40" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Solar AI</text>
                </g>
                
                <g transform="translate(450,100)">
                  <circle cx="0" cy="0" r="25" fill="#4CAF50" />
                  <path d="M0,0 L0,-15 L8,-12 Z" fill="white" />
                  <path d="M0,0 L12,8 L6,12 Z" fill="white" />
                  <path d="M0,0 L-12,8 L-6,12 Z" fill="white" />
                  <text x="0" y="40" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Wind AI</text>
                </g>
                
                <g transform="translate(150,250)">
                  <circle cx="0" cy="0" r="25" fill="#2196F3" />
                  <rect x="-8" y="-8" width="16" height="16" fill="white" rx="2" />
                  <text x="0" y="40" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">ESG Score</text>
                </g>
                
                <g transform="translate(450,250)">
                  <circle cx="0" cy="0" r="25" fill="#FF9800" />
                  <circle cx="0" cy="0" r="12" fill="white" />
                  <text x="0" y="40" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Portfolio</text>
                </g>
                
                <g transform="translate(300,80)">
                  <circle cx="0" cy="0" r="20" fill="#E91E63" />
                  <circle cx="0" cy="0" r="8" fill="white" />
                  <text x="0" y="35" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Risk Mgmt</text>
                </g>
                
                {/* Connection lines */}
                <line x1="300" y1="175" x2="150" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="300" y1="175" x2="450" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="300" y1="175" x2="150" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="300" y1="175" x2="450" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="300" y1="175" x2="300" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-green-50">
                Explore Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
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
            {industriesServed.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{industry.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{industry.description}</p>
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {industry.projects}
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {industry.capacity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Revolutionary Solutions for Sustainable Energy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge machine learning with deep renewable energy expertise to transform how investors assess and manage clean energy projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="text-left hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl mb-2">{solution.title}</CardTitle>
                      <Badge className={`ml-2 ${solution.badge === 'NEW' ? 'bg-green-100 text-green-700' : 
                        solution.badge === 'BETA' ? 'bg-orange-100 text-orange-700' : 
                        'bg-blue-100 text-blue-700'}`}>
                        {solution.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {solution.description}
                    </p>
                    <div className="space-y-2">
                      {solution.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Platform Statistics */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Platform Performance Metrics</h3>
              <p className="text-gray-600">Real results from our AI-powered investment intelligence platform</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
                <div className="text-sm text-gray-600">Prediction Accuracy</div>
                <div className="text-xs text-gray-500 mt-1">XGBoost ML Model</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5.9B</div>
                <div className="text-sm text-gray-600">Assets Analyzed</div>
                <div className="text-xs text-gray-500 mt-1">USD Portfolio Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">130+</div>
                <div className="text-sm text-gray-600">Projects Assessed</div>
                <div className="text-xs text-gray-500 mt-1">Across West Africa</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">18s</div>
                <div className="text-sm text-gray-600">Analysis Speed</div>
                <div className="text-xs text-gray-500 mt-1">Per Project Report</div>
              </div>
            </div>
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
            Be among the first to experience next-generation renewable energy investment analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-green-50">
                Explore Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/?platform=mobile">
              <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
                Try Mobile Experience
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>



      <Footer />

      {/* Feature Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                {selectedFeature === 'esg-dashboard' && 'ESG Dashboard Preview'}
                {selectedFeature === 'mobile-scoring' && 'Mobile ESG Scoring Preview'}
                {selectedFeature === 'esg-assessment' && 'ESG Assessment Form Preview'}
                {selectedFeature === 'technical-analytics' && 'Technical Analytics Preview'}
                {selectedFeature === 'mobile-dashboard' && 'Mobile Dashboard Preview'}
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <DialogDescription className="text-gray-600">
              Preview the features and capabilities of this platform component. Click "Open Full" to access the complete functionality.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6">
            {renderFeatureContent()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}