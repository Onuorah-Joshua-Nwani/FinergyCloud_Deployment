import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    tags: ["MVP Development", "Pilot Program", "Startup Journey", "UK Registration", "Backtesting"],
    content: `Three years ago, I was sitting in a small office in London, frustrated by a simple yet complex problem: why was it so difficult to make informed decisions about renewable energy investments in emerging markets?

The data was scattered, the risk assessment tools were outdated, and traditional financial models simply weren't designed for the unique challenges of solar farms in Nigeria or wind projects in Kenya. That frustration became the seed for what is now FinergyCloud.

## The Early Days: Research and Reality Checks

Back in early 2022, we weren't building a platform – we were asking questions. Hard questions about why renewable energy projects succeeded or failed, what factors truly mattered for ROI in emerging markets, and whether artificial intelligence could actually help investors make better decisions.

We spent months collecting data. Not just financial data, but real-world information about grid stability in different regions, community engagement levels, regulatory environments, and even weather patterns. Our team traveled to project sites, spoke with local engineers, and interviewed investors who had both succeeded and failed in this space.

The reality check came quickly: existing investment tools were built for mature markets. They assumed stable grids, predictable regulatory environments, and easily accessible project data. None of these assumptions held true for the markets we wanted to serve.

*Continue reading this full article on Medium and LinkedIn to learn about our three-year development journey, 94% AI prediction accuracy, and upcoming pilot program launch...*`,
    mediumUrl: "https://medium.com/@finergycloud/building-finergycloud-mvp-2025",
    linkedinUrl: "https://linkedin.com/pulse/building-finergycloud-mvp-2025-oj-nwani"
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
      tags: ["Pilot Program", "Early Access", "Customer Development", "Partnership"],
      content: `After three years of development in stealth mode, we're ready to open our doors. But we're not doing a traditional product launch with flashy marketing campaigns and broad public availability. Instead, we're taking a deliberate, partnership-focused approach that puts our first customers at the center of everything we do.

## Why a Pilot Program Approach?

The renewable energy investment landscape is complex, and every investor has different needs, constraints, and objectives. A one-size-fits-all platform simply won't work in this space.

By launching with a carefully selected group of pilot customers, we can learn from real use cases, refine our algorithms with actual investment decisions, and build features that matter based on genuine user needs rather than assumptions.

*Read the complete article on Medium and LinkedIn to learn about our pilot selection process, what partners receive, and how to apply...*`,
      mediumUrl: "https://medium.com/@finergycloud/seeking-pilot-customers-2025",
      linkedinUrl: "https://linkedin.com/pulse/seeking-pilot-customers-finergycloud-launch-oj-nwani"
    },
    {
      title: "XGBoost Backtesting: Validating 94% Accuracy with Historical Data",
      excerpt: "Deep dive into our machine learning validation methodology. How we used 3 years of historical renewable energy project data to validate our prediction algorithms before building the MVP platform.",
      author: "FinergyCloud AI Team",
      date: "January 8, 2025",
      readTime: "12 min read",
      category: "AI & Technology",
      image: "📈",
      tags: ["XGBoost", "Backtesting", "Data Validation", "Algorithm Development", "MVP"],
      content: `When we tell people that our AI model achieves 94% accuracy in predicting renewable energy project success, the first question is always: "How do you know?"

It's a fair question. In an industry where bold claims about AI capabilities often exceed actual performance, rigorous validation isn't just important – it's essential for building the trust that investment decisions require.

This article takes you inside our three-year validation process, explaining how we used historical data from hundreds of renewable energy projects to test, refine, and validate our prediction algorithms.

*Read the full technical deep-dive on Medium and LinkedIn to understand our methodology, data sources, and validation results...*`,
      mediumUrl: "https://medium.com/@finergycloud/xgboost-backtesting-validation-2025",
      linkedinUrl: "https://linkedin.com/pulse/xgboost-backtesting-94-accuracy-finergycloud-ai-team"
    },
    {
      title: "Roadmap 2025-2027: Planned Innovations and Future Features",
      excerpt: "Our technical roadmap for the next 3 years: from MVP pilot to Series A funding, including planned blockchain integration, satellite data analysis, and real-time market intelligence features.",
      author: "Product Strategy Team",
      date: "January 6, 2025",
      readTime: "11 min read",
      category: "Platform Development",
      image: "🗺️",
      tags: ["Roadmap", "Future Features", "Innovation", "Blockchain", "Satellite Data"],
      content: `Building a startup in the renewable energy investment space means thinking both tactically about immediate needs and strategically about where the market is heading. Our three-year roadmap balances delivering immediate value to our pilot customers with preparing for the technological advances that will reshape this industry.

## 2025: Foundation Year - Pilot to Product-Market Fit

### Q1 2025: Pilot Program Launch
We're validating product-market fit with 15 carefully selected pilot customers, focusing on real-world validation of our 94% prediction accuracy with live investment decisions.

### Q2 2025: Feature Refinement and Expansion
Building the features most requested by pilot customers, including advanced scenario modeling with Monte Carlo simulation and custom ESG weighting systems.

### Q3-Q4 2025: Scale Preparation and Series A
Expanding to 50+ active customers and completing Series A funding ($5-8M target) for team expansion and market growth.

*Read the complete roadmap on Medium and LinkedIn to learn about our satellite data integration plans, blockchain vision, and long-term market strategy...*`,
      mediumUrl: "https://medium.com/@finergycloud/roadmap-2025-2027-innovations",
      linkedinUrl: "https://linkedin.com/pulse/finergycloud-roadmap-2025-2027-product-strategy-team"
    },
    {
      title: "Multi-Currency IRR Modeling: Building for Global Markets",
      excerpt: "Technical implementation of our currency conversion engine supporting NGN, GBP, and EUR. How we designed the financial modeling system to handle real-time exchange rates for emerging market investments.",
      author: "Financial Engineering Team",
      date: "January 4, 2025",
      readTime: "9 min read",
      category: "Financial Modeling",
      image: "💱",
      tags: ["IRR Analysis", "Currency Conversion", "Financial Modeling", "Global Markets", "MVP"],
      content: `When we started building FinergyCloud, one of the first technical challenges we encountered was seemingly simple: how do you calculate meaningful financial returns for renewable energy investments when projects are in Nigeria, investors are in London, and financing comes from multiple currencies?

Traditional IRR calculators assume a single currency and stable exchange rates. But emerging market renewable energy investments often involve complex currency dynamics that can make or break investment returns.

## The Challenge: Why Single-Currency Models Don't Work

Most financial modeling tools were built for developed markets where currency volatility is relatively low and most transactions happen in a single currency. These assumptions break down quickly in emerging market renewable energy.

## Our Solution: Dynamic Multi-Currency Modeling

We built our IRR calculator around three core principles: currency-native cash flow modeling, real-time exchange rate integration, and volatility-aware projections.

*Read the complete technical article on Medium and LinkedIn to understand our multi-currency modeling approach, real-world case studies, and implementation details...*`,
      mediumUrl: "https://medium.com/@finergycloud/multi-currency-irr-modeling-global-markets",
      linkedinUrl: "https://linkedin.com/pulse/multi-currency-irr-modeling-global-markets-financial-engineering"
    },
    {
      title: "ESG Framework for African Renewable Energy: Our Research Foundation",
      excerpt: "How we adapted traditional ESG methodologies for emerging market renewable energy projects during our research phase, creating the foundation for our current scoring algorithms.",
      author: "ESG Research Team",
      date: "January 2, 2025",
      readTime: "10 min read",
      category: "ESG & Sustainability",
      image: "🌍",
      tags: ["ESG Framework", "Emerging Markets", "Research", "Africa", "Methodology"],
      content: `Traditional ESG frameworks were developed primarily for evaluating companies in mature markets with established regulatory systems, standardized reporting practices, and relatively stable institutional environments. When we began researching renewable energy investments in African markets, we quickly discovered that applying these frameworks without adaptation would miss the most important factors that determine project success and impact.

## The Problem with Standard ESG Frameworks

Most established ESG rating systems focus on corporate behavior within existing institutional frameworks. They assume established regulatory environments, standardized reporting, mature stakeholder systems, and binary compliance thinking.

## Our Research Methodology: Building from the Ground Up

Rather than simply adapting existing frameworks, we decided to build our ESG methodology based on extensive field research across African renewable energy markets. We conducted over 200 interviews across five countries and detailed case studies of 15 renewable energy projects.

*Read the complete research methodology and framework details on Medium and LinkedIn to understand our adapted ESG approach for African renewable energy markets...*`,
      mediumUrl: "https://medium.com/@finergycloud/esg-framework-african-renewable-energy",
      linkedinUrl: "https://linkedin.com/pulse/esg-framework-african-renewable-energy-research-team"
    },
    {
      title: "From Research to MVP: Lessons from Building in Stealth Mode",
      excerpt: "Three years of development insights: the challenges of building an AI-powered fintech platform, key technical decisions, and why we chose to focus on renewable energy investment intelligence.",
      author: "Development Team",
      date: "December 30, 2024",
      readTime: "8 min read",
      category: "Platform Development",
      image: "⚡",
      tags: ["MVP Development", "Stealth Mode", "Technical Challenges", "Startup Journey"],
      content: `While other fintech startups were raising millions and making headlines, we made a deliberate choice to build in stealth mode. We wanted to validate our assumptions with real data before making any grand claims.

This meant three years of intensive development work without the pressure of public scrutiny or investor demands for rapid growth. It meant we could focus on getting the fundamentals right: the machine learning algorithms, the data collection methods, and the user experience that would actually help investors make better decisions.

## Key Lessons from Three Years in Stealth

**Technology alone isn't enough.** The best algorithms in the world are useless if they don't solve real problems for real people. We spent as much time understanding our users' workflows as we did optimizing our machine learning models.

**Data quality matters more than data quantity.** We turned down partnerships that would have given us more data but lower quality insights.

*Read the complete development story on Medium and LinkedIn to learn about our technical decisions, challenges overcome, and lessons learned building an AI-powered fintech platform...*`,
      mediumUrl: "https://medium.com/@finergycloud/mvp-lessons-stealth-mode-development",
      linkedinUrl: "https://linkedin.com/pulse/research-mvp-lessons-stealth-mode-development-team"
    },
    {
      title: "Future Innovation: Satellite Data Integration for Solar Project Analysis",
      excerpt: "Preview of our planned 2026 feature: integrating satellite imagery and weather data for real-time solar project performance prediction. How AI will analyze irradiance patterns and equipment degradation.",
      author: "Future Tech Team",
      date: "December 28, 2024",
      readTime: "13 min read",
      category: "AI & Technology",
      image: "🛰️",
      tags: ["Satellite Data", "Future Features", "Solar Analysis", "AI Integration", "Innovation"],
      content: `One of our most ambitious technical developments planned for 2026 is the integration of satellite imagery and weather data to enable real-time monitoring of project performance and predictive maintenance. By integrating satellite data, we'll revolutionize how investors monitor and analyze renewable energy projects.

## Technical Implementation Vision

Our satellite integration will include partnership with satellite data providers for high-resolution imagery, computer vision algorithms for solar panel and wind turbine condition assessment, weather pattern analysis for performance prediction, and automated alert systems for performance anomalies.

## Customer Value Proposition

This advancement will provide real-time project health monitoring without site visits, predictive maintenance alerts reducing downtime by an estimated 25%, performance validation for insurance and financing requirements, and enhanced due diligence capabilities for acquisition opportunities.

*Read the complete technical roadmap on Medium and LinkedIn to understand our satellite data integration strategy, AI capabilities, and timeline for deployment...*`,
      mediumUrl: "https://medium.com/@finergycloud/satellite-data-integration-solar-analysis",
      linkedinUrl: "https://linkedin.com/pulse/future-innovation-satellite-data-solar-analysis-future-tech"
    },
    {
      title: "Blockchain for Renewable Energy: Our 2027 Vision",
      excerpt: "Long-term vision for integrating blockchain technology with renewable energy investments. How smart contracts could automate ESG compliance monitoring and enable decentralized investment tracking.",
      author: "Innovation Team",
      date: "December 25, 2024",
      readTime: "15 min read",
      category: "Future Technology",
      image: "⛓️",
      tags: ["Blockchain", "Smart Contracts", "Future Vision", "Decentralization", "ESG Automation"],
      content: `Our 2027 vision includes pioneering blockchain-based transparency and automation in renewable energy investment. This development addresses the growing demand for transparent, verifiable ESG impact reporting and automated compliance monitoring.

## Technical Architecture Vision

We're planning smart contracts for automated ESG milestone verification, blockchain-based carbon credit tracking and verification, decentralized impact reporting with immutable audit trails, and token-based incentive systems for community engagement in projects.

## Use Cases and Applications

The blockchain integration will enable automated impact verification for ESG-linked financing, transparent community benefit distribution for local stakeholders, real-time carbon credit generation and trading, and decentralized due diligence with community-verified project data.

## Market Positioning

This positions us as the first platform to offer blockchain-verified ESG compliance, creates partnership opportunities with carbon credit marketplaces, and enables integration with decentralized finance protocols for project financing.

*Read the complete blockchain vision on Medium and LinkedIn to understand our long-term technology strategy, implementation timeline, and market opportunities...*`,
      mediumUrl: "https://medium.com/@finergycloud/blockchain-renewable-energy-2027-vision",
      linkedinUrl: "https://linkedin.com/pulse/blockchain-renewable-energy-2027-vision-innovation-team"
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

  const handleReadMore = (post: any) => {
    // Show options for reading on different platforms
    const readOptions = [];
    if (post.mediumUrl) readOptions.push(`Medium: ${post.mediumUrl}`);
    if (post.linkedinUrl) readOptions.push(`LinkedIn: ${post.linkedinUrl}`);
    
    if (readOptions.length > 0) {
      const message = `📖 Read "${post.title}" on:\n\n${readOptions.join('\n\n')}\n\nFull articles with detailed content, real-world examples, and technical insights are available on these platforms. Perfect for sharing with your network!`;
      alert(message);
    } else {
      alert(`📝 "${post.title}"\n\nThis article will be published soon on Medium and LinkedIn. Our comprehensive blog content includes detailed technical analysis, case studies, and actionable insights for renewable energy investment professionals.`);
    }
  };

  const handleShare = (post: any, platform: string) => {
    let shareUrl = '';
    const text = `${post.title} - ${post.excerpt}`;
    
    switch(platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.linkedinUrl || window.location.href)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(post.mediumUrl || window.location.href)}`;
        break;
      case 'medium':
        if (post.mediumUrl) {
          window.open(post.mediumUrl, '_blank');
          return;
        }
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
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
              
              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => handleReadMore(featuredPost)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Share:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(featuredPost, 'linkedin')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(featuredPost, 'medium')}
                    className="text-green-600 hover:text-green-700"
                  >
                    Medium
                  </Button>
                </div>
              </div>
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
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={() => handleReadMore(post)}
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button 
                          onClick={() => handleShare(post, 'linkedin')}
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600"
                        >
                          Share
                        </Button>
                      </div>
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
            Join our early subscriber list. Unsubscribe anytime.
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
            Join our pilot program and be among the first to experience AI-powered renewable energy investment intelligence.
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
                Try Mobile Experience
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