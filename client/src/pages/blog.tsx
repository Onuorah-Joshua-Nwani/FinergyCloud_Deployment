import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialLinks from "@/components/social-links";
import PlatformSwitcher from "@/components/platform-switcher";
import Footer from "@/components/footer";
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
    title: "Building FinergyCloud MVP: From Concept to Pilot Program in 2025",
    excerpt: "Our journey from early 2022 research to developing a validated MVP platform for renewable energy investment intelligence. Discover how we achieved 94% prediction accuracy through backtesting and what's next for our pilot program.",
    author: "O.J. Nwani",
    date: "January 12, 2025",
    readTime: "10 min read",
    category: "Company Updates",
    image: "🚀",
    tags: ["MVP Development", "Pilot Program", "Startup Journey", "UK Registration", "Backtesting"]
  };

  const blogPosts = [
    {
      title: "Seeking Pilot Customers: FinergyCloud's Launch Strategy for 2025",
      excerpt: "As we prepare for our official pilot program launch, we're looking for forward-thinking investors and renewable energy professionals to join our early access program and shape the future of AI-powered investment intelligence.",
      author: "O.J. Nwani",
      date: "January 10, 2025",
      readTime: "7 min read",
      category: "Company Updates",
      image: "🎯",
      tags: ["Pilot Program", "Early Access", "Customer Development", "Partnership"]
    },
    {
      title: "XGBoost Backtesting: Validating 94% Accuracy with Historical Data",
      excerpt: "Deep dive into our machine learning validation methodology. How we used 3 years of historical renewable energy project data to validate our prediction algorithms before building the MVP platform.",
      author: "FinergyCloud AI Team",
      date: "January 8, 2025",
      readTime: "12 min read",
      category: "AI & Technology",
      image: "📈",
      tags: ["XGBoost", "Backtesting", "Data Validation", "Algorithm Development", "MVP"]
    },
    {
      title: "Roadmap 2025-2027: Planned Innovations and Future Features",
      excerpt: "Our technical roadmap for the next 3 years: from MVP pilot to Series A funding, including planned blockchain integration, satellite data analysis, and real-time market intelligence features.",
      author: "Product Strategy Team",
      date: "January 6, 2025",
      readTime: "11 min read",
      category: "Platform Development",
      image: "🗺️",
      tags: ["Roadmap", "Future Features", "Innovation", "Blockchain", "Satellite Data"]
    },
    {
      title: "Multi-Currency IRR Modeling: Building for Global Markets",
      excerpt: "Technical implementation of our currency conversion engine supporting NGN, GBP, and EUR. How we designed the financial modeling system to handle real-time exchange rates for emerging market investments.",
      author: "Financial Engineering Team",
      date: "January 4, 2025",
      readTime: "9 min read",
      category: "Financial Modeling",
      image: "💱",
      tags: ["IRR Analysis", "Currency Conversion", "Financial Modeling", "Global Markets", "MVP"]
    },
    {
      title: "ESG Framework for African Renewable Energy: Our Research Foundation",
      excerpt: "How we adapted traditional ESG methodologies for emerging market renewable energy projects during our research phase, creating the foundation for our current scoring algorithms.",
      author: "ESG Research Team",
      date: "January 2, 2025",
      readTime: "10 min read",
      category: "ESG & Sustainability",
      image: "🌍",
      tags: ["ESG Framework", "Emerging Markets", "Research", "Africa", "Methodology"]
    },
    {
      title: "From Research to MVP: Lessons from Building in Stealth Mode",
      excerpt: "Three years of development insights: the challenges of building an AI-powered fintech platform, key technical decisions, and why we chose to focus on renewable energy investment intelligence.",
      author: "Development Team",
      date: "December 30, 2024",
      readTime: "8 min read",
      category: "Platform Development",
      image: "⚡",
      tags: ["MVP Development", "Stealth Mode", "Technical Challenges", "Startup Journey"]
    },
    {
      title: "Future Innovation: Satellite Data Integration for Solar Project Analysis",
      excerpt: "Preview of our planned 2026 feature: integrating satellite imagery and weather data for real-time solar project performance prediction. How AI will analyze irradiance patterns and equipment degradation.",
      author: "Future Tech Team",
      date: "December 28, 2024",
      readTime: "13 min read",
      category: "AI & Technology",
      image: "🛰️",
      tags: ["Satellite Data", "Future Features", "Solar Analysis", "AI Integration", "Innovation"]
    },
    {
      title: "Blockchain for Renewable Energy: Our 2027 Vision",
      excerpt: "Long-term vision for integrating blockchain technology with renewable energy investments. How smart contracts could automate ESG compliance monitoring and enable decentralized investment tracking.",
      author: "Innovation Team",
      date: "December 25, 2024",
      readTime: "15 min read",
      category: "Future Technology",
      image: "⛓️",
      tags: ["Blockchain", "Smart Contracts", "Future Vision", "Decentralization", "ESG Automation"]
    }
  ];

  const categories = [
    { name: "AI & Technology", count: 12, icon: Zap, description: "Machine learning, algorithms, and tech innovation" },
    { name: "ESG & Sustainability", count: 8, icon: Leaf, description: "Environmental and social impact assessment" },
    { name: "Financial Modeling", count: 6, icon: BarChart3, description: "IRR analysis, currency modeling, and finance" },
    { name: "Company Updates", count: 10, icon: Users, description: "Company news, partnerships, and growth" },
    { name: "Platform Development", count: 9, icon: Globe, description: "Technical architecture and platform evolution" },
    { name: "Future Technology", count: 5, icon: TrendingUp, description: "Upcoming innovations and long-term vision" }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="block mb-4">FinergyCloud</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Insights & Research
            </span>
          </h1>
          <p className="text-base md:text-lg mb-16 max-w-4xl mx-auto text-green-100 leading-relaxed">
            Development insights, technical deep-dives, and our journey building next-generation 
            renewable energy investment intelligence platform
          </p>
          
          {/* Blog Page Illustration */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-2xl">
              <img src="/assets/ai-renewable-analytics.svg" alt="FinergyCloud AI-Powered Analytics" className="w-full h-auto" />
            </div>
          </div>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-white text-green-600 text-lg py-2 px-4">
              <BookOpen className="w-4 h-4 mr-2" />
              50+ Articles
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
                Join Pilot Program
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