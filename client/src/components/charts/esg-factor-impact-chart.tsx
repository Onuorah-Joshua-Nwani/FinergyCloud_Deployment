import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Zap, TreePine, Users, Shield, Eye, Target, TrendingUp, AlertTriangle } from "lucide-react";

const impactData = [
  { 
    factor: "Carbon Footprint", 
    current: 8.7, 
    potential: 9.2, 
    investment: 45,
    timeline: "6 months",
    priority: "high",
    description: "CO2 reduction through renewable energy and carbon offset programs",
    icon: TreePine,
    color: "#22c55e",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200"
  },
  { 
    factor: "Energy Efficiency", 
    current: 8.5, 
    potential: 8.8, 
    investment: 32,
    timeline: "4 months",
    priority: "medium",
    description: "Smart grid integration and energy management systems optimization",
    icon: Zap,
    color: "#f59e0b",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200"
  },
  { 
    factor: "Community Engagement", 
    current: 7.8, 
    potential: 8.4, 
    investment: 28,
    timeline: "8 months",
    priority: "high",
    description: "Local partnerships and community benefit programs expansion",
    icon: Users,
    color: "#3b82f6",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200"
  },
  { 
    factor: "Risk Management", 
    current: 8.4, 
    potential: 8.9, 
    investment: 38,
    timeline: "5 months",
    priority: "high",
    description: "Advanced risk assessment tools and climate resilience planning",
    icon: Shield,
    color: "#8b5cf6",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    borderColor: "border-purple-200"
  },
  { 
    factor: "Board Diversity", 
    current: 8.2, 
    potential: 8.6, 
    investment: 15,
    timeline: "3 months",
    priority: "medium",
    description: "Diverse leadership recruitment and inclusive governance policies",
    icon: Target,
    color: "#06b6d4",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600",
    borderColor: "border-cyan-200"
  },
  { 
    factor: "Transparency", 
    current: 8.0, 
    potential: 8.5, 
    investment: 22,
    timeline: "4 months",
    priority: "medium",
    description: "Enhanced reporting systems and stakeholder communication platforms",
    icon: Eye,
    color: "#ef4444",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    borderColor: "border-red-200"
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const factor = impactData.find(f => f.factor === label);
    const Icon = factor?.icon || Target;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-[280px]">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5" style={{ color: factor?.color }} />
          <h3 className="font-medium text-gray-900">{label}</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Current Score:</span>
            <span className="font-medium text-blue-600">{factor?.current}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Potential Score:</span>
            <span className="font-medium text-green-600">{factor?.potential}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Improvement:</span>
            <span className="font-medium text-purple-600">+{factor ? (factor.potential - factor.current).toFixed(1) : 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Investment:</span>
            <span className="font-medium">₦{factor?.investment}M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Timeline:</span>
            <span className="font-medium">{factor?.timeline}</span>
          </div>
          <p className="text-xs text-gray-600 mt-2 border-t pt-2">{factor?.description}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function ESGFactorImpactChart() {
  const totalInvestment = impactData.reduce((sum, item) => sum + item.investment, 0);
  const totalImpact = impactData.reduce((sum, item) => sum + (item.potential - item.current), 0);
  const highPriorityItems = impactData.filter(item => item.priority === 'high').length;
  const avgTimeline = Math.round(impactData.reduce((sum, item) => sum + parseInt(item.timeline), 0) / impactData.length);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            <span className="mobile-text-lg">ESG Impact & Improvement Analysis</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 mobile-text-sm text-gray-600 text-center">
          Strategic analysis of ESG improvement opportunities showing current performance, potential gains, 
          required investments, and implementation timelines for maximum impact.
        </div>
        
        <div className="mobile-grid-4 mobile-gap-2 mb-6">
          <div className="text-center mobile-p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="mobile-text-xl font-bold text-purple-600">+{totalImpact.toFixed(1)}</span>
            </div>
            <p className="text-sm text-purple-800 font-medium">Total Impact</p>
            <p className="text-xs text-purple-600">Score improvement</p>
          </div>
          <div className="text-center mobile-p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="mobile-text-base font-bold text-green-600">₦{totalInvestment}</span>
            </div>
            <p className="mobile-text-sm text-green-800 font-medium">Investment</p>
            <p className="text-xs text-green-600">Millions required</p>
          </div>
          <div className="text-center mobile-p-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              <span className="mobile-text-base font-bold text-orange-600">{highPriorityItems}</span>
            </div>
            <p className="mobile-text-sm text-orange-800 font-medium">High Priority</p>
            <p className="text-xs text-orange-600">Critical factors</p>
          </div>
          <div className="text-center mobile-p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="mobile-text-base font-bold text-blue-600">{avgTimeline}mo</span>
            </div>
            <p className="mobile-text-sm text-blue-800 font-medium">Avg Timeline</p>
            <p className="text-xs text-blue-600">Implementation</p>
          </div>
        </div>

        <div className="mobile-grid-1 lg:grid-cols-2 mobile-gap-4 mb-6">
          <div className="chart-container flex flex-col items-center">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base text-center">Current vs Potential Performance</h4>
            <ResponsiveContainer width="100%" height={280} className="chart-card-mobile sm:h-[300px] lg:h-[320px]">
              <AreaChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="factor" 
                  tick={{ fontSize: 9 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  className="mobile-text-xs"
                />
                <YAxis 
                  domain={[7, 10]}
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'ESG Score', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                  className="mobile-text-xs"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="Current Score"
                />
                <Area 
                  type="monotone" 
                  dataKey="potential" 
                  stroke="#22c55e" 
                  fill="#22c55e"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Potential Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container flex flex-col items-center">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base text-center">Investment vs Impact Analysis</h4>
            <ResponsiveContainer width="100%" height={280} className="chart-card-mobile sm:h-[300px] lg:h-[320px]">
              <BarChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="factor" 
                  tick={{ fontSize: 9 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  className="mobile-text-xs"
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'Investment (₦M)', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                  className="mobile-text-xs"
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'investment' ? `₦${value}M` : value, 
                    name === 'investment' ? 'Investment Required' : 'Impact Score'
                  ]}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px' 
                  }}
                />
                <Bar 
                  dataKey="investment" 
                  fill="#8b5cf6" 
                  name="investment"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mobile-grid-3 mobile-gap-2 mb-6">
          {impactData.map((item, index) => {
            const Icon = item.icon;
            const improvement = (item.potential - item.current).toFixed(1);
            const roiRatio = (parseFloat(improvement) / item.investment * 100).toFixed(1);
            
            return (
              <div key={index} className={`p-4 rounded-lg border ${item.bgColor} ${item.borderColor}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${item.textColor}`} />
                    <span className="font-medium text-gray-900 text-sm">{item.factor}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium text-blue-600">{item.current}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Potential:</span>
                    <span className="font-medium text-green-600">{item.potential}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impact:</span>
                    <span className="font-medium text-purple-600">+{improvement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment:</span>
                    <span className="font-medium">₦{item.investment}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timeline:</span>
                    <span className="font-medium">{item.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROI Ratio:</span>
                    <span className="font-medium text-green-600">{roiRatio}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{ 
                        width: `${(item.current / 10) * 100}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" />
            Strategic Implementation Roadmap
          </h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Phase 1 (0-4 months):</strong> Board Diversity and Transparency initiatives - ₦37M investment for +0.9 impact
            </p>
            <p>
              <strong>Phase 2 (4-6 months):</strong> Risk Management and Energy Efficiency upgrades - ₦70M investment for +0.8 impact  
            </p>
            <p>
              <strong>Phase 3 (6-8 months):</strong> Carbon Footprint and Community Engagement programs - ₦73M investment for +1.1 impact
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}