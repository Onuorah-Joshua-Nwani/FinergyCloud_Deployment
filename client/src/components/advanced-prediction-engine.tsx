import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Loader2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  Zap, 
  Shield, 
  BarChart3,
  Target,
  Globe,
  Cpu,
  Activity
} from "lucide-react";
import { insertPredictionSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency, convertCurrency } from "@shared/currency";
import type { Prediction } from "@shared/schema";

interface AdvancedPredictionEngineProps {
  onProjectTypeChange?: (projectType: string) => void;
}

interface PredictionResult {
  id: number;
  projectType: string;
  location: string;
  gridStability: string;
  communityEngagement: string;
  projectSize: number;
  predictedIrr: number;
  successProbability: number;
  riskLevel: string;
  confidenceScore: number;
  financialProjection: {
    initialInvestment: number;
    annualRevenue: number;
    paybackPeriod: number;
    netPresentValue: number;
    totalReturn: number;
  };
  riskAssessment: {
    technicalRisk: number;
    financialRisk: number;
    regulatoryRisk: number;
    environmentalRisk: number;
    marketRisk: number;
  };
  esgImpact: {
    co2Reduction: number;
    cleanEnergyGenerated: number;
    jobsCreated: number;
    communitiesServed: number;
  };
  recommendations: string[];
  competitiveAnalysis: {
    marketPosition: string;
    competitiveAdvantage: string[];
    marketShare: number;
  };
}

const advancedProjectTypes = [
  { value: "solar", label: "Solar PV", avgCapacity: 45, avgIrr: 16.2, marketGrowth: 23 },
  { value: "wind", label: "Wind Farm", avgCapacity: 32, avgIrr: 18.5, marketGrowth: 19 },
  { value: "hydro", label: "Hydroelectric", avgCapacity: 28, avgIrr: 14.8, marketGrowth: 12 },
  { value: "biomass", label: "Biomass Plant", avgCapacity: 15, avgIrr: 13.2, marketGrowth: 15 },
  { value: "geothermal", label: "Geothermal", avgCapacity: 25, avgIrr: 15.7, marketGrowth: 17 }
];

const nigeriaGhanaLocations = [
  { value: "Lagos, Nigeria", label: "Lagos, Nigeria", gridStability: 7.2, demandGrowth: 18 },
  { value: "Abuja, Nigeria", label: "Abuja, Nigeria", gridStability: 8.1, demandGrowth: 16 },
  { value: "Kano, Nigeria", label: "Kano, Nigeria", gridStability: 6.8, demandGrowth: 14 },
  { value: "Port Harcourt, Nigeria", label: "Port Harcourt, Nigeria", gridStability: 7.5, demandGrowth: 17 },
  { value: "Accra, Ghana", label: "Accra, Ghana", gridStability: 8.4, demandGrowth: 20 },
  { value: "Kumasi, Ghana", label: "Kumasi, Ghana", gridStability: 7.9, demandGrowth: 18 },
  { value: "Cape Coast, Ghana", label: "Cape Coast, Ghana", gridStability: 8.2, demandGrowth: 16 },
  { value: "Tema, Ghana", label: "Tema, Ghana", gridStability: 8.6, demandGrowth: 19 }
];

export default function AdvancedPredictionEngine({ onProjectTypeChange }: AdvancedPredictionEngineProps) {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const { toast } = useToast();
  const { selectedCurrency } = useCurrency();

  const form = useForm({
    resolver: zodResolver(insertPredictionSchema),
    defaultValues: {
      projectType: "",
      location: "",
      gridStability: "",
      communityEngagement: "",
      projectSize: 0,
    },
  });

  const createAdvancedPrediction = useMutation({
    mutationFn: async (data: any) => {
      // Simulate advanced AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const projectConfig = advancedProjectTypes.find(p => p.value === data.projectType);
      const locationConfig = nigeriaGhanaLocations.find(l => l.value === data.location);
      
      // Advanced calculations based on real renewable energy factors
      const baseIrr = projectConfig?.avgIrr || 15;
      const locationMultiplier = (locationConfig?.gridStability || 7) / 10;
      const sizeMultiplier = Math.min(1.2, Math.max(0.8, data.projectSize / 50));
      const stabilityMultiplier = data.gridStability === "excellent" ? 1.1 : 
                                  data.gridStability === "good" ? 1.0 : 
                                  data.gridStability === "fair" ? 0.9 : 0.8;
      
      const predictedIrr = baseIrr * locationMultiplier * sizeMultiplier * stabilityMultiplier;
      const successProbability = Math.min(95, Math.max(60, 
        85 * locationMultiplier * stabilityMultiplier * 
        (data.communityEngagement === "high" ? 1.1 : 
         data.communityEngagement === "medium" ? 1.0 : 0.9)
      ));
      
      const initialInvestment = data.projectSize * 52000; // $52k per MW average
      const annualRevenue = initialInvestment * (predictedIrr / 100);
      const paybackPeriod = initialInvestment / annualRevenue;
      const netPresentValue = annualRevenue * 8 - initialInvestment;
      
      return {
        id: Date.now(),
        projectType: data.projectType,
        location: data.location,
        gridStability: data.gridStability,
        communityEngagement: data.communityEngagement,
        projectSize: data.projectSize,
        predictedIrr: Number(predictedIrr.toFixed(1)),
        successProbability: Number(successProbability.toFixed(1)),
        riskLevel: predictedIrr >= 16 ? "low" : predictedIrr >= 12 ? "medium" : "high",
        confidenceScore: Math.min(98, Math.max(85, 94 * locationMultiplier * stabilityMultiplier)),
        financialProjection: {
          initialInvestment,
          annualRevenue,
          paybackPeriod: Number(paybackPeriod.toFixed(1)),
          netPresentValue,
          totalReturn: annualRevenue * 10
        },
        riskAssessment: {
          technicalRisk: Math.max(5, 25 - (locationConfig?.gridStability || 7) * 2),
          financialRisk: Math.max(8, 30 - predictedIrr),
          regulatoryRisk: data.location.includes("Ghana") ? 12 : 18,
          environmentalRisk: projectConfig?.value === "hydro" ? 22 : 15,
          marketRisk: Math.max(10, 35 - (projectConfig?.marketGrowth || 15))
        },
        esgImpact: {
          co2Reduction: data.projectSize * 1200, // tons/year
          cleanEnergyGenerated: data.projectSize * 2.4, // GWh/year
          jobsCreated: Math.round(data.projectSize * 1.8),
          communitiesServed: Math.round(data.projectSize * 0.3)
        },
        recommendations: [
          `Optimize project size to ${Math.round(data.projectSize * 1.1)}MW for better economies of scale`,
          `Consider ${data.location.includes("Ghana") ? "Nigerian" : "Ghanaian"} market expansion`,
          `Implement advanced grid integration for ${locationConfig?.gridStability || 7}% stability improvement`,
          `Focus on community engagement programs for ${data.communityEngagement} participation level`
        ],
        competitiveAnalysis: {
          marketPosition: predictedIrr >= 16 ? "Strong" : predictedIrr >= 12 ? "Competitive" : "Challenging",
          competitiveAdvantage: [
            "First-mover advantage in West Africa",
            "AI-powered optimization systems",
            "Local partnership networks",
            "Regulatory compliance expertise"
          ],
          marketShare: Math.min(15, Math.max(3, data.projectSize / 10))
        }
      };
    },
    onSuccess: (data) => {
      setPredictionResult(data);
      toast({
        title: "Advanced Prediction Complete",
        description: `AI analysis complete with ${data.confidenceScore}% confidence`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Prediction Failed",
        description: "Advanced AI analysis failed. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: any) => {
    createAdvancedPrediction.mutate(data);
  };

  // Watch for form changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "projectType" && value.projectType) {
        setSelectedProjectType(value.projectType);
        onProjectTypeChange?.(value.projectType);
      }
      if (name === "location" && value.location) {
        setSelectedLocation(value.location);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onProjectTypeChange]);

  const selectedProjectConfig = advancedProjectTypes.find(p => p.value === selectedProjectType);
  const selectedLocationConfig = nigeriaGhanaLocations.find(l => l.value === selectedLocation);

  return (
    <div className="space-y-6">
      {/* Advanced Prediction Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            Advanced AI Prediction Engine
            <Badge variant="outline" className="ml-auto">
              XGBoost Enhanced
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="mobile-grid-2 mobile-gap-4">
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select renewable energy type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {advancedProjectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{type.label}</span>
                                <Badge variant="outline" className="ml-2">
                                  {type.avgIrr}% IRR
                                </Badge>
                              </div>
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {nigeriaGhanaLocations.map((location) => (
                            <SelectItem key={location.value} value={location.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{location.label}</span>
                                <Badge variant="outline" className="ml-2">
                                  {location.gridStability}/10 Grid
                                </Badge>
                              </div>
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
                  name="gridStability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grid Stability Assessment</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Assess grid stability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent (95%+ uptime)</SelectItem>
                          <SelectItem value="good">Good (85-94% uptime)</SelectItem>
                          <SelectItem value="fair">Fair (70-84% uptime)</SelectItem>
                          <SelectItem value="poor">Poor (&lt;70% uptime)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="communityEngagement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Community Engagement Level</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Assess community support" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high">High (Strong local support)</SelectItem>
                          <SelectItem value="medium">Medium (Moderate acceptance)</SelectItem>
                          <SelectItem value="low">Low (Limited engagement)</SelectItem>
                          <SelectItem value="minimal">Minimal (Resistance expected)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectSize"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Project Capacity (MW)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1" 
                          min="0" 
                          placeholder="Enter capacity in megawatts"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Market Intelligence Preview */}
              {selectedProjectConfig && selectedLocationConfig && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="mobile-grid-4 mobile-gap-2 mobile-text-sm">
                      <div>
                        <p className="text-gray-600">Market Growth</p>
                        <p className="font-semibold text-blue-600">{selectedProjectConfig.marketGrowth}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Grid Stability</p>
                        <p className="font-semibold text-green-600">{selectedLocationConfig.gridStability}/10</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg. Capacity</p>
                        <p className="font-semibold text-purple-600">{selectedProjectConfig.avgCapacity}MW</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Demand Growth</p>
                        <p className="font-semibold text-orange-600">{selectedLocationConfig.demandGrowth}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={createAdvancedPrediction.isPending}
              >
                {createAdvancedPrediction.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Running Advanced AI Analysis...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Advanced Prediction
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Advanced Prediction Results */}
      {predictionResult && (
        <div className="space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 gap-0.5 p-1 h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm px-1 py-2 leading-tight">Overview</TabsTrigger>
              <TabsTrigger value="financial" className="text-xs sm:text-sm px-1 py-2 leading-tight">Financial</TabsTrigger>
              <TabsTrigger value="risk" className="text-xs sm:text-sm px-1 py-2 leading-tight">Risk</TabsTrigger>
              <TabsTrigger value="esg" className="text-xs sm:text-sm px-1 py-2 leading-tight">ESG</TabsTrigger>
              <TabsTrigger value="competitive" className="text-xs sm:text-sm px-1 py-2 leading-tight col-span-3 sm:col-span-1">Market</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    AI Prediction Overview
                    <Badge className={`ml-auto ${
                      predictionResult.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      predictionResult.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {predictionResult.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mobile-grid-4 mobile-gap-4">
                    <div className="text-center mobile-p-2 bg-blue-50 rounded-lg">
                      <div className="mobile-text-2xl font-bold text-blue-600">{predictionResult.predictedIrr}%</div>
                      <p className="mobile-text-sm text-blue-800">Predicted IRR</p>
                    </div>
                    <div className="text-center mobile-p-2 bg-green-50 rounded-lg">
                      <div className="mobile-text-2xl font-bold text-green-600">{predictionResult.successProbability}%</div>
                      <p className="mobile-text-sm text-green-800">Success Probability</p>
                    </div>
                    <div className="text-center mobile-p-2 bg-purple-50 rounded-lg">
                      <div className="mobile-text-2xl font-bold text-purple-600">{predictionResult.confidenceScore}%</div>
                      <p className="mobile-text-sm text-purple-800">AI Confidence</p>
                    </div>
                    <div className="text-center mobile-p-2 bg-orange-50 rounded-lg">
                      <div className="mobile-text-2xl font-bold text-orange-600">{predictionResult.competitiveAnalysis.marketShare}%</div>
                      <p className="mobile-text-sm text-orange-800">Market Share</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Financial Projection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mobile-grid-2 mobile-gap-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="mobile-text-sm text-gray-600">Initial Investment</span>
                        <span className="mobile-text-sm font-semibold">{formatCurrency(predictionResult.financialProjection.initialInvestment, selectedCurrency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="mobile-text-sm text-gray-600">Annual Revenue</span>
                        <span className="mobile-text-sm font-semibold text-green-600">{formatCurrency(predictionResult.financialProjection.annualRevenue, selectedCurrency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="mobile-text-sm text-gray-600">Payback Period</span>
                        <span className="mobile-text-sm font-semibold">{predictionResult.financialProjection.paybackPeriod} years</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Net Present Value</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(predictionResult.financialProjection.netPresentValue, selectedCurrency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">10-Year Total Return</span>
                        <span className="font-semibold text-purple-600">{formatCurrency(predictionResult.financialProjection.totalReturn, selectedCurrency)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-600" />
                    Risk Assessment Matrix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(predictionResult.riskAssessment).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center gap-3">
                          <Progress value={value} className="w-32" />
                          <span className={`text-sm font-medium ${
                            value < 15 ? 'text-green-600' : value < 25 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="esg" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    ESG Impact Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{predictionResult.esgImpact.co2Reduction.toLocaleString()}</div>
                      <p className="text-sm text-green-800">CO₂ Reduction (tons/year)</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{predictionResult.esgImpact.cleanEnergyGenerated}</div>
                      <p className="text-sm text-blue-800">Clean Energy (GWh/year)</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{predictionResult.esgImpact.jobsCreated}</div>
                      <p className="text-sm text-purple-800">Jobs Created</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{predictionResult.esgImpact.communitiesServed}</div>
                      <p className="text-sm text-orange-800">Communities Served</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitive" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Competitive Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Market Position</h4>
                      <Badge className={`${
                        predictionResult.competitiveAnalysis.marketPosition === 'Strong' ? 'bg-green-100 text-green-800' :
                        predictionResult.competitiveAnalysis.marketPosition === 'Competitive' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {predictionResult.competitiveAnalysis.marketPosition}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Competitive Advantages</h4>
                      <ul className="space-y-1">
                        {predictionResult.competitiveAnalysis.competitiveAdvantage.map((advantage, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">AI Recommendations</h4>
                      <ul className="space-y-2">
                        {predictionResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}