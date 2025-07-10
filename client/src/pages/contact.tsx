import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SocialLinks from "@/components/social-links";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  Home,
  ChevronRight,
  Globe,
  Calendar,
  Video,
  FileText
} from "lucide-react";

export default function Contact() {
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help with technical issues, billing, or general inquiries",
      contact: "support@finergycloud.com",
      action: "Send Email",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: MessageSquare,
      title: "Business Inquiries",
      description: "Partnership opportunities, enterprise solutions, and custom integrations",
      contact: "business@finergycloud.com",
      action: "Contact Sales",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "Investor Relations",
      description: "Connect with our team for investment discussions and platform demos",
      contact: "investors@finergycloud.com",
      action: "Schedule Meeting",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["United Kingdom", "London Office", "Registered Company"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday", "9:00 AM - 6:00 PM GMT", "Weekend Support Available"]
    },
    {
      icon: Globe,
      title: "Global Reach",
      details: ["50+ Countries Served", "Africa-Focused Operations", "Emerging Markets Specialist"]
    }
  ];

  const supportOptions = [
    {
      icon: Video,
      title: "Schedule Demo",
      description: "Book a personalized platform demonstration with our team",
      action: "Book Demo Call"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Comprehensive guides, API docs, and technical resources",
      action: "View Docs"
    },
    {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Connect with other users and get answers from experts",
      action: "Join Community"
    },
    {
      icon: Calendar,
      title: "Training Sessions",
      description: "Learn to maximize your investment analysis capabilities",
      action: "Schedule Training"
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
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-6">
            Get in Touch
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Contact
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              FinergyCloud
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Ready to transform your renewable energy investments? Our team is here to help you 
            get started with AI-powered investment intelligence.
          </p>
          
          {/* Professional Contact Illustration */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-3xl">
              <svg viewBox="0 0 700 350" className="w-full h-auto">
                <defs>
                  <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="globeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                  <radialGradient id="glowEffect" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </radialGradient>
                </defs>
                
                {/* Background */}
                <rect width="700" height="350" fill="#f8fafc" rx="16" />
                
                {/* Global Communication Network */}
                <g transform="translate(350,175)">
                  {/* Central Globe */}
                  <circle cx="0" cy="0" r="60" fill="url(#globeGradient)" opacity="0.9" />
                  <circle cx="0" cy="0" r="45" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#93c5fd" strokeWidth="1.5" opacity="0.4" />
                  
                  {/* Continents */}
                  <path d="M-30,-20 Q-10,-30 10,-20 Q30,-10 35,10 Q20,25 0,20 Q-20,30 -35,10 Q-30,-5 -30,-20 Z" fill="#10b981" opacity="0.7" />
                  <path d="M-20,15 Q0,25 20,15 Q35,20 30,35 Q10,40 -10,35 Q-25,25 -20,15 Z" fill="#10b981" opacity="0.6" />
                  
                  {/* Glow effect */}
                  <circle cx="0" cy="0" r="80" fill="url(#glowEffect)" />
                </g>
                
                {/* Communication Nodes */}
                <g>
                  {/* UK Office */}
                  <g transform="translate(150,100)">
                    <circle cx="0" cy="0" r="20" fill="#f59e0b" opacity="0.9" />
                    <rect x="-8" y="-8" width="16" height="16" fill="white" rx="2" />
                    <path d="M-6,-6 L6,6 M6,-6 L-6,6" stroke="#f59e0b" strokeWidth="2" />
                    <text x="0" y="35" textAnchor="middle" fontSize="12" fontWeight="600" fill="#374151">UK HQ</text>
                  </g>
                  
                  {/* Nigeria Operations */}
                  <g transform="translate(550,120)">
                    <circle cx="0" cy="0" r="18" fill="#10b981" opacity="0.9" />
                    <circle cx="0" cy="0" r="8" fill="white" />
                    <circle cx="0" cy="0" r="4" fill="#10b981" />
                    <text x="0" y="35" textAnchor="middle" fontSize="12" fontWeight="600" fill="#374151">Nigeria</text>
                  </g>
                  
                  {/* Kenya Hub */}
                  <g transform="translate(480,250)">
                    <circle cx="0" cy="0" r="16" fill="#3b82f6" opacity="0.9" />
                    <rect x="-6" y="-6" width="12" height="12" fill="white" rx="1" />
                    <rect x="-4" y="-4" width="2" height="8" fill="#3b82f6" />
                    <rect x="-1" y="-4" width="2" height="6" fill="#3b82f6" />
                    <rect x="2" y="-4" width="2" height="7" fill="#3b82f6" />
                    <text x="0" y="32" textAnchor="middle" fontSize="12" fontWeight="600" fill="#374151">Kenya</text>
                  </g>
                  
                  {/* Global Support */}
                  <g transform="translate(200,280)">
                    <circle cx="0" cy="0" r="14" fill="#8b5cf6" opacity="0.9" />
                    <path d="M-8,-4 L8,4 M8,-4 L-8,4" stroke="white" strokeWidth="2" />
                    <text x="0" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="#374151">Support</text>
                  </g>
                </g>
                
                {/* Connection Lines */}
                <g stroke="#e5e7eb" strokeWidth="2" fill="none" opacity="0.6">
                  <path d="M170,115 Q260,140 290,160" />
                  <path d="M390,160 Q470,140 530,135" />
                  <path d="M365,220 Q420,235 465,245" />
                  <path d="M290,200 Q245,240 215,270" />
                </g>
                
                {/* Communication Icons */}
                <g transform="translate(50,50)">
                  {/* Email */}
                  <rect x="0" y="0" width="40" height="28" fill="#f3f4f6" rx="4" stroke="#d1d5db" strokeWidth="1" />
                  <path d="M5,8 L20,18 L35,8" stroke="#6b7280" strokeWidth="2" fill="none" />
                  <text x="20" y="45" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280">Email</text>
                </g>
                
                <g transform="translate(620,280)">
                  {/* Phone */}
                  <rect x="0" y="0" width="20" height="32" fill="#10b981" rx="6" />
                  <rect x="3" y="6" width="14" height="20" fill="white" rx="2" />
                  <circle cx="10" cy="29" r="2" fill="white" />
                  <text x="10" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280">Call</text>
                </g>
                
                <g transform="translate(60,280)">
                  {/* Meeting */}
                  <circle cx="15" cy="15" r="15" fill="#3b82f6" opacity="0.2" />
                  <circle cx="10" cy="12" r="4" fill="#3b82f6" />
                  <circle cx="20" cy="12" r="4" fill="#3b82f6" />
                  <path d="M5,20 Q15,25 25,20" stroke="#3b82f6" strokeWidth="2" fill="none" />
                  <text x="15" y="45" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280">Meet</text>
                </g>
                
                {/* Data flow animation */}
                <g opacity="0.7">
                  <circle cx="250" cy="150" r="3" fill="#10b981">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="450" cy="180" r="3" fill="#3b82f6">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="320" cy="220" r="3" fill="#8b5cf6">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </g>
                
                {/* Contact Information Box */}
                <g transform="translate(450,50)">
                  <rect x="0" y="0" width="200" height="80" fill="white" fillOpacity="0.95" rx="8" stroke="#e5e7eb" strokeWidth="1" />
                  <text x="100" y="20" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1f2937">Contact FinergyCloud</text>
                  <text x="100" y="38" textAnchor="middle" fontSize="11" fill="#6b7280">info@finergycloud.com</text>
                  <text x="100" y="52" textAnchor="middle" fontSize="11" fill="#6b7280">+44 (0) 20 7946 0958</text>
                  <text x="100" y="66" textAnchor="middle" fontSize="11" fill="#6b7280">London, United Kingdom</text>
                </g>
              </svg>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Free demo available
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              No commitment required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Expert guidance included
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mb-4">
              Contact Methods
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Can We Help You?
            </h2>
            <p className="text-xl text-gray-600">
              Choose the best way to reach our team based on your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md text-center">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{method.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{method.description}</p>
                    <div className="text-lg font-medium text-blue-600 mb-6">{method.contact}</div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      {method.action}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4">
              Send us a Message
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>
          
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" className="mt-1" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@company.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700">Company</Label>
                    <Input id="company" placeholder="Your company name" className="mt-1" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</Label>
                  <Input id="subject" placeholder="What can we help you with?" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your renewable energy investment needs..."
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                
                <div className="text-center">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-12 py-4">
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mb-4">
              Office Information
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Global Presence
            </h2>
            <p className="text-xl text-gray-600">
              Headquartered in the UK with a focus on emerging markets worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {officeInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="text-gray-600">{detail}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4">
              Additional Support
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              More Ways to Get Help
            </h2>
            <p className="text-xl text-gray-600">
              Explore our comprehensive support resources and training options
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{option.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{option.description}</p>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of investors using FinergyCloud's AI-powered platform for renewable energy investments.
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
                Try Mobile App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          
          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-green-500">
            <p className="text-green-100 mb-6">Follow us for updates and insights</p>
            <SocialLinks variant="footer" />
          </div>
        </div>
      </section>
    </div>
  );
}