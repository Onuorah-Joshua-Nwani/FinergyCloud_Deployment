import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Footer from "@/components/footer";
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
      title: "General Support",
      description: "Technical issues, billing questions, and platform assistance",
      contact: "support@finergycloud.com",
      action: "Send Email",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: MessageSquare,
      title: "Partnership Inquiries",
      description: "Strategic partnerships, NGO collaborations, university research projects",
      contact: "partnerships@finergycloud.com",
      action: "Discuss Partnership",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "Business Development",
      description: "Enterprise solutions, custom integrations, and commercial opportunities",
      contact: "business@finergycloud.com",
      action: "Contact Sales",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Zap,
      title: "Investor Relations",
      description: "Investment discussions, platform demos, and funding opportunities",
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
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/40 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-white/80">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-white/60" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-white">{item.label}</span>
                ) : (
                  <Link href={item.path} className="hover:text-yellow-300 transition-colors">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-6">
            Get in Touch
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-12">
            <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h1>
          <p className="text-base md:text-lg text-green-100 max-w-4xl mx-auto leading-relaxed mb-20">
            Ready to transform your renewable energy investments? Our team is here to help you 
            get started with AI-powered investment intelligence.
          </p>
          
          {/* Professional Contact Illustration */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-3xl">
              <img src="/assets/global-contact-network.svg" alt="FinergyCloud Global Contact Network" className="w-full h-auto" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
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