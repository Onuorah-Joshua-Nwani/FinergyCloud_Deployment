import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { quarter: "Q1 2024", investment: 25, returns: 18, irr: 14.2, projects: 3 },
  { quarter: "Q2 2024", investment: 35, returns: 28, irr: 15.1, projects: 5 },
  { quarter: "Q3 2024", investment: 42, returns: 35, irr: 15.4, projects: 7 },
  { quarter: "Q4 2024", investment: 48, returns: 42, irr: 15.7, projects: 8 },
];

export default function InvestmentPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="investment" 
              fill="hsl(var(--primary))" 
              name="Investment (₦M)"
            />
            <Bar 
              yAxisId="left"
              dataKey="returns" 
              fill="hsl(var(--secondary))" 
              name="Returns (₦M)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="irr" 
              stroke="hsl(var(--accent))" 
              strokeWidth={3}
              name="IRR (%)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}