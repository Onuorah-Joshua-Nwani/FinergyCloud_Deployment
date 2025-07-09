import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";

const data = [
  { month: "Jan '24", totalValue: 95, irr: 14.2, esgScore: 8.0 },
  { month: "Feb '24", totalValue: 102, irr: 14.8, esgScore: 8.1 },
  { month: "Mar '24", totalValue: 108, irr: 15.1, esgScore: 8.2 },
  { month: "Apr '24", totalValue: 115, irr: 15.4, esgScore: 8.3 },
  { month: "May '24", totalValue: 118, irr: 15.6, esgScore: 8.4 },
  { month: "Jun '24", totalValue: 120, irr: 15.7, esgScore: 8.4 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}:</span>
            </div>
            <span className="font-medium text-gray-900">
              {entry.dataKey === 'totalValue' ? `₦${entry.value}M` : 
               entry.dataKey === 'irr' ? `${entry.value}%` : 
               `${entry.value}/10`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PortfolioPerformanceChart() {
  const growthRate = ((120 - 95) / 95 * 100).toFixed(1);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Portfolio Performance Overview
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-normal">+{growthRate}% Growth</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-sm text-gray-600">
          Track your renewable energy portfolio's total value, investment returns (IRR), and sustainability impact (ESG scores) over time.
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              yAxisId="left" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
              label={{ value: 'Value (₦M)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
              label={{ value: 'IRR (%) / ESG Score', angle: 90, position: 'insideRight' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="totalValue" 
              stroke="#16a34a" 
              strokeWidth={3}
              name="Total Value (₦M)"
              dot={{ fill: '#16a34a', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#16a34a', strokeWidth: 2 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="irr" 
              stroke="#2563eb" 
              strokeWidth={2}
              name="Average IRR (%)"
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="esgScore" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="ESG Score"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-2 bg-green-50 rounded">
            <div className="text-sm text-gray-600">Current Value</div>
            <div className="font-semibold text-green-600">₦120M</div>
          </div>
          <div className="p-2 bg-blue-50 rounded">
            <div className="text-sm text-gray-600">Average IRR</div>
            <div className="font-semibold text-blue-600">15.7%</div>
          </div>
          <div className="p-2 bg-yellow-50 rounded">
            <div className="text-sm text-gray-600">ESG Score</div>
            <div className="font-semibold text-yellow-600">8.4/10</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}