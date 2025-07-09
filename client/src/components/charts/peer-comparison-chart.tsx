import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, Trophy, TrendingUp, Crown, Target } from "lucide-react";

const peerData = [
  { 
    company: "FinergyCloud", 
    environmental: 8.7, 
    social: 8.1, 
    governance: 8.4, 
    overall: 8.4,
    marketCap: 2.8,
    projects: 30,
    rank: 1,
    trend: "up",
    color: "#22c55e",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  { 
    company: "GreenTech A", 
    environmental: 8.2, 
    social: 7.8, 
    governance: 8.0, 
    overall: 8.0,
    marketCap: 2.1,
    projects: 24,
    rank: 3,
    trend: "stable",
    color: "#3b82f6",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  { 
    company: "SolarCorp B", 
    environmental: 8.5, 
    social: 7.9, 
    governance: 7.7, 
    overall: 8.0,
    marketCap: 1.9,
    projects: 18,
    rank: 4,
    trend: "down",
    color: "#f59e0b",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  },
  { 
    company: "WindPower C", 
    environmental: 8.1, 
    social: 8.3, 
    governance: 8.2, 
    overall: 8.2,
    marketCap: 2.3,
    projects: 22,
    rank: 2,
    trend: "up",
    color: "#8b5cf6",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  { 
    company: "EcoEnergy D", 
    environmental: 7.9, 
    social: 8.0, 
    governance: 7.8, 
    overall: 7.9,
    marketCap: 1.6,
    projects: 15,
    rank: 5,
    trend: "stable",
    color: "#06b6d4",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200"
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const company = peerData.find(p => p.company === label);
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-[250px]">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          {company?.rank === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
          {label}
        </h3>
        <div className="space-y-2 text-sm">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-medium" style={{ color: entry.color }}>{entry.value}</span>
            </div>
          ))}
          {company && (
            <>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap:</span>
                  <span className="font-medium">₦{company.marketCap}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects:</span>
                  <span className="font-medium">{company.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rank:</span>
                  <span className="font-medium">#{company.rank}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function PeerComparisonChart() {
  const ourCompany = peerData.find(p => p.company === "FinergyCloud")!;
  const avgScore = (peerData.reduce((sum, p) => sum + p.overall, 0) / peerData.length).toFixed(1);
  const ourRank = ourCompany.rank;
  const topPerformer = peerData.find(p => p.rank === 1)!;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Industry Peer Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-sm text-gray-600">
          Comprehensive ESG performance comparison against leading renewable energy companies, 
          analyzing environmental, social, and governance metrics with market positioning insights.
        </div>
        
        <div className="mobile-grid-4 mobile-gap-2 mb-6">
          <div className="text-center mobile-p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Crown className="w-4 h-4 text-green-600" />
              <span className="mobile-text-xl font-bold text-green-600">#{ourRank}</span>
            </div>
            <p className="text-sm text-green-800 font-medium">Our Ranking</p>
            <p className="text-xs text-green-600">Industry position</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">{ourCompany.overall}</span>
            </div>
            <p className="text-sm text-blue-800 font-medium">Our Score</p>
            <p className="text-xs text-blue-600">ESG rating</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">{avgScore}</span>
            </div>
            <p className="text-sm text-purple-800 font-medium">Peer Average</p>
            <p className="text-xs text-purple-600">Industry mean</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-xl font-bold text-orange-600">+{(ourCompany.overall - parseFloat(avgScore)).toFixed(1)}</span>
            </div>
            <p className="text-sm text-orange-800 font-medium">vs Average</p>
            <p className="text-xs text-orange-600">Performance gap</p>
          </div>
        </div>

        <div className="mobile-grid-1 lg:grid-cols-2 mobile-gap-4 mb-6">
          <div className="chart-container">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base">ESG Component Comparison</h4>
            <ResponsiveContainer width="100%" height={320} className="chart-card-mobile">
              <BarChart 
                data={peerData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="company" 
                  tick={{ fontSize: 11 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  domain={[7, 9]}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'ESG Score', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="environmental" 
                  fill="#22c55e" 
                  name="Environmental"
                  radius={[1, 1, 0, 0]}
                />
                <Bar 
                  dataKey="social" 
                  fill="#3b82f6" 
                  name="Social"
                  radius={[1, 1, 0, 0]}
                />
                <Bar 
                  dataKey="governance" 
                  fill="#8b5cf6" 
                  name="Governance"
                  radius={[1, 1, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base">Overall ESG Performance</h4>
            <ResponsiveContainer width="100%" height={320} className="chart-card-mobile">
              <BarChart 
                data={peerData.sort((a, b) => b.overall - a.overall)} 
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="company" 
                  tick={{ fontSize: 11 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  domain={[7.5, 8.8]}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'Overall Score', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [value, 'Overall ESG Score']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px' 
                  }}
                />
                <Bar 
                  dataKey="overall" 
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mobile-grid-5 mobile-gap-2 mb-6">
          {peerData.sort((a, b) => a.rank - b.rank).map((company, index) => {
            const TrendIcon = company.trend === 'up' ? TrendingUp : 
                             company.trend === 'down' ? TrendingUp : Target;
            const trendColor = company.trend === 'up' ? 'text-green-600' : 
                              company.trend === 'down' ? 'text-red-600' : 'text-gray-600';
            
            return (
              <div key={index} className={`p-3 rounded-lg border ${company.bgColor} ${company.borderColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {company.rank === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
                    <span className="font-medium text-gray-900 text-sm">{company.company}</span>
                  </div>
                  <TrendIcon className={`w-4 h-4 ${trendColor} ${company.trend === 'down' ? 'rotate-180' : ''}`} />
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>ESG Score:</span>
                    <span className="font-medium" style={{ color: company.color }}>{company.overall}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Cap:</span>
                    <span className="font-medium">₦{company.marketCap}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rank:</span>
                    <span className="font-medium">#{company.rank}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-blue-600" />
            Competitive Analysis Insights
          </h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Market Leadership:</strong> FinergyCloud ranks #{ourRank} with {ourCompany.overall} ESG score, leading in environmental performance
            </p>
            <p>
              <strong>Competitive Advantage:</strong> +{(ourCompany.overall - parseFloat(avgScore)).toFixed(1)} points above industry average with strongest environmental and governance ratings
            </p>
            <p>
              <strong>Growth Opportunity:</strong> Social score improvement could strengthen overall market position against top peers
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}