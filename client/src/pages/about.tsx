import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Footer from "@/components/footer";
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
    { value: "10", label: "Beta Users", icon: Users, subtext: "Nigeria & Ghana markets" },
    { value: "94%", label: "XGBoost Accuracy", icon: Award, subtext: "Django risk engine validated" },
    { value: "UK", label: "Registration", icon: Globe, subtext: "CAPEX/OPEX, IRR, ESG scoring" },
    { value: "2025", label: "MVP Launch", icon: Target, subtext: "Django-based analytics platform" }
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
      year: "2022",
      title: "Foundation & Vision",
      description: "FinergyCloud was conceived to address the critical gap in ESG risk intelligence for West African renewable energy projects, focusing on project developers and climate finance teams."
    },
    {
      year: "2023",
      title: "Django Platform Development",
      description: "Built Python-based risk engine with XGBoost models achieving 94% accuracy. Developed CAPEX/OPEX analysis and developer track record scoring for emerging markets."
    },
    {
      year: "2024",
      title: "MVP Development & UK Registration",
      description: "Built Django platform with Python risk engine, achieved 94% XGBoost accuracy, and completed UK company registration. Developed PWA for mobile access."
    },
    {
      year: "2025",
      title: "Closed Beta Launch",
      description: "Launched with 10 beta users across Nigeria and Ghana including solar developers, NGO finance teams, and climate consultants. Power BI integration completed."
    },
    {
      year: "2025-2026",
      title: "West Africa Expansion",
      description: "Target: Scale to 50+ users across Nigeria, Ghana, Senegal. Validate product-market fit with project developers and climate finance organizations."
    },
    {
      year: "2026-2027",
      title: "Enterprise SaaS Growth",
      description: "Plan: Expand enterprise features, strategic partnerships with DFIs, achieve recurring revenue with 200+ active organizations across West Africa."
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
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-8">
              🇬🇧 UK Registered • 🤖 AI-Powered • 🌍 Africa-Focused
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Our Story
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-20">
              An innovative startup developing AI-powered renewable energy investment analysis. 
              Our MVP platform features IRR simulation, ESG scoring, and risk profiling designed 
              specifically for emerging market opportunities.
            </p>
            
            {/* About Page Illustration */}
            <div className="flex justify-center">
              <div className="w-full max-w-3xl">
                <img src="/assets/sustainable-mission.svg" alt="FinergyCloud Sustainable Mission" className="w-full h-auto" />
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
                  As an early-stage startup now based in the UK, FinergyCloud is actively seeking initial 
                  funding and pilot customers. We aim to collaborate with UK-based clean energy investors 
                  and climate tech researchers to validate our MVP and prepare for commercial launch.
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
              Current Development Status
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Early-Stage Innovation Ready for Market
            </h2>
            <p className="text-xl text-gray-600">
              Technical achievements and development milestones toward commercial launch
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
              The journey from academic research to AI-powered startup ready for market entry
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
            Be among the first to experience next-generation renewable energy investment analysis.
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

      <Footer />
    </div>
  );
}