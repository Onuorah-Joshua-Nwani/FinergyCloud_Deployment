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
        <CardTitle className="flex items-center gap-2 text-sm sm:text-base font-semibold">
          <Users className="w-4 h-4 text-blue-600" />
          Industry Peer Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
          Comprehensive ESG performance comparison against leading renewable energy companies, 
          analyzing environmental, social, and governance metrics with market positioning insights.
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <div className="text-center p-4 lg:p-5 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-xl border-2 border-green-200 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-green-600" />
              <span className="text-xl lg:text-2xl font-bold text-green-600">#{ourRank}</span>
            </div>
            <p className="text-sm lg:text-base text-green-800 font-semibold mb-1">Our Ranking</p>
            <p className="text-xs text-green-600">Industry Position</p>
          </div>
          <div className="text-center p-4 lg:p-5 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-xl border-2 border-blue-200 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-xl lg:text-2xl font-bold text-blue-600">{ourCompany.overall}</span>
              <span className="text-sm text-blue-500">/10</span>
            </div>
            <p className="text-sm lg:text-base text-blue-800 font-semibold mb-1">Our ESG Score</p>
            <p className="text-xs text-blue-600">Current Rating</p>
          </div>
          <div className="text-center p-4 lg:p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="text-xl lg:text-2xl font-bold text-purple-600">{avgScore}</span>
              <span className="text-sm text-purple-500">/10</span>
            </div>
            <p className="text-sm lg:text-base text-purple-800 font-semibold mb-1">Industry Average</p>
            <p className="text-xs text-purple-600">Peer Benchmark</p>
          </div>
          <div className="text-center p-4 lg:p-5 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 rounded-xl border-2 border-orange-200 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <span className="text-xl lg:text-2xl font-bold text-orange-600">+{(ourCompany.overall - parseFloat(avgScore)).toFixed(1)}</span>
              <span className="text-sm text-orange-500">pts</span>
            </div>
            <p className="text-sm lg:text-base text-orange-800 font-semibold mb-1">Above Average</p>
            <p className="text-xs text-orange-600">Performance Lead</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="chart-container">
            <h4 className="font-medium text-gray-900 mb-6 text-sm text-center">ESG Component Comparison</h4>
            <ResponsiveContainer width="100%" height={350} className="sm:h-[400px] lg:h-[420px]">
              <BarChart 
                data={peerData} 
                margin={{ top: 20, right: 30, left: 50, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="company" 
                  tick={{ fontSize: 11, fill: '#374151' }}
                  angle={-30}
                  textAnchor="end"
                  height={60}
                  interval={0}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[6, 10]}
                  tick={{ fontSize: 11, fill: '#374151' }}
                  tickLine={{ stroke: '#d1d5db' }}
                  tickFormatter={(value) => Number(value).toFixed(1)}
                  label={{ value: 'ESG Score', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }}
                  width={40}
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
            <h4 className="font-medium text-gray-900 mb-6 text-sm text-center">Overall ESG Performance</h4>
            <ResponsiveContainer width="100%" height={350} className="sm:h-[400px] lg:h-[420px]">
              <BarChart 
                data={peerData.sort((a, b) => b.overall - a.overall)} 
                margin={{ top: 20, right: 30, left: 50, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="company" 
                  tick={{ fontSize: 8 }}
                  angle={-30}
                  textAnchor="end"
                  height={90}
                  interval={0}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[7.5, 8.8]}
                  tick={{ fontSize: 8 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  tickFormatter={(value) => Number(value).toFixed(1)}
                  label={{ value: 'Overall Score', angle: -90, position: 'insideLeft', style: { fontSize: '8px', textAnchor: 'middle' } }}
                  width={55}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {peerData.sort((a, b) => a.rank - b.rank).map((company, index) => {
            const TrendIcon = company.trend === 'up' ? TrendingUp : 
                             company.trend === 'down' ? TrendingUp : Target;
            const trendColor = company.trend === 'up' ? 'text-green-600' : 
                              company.trend === 'down' ? 'text-red-600' : 'text-gray-600';
            
            return (
              <div key={index} className={`p-4 rounded-xl border-2 ${company.bgColor} ${company.borderColor} shadow-sm hover:shadow-md transition-all duration-200`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {company.rank === 1 && <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />}
                    <span className="font-semibold text-gray-900 text-sm lg:text-base truncate">{company.company}</span>
                  </div>
                  <TrendIcon className={`w-4 h-4 flex-shrink-0 ${trendColor} ${company.trend === 'down' ? 'rotate-180' : ''}`} />
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: company.color }}>
                    {company.overall}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">ESG Score</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                    <span className="font-medium">#{company.rank}</span>
                    <span>•</span>
                    <span>₦{company.marketCap}B</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Market Cap:</span>
                    <span className="font-medium text-gray-800">₦{company.marketCap}B</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rank:</span>
                    <span className="font-medium text-gray-800">#{company.rank}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        company.rank <= 2 ? 'bg-green-100 text-green-700' : 
                        company.rank <= 4 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {company.rank <= 2 ? 'Top Performer' : company.rank <= 4 ? 'Good' : 'Average'}
                      </span>
                    </div>
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