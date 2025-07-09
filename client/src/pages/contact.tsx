import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Calendar,
  Building2,
  Globe,
  Github,
  Youtube,
  Users,
  Target,
  Handshake
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  investmentRange: z.string().optional(),
  preferredContact: z.string().min(1, "Please select preferred contact method")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      inquiryType: "",
      subject: "",
      message: "",
      investmentRange: "",
      preferredContact: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly via email.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      primary: "hello@finergycloud.com",
      secondary: "For general inquiries and support",
      action: "mailto:hello@finergycloud.com"
    },
    {
      icon: Building2,
      title: "Business Inquiries",
      primary: "partnerships@finergycloud.com",
      secondary: "For investment partnerships and collaborations",
      action: "mailto:partnerships@finergycloud.com"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      primary: "United Kingdom",
      secondary: "Registered June 2025",
      action: null
    },
    {
      icon: Clock,
      title: "Response Time",
      primary: "Within 24 hours",
      secondary: "Monday to Friday, UK time",
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      title: "GitHub Repository",
      description: "Explore our open-source code",
      link: "https://github.com/Onuorah-Joshua-Nwani/ojn-msp-1-finergycloud",
      badge: "150+ Commits"
    },
    {
      icon: Youtube,
      title: "YouTube Channel",
      description: "Watch demos and tutorials",
      link: "https://www.youtube.com/@FinergyCloud_official",
      badge: "Video Demos"
    },
    {
      icon: Globe,
      title: "Main Website",
      description: "Visit our company website",
      link: "https://www.finergycloud.com",
      badge: "Live Site"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Ready to transform your renewable energy investment strategy? 
            Let's discuss how FinergyCloud can help you make smarter decisions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="mr-3 h-6 w-6 text-green-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company/Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="inquiryType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Inquiry Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select inquiry type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="demo">Request Demo</SelectItem>
                                <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                                <SelectItem value="investment">Investment Opportunity</SelectItem>
                                <SelectItem value="technical">Technical Support</SelectItem>
                                <SelectItem value="media">Media & Press</SelectItem>
                                <SelectItem value="general">General Question</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="investmentRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Investment Range (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="under-1m">Under ₦1M</SelectItem>
                                <SelectItem value="1m-10m">₦1M - ₦10M</SelectItem>
                                <SelectItem value="10m-50m">₦10M - ₦50M</SelectItem>
                                <SelectItem value="50m-100m">₦50M - ₦100M</SelectItem>
                                <SelectItem value="over-100m">Over ₦100M</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject *</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of your inquiry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about your needs, project details, or questions..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Contact Method *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="How would you like us to contact you?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="video">Video Call</SelectItem>
                              <SelectItem value="meeting">In-Person Meeting</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700" 
                      size="lg"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <info.icon className="h-5 w-5 text-green-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        {info.action ? (
                          <a 
                            href={info.action}
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            {info.primary}
                          </a>
                        ) : (
                          <p className="text-gray-900 font-medium">{info.primary}</p>
                        )}
                        <p className="text-sm text-gray-600">{info.secondary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-green-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="/app">
                    <Target className="mr-2 h-4 w-4" />
                    Try Live Platform
                  </a>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="https://www.youtube.com/@FinergyCloud_official" target="_blank">
                    <Youtube className="mr-2 h-4 w-4" />
                    Watch Video Demo
                  </a>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="https://github.com/Onuorah-Joshua-Nwani/ojn-msp-1-finergycloud" target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    View GitHub Repository
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <link.icon className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{link.title}</p>
                        <p className="text-sm text-gray-600">{link.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{link.badge}</Badge>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                  <p className="text-sm text-gray-600 mb-2">Monday - Friday</p>
                  <p className="text-sm text-gray-600">9:00 AM - 6:00 PM (UK Time)</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">
                    Usually reply within 4 hours
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}