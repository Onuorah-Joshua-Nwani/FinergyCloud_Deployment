import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan '24", environmental: 8.2, social: 7.8, governance: 8.0, overall: 8.0 },
  { month: "Feb '24", environmental: 8.3, social: 7.9, governance: 8.1, overall: 8.1 },
  { month: "Mar '24", environmental: 8.5, social: 8.0, governance: 8.2, overall: 8.2 },
  { month: "Apr '24", environmental: 8.6, social: 8.1, governance: 8.3, overall: 8.3 },
  { month: "May '24", environmental: 8.7, social: 8.1, governance: 8.4, overall: 8.4 },
  { month: "Jun '24", environmental: 8.7, social: 8.1, governance: 8.4, overall: 8.4 },
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
            <span className="font-medium text-gray-900">{entry.value}/10</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ESGScoreTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="mobile-text-lg">ESG Performance Trends</span>
          <span className="text-xs sm:text-sm font-normal text-gray-500">6-Month Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 mobile-text-sm text-gray-600 text-center">
          Track Environmental, Social, and Governance scores over time to identify improvement areas and monitor sustainability progress.
        </div>
        <div className="chart-container flex justify-center">
          <ResponsiveContainer width="100%" height={250} className="chart-card-mobile sm:h-[280px] lg:h-[300px]">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10 }}
              tickLine={{ stroke: '#d1d5db' }}
              className="mobile-text-xs"
            />
            <YAxis 
              domain={[7.5, 9]} 
              tick={{ fontSize: 10 }}
              tickLine={{ stroke: '#d1d5db' }}
              label={{ value: 'ESG Score', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
              className="mobile-text-xs"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
              iconType="circle"
              className="mobile-text-xs"
            />
            <Line 
              type="monotone" 
              dataKey="environmental" 
              stroke="#16a34a" 
              strokeWidth={2}
              name="Environmental"
              dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="social" 
              stroke="#2563eb" 
              strokeWidth={2}
              name="Social"
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="governance" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Governance"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="overall" 
              stroke="#1f2937" 
              strokeWidth={3}
              name="Overall ESG"
              dot={{ fill: '#1f2937', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#1f2937', strokeWidth: 2 }}
            />
          </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}