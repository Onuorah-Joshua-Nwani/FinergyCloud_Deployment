import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  TrendingUp,
  BarChart3,
  Users,
  Globe,
  Crown,
  Sparkles
} from "lucide-react";

const SUBSCRIPTION_PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with renewable energy investing",
    features: [
      "Access to basic dashboard",
      "View up to 5 projects",
      "Basic ESG scoring",
      "Standard market insights",
      "Community support"
    ],
    limitations: [
      "Limited to 5 projects",
      "Basic analytics only",
      "No advanced AI features"
    ],
    color: "border-gray-200",
    buttonColor: "secondary",
    icon: Shield,
    popular: false
  },
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    period: "per month",
    description: "Enhanced features for serious renewable energy investors",
    features: [
      "All Free features",
      "Access to 25 projects",
      "Advanced ESG analytics",
      "IRR calculator with scenarios",
      "Priority market insights",
      "Email support",
      "Mobile gesture controls",
      "Risk heat map analytics"
    ],
    limitations: [
      "Limited to 25 projects",
      "Standard AI recommendations"
    ],
    color: "border-blue-200",
    buttonColor: "primary",
    icon: TrendingUp,
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "$99",
    period: "per month", 
    description: "Complete platform access for professional investors",
    features: [
      "All Basic features",
      "Unlimited projects",
      "Advanced AI recommendations",
      "Voice insights narrator",
      "Eco-impact calculator with gamification",
      "Project recommendation engine",
      "Custom ESG reports",
      "Multi-currency support",
      "Priority support & account manager",
      "API access",
      "White-label options"
    ],
    limitations: [],
    color: "border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50",
    buttonColor: "default",
    icon: Crown,
    popular: false
  }
];

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<string>("basic");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const { data: currentSubscription, isLoading } = useQuery({
    queryKey: ["/api/subscription/status"],
    enabled: isAuthenticated,
  });

  const subscribeMutation = useMutation({
    mutationFn: async (planId: string) => {
      const response = await apiRequest("POST", "/api/subscription/create", { 
        planId,
        successUrl: window.location.origin + "/subscribe?success=true",
        cancelUrl: window.location.origin + "/subscribe?canceled=true"
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast({
          title: "Subscription Updated",
          description: "Your subscription has been successfully updated!",
        });
        queryClient.invalidateQueries({ queryKey: ["/api/subscription/status"] });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Error",
        description: error.message || "Failed to process subscription. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    },
  });

  const handleSubscribe = async (planId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    setIsProcessing(true);
    setSelectedPlan(planId);
    subscribeMutation.mutate(planId);
  };

  const isCurrentPlan = (planId: string) => {
    return currentSubscription?.plan === planId && currentSubscription?.status === "active";
  };

  const canUpgrade = (planId: string) => {
    if (!currentSubscription) return true;
    const currentPlanIndex = SUBSCRIPTION_PLANS.findIndex(p => p.id === currentSubscription.plan);
    const targetPlanIndex = SUBSCRIPTION_PLANS.findIndex(p => p.id === planId);
    return targetPlanIndex > currentPlanIndex;
  };

  if (!isAuthenticated) {
    return (
      <div className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Investment Plan
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Please log in to view and manage your subscription
            </p>
            <Button onClick={() => window.location.href = "/api/login"} size="lg">
              Log In to Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Investment Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unlock the full potential of renewable energy investing with our comprehensive platform. 
            Scale your portfolio with advanced analytics, AI-powered insights, and professional tools.
          </p>
        </div>

        {/* Current Subscription Status */}
        {currentSubscription && (
          <div className="mb-8">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Current Plan: {SUBSCRIPTION_PLANS.find(p => p.id === currentSubscription.plan)?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Status: {currentSubscription.status} | 
                        {currentSubscription.endDate && ` Renews: ${new Date(currentSubscription.endDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const IconComponent = plan.icon;
            const isCurrent = isCurrentPlan(plan.id);
            const canUpgradeToThis = canUpgrade(plan.id);
            
            return (
              <Card 
                key={plan.id} 
                className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-full ${
                      plan.id === 'free' ? 'bg-gray-100' : 
                      plan.id === 'basic' ? 'bg-blue-100' : 
                      'bg-purple-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        plan.id === 'free' ? 'text-gray-600' : 
                        plan.id === 'basic' ? 'text-blue-600' : 
                        'text-purple-600'
                      }`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-center gap-2 opacity-60">
                        <div className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm text-gray-500">• {limitation}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    className="w-full"
                    variant={isCurrent ? "outline" : plan.buttonColor as any}
                    size="lg"
                    disabled={isCurrent || isProcessing || (selectedPlan === plan.id && subscribeMutation.isPending)}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {isProcessing && selectedPlan === plan.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : isCurrent ? (
                      "Current Plan"
                    ) : !canUpgradeToThis ? (
                      "Downgrade"
                    ) : plan.id === "free" ? (
                      "Start Free"
                    ) : (
                      `Choose ${plan.name}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Feature Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive portfolio analytics with real-time insights and performance tracking
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI-Powered Recommendations</h3>
                <p className="text-sm text-gray-600">
                  Machine learning algorithms provide personalized investment recommendations
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">ESG Impact Tracking</h3>
                <p className="text-sm text-gray-600">
                  Monitor environmental and social impact of your renewable energy investments
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Multi-Currency Support</h3>
                <p className="text-sm text-gray-600">
                  Global investment tracking with automatic currency conversion and regional insights
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
                <p className="text-sm text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades and at the next billing cycle for downgrades.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-sm text-gray-600">
                  We accept all major credit cards, debit cards, and bank transfers through our secure Stripe payment processing.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-sm text-gray-600">
                  Our Free plan gives you access to core features forever. You can upgrade to access advanced features anytime.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How secure is my data?</h3>
                <p className="text-sm text-gray-600">
                  We use enterprise-grade security with encrypted data storage, secure API endpoints, and compliance with industry standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}