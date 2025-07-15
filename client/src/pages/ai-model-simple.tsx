import React from "react";
import { Link } from "wouter";
import { 
  Brain, 
  Home, 
  ChevronRight, 
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Zap,
  DollarSign,
  Calendar,
  MapPin
} from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency } from "@shared/currency";

export default function AIModelSimple() {
  const { selectedCurrency } = useCurrency();
  
  const predictionData = {
    accuracy: 94,
    confidence: 89,
    successProbability: 84,
    recommendedAction: "Proceed with Investment"
  };

  const riskFactors = [
    { factor: "Grid Stability", score: 8.2, status: "good" },
    { factor: "Community Engagement", score: 7.5, status: "good" },
    { factor: "Regulatory Environment", score: 6.8, status: "medium" },
    { factor: "Technical Feasibility", score: 9.1, status: "excellent" },
    { factor: "Financial Viability", score: 8.7, status: "good" }
  ];

  const predictions = [
    {
      id: 1,
      project: "Solar Farm Lagos",
      type: "Solar",
      location: "Lagos, Nigeria",
      prediction: {
        successProbability: 84,
        expectedROI: 15.5,
        paybackPeriod: 6.2,
        riskLevel: "Medium",
        expectedReturn: formatCurrency(12000000 * 0.155, selectedCurrency),
        initialInvestment: formatCurrency(12000000, selectedCurrency)
      }
    },
    {
      id: 2,
      project: "Wind Project Ghana",
      type: "Wind", 
      location: "Accra, Ghana",
      prediction: {
        successProbability: 78,
        expectedROI: 18.2,
        paybackPeriod: 5.8,
        riskLevel: "Medium-High",
        expectedReturn: formatCurrency(18000000 * 0.182, selectedCurrency),
        initialInvestment: formatCurrency(18000000, selectedCurrency)
      }
    }
  ];

  const RiskFactorCard = ({ factor, score, status }: any) => {
    const getStatusColor = (status: string) => {
      switch(status) {
        case 'excellent': return 'text-green-600 bg-green-50';
        case 'good': return 'text-blue-600 bg-blue-50';
        case 'medium': return 'text-yellow-600 bg-yellow-50';
        case 'poor': return 'text-red-600 bg-red-50';
        default: return 'text-gray-600 bg-gray-50';
      }
    };

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900">{factor}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">{score}</div>
          <div className="w-full max-w-20 ml-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${score * 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PredictionCard = ({ prediction }: any) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{prediction.project}</h3>
          <p className="text-sm text-gray-600 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {prediction.location}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          prediction.prediction.riskLevel === 'Low' 
            ? 'bg-green-100 text-green-700'
            : prediction.prediction.riskLevel === 'Medium'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {prediction.prediction.riskLevel} Risk
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{prediction.prediction.successProbability}%</div>
          <div className="text-xs text-gray-600">Success Probability</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{prediction.prediction.expectedROI}%</div>
          <div className="text-xs text-gray-600">Expected ROI</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Initial Investment:</span>
          <span className="text-sm font-semibold text-gray-900">{prediction.prediction.initialInvestment}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Expected Return:</span>
          <span className="text-sm font-semibold text-green-600">{prediction.prediction.expectedReturn}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Payback Period:</span>
          <span className="text-sm font-semibold text-gray-900">{prediction.prediction.paybackPeriod} years</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Link href="/?platform=mobile">
            <span className="hover:text-gray-900 cursor-pointer flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Dashboard
            </span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">AI Risk Engine</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              AI Risk Engine
            </h1>
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{selectedCurrency}</span>
            </div>
          </div>
          <p className="text-gray-600">
            XGBoost-powered predictions for renewable energy project success
          </p>
        </div>

        {/* Model Performance */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Model Performance</h2>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-600">Model Active</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{predictionData.accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{predictionData.confidence}%</div>
              <div className="text-sm text-gray-600">Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{predictionData.successProbability}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 mb-1">XGBoost</div>
              <div className="text-sm text-gray-600">Algorithm</div>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Assessment Factors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riskFactors.map((factor, index) => (
              <RiskFactorCard key={index} {...factor} />
            ))}
          </div>
        </div>

        {/* Recent Predictions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictions.map((prediction) => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Link href="/ai-model?platform=mobile">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              <Brain className="w-5 h-5 inline mr-2" />
              New Prediction
            </button>
          </Link>
          <Link href="/kpi?platform=mobile">
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="w-5 h-5 inline mr-2" />
              Model Analytics
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}