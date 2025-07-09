import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Leaf, Shield, AlertTriangle } from "lucide-react";
import { insertPredictionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Prediction, ProjectTypeEsgTemplate } from "@shared/schema";

interface PredictionFormProps {
  onProjectTypeChange?: (projectType: string) => void;
}

export default function PredictionForm({ onProjectTypeChange }: PredictionFormProps) {
  const [predictionResult, setPredictionResult] = useState<Prediction | null>(null);
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  // Query for ESG template data based on selected project type
  const { data: esgTemplate, isLoading: esgLoading } = useQuery({
    queryKey: ["/api/project-type-esg-templates", selectedProjectType],
    queryFn: () => selectedProjectType ? 
      fetch(`/api/project-type-esg-templates/${selectedProjectType}`).then(res => res.json()) : 
      null,
    enabled: !!selectedProjectType,
  });

  // Watch for project type changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "projectType" && value.projectType) {
        setSelectedProjectType(value.projectType);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const createPredictionMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/predictions", data);
      return response.json();
    },
    onSuccess: (data: Prediction) => {
      setPredictionResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/predictions"] });
      toast({
        title: "Prediction Complete",
        description: "AI prediction has been generated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Prediction Failed",
        description: "Failed to generate prediction. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    createPredictionMutation.mutate(data);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-success";
      case "medium":
        return "text-warning";
      case "high":
        return "text-error";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Run Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedProjectType(value);
                          onProjectTypeChange?.(value);
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="solar">Solar</SelectItem>
                          <SelectItem value="wind">Wind</SelectItem>
                          <SelectItem value="hydro">Hydro</SelectItem>
                          <SelectItem value="biomass">Biomass</SelectItem>
                          <SelectItem value="geothermal">Geothermal</SelectItem>
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
                            <SelectValue placeholder="Select location..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="lagos">Lagos</SelectItem>
                          <SelectItem value="abuja">Abuja</SelectItem>
                          <SelectItem value="kano">Kano</SelectItem>
                          <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                          <SelectItem value="ibadan">Ibadan</SelectItem>
                          <SelectItem value="enugu">Enugu</SelectItem>
                          <SelectItem value="kaduna">Kaduna</SelectItem>
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
                      <FormLabel>Grid Stability</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select stability..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
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
                      <FormLabel>Community Engagement</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="extensive">Extensive</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
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
                    <FormItem>
                      <FormLabel>Project Size (MW)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1" 
                          min="0" 
                          placeholder="Enter size in MW"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-end">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={createPredictionMutation.isPending}
                  >
                    {createPredictionMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Running Prediction...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Run AI Prediction
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* ESG Data Display based on selected project type */}
      {selectedProjectType && esgTemplate && !esgLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              ESG Impact for {selectedProjectType.charAt(0).toUpperCase() + selectedProjectType.slice(1)} Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {esgTemplate.environmental}/10
                </div>
                <p className="text-sm text-green-800 font-medium">Environmental</p>
                <p className="text-xs text-green-600 mt-1">
                  {esgTemplate.co2Reduction.toLocaleString()} tons CO₂ saved annually
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {esgTemplate.social}/10
                </div>
                <p className="text-sm text-blue-800 font-medium">Social</p>
                <p className="text-xs text-blue-600 mt-1">
                  {esgTemplate.jobsCreated} jobs created, {esgTemplate.communitiesServed} communities served
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {esgTemplate.governance}/10
                </div>
                <p className="text-sm text-purple-800 font-medium">Governance</p>
                <p className="text-xs text-purple-600 mt-1">
                  {esgTemplate.educationPrograms} education programs
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  Environmental Impact
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clean Energy Generated:</span>
                    <span className="font-medium">{esgTemplate.cleanEnergyGenerated} GWh/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Water Saved:</span>
                    <span className="font-medium">{(esgTemplate.waterSaved / 1000000).toFixed(1)}M liters/year</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  {esgTemplate.riskCategory === 'low' ? (
                    <Shield className="w-4 h-4 text-green-600" />
                  ) : esgTemplate.riskCategory === 'medium' ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                  Risk Category
                </h4>
                <div className="text-sm">
                  <div className={`font-medium text-lg ${
                    esgTemplate.riskCategory === 'low' ? 'text-green-600' :
                    esgTemplate.riskCategory === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {esgTemplate.riskCategory.charAt(0).toUpperCase() + esgTemplate.riskCategory.slice(1)} Risk
                  </div>
                  <p className="text-gray-600 mt-1">
                    {esgTemplate.riskCategory === 'low' && 'Typically stable returns with proven technology'}
                    {esgTemplate.riskCategory === 'medium' && 'Moderate risk with good potential returns'}
                    {esgTemplate.riskCategory === 'high' && 'Higher risk but potentially higher rewards'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {predictionResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              AI Prediction Results
              {esgTemplate && (
                <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${
                  esgTemplate.riskCategory === 'low' ? 'bg-green-100 text-green-800' :
                  esgTemplate.riskCategory === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {esgTemplate.riskCategory.charAt(0).toUpperCase() + esgTemplate.riskCategory.slice(1)} Risk Category
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {predictionResult.predictedIrr}%
                </div>
                <p className="text-sm text-blue-800 font-medium">Predicted IRR</p>
                <p className="text-xs text-blue-600 mt-1">Expected annual return</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {Math.round(predictionResult.successProbability * 100)}%
                </div>
                <p className="text-sm text-green-800 font-medium">Success Probability</p>
                <p className="text-xs text-green-600 mt-1">Likelihood of target returns</p>
              </div>
              <div className={`text-center p-4 rounded-lg border ${
                predictionResult.riskLevel === 'low' ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' :
                predictionResult.riskLevel === 'medium' ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' :
                'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
              }`}>
                <div className={`text-2xl font-bold mb-1 ${
                  predictionResult.riskLevel === 'low' ? 'text-green-600' :
                  predictionResult.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {predictionResult.riskLevel.charAt(0).toUpperCase() + predictionResult.riskLevel.slice(1)}
                </div>
                <p className={`text-sm font-medium ${
                  predictionResult.riskLevel === 'low' ? 'text-green-800' :
                  predictionResult.riskLevel === 'medium' ? 'text-yellow-800' : 'text-red-800'
                }`}>AI Risk Assessment</p>
                <p className={`text-xs mt-1 ${
                  predictionResult.riskLevel === 'low' ? 'text-green-600' :
                  predictionResult.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>Based on current inputs</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {Math.round(predictionResult.confidence * 100)}%
                </div>
                <p className="text-sm text-purple-800 font-medium">AI Confidence</p>
                <p className="text-xs text-purple-600 mt-1">Prediction reliability</p>
              </div>
            </div>

            {esgTemplate && (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  Project Type Analysis: {predictionResult.projectType.charAt(0).toUpperCase() + predictionResult.projectType.slice(1)}
                </h4>
                <div className="text-sm text-gray-700">
                  <p className="mb-2">
                    <strong>Risk Category:</strong> {esgTemplate.riskCategory.charAt(0).toUpperCase() + esgTemplate.riskCategory.slice(1)} 
                    - {esgTemplate.riskCategory === 'low' ? 'Proven technology with stable returns' :
                      esgTemplate.riskCategory === 'medium' ? 'Balanced risk-reward profile' : 
                      'Higher risk but greater return potential'}
                  </p>
                  <p>
                    <strong>ESG Score:</strong> {esgTemplate.overall}/10 
                    (Environmental: {esgTemplate.environmental}, Social: {esgTemplate.social}, Governance: {esgTemplate.governance})
                  </p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Prediction Methodology
              </h4>
              <div className="text-sm text-blue-800">
                This AI prediction considers project type ({predictionResult.projectType}), 
                location ({predictionResult.location}), grid stability ({predictionResult.gridStability}), 
                community engagement ({predictionResult.communityEngagement}), and project size ({predictionResult.projectSize} MW). 
                The model uses XGBoost algorithm with historical renewable energy project data to provide accurate investment forecasts.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
