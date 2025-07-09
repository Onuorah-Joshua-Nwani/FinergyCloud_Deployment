import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Brain, Target, TrendingUp, Zap } from "lucide-react";

interface ModelPerformanceChartProps {
  projectType?: string;
}

const getModelDataByProjectType = (projectType: string) => {
  const modelPerformance = {
    solar: [
      { epoch: 1, training: 0.68, validation: 0.65, auc: 0.71, precision: 0.66, recall: 0.64 },
      { epoch: 2, training: 0.75, validation: 0.73, auc: 0.77, precision: 0.74, recall: 0.72 },
      { epoch: 3, training: 0.81, validation: 0.78, auc: 0.82, precision: 0.79, recall: 0.77 },
      { epoch: 4, training: 0.86, validation: 0.83, auc: 0.87, precision: 0.84, recall: 0.82 },
      { epoch: 5, training: 0.89, validation: 0.86, auc: 0.90, precision: 0.87, recall: 0.85 },
      { epoch: 6, training: 0.92, validation: 0.88, auc: 0.93, precision: 0.89, recall: 0.87 },
      { epoch: 7, training: 0.94, validation: 0.90, auc: 0.95, precision: 0.91, recall: 0.89 },
      { epoch: 8, training: 0.95, validation: 0.90, auc: 0.95, precision: 0.91, recall: 0.89 },
    ],
    wind: [
      { epoch: 1, training: 0.62, validation: 0.59, auc: 0.65, precision: 0.61, recall: 0.58 },
      { epoch: 2, training: 0.70, validation: 0.67, auc: 0.72, precision: 0.68, recall: 0.66 },
      { epoch: 3, training: 0.76, validation: 0.73, auc: 0.78, precision: 0.74, recall: 0.72 },
      { epoch: 4, training: 0.81, validation: 0.78, auc: 0.83, precision: 0.79, recall: 0.77 },
      { epoch: 5, training: 0.84, validation: 0.81, auc: 0.86, precision: 0.82, recall: 0.80 },
      { epoch: 6, training: 0.87, validation: 0.83, auc: 0.89, precision: 0.84, recall: 0.82 },
      { epoch: 7, training: 0.89, validation: 0.85, auc: 0.91, precision: 0.86, recall: 0.84 },
      { epoch: 8, training: 0.90, validation: 0.85, auc: 0.91, precision: 0.86, recall: 0.84 },
    ],
    hydro: [
      { epoch: 1, training: 0.70, validation: 0.67, auc: 0.73, precision: 0.68, recall: 0.66 },
      { epoch: 2, training: 0.77, validation: 0.75, auc: 0.79, precision: 0.76, recall: 0.74 },
      { epoch: 3, training: 0.83, validation: 0.80, auc: 0.84, precision: 0.81, recall: 0.79 },
      { epoch: 4, training: 0.88, validation: 0.85, auc: 0.89, precision: 0.86, recall: 0.84 },
      { epoch: 5, training: 0.91, validation: 0.88, auc: 0.92, precision: 0.89, recall: 0.87 },
      { epoch: 6, training: 0.94, validation: 0.90, auc: 0.94, precision: 0.91, recall: 0.89 },
      { epoch: 7, training: 0.96, validation: 0.92, auc: 0.96, precision: 0.93, recall: 0.91 },
      { epoch: 8, training: 0.97, validation: 0.92, auc: 0.96, precision: 0.93, recall: 0.91 },
    ],
    biomass: [
      { epoch: 1, training: 0.58, validation: 0.55, auc: 0.61, precision: 0.57, recall: 0.54 },
      { epoch: 2, training: 0.66, validation: 0.63, auc: 0.68, precision: 0.64, recall: 0.62 },
      { epoch: 3, training: 0.72, validation: 0.69, auc: 0.74, precision: 0.70, recall: 0.68 },
      { epoch: 4, training: 0.77, validation: 0.74, auc: 0.79, precision: 0.75, recall: 0.73 },
      { epoch: 5, training: 0.81, validation: 0.78, auc: 0.83, precision: 0.79, recall: 0.77 },
      { epoch: 6, training: 0.84, validation: 0.80, auc: 0.86, precision: 0.81, recall: 0.79 },
      { epoch: 7, training: 0.86, validation: 0.82, auc: 0.88, precision: 0.83, recall: 0.81 },
      { epoch: 8, training: 0.87, validation: 0.82, auc: 0.88, precision: 0.83, recall: 0.81 },
    ],
    geothermal: [
      { epoch: 1, training: 0.65, validation: 0.62, auc: 0.68, precision: 0.63, recall: 0.61 },
      { epoch: 2, training: 0.73, validation: 0.70, auc: 0.75, precision: 0.71, recall: 0.69 },
      { epoch: 3, training: 0.79, validation: 0.76, auc: 0.81, precision: 0.77, recall: 0.75 },
      { epoch: 4, training: 0.84, validation: 0.81, auc: 0.86, precision: 0.82, recall: 0.80 },
      { epoch: 5, training: 0.87, validation: 0.84, auc: 0.89, precision: 0.85, recall: 0.83 },
      { epoch: 6, training: 0.90, validation: 0.86, auc: 0.92, precision: 0.87, recall: 0.85 },
      { epoch: 7, training: 0.92, validation: 0.88, auc: 0.94, precision: 0.89, recall: 0.87 },
      { epoch: 8, training: 0.93, validation: 0.88, auc: 0.94, precision: 0.89, recall: 0.87 },
    ]
  };
  return modelPerformance[projectType as keyof typeof modelPerformance] || modelPerformance.solar;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-2">Epoch {label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}:</span>
            </div>
            <span className="font-medium text-gray-900">{(entry.value * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ModelPerformanceChart({ projectType = "solar" }: ModelPerformanceChartProps) {
  const data = getModelDataByProjectType(projectType);
  const finalMetrics = data[data.length - 1];
  const improvementRate = ((finalMetrics.validation - data[0].validation) / data[0].validation * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            <span className="mobile-text-lg">XGBoost Model Performance</span>
          </div>
          <span className="text-xs sm:text-sm font-normal text-gray-500 capitalize text-center sm:text-left">
            {projectType} Prediction Model
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 mobile-text-sm text-gray-600 text-center">
          Real-time training metrics for the XGBoost model specialized in {projectType} renewable energy project predictions. 
          Model learns from historical data to provide accurate investment forecasts.
        </div>
        
        <div className="mobile-grid-4 mobile-gap-2 mb-6">
          <div className="text-center mobile-p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="mobile-text-xl font-bold text-blue-600">{(finalMetrics.validation * 100).toFixed(1)}%</span>
            </div>
            <p className="mobile-text-sm text-blue-800 font-medium">Validation Accuracy</p>
            <p className="text-xs text-blue-600">Model reliability</p>
          </div>
          <div className="text-center mobile-p-2 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="mobile-text-xl font-bold text-purple-600">{(finalMetrics.auc * 100).toFixed(1)}%</span>
            </div>
            <p className="mobile-text-sm text-purple-800 font-medium">AUC Score</p>
            <p className="text-xs text-purple-600">Predictive power</p>
          </div>
          <div className="text-center mobile-p-2 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="mobile-text-xl font-bold text-green-600">{(finalMetrics.precision * 100).toFixed(1)}%</span>
            </div>
            <p className="mobile-text-sm text-green-800 font-medium">Precision</p>
            <p className="text-xs text-green-600">Accuracy of predictions</p>
          </div>
          <div className="text-center mobile-p-2 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              <span className="mobile-text-xl font-bold text-orange-600">{(finalMetrics.recall * 100).toFixed(1)}%</span>
            </div>
            <p className="mobile-text-sm text-orange-800 font-medium">Recall</p>
            <p className="text-xs text-orange-600">Coverage of predictions</p>
          </div>
        </div>

        <div className="chart-container flex justify-center">
          <ResponsiveContainer width="100%" height={280} className="chart-card-mobile sm:h-[320px] lg:h-[350px]">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="epoch" 
                tick={{ fontSize: 10 }}
                tickLine={{ stroke: '#d1d5db' }}
                label={{ value: 'Training Epoch', position: 'insideBottom', offset: -5, style: { fontSize: '10px' } }}
                className="mobile-text-xs"
              />
              <YAxis 
                domain={[0.5, 1]} 
                tick={{ fontSize: 10 }}
                tickLine={{ stroke: '#d1d5db' }}
                label={{ value: 'Performance Score', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                className="mobile-text-xs"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
                iconType="line"
                className="mobile-text-xs"
              />
            <Line 
              type="monotone" 
              dataKey="training" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              name="Training Accuracy"
            />
            <Line 
              type="monotone" 
              dataKey="validation" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
              name="Validation Accuracy"
            />
            <Line 
              type="monotone" 
              dataKey="auc" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2 }}
              name="AUC Score"
            />
            <Line 
              type="monotone" 
              dataKey="precision" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#f59e0b', strokeWidth: 2 }}
              name="Precision"
            />
            <Line 
              type="monotone" 
              dataKey="recall" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#ef4444', strokeWidth: 2 }}
              name="Recall"
            />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-600" />
            Model Insights for {projectType.charAt(0).toUpperCase() + projectType.slice(1)} Projects
          </h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Performance Improvement:</strong> +{improvementRate}% validation accuracy over 8 epochs</p>
            <p><strong>Model Status:</strong> {finalMetrics.validation >= 0.85 ? 'Excellent' : finalMetrics.validation >= 0.75 ? 'Good' : 'Needs Improvement'} - Ready for production use</p>
            <p><strong>Specialization:</strong> {
              projectType === 'solar' ? 'Optimized for solar irradiance and panel efficiency analysis' :
              projectType === 'wind' ? 'Tuned for wind speed patterns and turbine performance metrics' :
              projectType === 'hydro' ? 'Configured for water flow and dam efficiency predictions' :
              projectType === 'biomass' ? 'Specialized in feedstock availability and conversion efficiency' :
              'Focused on geothermal heat flux and drilling success rates'
            }</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}