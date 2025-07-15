import { useState } from 'react';
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/hooks/use-toast";

import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
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
  ChevronRight,
  X,
  Share2,
  ExternalLink
} from "lucide-react";
import { blogArticles, blogCategories, getFeaturedArticle } from '@shared/blog-content';
import type { BlogArticle } from '@shared/blog-content';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [isReading, setIsReading] = useState(false);
  const { toast } = useToast();
  
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" }
  ];
  
  const featuredPost = getFeaturedArticle()!;
  const blogPosts = blogArticles.filter(article => article.id !== featuredPost.id);

  const handleReadMore = (article: BlogArticle) => {
    setSelectedArticle(article);
    setIsReading(true);
  };

  const handleCloseReader = () => {
    setIsReading(false);
    setSelectedArticle(null);
  };

  const handleShare = (article: BlogArticle, platform: 'linkedin' | 'medium' | 'twitter' | 'facebook' | 'whatsapp' | 'telegram' | 'reddit') => {
    let url = '';
    let platformName = '';
    
    switch (platform) {
      case 'linkedin':
        url = article.linkedinUrl || '';
        platformName = 'LinkedIn';
        break;
      case 'medium':
        url = article.mediumUrl || '';
        platformName = 'Medium';
        break;
      case 'twitter':
        url = article.twitterUrl || '';
        platformName = 'Twitter';
        break;
      case 'facebook':
        url = article.facebookUrl || '';
        platformName = 'Facebook';
        break;
      case 'whatsapp':
        url = article.whatsappUrl || '';
        platformName = 'WhatsApp';
        break;
      case 'telegram':
        url = article.telegramUrl || '';
        platformName = 'Telegram';
        break;
      case 'reddit':
        url = article.redditUrl || '';
        platformName = 'Reddit';
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      toast({
        title: `Shared to ${platformName}`,
        description: `Opening ${platformName} to share "${article.title}"`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Share link not available",
        description: `No ${platformName} sharing link found for this article`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
              
              <div className="flex items-center gap-4 flex-wrap">
                <Button 
                  onClick={() => handleReadMore(featuredPost)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <div className="flex items-center gap-2 flex-wrap">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(featuredPost, 'twitter')}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(featuredPost, 'facebook')}
                    className="text-blue-800 hover:text-blue-900"
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(featuredPost, 'whatsapp')}
                    className="text-green-500 hover:text-green-600"
                  >
                    WhatsApp
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
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md cursor-pointer h-full"
                    onClick={() => handleReadMore(post)}>
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
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReadMore(post);
                          }}
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <BookOpen className="w-4 h-4 mr-1" />
                          Read
                        </Button>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(post, 'linkedin');
                            }}
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Share on LinkedIn"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(post, 'twitter');
                            }}
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-400 hover:text-blue-600 p-1"
                            title="Share on Twitter"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(post, 'whatsapp');
                            }}
                            variant="ghost" 
                            size="sm" 
                            className="text-green-500 hover:text-green-600 p-1"
                            title="Share on WhatsApp"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Blog Reading Modal */}
      <Dialog open={isReading} onOpenChange={handleCloseReader}>
        <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[95vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 sm:p-6 border-b shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-lg sm:text-2xl font-bold mb-2 pr-8 sm:pr-0">
                  {selectedArticle?.title || "Blog Article"}
                </DialogTitle>
                <DialogDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                  <span>By {selectedArticle?.author}</span>
                  <span>{selectedArticle?.date}</span>
                  <span>{selectedArticle?.readTime}</span>
                </DialogDescription>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedArticle && handleShare(selectedArticle, 'linkedin')}
                  className="text-blue-600 hover:text-blue-800 text-xs"
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedArticle && handleShare(selectedArticle, 'medium')}
                  className="text-green-600 hover:text-green-800 text-xs"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Medium</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedArticle && handleShare(selectedArticle, 'twitter')}
                  className="text-blue-400 hover:text-blue-600 text-xs"
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Twitter</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedArticle && handleShare(selectedArticle, 'whatsapp')}
                  className="text-green-500 hover:text-green-600 text-xs"
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <ScrollArea className="flex-1 p-4 sm:p-6">
            <div className="prose prose-sm sm:prose-lg max-w-none">
              <div className="mb-6">
                <Badge className="mb-4">{selectedArticle?.category}</Badge>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  {selectedArticle?.excerpt}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedArticle?.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .blog-content h1 { font-size: 1.5rem; font-weight: bold; margin: 1.5rem 0 1rem 0; color: #1f2937; }
                    .blog-content h2 { font-size: 1.25rem; font-weight: bold; margin: 1.25rem 0 0.75rem 0; color: #1f2937; }
                    .blog-content h3 { font-size: 1.125rem; font-weight: bold; margin: 1rem 0 0.5rem 0; color: #1f2937; }
                    .blog-content p { margin-bottom: 1rem; line-height: 1.6; }
                    .blog-content ul { margin-bottom: 1rem; padding-left: 1.5rem; }
                    .blog-content li { margin-bottom: 0.5rem; }
                    .blog-content strong { font-weight: bold; color: #1f2937; }
                    .blog-content em { font-style: italic; }
                    .blog-content code { background-color: #f3f4f6; padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-size: 0.875rem; }
                    .blog-content pre { background-color: #f3f4f6; padding: 0.75rem; border-radius: 0.5rem; overflow-x: auto; margin: 1rem 0; font-size: 0.875rem; }
                    
                    @media (max-width: 640px) {
                      .blog-content h1 { font-size: 1.25rem; margin: 1rem 0 0.75rem 0; }
                      .blog-content h2 { font-size: 1.125rem; margin: 1rem 0 0.5rem 0; }
                      .blog-content h3 { font-size: 1rem; margin: 0.75rem 0 0.5rem 0; }
                      .blog-content p { font-size: 0.875rem; line-height: 1.5; }
                      .blog-content ul { padding-left: 1rem; }
                      .blog-content li { font-size: 0.875rem; }
                      .blog-content code { font-size: 0.75rem; }
                      .blog-content pre { font-size: 0.75rem; padding: 0.5rem; }
                    }
                  `
                }} />
                <div className="blog-content">
                  {selectedArticle?.content}
                </div>
              </div>
              
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Share this article</h4>
                    <p className="text-sm text-gray-600">Help others discover valuable insights about renewable energy investment</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2">
                    <Button
                      onClick={() => selectedArticle && handleShare(selectedArticle, 'linkedin')}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button
                      onClick={() => selectedArticle && handleShare(selectedArticle, 'medium')}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Medium
                    </Button>
                    <Button
                      onClick={() => selectedArticle && handleShare(selectedArticle, 'twitter')}
                      className="bg-blue-400 hover:bg-blue-500 text-white text-xs sm:text-sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      onClick={() => selectedArticle && handleShare(selectedArticle, 'facebook')}
                      className="bg-blue-800 hover:bg-blue-900 text-white text-xs sm:text-sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      onClick={() => selectedArticle && handleShare(selectedArticle, 'whatsapp')}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={() => selectedArticle && handleShare(selectedArticle, 'telegram')}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Telegram
                    </Button>
                    <Button
                      onClick={() => selectedArticle && handleShare(selectedArticle, 'reddit')}
                      className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Reddit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Footer />
      <Toaster />
    </div>
  );
}