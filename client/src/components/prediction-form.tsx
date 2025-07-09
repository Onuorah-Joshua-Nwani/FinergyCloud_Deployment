import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain, Loader2 } from "lucide-react";
import { insertPredictionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Prediction } from "@shared/schema";

export default function PredictionForm() {
  const [predictionResult, setPredictionResult] = useState<Prediction | null>(null);
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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

      {predictionResult && (
        <Card>
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {predictionResult.predictedIrr}%
                </div>
                <p className="text-sm text-gray-600">Predicted IRR</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">
                  {Math.round(predictionResult.successProbability * 100)}%
                </div>
                <p className="text-sm text-gray-600">Success Probability</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold mb-1 ${getRiskColor(predictionResult.riskLevel)}`}>
                  {predictionResult.riskLevel.charAt(0).toUpperCase() + predictionResult.riskLevel.slice(1)}
                </div>
                <p className="text-sm text-gray-600">Risk Level</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {Math.round(predictionResult.confidence * 100)}%
                </div>
                <p className="text-sm text-gray-600">Confidence Score</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Key Factors</h4>
              <div className="text-sm text-blue-800">
                This prediction is based on the project type ({predictionResult.projectType}), 
                location ({predictionResult.location}), grid stability ({predictionResult.gridStability}), 
                and project size ({predictionResult.projectSize} MW). Higher scores indicate better 
                investment potential with lower risk profiles.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
