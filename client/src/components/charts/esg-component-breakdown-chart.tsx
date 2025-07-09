import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Leaf, Users, Shield, Eye, Lightbulb, Heart } from "lucide-react";

const esgData = [
  { 
    subject: "Environmental", 
    score: 8.7, 
    benchmark: 8.2,
    fullMark: 10,
    description: "Carbon footprint reduction, renewable energy usage, waste management",
    icon: Leaf,
    color: "#22c55e",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200"
  },
  { 
    subject: "Social", 
    score: 8.1, 
    benchmark: 7.8,
    fullMark: 10,
    description: "Community engagement, employee welfare, diversity and inclusion",
    icon: Users,
    color: "#3b82f6",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200"
  },
  { 
    subject: "Governance", 
    score: 8.4, 
    benchmark: 8.0,
    fullMark: 10,
    description: "Board diversity, executive compensation, anti-corruption policies",
    icon: Shield,
    color: "#8b5cf6",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    borderColor: "border-purple-200"
  },
  { 
    subject: "Transparency", 
    score: 8.2, 
    benchmark: 7.9,
    fullMark: 10,
    description: "Financial disclosure, sustainability reporting, stakeholder communication",
    icon: Eye,
    color: "#f59e0b",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200"
  },
  { 
    subject: "Innovation", 
    score: 8.6, 
    benchmark: 8.1,
    fullMark: 10,
    description: "R&D investment, technology adoption, sustainable product development",
    icon: Lightbulb,
    color: "#06b6d4",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600",
    borderColor: "border-cyan-200"
  },
  { 
    subject: "Community", 
    score: 7.9, 
    benchmark: 7.5,
    fullMark: 10,
    description: "Local partnerships, community investment, social impact programs",
    icon: Heart,
    color: "#ef4444",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    borderColor: "border-red-200"
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const Icon = data.icon;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-[280px]">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5" style={{ color: data.color }} />
          <h3 className="font-medium text-gray-900">{data.subject}</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Current Score:</span>
            <span className="font-medium" style={{ color: data.color }}>{data.score}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Industry Benchmark:</span>
            <span className="font-medium text-gray-700">{data.benchmark}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Performance:</span>
            <span className={`font-medium ${data.score > data.benchmark ? 'text-green-600' : 'text-orange-600'}`}>
              {data.score > data.benchmark ? 'Above Average' : 'Below Average'}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-2 border-t pt-2">{data.description}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function ESGComponentBreakdownChart() {
  const overallScore = (esgData.reduce((sum, item) => sum + item.score, 0) / esgData.length).toFixed(1);
  const benchmarkScore = (esgData.reduce((sum, item) => sum + item.benchmark, 0) / esgData.length).toFixed(1);
  const outperformingAreas = esgData.filter(item => item.score > item.benchmark).length;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="mobile-text-lg">ESG Component Analysis</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 mobile-text-sm text-gray-600 text-center">
          Detailed breakdown of Environmental, Social, and Governance performance across 6 key dimensions 
          with industry benchmark comparisons and improvement opportunities.
        </div>
        
        <div className="mobile-grid-3 mobile-gap-2 mb-6">
          <div className="text-center mobile-p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="mobile-text-xl font-bold text-green-600">{overallScore}</span>
              <span className="text-base sm:text-lg text-green-500">/10</span>
            </div>
            <p className="mobile-text-sm text-green-800 font-medium">Overall ESG Score</p>
            <p className="text-xs text-green-600">Portfolio average</p>
          </div>
          <div className="text-center mobile-p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="mobile-text-xl font-bold text-blue-600">{benchmarkScore}</span>
              <span className="text-base sm:text-lg text-blue-500">/10</span>
            </div>
            <p className="mobile-text-sm text-blue-800 font-medium">Industry Benchmark</p>
            <p className="text-xs text-blue-600">Sector average</p>
          </div>
          <div className="text-center mobile-p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="mobile-text-xl font-bold text-purple-600">{outperformingAreas}</span>
              <span className="text-base sm:text-lg text-purple-500">/6</span>
            </div>
            <p className="mobile-text-sm text-purple-800 font-medium">Leading Areas</p>
            <p className="text-xs text-purple-600">Above benchmark</p>
          </div>
        </div>

        <div className="mobile-grid-1 lg:grid-cols-2 mobile-gap-4 mb-6">
          <div className="chart-container flex flex-col items-center">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base text-center">ESG Performance Radar</h4>
            <ResponsiveContainer width="100%" height={280} className="chart-card-mobile sm:h-[300px] lg:h-[320px]">
              <RadarChart data={esgData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 10, fill: '#374151' }}
                  className="mobile-text-xs"
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 10]} 
                  tick={{ fontSize: 8, fill: '#6b7280' }}
                  className="mobile-text-xs"
                />
                <Radar
                  name="Our Score"
                  dataKey="score"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.25}
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="benchmark"
                  stroke="#94a3b8"
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#94a3b8', strokeWidth: 2, r: 3 }}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container flex flex-col items-center">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base text-center">Performance vs Benchmark</h4>
            <ResponsiveContainer width="100%" height={280} className="chart-card-mobile sm:h-[300px] lg:h-[320px]">
              <BarChart data={esgData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 9 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  className="mobile-text-xs"
                />
                <YAxis 
                  domain={[6, 10]}
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'Score', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                  className="mobile-text-xs"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="benchmark" 
                  fill="#e2e8f0" 
                  name="Industry Benchmark"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="score" 
                  fill="#22c55e" 
                  name="Our Score"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mobile-grid-3 mobile-gap-2 mb-6">
          {esgData.map((item, index) => {
            const Icon = item.icon;
            const isAboveBenchmark = item.score > item.benchmark;
            const difference = (item.score - item.benchmark).toFixed(1);
            
            return (
              <div key={index} className={`p-4 rounded-lg border ${item.bgColor} ${item.borderColor}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${item.textColor}`} />
                    <span className="font-medium text-gray-900">{item.subject}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${item.textColor}`}>{item.score}</span>
                    <span className="text-sm text-gray-500">/10</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">vs Benchmark:</span>
                    <span className={`font-medium ${isAboveBenchmark ? 'text-green-600' : 'text-orange-600'}`}>
                      {isAboveBenchmark ? '+' : ''}{difference}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{ 
                        width: `${(item.score / 10) * 100}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-green-600" />
            ESG Performance Insights
          </h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Strengths:</strong> Innovation ({esgData[4].score}/10) and Environmental ({esgData[0].score}/10) leading performance
            </p>
            <p>
              <strong>Opportunities:</strong> Community engagement area shows potential for +{(10 - esgData[5].score).toFixed(1)} improvement
            </p>
            <p>
              <strong>Competitive Position:</strong> Outperforming industry benchmark in {outperformingAreas}/6 categories
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}