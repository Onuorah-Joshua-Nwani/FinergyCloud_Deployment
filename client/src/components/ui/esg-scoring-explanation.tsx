import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  XCircle,
  ChevronRight,
  Database,
  Zap,
  BarChart3
} from "lucide-react";

export default function ESGScoringExplanation() {
  const processSteps = [
    {
      step: 1,
      title: "Data Preprocessing",
      description: "Normalize and validate input parameters",
      icon: Database,
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "Feature Engineering",
      description: "Calculate derived metrics and risk indicators",
      icon: Zap,
      color: "bg-yellow-500"
    },
    {
      step: 3,
      title: "Model Prediction",
      description: "Process through trained XGBoost ensemble",
      icon: Brain,
      color: "bg-purple-500"
    },
    {
      step: 4,
      title: "Confidence Scoring",
      description: "Generate reliability metrics for predictions",
      icon: BarChart3,
      color: "bg-green-500"
    },
    {
      step: 5,
      title: "Risk Classification",
      description: "Categorize projects into investment bands",
      icon: Shield,
      color: "bg-red-500"
    }
  ];

  const inputCategories = [
    {
      category: "Financial Metrics",
      examples: "CAPEX, OPEX, projected IRR, cash flow patterns",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      category: "Technical Specifications",
      examples: "Technology type, capacity, efficiency ratings",
      icon: Zap,
      color: "text-blue-600"
    },
    {
      category: "Environmental Impact",
      examples: "CO2 reduction potential, land use, water consumption",
      icon: Target,
      color: "text-emerald-600"
    },
    {
      category: "Social Factors",
      examples: "Community engagement, job creation, local partnerships",
      icon: CheckCircle,
      color: "text-purple-600"
    },
    {
      category: "Governance",
      examples: "Developer track record, regulatory compliance, transparency",
      icon: Shield,
      color: "text-orange-600"
    }
  ];

  const riskBands = [
    {
      range: "85-100",
      band: "Low Risk",
      classification: "Investor Ready",
      action: "Immediate funding approval",
      icon: CheckCircle,
      color: "bg-green-100 text-green-800 border-green-200",
      actionColor: "text-green-600"
    },
    {
      range: "70-84",
      band: "Medium Risk",
      classification: "Conditional Approval",
      action: "Address specific concerns",
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      actionColor: "text-yellow-600"
    },
    {
      range: "55-69",
      band: "High Risk",
      classification: "Development Required",
      action: "Substantial improvements needed",
      icon: AlertCircle,
      color: "bg-orange-100 text-orange-800 border-orange-200",
      actionColor: "text-orange-600"
    },
    {
      range: "Below 55",
      band: "Very High Risk",
      classification: "Not Recommended",
      action: "Significant restructuring required",
      icon: XCircle,
      color: "bg-red-100 text-red-800 border-red-200",
      actionColor: "text-red-600"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-medium mb-6">
            🧠 AI-Powered Analytics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How ESG Scoring Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            FinergyCloud uses advanced XGBoost machine learning models to provide comprehensive ESG scoring 
            and investment recommendations for renewable energy projects.
          </p>
        </div>

        {/* Input Variables Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Input Variables We Analyze
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inputCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-6 h-6 ${category.color}`} />
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{category.examples}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* XGBoost Process Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            XGBoost Model Processing Pipeline
          </h3>
          <div className="relative">
            <div className="grid md:grid-cols-5 gap-4">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative">
                    <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                      <CardHeader className="text-center pb-3">
                        <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mx-auto mb-3`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm font-semibold text-gray-500 mb-1">
                          Step {step.step}
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </CardContent>
                    </Card>
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                        <ChevronRight className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Risk Bands Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ESG Score Bands & Investment Recommendations
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {riskBands.map((band, index) => {
              const IconComponent = band.icon;
              return (
                <Card key={index} className={`border-2 ${band.color} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-6 h-6 ${band.actionColor}`} />
                        <div>
                          <CardTitle className="text-lg">{band.band}</CardTitle>
                          <p className="text-sm opacity-80">Score: {band.range}</p>
                        </div>
                      </div>
                      <Badge className={band.color}>
                        {band.classification}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm font-medium ${band.actionColor}`}>
                      {band.action}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sample Results Preview */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border-2 border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Sample ESG Assessment Result
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4">Project Overview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project:</span>
                  <span className="font-medium">Solar Mini-Grid, Kaduna State</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Technology:</span>
                  <span className="font-medium">Solar PV + Battery Storage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">2.5 MW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projected IRR:</span>
                  <span className="font-medium text-green-600">18.5%</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4">ESG Assessment</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ESG Score:</span>
                  <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">87/100</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Risk Band:</span>
                  <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Confidence:</span>
                  <span className="text-sm font-semibold text-blue-600">94%</span>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Recommendation:</strong> Investor Ready - Immediate funding approval
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}