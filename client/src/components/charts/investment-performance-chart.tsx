import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Area, AreaChart } from "recharts";
import { TrendingUp, DollarSign, BarChart3, Target, AlertCircle } from "lucide-react";
import { useCurrencyFormat } from "@/hooks/use-currency-format";

const performanceData = [
  { 
    period: "Q1 2024", 
    investment: 126.5, 
    returns: 89.2, 
    irr: 14.2, 
    projects: 8,
    cumulativeROI: 6.8,
    operationalProjects: 5,
    pipelineValue: 45.3
  },
  { 
    period: "Q2 2024", 
    investment: 189.3, 
    returns: 156.7, 
    irr: 15.1, 
    projects: 12,
    cumulativeROI: 12.4,
    operationalProjects: 9,
    pipelineValue: 67.8
  },
  { 
    period: "Q3 2024", 
    investment: 267.8, 
    returns: 234.5, 
    irr: 15.8, 
    projects: 18,
    cumulativeROI: 18.9,
    operationalProjects: 14,
    pipelineValue: 89.4
  },
  { 
    period: "Q4 2024", 
    investment: 342.1, 
    returns: 319.6, 
    irr: 16.3, 
    projects: 24,
    cumulativeROI: 24.7,
    operationalProjects: 19,
    pipelineValue: 112.8
  },
  { 
    period: "Q1 2025", 
    investment: 398.7, 
    returns: 389.4, 
    irr: 16.8, 
    projects: 30,
    cumulativeROI: 29.2,
    operationalProjects: 25,
    pipelineValue: 134.2
  }
];

const CustomTooltip = ({ active, payload, label, convertAndFormat }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-[240px] mobile-tooltip">
        <h3 className="font-medium text-gray-900 mb-3">{label}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Investment:</span>
            <span className="font-medium">{convertAndFormat(data.investment * 1000000)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Returns:</span>
            <span className="font-medium text-green-600">{convertAndFormat(data.returns * 1000000)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">IRR:</span>
            <span className="font-medium text-blue-600">{data.irr}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Active Projects:</span>
            <span className="font-medium">{data.projects}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cumulative ROI:</span>
            <span className="font-medium text-purple-600">{data.cumulativeROI}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function InvestmentPerformanceChart() {
  const { convertAndFormat } = useCurrencyFormat();
  const latestData = performanceData[performanceData.length - 1];
  const previousData = performanceData[performanceData.length - 2];
  const growthRate = ((latestData.returns - previousData.returns) / previousData.returns * 100).toFixed(1);
  const totalReturns = latestData.returns;
  const totalInvestment = latestData.investment;
  const netGain = totalReturns - totalInvestment;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="mobile-text-lg">Investment Performance Analytics</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 mobile-text-sm text-gray-600 text-center">
          Quarterly performance tracking showing investment flows, returns, and key performance indicators 
          across the renewable energy portfolio with trend analysis.
        </div>
        
        <div className="mobile-grid-5 mobile-gap-2 mb-6">
          <div className="text-center mobile-p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="mobile-text-base font-bold text-blue-600">{convertAndFormat(totalInvestment * 1000000)}</span>
            </div>
            <p className="mobile-text-sm text-blue-800 font-medium">Total Investment</p>
            <p className="text-xs text-blue-600">Millions deployed</p>
          </div>
          <div className="text-center mobile-p-2 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="mobile-text-base font-bold text-green-600">{convertAndFormat(totalReturns * 1000000)}</span>
            </div>
            <p className="mobile-text-sm text-green-800 font-medium">Total Returns</p>
            <p className="text-xs text-green-600">Millions generated</p>
          </div>
          <div className="text-center mobile-p-2 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="mobile-text-base font-bold text-purple-600">{latestData.irr}%</span>
            </div>
            <p className="mobile-text-sm text-purple-800 font-medium">Current IRR</p>
            <p className="text-xs text-purple-600">Internal rate of return</p>
          </div>
          <div className="text-center mobile-p-2 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              <span className="mobile-text-base font-bold text-orange-600">+{growthRate}%</span>
            </div>
            <p className="mobile-text-sm text-orange-800 font-medium">Growth Rate</p>
            <p className="text-xs text-orange-600">Quarter-over-quarter</p>
          </div>
          <div className="text-center mobile-p-2 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              <span className="mobile-text-base font-bold text-gray-600">{latestData.projects}</span>
            </div>
            <p className="mobile-text-sm text-gray-800 font-medium">Active Projects</p>
            <p className="text-xs text-gray-600">Portfolio size</p>
          </div>
        </div>

        <div className="mobile-grid-1 lg:grid-cols-2 mobile-gap-4 mb-6">
          <div className="chart-container flex flex-col items-center">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base text-center">Investment vs Returns Trend</h4>
            <ResponsiveContainer width="100%" height={280} className="chart-card-mobile sm:h-[300px] lg:h-[320px]">
              <ComposedChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="period" 
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  className="mobile-text-xs"
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ value: `Amount`, angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                  className="mobile-text-xs"
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'IRR (%)', angle: 90, position: 'insideRight', style: { fontSize: '10px' } }}
                  className="mobile-text-xs"
                />
                <Tooltip content={(props) => <CustomTooltip {...props} convertAndFormat={convertAndFormat} />} />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="investment" 
                  fill="#3b82f6" 
                  name="Investment"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  yAxisId="left"
                  dataKey="returns" 
                  fill="#10b981" 
                  name="Returns"
                  radius={[2, 2, 0, 0]}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="irr" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                  name="IRR (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base">Cumulative ROI Growth</h4>
            <ResponsiveContainer width="100%" height={280} className="chart-card-mobile">
              <AreaChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="period" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Cumulative ROI']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeROI" 
                  stroke="#f59e0b" 
                  fill="#f59e0b"
                  fillOpacity={0.3}
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Performance Highlights
            </h4>
            <div className="space-y-2 text-sm text-green-800">
              <div className="flex justify-between">
                <span>Net Gain:</span>
                <span className="font-medium">₦{netGain.toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-medium">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Project Size:</span>
                <span className="font-medium">₦{(totalInvestment / latestData.projects).toFixed(1)}M</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Portfolio Metrics
            </h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Operational:</span>
                <span className="font-medium">{latestData.operationalProjects} projects</span>
              </div>
              <div className="flex justify-between">
                <span>Pipeline Value:</span>
                <span className="font-medium">₦{latestData.pipelineValue}M</span>
              </div>
              <div className="flex justify-between">
                <span>Capacity Factor:</span>
                <span className="font-medium">87.3%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Risk Assessment
            </h4>
            <div className="space-y-2 text-sm text-purple-800">
              <div className="flex justify-between">
                <span>Portfolio Risk:</span>
                <span className="font-medium text-green-600">Low</span>
              </div>
              <div className="flex justify-between">
                <span>Volatility:</span>
                <span className="font-medium">±2.4%</span>
              </div>
              <div className="flex justify-between">
                <span>Sharpe Ratio:</span>
                <span className="font-medium">1.87</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Investment Insights & Outlook
          </h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Strong Performance:</strong> Portfolio delivering consistent {latestData.irr}% IRR with {growthRate}% quarterly growth
            </p>
            <p>
              <strong>Capital Efficiency:</strong> {((totalReturns / totalInvestment - 1) * 100).toFixed(1)}% return on invested capital with low volatility
            </p>
            <p>
              <strong>Future Outlook:</strong> Pipeline value of ₦{latestData.pipelineValue}M indicates strong growth potential for 2025
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}