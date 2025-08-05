import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Globe, 
  Zap,
  Shield,
  Activity,
  Award,
  Clock,
  CheckCircle,
  Cpu,
  Users
} from "lucide-react";

interface MobileESGChartsProps {
  chartType?: 'model-performance' | 'feature-importance' | 'risk-distribution' | 'geographic' | 'financial' | 'real-time' | 'all';
  isMobile?: boolean;
}

export default function MobileESGCharts({ chartType = 'all', isMobile = true }: MobileESGChartsProps) {
  
  const ModelPerformanceChart = () => (
    <Card className="border-l-4 border-l-blue-500 mb-4">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
          <BarChart3 className="w-5 h-5" />
          Model Performance by Project Type
        </CardTitle>
        <Badge variant="secondary" className="w-fit text-xs">AUC Score Analysis</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-blue-50 p-3 text-center font-bold text-gray-800 border-b">
            AUC Score Performance Across Renewable Energy Technologies
          </div>
          
          {/* Header Row */}
          <div className="grid grid-cols-4 gap-1 py-3 px-2 bg-gray-100 text-sm font-semibold text-gray-700 border-b">
            <span className="text-left">Type</span>
            <span className="text-center">AUC</span>
            <span className="text-center">Valid</span>
            <span className="text-center">Count</span>
          </div>
          
          {/* Data Rows */}
          <div className="divide-y">
            <div className="grid grid-cols-4 gap-1 py-3 px-2 hover:bg-gray-50">
              <span className="font-medium text-gray-800 text-sm">Hydro</span>
              <span className="text-center font-bold text-green-600">96.0%</span>
              <span className="text-center text-gray-600 text-sm">92.0%</span>
              <span className="text-center text-gray-600 text-sm">569</span>
            </div>
            <div className="grid grid-cols-4 gap-1 py-3 px-2 hover:bg-gray-50">
              <span className="font-medium text-gray-800 text-sm">Solar</span>
              <span className="text-center font-bold text-green-600">95.0%</span>
              <span className="text-center text-gray-600 text-sm">90.0%</span>
              <span className="text-center text-gray-600 text-sm">996</span>
            </div>
            <div className="grid grid-cols-4 gap-1 py-3 px-2 hover:bg-gray-50">
              <span className="font-medium text-gray-800 text-sm">Geothermal</span>
              <span className="text-center font-bold text-green-600">94.0%</span>
              <span className="text-center text-gray-600 text-sm">88.0%</span>
              <span className="text-center text-gray-600 text-sm">228</span>
            </div>
            <div className="grid grid-cols-4 gap-1 py-3 px-2 hover:bg-gray-50">
              <span className="font-medium text-gray-800 text-sm">Wind</span>
              <span className="text-center font-bold text-blue-600">91.0%</span>
              <span className="text-center text-gray-600 text-sm">85.0%</span>
              <span className="text-center text-gray-600 text-sm">712</span>
            </div>
            <div className="grid grid-cols-4 gap-1 py-3 px-2 hover:bg-gray-50">
              <span className="font-medium text-gray-800 text-sm">Biomass</span>
              <span className="text-center font-bold text-orange-600">88.0%</span>
              <span className="text-center text-gray-600 text-sm">82.0%</span>
              <span className="text-center text-gray-600 text-sm">342</span>
            </div>
          </div>
          
          {/* Total Row */}
          <div className="grid grid-cols-4 gap-1 py-4 px-2 bg-purple-50 border-t-2 border-purple-200">
            <span className="font-bold text-purple-800 text-sm">Overall</span>
            <span className="text-center font-bold text-purple-600 text-lg">92.8%</span>
            <span className="text-center font-semibold text-purple-700 text-sm">87.4%</span>
            <span className="text-center font-semibold text-purple-700 text-sm">2,847</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FeatureImportanceChart = () => (
    <Card className="border-l-4 border-l-purple-500 mb-4">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
          <Target className="w-5 h-5" />
          XGBoost Feature Importance
        </CardTitle>
        <Badge variant="secondary" className="w-fit text-xs">Impact Analysis</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {[
            { feature: 'Project Type', importance: 85, impact: 'High', color: 'bg-red-500' },
            { feature: 'Location Index', importance: 72, impact: 'High', color: 'bg-red-400' },
            { feature: 'Grid Stability', importance: 68, impact: 'Medium', color: 'bg-yellow-500' },
            { feature: 'Project Size (MW)', importance: 54, impact: 'Medium', color: 'bg-yellow-400' },
            { feature: 'Community Engagement', importance: 41, impact: 'Medium', color: 'bg-blue-500' },
            { feature: 'Developer Track Record', importance: 38, impact: 'Low', color: 'bg-gray-400' },
            { feature: 'Financial Health', importance: 35, impact: 'Low', color: 'bg-gray-400' },
            { feature: 'Environmental Impact', importance: 32, impact: 'Low', color: 'bg-gray-300' }
          ].map((item, index) => (
            <div key={index} className="bg-white border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800 text-sm truncate flex-1 mr-2">
                  {item.feature}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-bold text-gray-700 text-sm min-w-[40px] text-right">
                    {item.importance}%
                  </span>
                  <Badge 
                    variant={item.impact === 'High' ? 'destructive' : item.impact === 'Medium' ? 'default' : 'secondary'}
                    className="text-xs px-2 py-1 min-w-[60px] text-center"
                  >
                    {item.impact}
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${item.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${item.importance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const RiskDistributionChart = () => (
    <Card className="border-l-4 border-l-green-500 mb-4">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-green-700 text-lg">
          <Shield className="w-5 h-5" />
          ESG Risk Band Distribution
        </CardTitle>
        <Badge variant="secondary" className="w-fit text-xs">2,847 Projects Analyzed</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-white border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-2 py-3 px-3 bg-gray-100 text-sm font-semibold text-gray-700 border-b">
            <span className="text-left">Risk Band</span>
            <span className="text-center">Range</span>
            <span className="text-center">Count</span>
            <span className="text-center">Success</span>
          </div>
          
          {/* Data Rows */}
          <div className="divide-y">
            <div className="grid grid-cols-4 gap-2 py-3 px-3 hover:bg-green-50">
              <span className="text-green-700 font-medium text-sm">Exceptional</span>
              <span className="text-center text-xs text-gray-600">9.0-10.0</span>
              <span className="text-center text-xs text-gray-600">284 (10%)</span>
              <span className="text-center font-bold text-green-600 text-sm">97%</span>
            </div>
            <div className="grid grid-cols-4 gap-2 py-3 px-3 hover:bg-blue-50">
              <span className="text-blue-700 font-medium text-sm">Strong</span>
              <span className="text-center text-xs text-gray-600">8.0-8.9</span>
              <span className="text-center text-xs text-gray-600">711 (25%)</span>
              <span className="text-center font-bold text-blue-600 text-sm">94%</span>
            </div>
            <div className="grid grid-cols-4 gap-2 py-3 px-3 hover:bg-yellow-50">
              <span className="text-yellow-700 font-medium text-sm">Good</span>
              <span className="text-center text-xs text-gray-600">7.0-7.9</span>
              <span className="text-center text-xs text-gray-600">996 (35%)</span>
              <span className="text-center font-bold text-yellow-600 text-sm">89%</span>
            </div>
            <div className="grid grid-cols-4 gap-2 py-3 px-3 hover:bg-orange-50">
              <span className="text-orange-700 font-medium text-sm">Adequate</span>
              <span className="text-center text-xs text-gray-600">6.0-6.9</span>
              <span className="text-center text-xs text-gray-600">569 (20%)</span>
              <span className="text-center font-bold text-orange-600 text-sm">82%</span>
            </div>
            <div className="grid grid-cols-4 gap-2 py-3 px-3 hover:bg-red-50">
              <span className="text-red-700 font-medium text-sm">High Risk</span>
              <span className="text-center text-xs text-gray-600">&lt;6.0</span>
              <span className="text-center text-xs text-gray-600">287 (10%)</span>
              <span className="text-center font-bold text-red-600 text-sm">45%</span>
            </div>
          </div>
          
          {/* Summary */}
          <div className="bg-gray-50 px-3 py-3 border-t">
            <div className="flex flex-col space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-green-600 font-medium">Investment Ready:</span>
                <span className="font-bold">1,706 projects (60%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-600 font-medium">Conditional Approval:</span>
                <span className="font-bold">854 projects (30%)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const GeographicChart = () => (
    <Card className="border-l-4 border-l-indigo-500 mb-4">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-indigo-700 text-lg">
          <Globe className="w-5 h-5" />
          West Africa Regional Performance
        </CardTitle>
        <Badge variant="secondary" className="w-fit text-xs">Geographic Analysis</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-white border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-1 py-3 px-2 bg-gray-100 text-sm font-semibold text-gray-700 border-b">
            <span className="text-left">Location</span>
            <span className="text-center">Count</span>
            <span className="text-center">AUC</span>
            <span className="text-center">Success</span>
          </div>
          
          {/* Nigeria Cities */}
          <div className="bg-green-50 px-2 py-1">
            <span className="text-green-700 font-medium text-xs">🇳🇬 Nigeria</span>
          </div>
          {[
            { city: 'Lagos', projects: 428, auc: '94.2%', success: '91%' },
            { city: 'Abuja', projects: 312, auc: '93.8%', success: '89%' },
            { city: 'Kano', projects: 285, auc: '92.1%', success: '85%' },
            { city: 'Port Harcourt', projects: 267, auc: '93.5%', success: '88%' }
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-1 py-2 px-2 hover:bg-green-50 border-b border-gray-100">
              <span className="text-sm text-gray-800">{item.city}</span>
              <span className="text-center text-sm text-gray-600">{item.projects}</span>
              <span className="text-center font-bold text-green-600 text-sm">{item.auc}</span>
              <span className="text-center font-bold text-green-600 text-sm">{item.success}</span>
            </div>
          ))}
          
          {/* Ghana Cities */}
          <div className="bg-blue-50 px-2 py-1">
            <span className="text-blue-700 font-medium text-xs">🇬🇭 Ghana</span>
          </div>
          {[
            { city: 'Accra', projects: 389, auc: '95.1%', success: '93%' },
            { city: 'Kumasi', projects: 234, auc: '94.7%', success: '92%' },
            { city: 'Tamale', projects: 178, auc: '91.8%', success: '84%' },
            { city: 'Cape Coast', projects: 142, auc: '93.9%', success: '90%' }
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-1 py-2 px-2 hover:bg-blue-50 border-b border-gray-100">
              <span className="text-sm text-gray-800">{item.city}</span>
              <span className="text-center text-sm text-gray-600">{item.projects}</span>
              <span className="text-center font-bold text-blue-600 text-sm">{item.auc}</span>
              <span className="text-center font-bold text-blue-600 text-sm">{item.success}</span>
            </div>
          ))}
          
          {/* Rural Areas */}
          <div className="grid grid-cols-4 gap-1 py-3 px-2 bg-orange-50 border-t-2">
            <span className="text-sm font-medium text-orange-800">Rural Areas</span>
            <span className="text-center text-sm text-orange-700">612</span>
            <span className="text-center font-bold text-orange-600 text-sm">89.2%</span>
            <span className="text-center font-bold text-orange-600 text-sm">78%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FinancialValidationChart = () => (
    <Card className="border-l-4 border-l-emerald-500 mb-4">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-emerald-700 text-lg">
          <TrendingUp className="w-5 h-5" />
          Financial Performance Validation
        </CardTitle>
        <Badge variant="secondary" className="w-fit text-xs">Predicted vs Actual IRR</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-white border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-1 py-3 px-2 bg-gray-100 text-sm font-semibold text-gray-700 border-b">
            <span className="text-left">Project</span>
            <span className="text-center">Predicted</span>
            <span className="text-center">Actual</span>
            <span className="text-center">Error</span>
          </div>
          
          {/* Case Studies */}
          {[
            { project: 'Lagos Solar (5MW)', predicted: '16.5%', actual: '16.8%', error: '+0.3%', errorColor: 'text-green-600' },
            { project: 'Accra Wind (12MW)', predicted: '14.2%', actual: '13.9%', error: '-0.3%', errorColor: 'text-red-600' },
            { project: 'Kano Biomass (3MW)', predicted: '12.8%', actual: '12.4%', error: '-0.4%', errorColor: 'text-red-600' },
            { project: 'Kumasi Hydro (8MW)', predicted: '18.1%', actual: '18.7%', error: '+0.6%', errorColor: 'text-green-600' },
            { project: 'Abuja Solar (15MW)', predicted: '15.7%', actual: '15.2%', error: '-0.5%', errorColor: 'text-red-600' },
            { project: 'Port Harcourt Wind (20MW)', predicted: '13.9%', actual: '14.3%', error: '+0.4%', errorColor: 'text-green-600' }
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-1 py-2 px-2 hover:bg-gray-50 border-b border-gray-100">
              <span className="text-xs text-gray-800 truncate">{item.project}</span>
              <span className="text-center font-bold text-blue-600 text-sm">{item.predicted}</span>
              <span className="text-center font-bold text-green-600 text-sm">{item.actual}</span>
              <span className={`text-center font-bold text-sm ${item.errorColor}`}>{item.error}</span>
            </div>
          ))}
          
          {/* Summary */}
          <div className="bg-emerald-50 px-2 py-3 border-t">
            <div className="text-center">
              <div className="text-sm font-bold text-emerald-700">Model Accuracy: 94.2%</div>
              <div className="text-xs text-emerald-600">Average Error: ±0.42%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RealTimeMetrics = () => (
    <Card className="border-l-4 border-l-cyan-500 mb-4">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-cyan-700 text-lg">
          <Activity className="w-5 h-5" />
          Real-Time Performance
        </CardTitle>
        <Badge variant="secondary" className="w-fit text-xs">Last 30 Days</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3">
          {[
            { metric: 'Prediction Accuracy', value: '94.2%', trend: '↗ +0.8%', trendColor: 'text-green-500', target: '>90%' },
            { metric: 'Response Time', value: '247ms', trend: '↘ -23ms', trendColor: 'text-green-500', target: '<500ms' },
            { metric: 'API Uptime', value: '99.7%', trend: '→ Stable', trendColor: 'text-blue-500', target: '>99%' },
            { metric: 'Daily Predictions', value: '1,247', trend: '↗ +15%', trendColor: 'text-blue-500', target: '1000+' },
            { metric: 'User Satisfaction', value: '4.8/5', trend: '↗ +0.2', trendColor: 'text-green-500', target: '>4.5' },
            { metric: 'Model Confidence', value: '91.8%', trend: '→ Stable', trendColor: 'text-blue-500', target: '>85%' }
          ].map((item, index) => (
            <div key={index} className="bg-white border rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-800 text-sm">{item.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-600">{item.value}</span>
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className={`${item.trendColor} font-medium`}>{item.trend}</span>
                <span className="text-gray-500">Target: {item.target}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderCharts = () => {
    switch (chartType) {
      case 'model-performance':
        return <ModelPerformanceChart />;
      case 'feature-importance':
        return <FeatureImportanceChart />;
      case 'risk-distribution':
        return <RiskDistributionChart />;
      case 'geographic':
        return <GeographicChart />;
      case 'financial':
        return <FinancialValidationChart />;
      case 'real-time':
        return <RealTimeMetrics />;
      default:
        return (
          <div className="space-y-0">
            <ModelPerformanceChart />
            <FeatureImportanceChart />
            <RiskDistributionChart />
            <GeographicChart />
            <FinancialValidationChart />
            <RealTimeMetrics />
          </div>
        );
    }
  };

  return (
    <div className={`${isMobile ? 'px-4 pb-4' : 'max-w-4xl mx-auto'}`}>
      {renderCharts()}
    </div>
  );
}