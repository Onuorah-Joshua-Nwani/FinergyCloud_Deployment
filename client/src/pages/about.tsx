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
    { value: "5,000+", label: "Projects Analyzed", icon: Target },
    { value: "50+", label: "Countries Served", icon: Globe },
    { value: "94%", label: "Prediction Accuracy", icon: TrendingUp },
    { value: "$2.5B", label: "Investment Value Assessed", icon: Award }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging cutting-edge AI and machine learning to revolutionize renewable energy investment analysis",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Heart,
      title: "Sustainability",
      description: "Committed to accelerating the global transition to clean energy through intelligent investment decisions",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Providing transparent, accurate, and unbiased analysis to build trust with our investment community",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Building long-term relationships with investors, developers, and stakeholders in the renewable energy ecosystem",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "Foundation & Vision",
      description: "FinergyCloud was founded with the mission to democratize renewable energy investment through AI-powered analytics"
    },
    {
      year: "2021",
      title: "AI Development",
      description: "Developed proprietary XGBoost algorithms achieving 94% accuracy in renewable energy project success prediction"
    },
    {
      year: "2022",
      title: "Platform Launch",
      description: "Launched comprehensive ESG scoring system and multi-currency financial modeling capabilities"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to serve investors across 50+ countries with localized market intelligence and regulatory insights"
    },
    {
      year: "2024",
      title: "Mobile Innovation",
      description: "Introduced mobile platform and gamification features to enhance user engagement and accessibility"
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Continuing innovation in AI-driven investment intelligence and sustainable finance solutions"
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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transforming Renewable Energy
                <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
                  Investment Intelligence
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Founded by O.J. Nwani, FinergyCloud empowers investors with AI-driven insights 
                to make smarter, more sustainable investment decisions in the renewable energy sector.
              </p>
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-green-50">
                Our Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <Quote className="w-12 h-12 text-yellow-300 mb-4" />
                <blockquote className="text-xl italic mb-4">
                  "Our mission is to accelerate the global transition to clean energy by providing 
                  investors with the most accurate, comprehensive, and actionable intelligence available."
                </blockquote>
                <cite className="text-green-200 font-semibold">— O.J. Nwani, Founder & CEO</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Making an Impact
            </h2>
            <p className="text-xl text-gray-600">
              Our platform drives meaningful results for the renewable energy investment community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-8">
                    <Icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to the renewable energy investment community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-lg">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From vision to reality: the evolution of FinergyCloud
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{item.year}</span>
                  </div>
                </div>
                <Card className="flex-1 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            To democratize access to renewable energy investment intelligence by providing 
            cutting-edge AI-powered analytics, comprehensive ESG assessments, and real-time 
            market insights that enable informed, sustainable, and profitable investment decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-green-100 text-green-800 text-lg py-2 px-4">
              AI-Powered Analytics
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 text-lg py-2 px-4">
              ESG Leadership
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 text-lg py-2 px-4">
              Global Impact
            </Badge>
          </div>
          <Button size="lg" className="text-lg px-8 py-4 bg-green-600 hover:bg-green-700">
            Join Our Mission
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Future of Renewable Energy Investment
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Ready to join the thousands of investors already using our AI-powered platform? Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4">
                Start Your Investment Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/solutions">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4">
                Explore Our Solutions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          
          {/* Quick Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-green-100">
            <Link href="/" className="hover:text-white transition-colors">
              Back to Home
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

      {/* Connect & Platform Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Social Connect */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4">
                Connect to Our Socials
              </h3>
              <p className="text-gray-300 mb-6">
                Follow the journey and insights from FinergyCloud's founder across social platforms
              </p>
              <SocialLinks showLabels />
            </div>

            {/* Platform Access */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4">
                Experience FinergyCloud
              </h3>
              <p className="text-gray-300 mb-6">
                Access our platform from web or mobile to start your renewable energy investment journey
              </p>
              <div className="flex gap-4">
                <a href="https://7dd13212-e6ad-4c47-be70-2f844171b442-00-15tmn1l2tiykx.spock.replit.dev/?platform=mobile" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Mobile App
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FinergyCloud. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}