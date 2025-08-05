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
  CheckCircle
} from "lucide-react";

interface ESGPerformanceChartsProps {
  chartType?: 'model-performance' | 'feature-importance' | 'risk-distribution' | 'geographic' | 'all';
  isMobile?: boolean;
}

export default function ESGPerformanceCharts({ chartType = 'all', isMobile = true }: ESGPerformanceChartsProps) {
  
  const ModelPerformanceChart = () => (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <BarChart3 className="w-5 h-5" />
          Model Performance by Project Type
        </CardTitle>
        <Badge variant="secondary" className="w-fit">AUC Score Analysis</Badge>
      </CardHeader>
      <CardContent>
        <div className="bg-white border rounded-lg p-4 space-y-4">
          <div className="text-center font-bold text-base text-gray-800 mb-4">
            AUC Score Performance Across Renewable Energy Technologies
          </div>
          
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 py-2 bg-gray-100 rounded text-sm font-semibold text-gray-700">
            <div className="text-left pl-2">Project Type</div>
            <div className="text-center">AUC Score</div>
            <div className="text-center">Validation</div>
            <div className="text-center">Samples</div>
          </div>
          
          {/* Data Rows */}
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
              <div className="text-left pl-2 font-medium text-gray-800">Hydro</div>
              <div className="text-center font-bold text-green-600 text-lg">96.0%</div>
              <div className="text-center text-gray-600">92.0%</div>
              <div className="text-center text-gray-600">569</div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
              <div className="text-left pl-2 font-medium text-gray-800">Solar</div>
              <div className="text-center font-bold text-green-600 text-lg">95.0%</div>
              <div className="text-center text-gray-600">90.0%</div>
              <div className="text-center text-gray-600">996</div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
              <div className="text-left pl-2 font-medium text-gray-800">Geothermal</div>
              <div className="text-center font-bold text-green-600 text-lg">94.0%</div>
              <div className="text-center text-gray-600">88.0%</div>
              <div className="text-center text-gray-600">228</div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
              <div className="text-left pl-2 font-medium text-gray-800">Wind</div>
              <div className="text-center font-bold text-blue-600 text-lg">91.0%</div>
              <div className="text-center text-gray-600">85.0%</div>
              <div className="text-center text-gray-600">712</div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
              <div className="text-left pl-2 font-medium text-gray-800">Biomass</div>
              <div className="text-center font-bold text-orange-600 text-lg">88.0%</div>
              <div className="text-center text-gray-600">82.0%</div>
              <div className="text-center text-gray-600">342</div>
            </div>
            
            {/* Total Row */}
            <div className="grid grid-cols-4 gap-4 py-3 bg-purple-50 rounded border-2 border-purple-200">
              <div className="text-left pl-2 font-bold text-purple-800">Overall Avg</div>
              <div className="text-center font-bold text-purple-600 text-xl">92.8%</div>
              <div className="text-center font-semibold text-purple-700">87.4%</div>
              <div className="text-center font-semibold text-purple-700">2,847</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FeatureImportanceChart = () => (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Target className="w-5 h-5" />
          XGBoost Feature Importance Analysis
        </CardTitle>
        <Badge variant="secondary" className="w-fit">Impact on Success Rate</Badge>
      </CardHeader>
      <CardContent>
        <div className="font-mono text-sm bg-gray-50 p-4 rounded border">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span>Project Type</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
                <span className="font-bold text-red-600">85%</span>
                <Badge size="sm" variant="destructive">High</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Location Index</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '72%'}}></div>
                </div>
                <span className="font-bold text-orange-600">72%</span>
                <Badge size="sm" variant="destructive">High</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Grid Stability</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>
                <span className="font-bold text-yellow-600">68%</span>
                <Badge size="sm" variant="outline">Medium</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Project Size (MW)</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '54%'}}></div>
                </div>
                <span className="font-bold text-blue-600">54%</span>
                <Badge size="sm" variant="outline">Medium</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Community Engagement</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '41%'}}></div>
                </div>
                <span className="font-bold text-green-600">41%</span>
                <Badge size="sm" variant="outline">Medium</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RiskDistributionChart = () => (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Shield className="w-5 h-5" />
          ESG Risk Band Distribution
        </CardTitle>
        <Badge variant="secondary" className="w-fit">2,847 Projects Analyzed</Badge>
      </CardHeader>
      <CardContent>
        <div className="font-mono text-sm bg-gray-50 p-4 rounded border">
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-4 gap-2 font-semibold border-b pb-1">
              <span>Risk Band</span>
              <span>ESG Range</span>
              <span>Count</span>
              <span>Success</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <span className="text-green-700 font-medium">Exceptional</span>
              <span>9.0-10.0</span>
              <span>284 (10%)</span>
              <span className="text-green-600 font-bold">97%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <span className="text-blue-700 font-medium">Strong</span>
              <span>8.0-8.9</span>
              <span>711 (25%)</span>
              <span className="text-blue-600 font-bold">94%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <span className="text-yellow-700 font-medium">Good</span>
              <span>7.0-7.9</span>
              <span>996 (35%)</span>
              <span className="text-yellow-600 font-bold">89%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <span className="text-orange-700 font-medium">Adequate</span>
              <span>6.0-6.9</span>
              <span>569 (20%)</span>
              <span className="text-orange-600 font-bold">82%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <span className="text-red-700 font-medium">High Risk</span>
              <span>&lt;6.0</span>
              <span>287 (10%)</span>
              <span className="text-red-600 font-bold">45%</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t text-xs">
            <div className="flex justify-between">
              <span className="text-green-600">Investment Ready: 1,706 (60%)</span>
              <span className="text-yellow-600">Conditional: 854 (30%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const GeographicChart = () => (
    <Card className="border-l-4 border-l-indigo-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-700">
          <Globe className="w-5 h-5" />
          West Africa Regional Performance
        </CardTitle>
        <Badge variant="secondary" className="w-fit">Geographic Analysis</Badge>
      </CardHeader>
      <CardContent>
        <div className="font-mono text-sm bg-gray-50 p-4 rounded border">
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-4 gap-1 font-semibold border-b pb-1">
              <span>Location</span>
              <span>Projects</span>
              <span>AUC</span>
              <span>Success</span>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-4 gap-1">
                <span className="text-green-700">Lagos, NG</span>
                <span>428</span>
                <span className="font-bold">94.2%</span>
                <span className="text-green-600">91%</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <span className="text-green-700">Accra, GH</span>
                <span>389</span>
                <span className="font-bold">95.1%</span>
                <span className="text-green-600">93%</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <span className="text-blue-700">Abuja, NG</span>
                <span>312</span>
                <span className="font-bold">93.8%</span>
                <span className="text-blue-600">89%</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <span className="text-yellow-700">Kumasi, GH</span>
                <span>234</span>
                <span className="font-bold">94.7%</span>
                <span className="text-yellow-600">92%</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <span className="text-orange-700">Rural Areas</span>
                <span>612</span>
                <span className="font-bold">89.2%</span>
                <span className="text-orange-600">78%</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t text-xs flex justify-between">
            <span className="text-green-600">Nigeria: 1,708 (60%)</span>
            <span className="text-blue-600">Ghana: 1,139 (40%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RealTimeMetrics = () => (
    <Card className="border-l-4 border-l-cyan-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-700">
          <Activity className="w-5 h-5" />
          Real-Time Performance Metrics
        </CardTitle>
        <Badge variant="secondary" className="w-fit">Last 30 Days</Badge>
      </CardHeader>
      <CardContent>
        <div className="font-mono text-sm bg-gray-50 p-4 rounded border">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Prediction Accuracy</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-green-600">94.2%</span>
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500">+0.8%</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Response Time</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">247ms</span>
                <span className="text-green-500">↘ -23ms</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>API Uptime</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-green-600">99.7%</span>
                <CheckCircle className="w-3 h-3 text-green-500" />
              </div>
            </div>
            <div className="flex justify-between">
              <span>Daily Predictions</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">1,247</span>
                <TrendingUp className="w-3 h-3 text-blue-500" />
                <span className="text-blue-500">+15%</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>User Satisfaction</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-600">4.8/5</span>
                <Award className="w-3 h-3 text-yellow-500" />
              </div>
            </div>
          </div>
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
      default:
        return (
          <div className="space-y-4">
            <ModelPerformanceChart />
            <FeatureImportanceChart />
            <RiskDistributionChart />
            <GeographicChart />
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