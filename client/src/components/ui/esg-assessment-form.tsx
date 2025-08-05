import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Shield, TrendingUp, CheckCircle, AlertCircle, ArrowLeft, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link, useLocation } from "wouter";

const esgAssessmentSchema = z.object({
  projectType: z.string().min(1, "Please select a project type"),
  location: z.string().min(1, "Please select a location"),
  capacity: z.number().min(0.1, "Capacity must be at least 0.1 MW"),
  projectedIRR: z.number().min(1, "IRR must be at least 1%").max(50, "IRR cannot exceed 50%"),
  gridStability: z.number().min(1).max(10),
  communityEngagement: z.number().min(1).max(10),
  governanceFramework: z.number().min(1).max(10),
});

type ESGAssessmentFormData = z.infer<typeof esgAssessmentSchema>;

interface ESGAssessmentResult {
  overallScore: number;
  riskBand: string;
  recommendation: string;
  confidence: number;
  environmental: number;
  social: number;
  governance: number;
  investmentSummary: string;
  keyMetrics: {
    projectedIRR: string;
    paybackPeriod: string;
    co2Reduction: string;
    jobsCreated: number;
    communitiesServed: string;
    energyAccess: string;
  };
}

interface ESGAssessmentFormProps {
  isMobile?: boolean;
}

export default function ESGAssessmentForm({ isMobile = false }: ESGAssessmentFormProps) {
  const [assessmentResult, setAssessmentResult] = useState<ESGAssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location] = useLocation();
  const [sourceRoute, setSourceRoute] = useState<string>("");
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const { toast } = useToast();

  // Check where the user came from
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    console.log('ESG Assessment Form - URL params:', window.location.search);
    console.log('ESG Assessment Form - from parameter:', from);
    console.log('ESG Assessment Form - Current location:', window.location.href);
    
    if (from === 'solutions') {
      setSourceRoute('/solutions');
      console.log('ESG Assessment Form - Setting route to /solutions');
    } else if (from === 'mobile-scoring') {
      setSourceRoute('/mobile-scoring?from=solutions');
      console.log('ESG Assessment Form - Setting route to /mobile-scoring?from=solutions');
    } else if (from === 'demo') {
      setSourceRoute('/demo-access');
      console.log('ESG Assessment Form - Setting route to /demo-access for demo');
    } else {
      setSourceRoute('/demo-access'); // Default fallback to Demo Access page
      console.log('ESG Assessment Form - Using default route /demo-access');
    }
  }, [location]);

  const form = useForm<ESGAssessmentFormData>({
    resolver: zodResolver(esgAssessmentSchema),
    defaultValues: {
      projectType: "",
      location: "",
      capacity: 5.0,
      projectedIRR: 16.5,
      gridStability: 8.5,
      communityEngagement: 7.2,
      governanceFramework: 6.8,
    },
  });

  const projectTypes = [
    "Solar PV",
    "Wind Turbine", 
    "Hydro Plant",
    "Biomass Energy",
    "Geothermal"
  ];

  const locations = [
    "Lagos, Nigeria",
    "Abuja, Nigeria", 
    "Kano, Nigeria",
    "Port Harcourt, Nigeria",
    "Accra, Ghana",
    "Kumasi, Ghana",
    "Tamale, Ghana",
    "Cape Coast, Ghana"
  ];

  const calculateESGScore = (data: ESGAssessmentFormData): ESGAssessmentResult => {
    // Calculate component scores based on input data
    const environmental = Math.min(95, 85 + (data.gridStability * 1.2) + (data.capacity * 0.5));
    const social = Math.min(95, 75 + (data.communityEngagement * 2.0) + (data.capacity * 0.3));
    const governance = Math.min(95, 70 + (data.governanceFramework * 2.5) + (data.projectedIRR * 0.8));
    
    const overallScore = Math.round((environmental * 0.4 + social * 0.4 + governance * 0.2));
    
    let riskBand = "HIGH RISK";
    let recommendation = "REQUIRES IMPROVEMENT";
    let confidence = 85;
    
    if (overallScore >= 85) {
      riskBand = "LOW RISK";
      recommendation = "INVESTOR READY";
      confidence = 94;
    } else if (overallScore >= 70) {
      riskBand = "MEDIUM RISK";
      recommendation = "CONDITIONAL APPROVAL";
      confidence = 89;
    }

    return {
      overallScore,
      riskBand,
      recommendation,
      confidence,
      environmental: Math.round(environmental),
      social: Math.round(social),
      governance: Math.round(governance),
      investmentSummary: overallScore >= 85 
        ? "Strong ESG performance with excellent environmental impact and solid governance framework. Recommended for green investment portfolios."
        : overallScore >= 70
        ? "Good ESG performance with areas for improvement. Suitable for impact investment with monitoring."
        : "ESG performance requires significant improvement before investment consideration.",
      keyMetrics: {
        projectedIRR: `${data.projectedIRR}%`,
        paybackPeriod: `${(100 / data.projectedIRR * 0.6).toFixed(1)} years`,
        co2Reduction: `${Math.round(data.capacity * 240)} tons/year`,
        jobsCreated: Math.round(data.capacity * 9),
        communitiesServed: `${Math.round(data.capacity * 2400)} people`,
        energyAccess: `${Math.round(data.capacity * 640)} households`
      }
    };
  };

  const onSubmit = async (data: ESGAssessmentFormData) => {
    setIsLoading(true);
    
    // Simulate API call processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = calculateESGScore(data);
    setAssessmentResult(result);
    setIsLoading(false);
    
    toast({
      title: "ESG Assessment Complete",
      description: `Generated ${result.riskBand} assessment with ${result.confidence}% confidence`,
      duration: 4000,
    });
  };

  const resetForm = () => {
    form.reset();
    setAssessmentResult(null);
  };

  // Progress bar for ESG factors
  const ProgressBar = ({ label, value, color = "bg-blue-500" }: { label: string; value: number; color?: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}:</span>
        <span className="text-sm font-bold text-gray-900">{Math.round(value * 10)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );

  if (assessmentResult) {
    return (
      <div className={`${isMobile ? 'px-4' : 'max-w-4xl mx-auto'}`}>
        <Card className="border-2 border-green-200 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="w-6 h-6" />
              ESG Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Overall Score Display */}
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gray-900">
                Overall ESG Score: {assessmentResult.overallScore}/100 📈
              </div>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Badge 
                  variant={assessmentResult.riskBand === "LOW RISK" ? "default" : "secondary"}
                  className={`px-3 py-1 text-sm font-medium ${
                    assessmentResult.riskBand === "LOW RISK" 
                      ? "bg-green-100 text-green-800" 
                      : assessmentResult.riskBand === "MEDIUM RISK"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Risk Band: {assessmentResult.riskBand} ✅
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                  Recommendation: {assessmentResult.recommendation} 🎯
                </Badge>
              </div>
              <div className="text-lg font-medium text-gray-700">
                Confidence: {assessmentResult.confidence}%
              </div>
            </div>

            {/* Component Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Component Breakdown:</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Environmental: {assessmentResult.environmental}/100</span>
                  </div>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${assessmentResult.environmental}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Social: {assessmentResult.social}/100</span>
                  </div>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${assessmentResult.social}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Governance: {assessmentResult.governance}/100</span>
                  </div>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${assessmentResult.governance}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Investment Metrics */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{assessmentResult.keyMetrics.projectedIRR}</div>
                <div className="text-xs text-gray-600">Projected IRR</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{assessmentResult.keyMetrics.paybackPeriod}</div>
                <div className="text-xs text-gray-600">Payback Period</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{assessmentResult.keyMetrics.co2Reduction}</div>
                <div className="text-xs text-gray-600">CO2 Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{assessmentResult.keyMetrics.jobsCreated}</div>
                <div className="text-xs text-gray-600">Jobs Created</div>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">Investment Summary:</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                "{assessmentResult.investmentSummary}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              {/* Mobile App Dashboard Return Button */}
              {(() => {
                const urlParams = new URLSearchParams(window.location.search);
                const fromParam = urlParams.get('from');
                const platformParam = urlParams.get('platform');
                
                // Demo context: no dashboard button
                if (fromParam === 'demo') {
                  return null;
                }
                
                // Mobile app context: show dashboard return button
                if (isMobile && platformParam === 'mobile') {
                  return (
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        console.log('ESG Assessment - Return to Dashboard clicked (Mobile App)');
                        window.location.href = '/?platform=mobile';
                      }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Return to Dashboard
                    </Button>
                  );
                }
                
                return null;
              })()}
              
              {/* Primary back navigation button */}
              <Button 
                variant={isMobile && window.location.search.includes('platform=mobile') ? "outline" : "default"}
                size="sm" 
                className={`flex items-center gap-2 ${
                  isMobile && window.location.search.includes('platform=mobile') 
                    ? "" 
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() => {
                  console.log('ESG Assessment - Back button clicked');
                  console.log('ESG Assessment - Navigating to:', sourceRoute || '/solutions');
                  console.log('ESG Assessment - Current URL:', window.location.href);
                  
                  // Ensure we have a valid route, fallback to solutions
                  const targetRoute = sourceRoute || '/solutions';
                  console.log('ESG Assessment - Final target route:', targetRoute);
                  
                  try {
                    window.location.href = targetRoute;
                  } catch (error) {
                    console.error('ESG Assessment - Navigation error:', error);
                    // Ultimate fallback
                    window.location.href = '/solutions';
                  }
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Platform
              </Button>
              
              {/* Secondary actions */}
              <Button onClick={resetForm} variant="outline" size="sm">
                New Assessment
              </Button>
              <Button onClick={() => window.print()} variant="outline" size="sm">
                Download Report
              </Button>
              
              {/* Fallback navigation button - only show if not mobile app */}
              {!(isMobile && window.location.search.includes('platform=mobile')) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.location.href = '/solutions'}
                >
                  <Home className="w-4 h-4" />
                  Solutions Page
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`${isMobile ? 'px-4' : 'max-w-4xl mx-auto'}`}>
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              📊 ESG Scoring & Risk Assessment
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => {
                // Check if form has been started (any field has value)
                const formValues = form.getValues();
                const hasFormData = formValues.projectType || formValues.location || 
                                  formValues.capacity !== 5.0 || formValues.projectedIRR !== 16.5;
                
                if (hasFormData) {
                  setShowBackConfirm(true);
                } else {
                  // Check the context for proper navigation
                  const urlParams = new URLSearchParams(window.location.search);
                  const fromParam = urlParams.get('from');
                  const isMobileApp = urlParams.get('platform') === 'mobile';
                  
                  // If coming from demo, always return to demo
                  if (fromParam === 'demo') {
                    console.log('ESG Form - Back button clicked, returning to demo');
                    window.location.href = '/demo-access';
                  } else if (isMobileApp) {
                    console.log('ESG Form - Back button clicked, returning to mobile dashboard');
                    window.location.href = '/?platform=mobile';
                  } else {
                    console.log('ESG Form - Back button clicked, returning to demo');
                    window.location.href = '/demo-access';
                  }
                }
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              {(() => {
                const urlParams = new URLSearchParams(window.location.search);
                const fromParam = urlParams.get('from');
                const platformParam = urlParams.get('platform');
                
                // Demo context: always show "Back to Demo"
                if (fromParam === 'demo') {
                  return 'Back to Demo';
                }
                
                // Mobile app context: show "Return to Dashboard"
                if (platformParam === 'mobile') {
                  return 'Return to Dashboard';
                }
                
                // Default: Back to Demo
                return 'Back to Demo';
              })()}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Project Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Financial Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity (MW)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.1"
                            placeholder="5.0"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectedIRR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Projected IRR (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            max="50"
                            placeholder="16.5"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* ESG Assessment Factors */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ESG Assessment Factors</h3>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="gridStability"
                    render={({ field }) => (
                      <FormItem>
                        <ProgressBar 
                          label="Grid Stability" 
                          value={field.value} 
                          color="bg-green-500" 
                        />
                        <FormControl>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.1"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="communityEngagement"
                    render={({ field }) => (
                      <FormItem>
                        <ProgressBar 
                          label="Community Eng." 
                          value={field.value} 
                          color="bg-blue-500" 
                        />
                        <FormControl>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.1"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="governanceFramework"
                    render={({ field }) => (
                      <FormItem>
                        <ProgressBar 
                          label="Gov. Framework" 
                          value={field.value} 
                          color="bg-purple-500" 
                        />
                        <FormControl>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.1"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    "Generate ESG Assessment"
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Back Confirmation Dialog */}
      <Dialog open={showBackConfirm} onOpenChange={setShowBackConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Assessment?</DialogTitle>
            <DialogDescription>
              You have unsaved changes in your ESG assessment form. If you leave now, your progress will be lost.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={() => setShowBackConfirm(false)}
            >
              Continue Assessment
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                // Check if this is mobile app platform
                const isMobileApp = window.location.search.includes('platform=mobile');
                const targetRoute = isMobileApp ? '/?platform=mobile' : (sourceRoute || '/demo-access');
                console.log('ESG Form - Confirmed back navigation to:', targetRoute);
                window.location.href = targetRoute;
              }}
            >
              Leave Without Saving
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}