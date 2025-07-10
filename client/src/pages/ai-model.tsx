import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PredictionForm from "@/components/prediction-form";
import ModelPerformanceChart from "@/components/charts/model-performance-chart";
import RiskAssessmentChart from "@/components/charts/risk-assessment-chart";
import { Brain, Zap } from "lucide-react";

export default function AIModel() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>("solar");

  return (
    <section className="py-4 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <div className="flex items-start md:items-center gap-3 mb-4">
            <Brain className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mt-1 md:mt-0 flex-shrink-0" />
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-900">XGBoost AI Model</h1>
              <p className="text-sm md:text-base text-gray-600 line-clamp-2">Advanced machine learning for renewable energy investment predictions</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <Badge className="bg-green-100 text-green-800 text-xs">Model Active</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
              <Badge variant="outline" className="text-blue-600 border-blue-600 text-xs">
                Specialized for {selectedProjectType.charAt(0).toUpperCase() + selectedProjectType.slice(1)} Projects
              </Badge>
            </div>
          </div>
        </div>

        {/* Model Performance */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 md:p-6 border border-primary/20">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">92%</div>
            <p className="text-sm md:text-base text-gray-700 font-medium">AUC Score</p>
          </div>
          <div className="bg-gradient-to-br from-success/5 to-success/10 rounded-xl p-4 md:p-6 border border-success/20">
            <div className="text-2xl md:text-3xl font-bold text-success mb-1 md:mb-2">87%</div>
            <p className="text-sm md:text-base text-gray-700 font-medium">Accuracy</p>
          </div>
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-4 md:p-6 border border-accent/20">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-1 md:mb-2">14</div>
            <p className="text-sm md:text-base text-gray-700 font-medium">Key Features</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Feature Importance Chart */}
          <Card>
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-base md:text-lg">Feature Importance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Project Type</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">72%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Grid Stability</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Project Size</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "54%" }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">54%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Community Engagement</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: "41%" }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">41%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Performance Chart */}
          <ModelPerformanceChart projectType={selectedProjectType} />
        </div>

        {/* Prediction Form */}
        <PredictionForm onProjectTypeChange={setSelectedProjectType} />

        {/* Risk Analysis */}
        <div className="mt-8">
          <RiskAssessmentChart projectType={selectedProjectType} />
        </div>

        {/* Case Studies */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Case Studies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Lagos Solar Farm (5MW)</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Our XGBoost model predicted an IRR of 16.5% for this solar project in Lagos, with the actual IRR coming in at 16.8% - a prediction error of just 0.3%.
                </p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">16.5%</div>
                    <div className="text-xs text-gray-500">Predicted IRR</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-success">16.8%</div>
                    <div className="text-xs text-gray-500">Actual IRR</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">92%</div>
                    <div className="text-xs text-gray-500">Success Probability</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Abuja Wind Project (2.5MW)</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  For this wind project in Abuja, our model predicted an IRR of 14.2%, with the actual IRR being 14.5% - demonstrating consistent accuracy across different project types.
                </p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">14.2%</div>
                    <div className="text-xs text-gray-500">Predicted IRR</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-success">14.5%</div>
                    <div className="text-xs text-gray-500">Actual IRR</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">85%</div>
                    <div className="text-xs text-gray-500">Success Probability</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </section>
  );
}
