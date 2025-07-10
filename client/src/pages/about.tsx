import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialLinks from "@/components/social-links";
import PlatformSwitcher from "@/components/platform-switcher";
import { 
  Target, 
  Globe, 
  Users, 
  User,
  Award,
  TrendingUp,
  Lightbulb,
  Heart,
  Shield,
  ArrowRight,
  CheckCircle,
  Quote,
  Home,
  ChevronRight
} from "lucide-react";

export default function About() {
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" }
  ];
  
  const stats = [
    { value: "15,000+", label: "Investment Simulations", icon: Target, subtext: "With 87% prediction accuracy" },
    { value: "₦120M+", label: "Analyzed Investment Value", icon: Award, subtext: "Across 12 solar projects" },
    { value: "50+", label: "Countries Served", icon: Globe, subtext: "Emerging markets focus" },
    { value: "3", label: "Strategic Partnerships", icon: Users, subtext: "In Nigeria and Kenya" }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging cutting-edge AI and machine learning to revolutionize renewable energy investment analysis. Our proprietary XGBoost algorithms deliver industry-leading 94% prediction accuracy.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Heart,
      title: "Sustainability",
      description: "Committed to accelerating the global transition to clean energy through intelligent investment decisions. Every analysis contributes to a more sustainable future.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Providing transparent, accurate, and unbiased analysis to build trust with our investment community. Our methodology is open and scientifically rigorous.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Building long-term relationships with investors, developers, and stakeholders in the renewable energy ecosystem across emerging and developed markets.",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "Foundation & Vision",
      description: "FinergyCloud was conceived during academic research into sustainable finance, identifying the need for AI-powered renewable energy investment intelligence."
    },
    {
      year: "2021",
      title: "AI Development",
      description: "Developed proprietary XGBoost algorithms achieving 94% accuracy in renewable energy project success prediction, validated through extensive backtesting."
    },
    {
      year: "2022",
      title: "MVP & Recognition",
      description: "Launched MVP with IRR simulation engine and ESG scoring framework. Received recognition for exceptional work combining financial modeling with sustainable investment principles."
    },
    {
      year: "2023",
      title: "Platform Expansion",
      description: "Expanded platform capabilities with multi-currency support, comprehensive ESG scoring, and emerging market focus. Achieved quantifiable impact across African markets."
    },
    {
      year: "2024",
      title: "Mobile Innovation",
      description: "Introduced mobile platform and gamification features. Secured ₦120M+ in analyzed investment value and formed strategic partnerships in Nigeria and Kenya."
    },
    {
      year: "2025",
      title: "UK Registration & Global Vision",
      description: "Officially registered in the UK to scale mission of unlocking sustainable energy financing using artificial intelligence. Expanding collaboration with UK-based investors and researchers."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-gray-900">{item.label}</span>
                ) : (
                  <Link href={item.path} className="hover:text-green-600 transition-colors">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-6">
              🇬🇧 UK Registered • 🤖 AI-Powered • 🌍 Africa-Focused
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About 
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                FinergyCloud
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Transforming renewable energy investment decisions with AI-powered platform. 
              Advanced IRR simulation, ESG scoring, and risk profiling specifically designed 
              for emerging market opportunities.
            </p>
            
            {/* About Page Illustration */}
            <div className="flex justify-center">
              <div className="w-full max-w-3xl">
                <svg viewBox="0 0 700 450" className="w-full h-auto">
                  <defs>
                    <linearGradient id="earthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4CAF50" />
                      <stop offset="50%" stopColor="#2196F3" />
                      <stop offset="100%" stopColor="#1976D2" />
                    </linearGradient>
                    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9C27B0" />
                      <stop offset="100%" stopColor="#3F51B5" />
                    </linearGradient>
                    <radialGradient id="glowEffect" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  
                  {/* Background */}
                  <rect width="700" height="450" fill="#0A1628" />
                  
                  {/* Stars */}
                  <circle cx="100" cy="50" r="2" fill="white" opacity="0.8" />
                  <circle cx="200" cy="80" r="1.5" fill="white" opacity="0.6" />
                  <circle cx="300" cy="40" r="1" fill="white" opacity="0.7" />
                  <circle cx="500" cy="60" r="2" fill="white" opacity="0.9" />
                  <circle cx="600" cy="90" r="1.5" fill="white" opacity="0.5" />
                  
                  {/* Earth */}
                  <circle cx="350" cy="225" r="120" fill="url(#earthGradient)" />
                  <path d="M280,180 Q320,160 360,180 Q400,200 420,240 Q400,280 360,270 Q320,290 280,270 Q260,240 280,180" fill="#2E7D32" opacity="0.7" />
                  <path d="M290,300 Q330,320 370,300 Q410,280 430,320" fill="#2E7D32" opacity="0.6" />
                  
                  {/* AI Brain connected to Earth */}
                  <g transform="translate(500,150)">
                    <circle cx="0" cy="0" r="60" fill="url(#brainGradient)" opacity="0.9" />
                    <path d="M-40,-20 Q-20,-40 0,-30 Q20,-40 40,-20 Q20,0 0,-10 Q-20,0 -40,-20 Z" fill="#E1BEE7" opacity="0.8" />
                    <circle cx="-20" cy="-15" r="4" fill="#9C27B0" />
                    <circle cx="0" cy="-20" r="4" fill="#9C27B0" />
                    <circle cx="20" cy="-15" r="4" fill="#9C27B0" />
                    <circle cx="-10" cy="5" r="3" fill="#9C27B0" />
                    <circle cx="15" cy="8" r="3" fill="#9C27B0" />
                    
                    {/* Neural connections */}
                    <path d="M-20,-15 L0,-20 L20,-15" stroke="#9C27B0" strokeWidth="2" fill="none" />
                    <path d="M0,-20 L-10,5 L15,8" stroke="#9C27B0" strokeWidth="1.5" fill="none" />
                    <path d="M-20,-15 L15,8" stroke="#9C27B0" strokeWidth="1" fill="none" opacity="0.6" />
                  </g>
                  
                  {/* Connection between AI and Earth */}
                  <path d="M470,190 Q450,210 430,200 Q410,190 390,200 Q370,210 350,200" stroke="#FFD700" strokeWidth="3" fill="none" opacity="0.8" />
                  <circle cx="470" cy="190" r="4" fill="#FFD700" />
                  <circle cx="390" cy="200" r="4" fill="#FFD700" />
                  
                  {/* Renewable energy symbols around Earth */}
                  <g transform="translate(250,150)">
                    <circle cx="0" cy="0" r="15" fill="#FFD700" opacity="0.8" />
                    <path d="M-8,-8 L8,8 M8,-8 L-8,8" stroke="#FFA000" strokeWidth="2" />
                  </g>
                  
                  <g transform="translate(180,250)">
                    <rect x="-3" y="0" width="6" height="40" fill="#E0E0E0" />
                    <path d="M0,0 L0,-15 L10,-12 Z" fill="#4CAF50" />
                    <path d="M0,0 L12,8 L6,15 Z" fill="#4CAF50" />
                    <path d="M0,0 L-12,6 L-15,-6 Z" fill="#4CAF50" />
                  </g>
                  
                  <g transform="translate(520,280)">
                    <rect x="0" y="0" width="30" height="20" fill="#2196F3" rx="3" />
                    <rect x="35" y="5" width="30" height="20" fill="#1976D2" rx="3" />
                  </g>
                  
                  {/* Data streams */}
                  <g opacity="0.6">
                    <circle cx="150" cy="350" r="3" fill="#00BCD4">
                      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="200" cy="370" r="3" fill="#00BCD4">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="250" cy="390" r="3" fill="#00BCD4">
                      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    
                    <path d="M150,350 Q175,340 200,370 Q225,400 250,390" stroke="#00BCD4" strokeWidth="2" fill="none" opacity="0.5" />
                  </g>
                  
                  {/* Mission text overlay */}
                  <g transform="translate(50,380)">
                    <rect x="0" y="0" width="300" height="60" fill="white" fillOpacity="0.95" rx="10" />
                    <text x="150" y="20" textAnchor="middle" fontSize="14" fill="#1976D2" fontWeight="bold">Our Mission</text>
                    <text x="150" y="40" textAnchor="middle" fontSize="12" fill="#666">Accelerating sustainable energy transition</text>
                    <text x="150" y="55" textAnchor="middle" fontSize="12" fill="#666">through intelligent investment solutions</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mb-6">
                Founder's Note
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Vision for Sustainable Finance
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  FinergyCloud was founded by <strong>O.J. Nwani</strong>, a UK-based SAP & AI consultant 
                  and clean energy innovator. The company was officially registered in the UK in June 2025 
                  to scale its mission of unlocking sustainable energy financing in Africa using artificial intelligence.
                </p>
                <p>
                  Now headquartered in the UK, FinergyCloud plans to collaborate with UK-based clean energy 
                  investors and climate tech researchers to expand the platform's reach and impact across 
                  global renewable energy markets.
                </p>
                <div className="flex items-center pt-6 border-t border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">O.J. Nwani</div>
                    <div className="text-sm text-gray-500">Founder & CEO</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <Quote className="w-12 h-12 text-green-600 mb-6" />
              <blockquote className="text-lg italic text-gray-700 mb-6 leading-relaxed">
                "The future of renewable energy investment lies in democratizing access to sophisticated 
                analysis tools. Our AI-powered platform makes institutional-grade investment intelligence 
                accessible to investors of all sizes, accelerating the global transition to clean energy."
              </blockquote>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <div className="font-semibold text-gray-900">Founded in UK</div>
                  <div className="text-sm text-gray-500">June 2025</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">AI Accuracy</div>
                  <div className="text-sm text-green-600">94%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4">
              Market Validation & Traction
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quantifiable Impact Across Multiple African Markets
            </h2>
            <p className="text-xl text-gray-600">
              Proven results and growing traction in renewable energy investment intelligence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-900 font-medium mb-2">{stat.label}</div>
                    <div className="text-sm text-gray-500">{stat.subtext}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mb-4">
              Our Core Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to innovation, sustainability, integrity, and partnership guides every decision we make
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gray-800 text-white px-4 py-2 text-sm font-medium mb-4">
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From Vision to Reality
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The evolution of FinergyCloud from academic research to market-leading AI platform
            </p>
          </div>
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{item.year}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience FinergyCloud?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join forward-thinking investors using AI-powered intelligence for renewable energy investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 shadow-lg">
                Explore Our Solutions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/?platform=mobile">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 shadow-lg">
                Try Mobile Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}