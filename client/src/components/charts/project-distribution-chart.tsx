import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { PieChart as PieChartIcon, TrendingUp, DollarSign, Zap } from "lucide-react";
import { useCurrencyFormat } from "@/hooks/use-currency-format";

const portfolioData = [
  { 
    name: "Solar", 
    projects: 12, 
    capacity: 145.8, 
    investment: 487.5,
    avgIRR: 16.2,
    color: "#f59e0b",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600"
  },
  { 
    name: "Wind", 
    projects: 8, 
    capacity: 98.4, 
    investment: 324.2,
    avgIRR: 14.8,
    color: "#3b82f6",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  { 
    name: "Hydro", 
    projects: 5, 
    capacity: 67.2, 
    investment: 198.7,
    avgIRR: 18.1,
    color: "#06b6d4",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600"
  },
  { 
    name: "Biomass", 
    projects: 3, 
    capacity: 22.5, 
    investment: 87.3,
    avgIRR: 13.4,
    color: "#22c55e",
    iconBg: "bg-green-50",
    iconColor: "text-green-600"
  },
  { 
    name: "Geothermal", 
    projects: 2, 
    capacity: 15.1, 
    investment: 64.8,
    avgIRR: 15.7,
    color: "#ef4444",
    iconBg: "bg-red-50",
    iconColor: "text-red-600"
  },
];

const CustomTooltip = ({ active, payload, convertAndFormat }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-[200px] mobile-tooltip">
        <h3 className="font-medium text-gray-900 mb-3">{data.name} Projects</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Projects:</span>
            <span className="font-medium">{data.projects}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Capacity:</span>
            <span className="font-medium">{data.capacity} MW</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Investment:</span>
            <span className="font-medium">{convertAndFormat ? convertAndFormat(data.investment * 1000000) : `₦${data.investment}M`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg IRR:</span>
            <span className="font-medium text-green-600">{data.avgIRR}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
  
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="600"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ProjectDistributionChart() {
  const { convertAndFormat } = useCurrencyFormat();
  const totalProjects = portfolioData.reduce((sum, item) => sum + item.projects, 0);
  const totalCapacity = portfolioData.reduce((sum, item) => sum + item.capacity, 0);
  const totalInvestment = portfolioData.reduce((sum, item) => sum + item.investment, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center text-center">
          <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          <span className="mobile-text-lg">Portfolio Distribution Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 mobile-text-sm text-gray-600 text-center">
          Comprehensive breakdown of renewable energy portfolio across project types, showing distribution 
          by project count, capacity, and investment allocation.
        </div>
        
        <div className="mobile-grid-4 mobile-gap-2 mb-6">
          <div className="text-center mobile-p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <PieChartIcon className="w-4 h-4 text-blue-600" />
              <span className="mobile-text-2xl font-bold text-blue-600">{totalProjects}</span>
            </div>
            <p className="mobile-text-sm text-blue-800 font-medium">Total Projects</p>
            <p className="text-xs text-blue-600">Active portfolio</p>
          </div>
          <div className="text-center mobile-p-2 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="mobile-text-xl font-bold text-green-600">{totalCapacity.toFixed(0)}</span>
            </div>
            <p className="mobile-text-sm text-green-800 font-medium">Total Capacity</p>
            <p className="text-xs text-green-600">MW installed</p>
          </div>
          <div className="text-center mobile-p-2 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="mobile-text-xl font-bold text-purple-600">{convertAndFormat(totalInvestment * 1000000)}</span>
            </div>
            <p className="mobile-text-sm text-purple-800 font-medium">Total Investment</p>
            <p className="text-xs text-purple-600">Capital deployed</p>
          </div>
          <div className="text-center mobile-p-2 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              <span className="mobile-text-xl font-bold text-orange-600">
                {(portfolioData.reduce((sum, item) => sum + (item.avgIRR * item.investment), 0) / totalInvestment).toFixed(1)}%
              </span>
            </div>
            <p className="mobile-text-sm text-orange-800 font-medium">Weighted IRR</p>
            <p className="text-xs text-orange-600">Portfolio average</p>
          </div>
        </div>

        <div className="mobile-grid-1 lg:grid-cols-2 mobile-gap-4">
          <div className="chart-container flex flex-col items-center">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base text-center">Distribution by Project Count</h4>
            <ResponsiveContainer width="100%" height={250} className="chart-card-mobile sm:h-[280px]">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="projects"
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={(props) => <CustomTooltip {...props} convertAndFormat={convertAndFormat} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container flex flex-col items-center">
            <h4 className="font-medium text-gray-900 mb-4 mobile-text-base text-center">Performance by Technology</h4>
            <ResponsiveContainer width="100%" height={250} className="chart-card-mobile sm:h-[280px]">
              <BarChart data={portfolioData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  className="mobile-text-xs"
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'IRR (%)', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                  className="mobile-text-xs"
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Average IRR']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px' 
                  }}
                />
                <Bar 
                  dataKey="avgIRR" 
                  radius={[4, 4, 0, 0]}
                  fill="#8b5cf6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 mobile-grid-5 mobile-gap-2">
          {portfolioData.map((item, index) => (
            <div key={index} className={`p-3 rounded-lg border ${item.iconBg} border-gray-200`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{item.name}</span>
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Projects:</span>
                  <span className="font-medium">{item.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="font-medium">{item.capacity} MW</span>
                </div>
                <div className="flex justify-between">
                  <span>IRR:</span>
                  <span className="font-medium text-green-600">{item.avgIRR}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Portfolio Insights
          </h4>
          <div className="text-sm text-gray-700">
            <p className="mb-1">
              <strong>Diversification:</strong> Well-balanced portfolio across 5 renewable technologies
            </p>
            <p className="mb-1">
              <strong>Performance Leader:</strong> Hydro projects show highest average IRR at 18.1%
            </p>
            <p>
              <strong>Growth Opportunity:</strong> Solar dominates with {((portfolioData[0].projects / totalProjects) * 100).toFixed(0)}% of projects, indicating strong market confidence
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}