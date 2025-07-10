import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialLinks from "@/components/social-links";
import PlatformSwitcher from "@/components/platform-switcher";
import { 
  Calendar,
  User,
  Users,
  ArrowRight,
  TrendingUp,
  Globe,
  Zap,
  Leaf,
  BarChart3,
  Clock,
  BookOpen,
  Home,
  ChevronRight
} from "lucide-react";

export default function Blog() {
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" }
  ];
  
  const featuredPost = {
    title: "The Future of AI in Renewable Energy Investment: A 2025 Perspective",
    excerpt: "How machine learning and artificial intelligence are revolutionizing investment decisions in the renewable energy sector, with insights from FinergyCloud's proprietary XGBoost algorithms achieving 94% accuracy.",
    author: "O.J. Nwani",
    date: "January 10, 2025",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "🤖",
    tags: ["AI", "Machine Learning", "Investment Strategy", "XGBoost", "Emerging Markets"]
  };

  const blogPosts = [
    {
      title: "FinergyCloud's UK Registration: Scaling AI-Powered Sustainable Finance",
      excerpt: "Our journey from Nigeria-focused platform to UK-registered company, expanding our mission to transform renewable energy investment intelligence across global markets with strategic partnerships.",
      author: "O.J. Nwani",
      date: "January 8, 2025",
      readTime: "6 min read",
      category: "Company Updates",
      image: "🇬🇧",
      tags: ["UK Registration", "Global Expansion", "Company Growth", "Strategic Partnerships"]
    },
    {
      title: "XGBoost in Action: How We Achieved 94% Prediction Accuracy",
      excerpt: "Deep dive into our proprietary machine learning algorithms, the data science methodology behind our renewable energy project success predictions, and real-world validation results.",
      author: "FinergyCloud AI Team",
      date: "January 5, 2025",
      readTime: "12 min read",
      category: "AI & Technology",
      image: "⚙️",
      tags: ["XGBoost", "Machine Learning", "Data Science", "Prediction Accuracy", "Algorithm"]
    },
    {
      title: "Multi-Currency IRR Analysis: Supporting NGN, GBP, and EUR Markets",
      excerpt: "Technical implementation of real-time currency conversion in renewable energy financial modeling, with case studies from Nigerian, British, and European investment scenarios.",
      author: "Financial Engineering Team",
      date: "January 3, 2025",
      readTime: "10 min read",
      category: "Financial Modeling",
      image: "💱",
      tags: ["IRR Analysis", "Currency Conversion", "Financial Modeling", "Global Markets"]
    },
    {
      title: "ESG Scoring Framework for Emerging Market Renewable Energy",
      excerpt: "How we adapted traditional ESG assessment methodologies for African renewable energy projects, addressing unique challenges in emerging market sustainability evaluation.",
      author: "ESG Research Team",
      date: "December 30, 2024",
      readTime: "9 min read",
      category: "ESG & Sustainability",
      image: "🌍",
      tags: ["ESG Scoring", "Emerging Markets", "Sustainability", "Africa", "Framework"]
    },
    {
      title: "From Academic Research to ₦120M+ Investment Analysis",
      excerpt: "The evolution of FinergyCloud from university research project to analyzing over ₦120 million in renewable energy investments across 12 solar projects in Nigeria and Kenya.",
      author: "Market Intelligence Team",
      date: "December 28, 2024",
      readTime: "11 min read",
      category: "Market Analysis",
      image: "📊",
      tags: ["Market Traction", "Investment Analysis", "Africa", "Solar Energy", "Growth"]
    },
    {
      title: "Building Cross-Platform Investment Intelligence: Web + Mobile",
      excerpt: "Technical architecture and user experience considerations for delivering seamless renewable energy investment insights across web and mobile platforms with real-time synchronization.",
      author: "Platform Engineering Team",
      date: "December 25, 2024",
      readTime: "8 min read",
      category: "Platform Development",
      image: "📱",
      tags: ["Cross-Platform", "Mobile Development", "Web Platform", "User Experience", "Architecture"]
    }
  ];

  const categories = [
    { name: "AI & Technology", count: 15, icon: Zap, description: "Machine learning, algorithms, and tech innovation" },
    { name: "ESG & Sustainability", count: 22, icon: Leaf, description: "Environmental and social impact assessment" },
    { name: "Financial Modeling", count: 18, icon: BarChart3, description: "IRR analysis, currency modeling, and finance" },
    { name: "Market Analysis", count: 28, icon: TrendingUp, description: "Market intelligence and investment trends" },
    { name: "Company Updates", count: 8, icon: Users, description: "Company news, partnerships, and growth" },
    { name: "Platform Development", count: 12, icon: Globe, description: "Technical architecture and platform evolution" }
  ];

  const handleReadMore = (postTitle: string) => {
    // Create a modal or expanded view for the blog post
    alert(`Reading: ${postTitle}\n\nThis would open the full article in a real blog system. For now, this demonstrates the blog functionality is working.`);
  };

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
            FinergyCloud
            <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Insights & Research
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-green-100">
            Expert analysis, market insights, and thought leadership on renewable energy investment, 
            AI-driven analytics, and sustainable finance
          </p>
          
          {/* Blog Page Illustration */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-2xl">
              <svg viewBox="0 0 600 300" className="w-full h-auto">
                <defs>
                  <linearGradient id="blogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#2196F3" />
                  </linearGradient>
                  <linearGradient id="paperGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F5F5F5" />
                  </linearGradient>
                </defs>
                
                {/* Background */}
                <rect width="600" height="300" fill="rgba(255,255,255,0.1)" rx="15" />
                
                {/* Knowledge articles floating */}
                <g transform="translate(100,80)">
                  <rect x="0" y="0" width="120" height="80" fill="url(#paperGradient)" rx="8" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <rect x="10" y="15" width="80" height="4" fill="#2196F3" />
                  <rect x="10" y="25" width="100" height="3" fill="#4CAF50" />
                  <rect x="10" y="35" width="90" height="3" fill="#4CAF50" />
                  <rect x="10" y="45" width="70" height="3" fill="#4CAF50" />
                  <circle cx="95" cy="65" r="8" fill="#FFD700" />
                  <text x="95" y="70" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">AI</text>
                </g>
                
                <g transform="translate(280,50)">
                  <rect x="0" y="0" width="120" height="80" fill="url(#paperGradient)" rx="8" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <rect x="10" y="15" width="85" height="4" fill="#9C27B0" />
                  <rect x="10" y="25" width="95" height="3" fill="#4CAF50" />
                  <rect x="10" y="35" width="80" height="3" fill="#4CAF50" />
                  <rect x="10" y="45" width="75" height="3" fill="#4CAF50" />
                  <circle cx="95" cy="65" r="8" fill="#4CAF50" />
                  <text x="95" y="70" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">ESG</text>
                </g>
                
                <g transform="translate(460,70)">
                  <rect x="0" y="0" width="120" height="80" fill="url(#paperGradient)" rx="8" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <rect x="10" y="15" width="75" height="4" fill="#FF9800" />
                  <rect x="10" y="25" width="90" height="3" fill="#4CAF50" />
                  <rect x="10" y="35" width="85" height="3" fill="#4CAF50" />
                  <rect x="10" y="45" width="80" height="3" fill="#4CAF50" />
                  <circle cx="95" cy="65" r="8" fill="#FF9800" />
                  <text x="95" y="70" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">FINTECH</text>
                </g>
                
                <g transform="translate(190,170)">
                  <rect x="0" y="0" width="120" height="80" fill="url(#paperGradient)" rx="8" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <rect x="10" y="15" width="70" height="4" fill="#E91E63" />
                  <rect x="10" y="25" width="85" height="3" fill="#4CAF50" />
                  <rect x="10" y="35" width="95" height="3" fill="#4CAF50" />
                  <rect x="10" y="45" width="60" height="3" fill="#4CAF50" />
                  <circle cx="95" cy="65" r="8" fill="#E91E63" />
                  <text x="95" y="70" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">MARKET</text>
                </g>
                
                <g transform="translate(370,190)">
                  <rect x="0" y="0" width="120" height="80" fill="url(#paperGradient)" rx="8" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <rect x="10" y="15" width="90" height="4" fill="#3F51B5" />
                  <rect x="10" y="25" width="75" height="3" fill="#4CAF50" />
                  <rect x="10" y="35" width="100" height="3" fill="#4CAF50" />
                  <rect x="10" y="45" width="85" height="3" fill="#4CAF50" />
                  <circle cx="95" cy="65" r="8" fill="#3F51B5" />
                  <text x="95" y="70" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">TECH</text>
                </g>
                
                {/* Knowledge connections */}
                <g opacity="0.4">
                  <path d="M220,120 Q250,140 340,90" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
                  <path d="M400,90 Q450,110 520,110" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
                  <path d="M160,160 Q200,180 250,210" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
                  <path d="M310,210 Q350,220 430,230" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
                </g>
                
                {/* Central knowledge hub */}
                <g transform="translate(300,150)">
                  <circle cx="0" cy="0" r="30" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
                  <circle cx="0" cy="0" r="20" fill="url(#blogGradient)" opacity="0.8" />
                  <path d="M-10,-10 L-10,10 L10,10 L10,5 L-5,5 L-5,-5 L10,-5 L10,-10 Z" fill="white" />
                  <text x="0" y="45" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Knowledge Hub</text>
                </g>
              </svg>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-white text-green-600 text-lg py-2 px-4">
              <BookOpen className="w-4 h-4 mr-2" />
              75+ Articles
            </Badge>
            <Badge className="bg-green-100 text-green-800 text-lg py-2 px-4">
              <Users className="w-4 h-4 mr-2" />
              Expert Authors
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 text-lg py-2 px-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Weekly Updates
            </Badge>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="mb-16 overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-12 text-white flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">{featuredPost.image}</div>
                <Badge className="bg-white/20 text-white px-3 py-1 text-sm">
                  {featuredPost.category}
                </Badge>
              </div>
            </div>
            
            <div className="p-12">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {featuredPost.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredPost.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button 
                onClick={() => handleReadMore(featuredPost.title)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600">
              In-depth analysis, technical insights, and company updates
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md cursor-pointer h-full">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-green-500 to-blue-600 p-8 text-white text-center">
                    <div className="text-4xl mb-2">{post.image}</div>
                    <Badge className="bg-white/20 text-white px-2 py-1 text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        By {post.author}
                      </div>
                      <Button 
                        onClick={() => handleReadMore(post.title)}
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600">
              Dive deeper into specific topics that interest you most
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count} articles
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-gray-800 text-white px-4 py-2 text-sm font-medium mb-6">
            Stay Updated
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss an Insight
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Get the latest renewable energy investment intelligence and platform updates delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button className="bg-green-600 hover:bg-green-700 px-6 py-3">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="text-sm text-gray-400">
            Join 2,500+ renewable energy professionals. Unsubscribe anytime.
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
            Join the renewable energy investment revolution with AI-powered intelligence and comprehensive market insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 shadow-lg">
                Start Free Trial
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