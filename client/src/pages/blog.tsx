import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialLinks from "@/components/social-links";
import PlatformSwitcher from "@/components/platform-switcher";
import { 
  Calendar,
  User,
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
  const featuredPost = {
    title: "The Future of AI in Renewable Energy Investment: A 2025 Perspective",
    excerpt: "How machine learning and artificial intelligence are revolutionizing investment decisions in the renewable energy sector, with insights from FinergyCloud's proprietary algorithms.",
    author: "O.J. Nwani",
    date: "January 8, 2025",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "🤖",
    tags: ["AI", "Machine Learning", "Investment Strategy", "Future Trends"]
  };

  const blogPosts = [
    {
      title: "ESG Scoring in Emerging Markets: Challenges and Opportunities",
      excerpt: "Analyzing the unique considerations for Environmental, Social, and Governance assessments in developing economies and how FinergyCloud addresses these complexities.",
      author: "FinergyCloud Research Team",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "ESG & Sustainability",
      image: "🌍",
      tags: ["ESG", "Emerging Markets", "Sustainability", "Risk Assessment"]
    },
    {
      title: "Multi-Currency IRR Analysis: Navigating Global Renewable Energy Markets",
      excerpt: "Best practices for conducting Internal Rate of Return calculations across different currencies, with real-world examples from Nigerian, British, and European markets.",
      author: "Financial Analysis Team",
      date: "January 3, 2025",
      readTime: "10 min read",
      category: "Financial Modeling",
      image: "💰",
      tags: ["IRR", "Financial Modeling", "Currency Exchange", "Global Markets"]
    },
    {
      title: "Solar vs Wind: Comparative Investment Analysis for 2025",
      excerpt: "Comprehensive comparison of solar and wind energy investments, including market trends, technology advances, and regional performance metrics.",
      author: "Market Intelligence Team",
      date: "December 30, 2024",
      readTime: "12 min read",
      category: "Market Analysis",
      image: "⚡",
      tags: ["Solar Energy", "Wind Power", "Investment Comparison", "Market Trends"]
    },
    {
      title: "Risk Management Strategies for Renewable Energy Portfolios",
      excerpt: "Advanced risk assessment techniques and diversification strategies to optimize renewable energy investment portfolios in volatile markets.",
      author: "Risk Management Team",
      date: "December 28, 2024",
      readTime: "9 min read",
      category: "Risk Management",
      image: "🛡️",
      tags: ["Risk Management", "Portfolio Optimization", "Investment Strategy", "Diversification"]
    },
    {
      title: "The Rise of Energy Storage: Investment Opportunities and Challenges",
      excerpt: "Exploring the rapidly growing energy storage sector, from battery technologies to grid-scale solutions, and their impact on renewable energy investments.",
      author: "Technology Analysis Team",
      date: "December 25, 2024",
      readTime: "11 min read",
      category: "Technology Trends",
      image: "🔋",
      tags: ["Energy Storage", "Battery Technology", "Grid Solutions", "Technology Investment"]
    }
  ];

  const categories = [
    { name: "AI & Technology", count: 12, icon: Zap },
    { name: "ESG & Sustainability", count: 18, icon: Leaf },
    { name: "Financial Modeling", count: 15, icon: BarChart3 },
    { name: "Market Analysis", count: 22, icon: TrendingUp },
    { name: "Risk Management", count: 9, icon: Globe }
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
            <Link href="/" className="hover:text-green-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Blog & Insights</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-6xl">{featuredPost.image}</div>
                    <div className="flex-1">
                      <Badge className="bg-green-100 text-green-800 mb-2">
                        {featuredPost.category}
                      </Badge>
                      <CardTitle className="text-2xl md:text-3xl mb-2">
                        {featuredPost.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleReadMore(featuredPost.title)}
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Posts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{post.image}</div>
                        <div className="flex-1">
                          <Badge className="bg-blue-100 text-blue-800 mb-2">
                            {post.category}
                          </Badge>
                          <CardTitle className="text-xl mb-2">
                            {post.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() => handleReadMore(post.title)}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div key={index} className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Subscribe to Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get weekly insights on renewable energy markets, AI developments, and investment strategies.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["AI", "ESG", "Solar", "Wind", "Investment", "Risk", "Portfolio", "Technology", "Markets", "Sustainability"].map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-green-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Connect & Subscribe Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with FinergyCloud
          </h2>
          <p className="text-gray-600 mb-8">
            Follow our latest insights and join the renewable energy investment community
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
              <SocialLinks showLabels className="justify-center" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Platform</h3>
              <PlatformSwitcher variant="banner" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}