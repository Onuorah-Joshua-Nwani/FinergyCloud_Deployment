import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Shield, AlertTriangle, AlertCircle, TrendingDown } from "lucide-react";

interface RiskAssessmentChartProps {
  projectType?: string;
}

const getRiskDataByProjectType = (projectType: string) => {
  const riskProfiles = {
    solar: [
      { category: "Market Risk", low: 18, medium: 6, high: 1, total: 25 },
      { category: "Technology Risk", low: 20, medium: 4, high: 1, total: 25 },
      { category: "Regulatory Risk", low: 15, medium: 8, high: 2, total: 25 },
      { category: "Financial Risk", low: 16, medium: 7, high: 2, total: 25 },
      { category: "Operational Risk", low: 19, medium: 5, high: 1, total: 25 },
    ],
    wind: [
      { category: "Market Risk", low: 14, medium: 9, high: 2, total: 25 },
      { category: "Technology Risk", low: 15, medium: 8, high: 2, total: 25 },
      { category: "Regulatory Risk", low: 16, medium: 7, high: 2, total: 25 },
      { category: "Financial Risk", low: 13, medium: 10, high: 2, total: 25 },
      { category: "Operational Risk", low: 12, medium: 10, high: 3, total: 25 },
    ],
    hydro: [
      { category: "Market Risk", low: 20, medium: 4, high: 1, total: 25 },
      { category: "Technology Risk", low: 22, medium: 3, high: 0, total: 25 },
      { category: "Regulatory Risk", low: 10, medium: 12, high: 3, total: 25 },
      { category: "Financial Risk", low: 18, medium: 6, high: 1, total: 25 },
      { category: "Operational Risk", low: 17, medium: 7, high: 1, total: 25 },
    ],
    biomass: [
      { category: "Market Risk", low: 12, medium: 10, high: 3, total: 25 },
      { category: "Technology Risk", low: 13, medium: 9, high: 3, total: 25 },
      { category: "Regulatory Risk", low: 11, medium: 11, high: 3, total: 25 },
      { category: "Financial Risk", low: 10, medium: 12, high: 3, total: 25 },
      { category: "Operational Risk", low: 14, medium: 8, high: 3, total: 25 },
    ],
    geothermal: [
      { category: "Market Risk", low: 17, medium: 6, high: 2, total: 25 },
      { category: "Technology Risk", low: 16, medium: 7, high: 2, total: 25 },
      { category: "Regulatory Risk", low: 15, medium: 8, high: 2, total: 25 },
      { category: "Financial Risk", low: 14, medium: 9, high: 2, total: 25 },
      { category: "Operational Risk", low: 18, medium: 6, high: 1, total: 25 },
    ]
  };
  return riskProfiles[projectType as keyof typeof riskProfiles] || riskProfiles.solar;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, item: any) => sum + item.value, 0);
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          const percentage = ((entry.value / total) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">{entry.name}:</span>
              </div>
              <div className="text-right">
                <span className="font-medium text-gray-900">{entry.value} projects</span>
                <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
              </div>
            </div>
          );
        })}
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Projects:</span>
            <span className="font-medium text-gray-900">{total}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function RiskAssessmentChart({ projectType = "solar" }: RiskAssessmentChartProps) {
  const data = getRiskDataByProjectType(projectType);
  const totalLowRisk = data.reduce((sum, item) => sum + item.low, 0);
  const totalMediumRisk = data.reduce((sum, item) => sum + item.medium, 0);
  const totalHighRisk = data.reduce((sum, item) => sum + item.high, 0);
  const overallTotal = totalLowRisk + totalMediumRisk + totalHighRisk;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <span className="mobile-text-lg">Risk Assessment by Category</span>
          </div>
          <span className="text-sm font-normal text-gray-500 capitalize">
            {projectType} Projects Analysis
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 mobile-text-sm text-gray-600 text-center">
          Comprehensive risk analysis across key categories for {projectType} renewable energy projects. 
          Data shows distribution of risk levels based on historical project performance and market conditions.
        </div>
        
        <div className="mobile-grid-3 mobile-gap-2 mb-6">
          <div className="text-center mobile-p-2 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="mobile-text-xl font-bold text-green-600">{totalLowRisk}</span>
            </div>
            <p className="mobile-text-sm text-green-800 font-medium">Low Risk</p>
            <p className="text-xs text-green-600">{((totalLowRisk/overallTotal)*100).toFixed(1)}% of projects</p>
          </div>
          <div className="text-center mobile-p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
              <span className="mobile-text-xl font-bold text-yellow-600">{totalMediumRisk}</span>
            </div>
            <p className="mobile-text-sm text-yellow-800 font-medium">Medium Risk</p>
            <p className="text-xs text-yellow-600">{((totalMediumRisk/overallTotal)*100).toFixed(1)}% of projects</p>
          </div>
          <div className="text-center mobile-p-2 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              <span className="mobile-text-xl font-bold text-red-600">{totalHighRisk}</span>
            </div>
            <p className="mobile-text-sm text-red-800 font-medium">High Risk</p>
            <p className="text-xs text-red-600">{((totalHighRisk/overallTotal)*100).toFixed(1)}% of projects</p>
          </div>
        </div>

        <div className="chart-container flex justify-center">
          <ResponsiveContainer width="100%" height={280} className="chart-card-mobile sm:h-[320px] lg:h-[350px]">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 10 }}
                tickLine={{ stroke: '#d1d5db' }}
                angle={-45}
                textAnchor="end"
                height={80}
                className="mobile-text-xs"
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickLine={{ stroke: '#d1d5db' }}
                label={{ value: 'Number of Projects', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                className="mobile-text-xs"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
                iconType="rect"
                className="mobile-text-xs"
              />
            <Bar 
              dataKey="low" 
              stackId="risk" 
              fill="#16a34a" 
              name="Low Risk Projects"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="medium" 
              stackId="risk" 
              fill="#f59e0b" 
              name="Medium Risk Projects"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="high" 
              stackId="risk" 
              fill="#dc2626" 
              name="High Risk Projects"
              radius={[4, 4, 0, 0]}
            />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            Risk Mitigation Insights
          </h4>
          <div className="text-sm text-blue-800">
            {projectType === 'solar' && "Solar projects show excellent risk profiles with proven technology. Focus on regulatory compliance and grid integration."}
            {projectType === 'wind' && "Wind projects have moderate operational risks due to weather dependency. Consider advanced forecasting systems."}
            {projectType === 'hydro' && "Hydro projects face higher regulatory risks but excellent operational stability. Environmental permits are crucial."}
            {projectType === 'biomass' && "Biomass projects require careful supply chain management and technology selection to minimize risks."}
            {projectType === 'geothermal' && "Geothermal projects offer stable returns but require thorough geological assessment and drilling expertise."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}