import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", totalValue: 95, irr: 14.2, esgScore: 8.0 },
  { month: "Feb", totalValue: 102, irr: 14.8, esgScore: 8.1 },
  { month: "Mar", totalValue: 108, irr: 15.1, esgScore: 8.2 },
  { month: "Apr", totalValue: 115, irr: 15.4, esgScore: 8.3 },
  { month: "May", totalValue: 118, irr: 15.6, esgScore: 8.4 },
  { month: "Jun", totalValue: 120, irr: 15.7, esgScore: 8.4 },
];

export default function PortfolioPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="totalValue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              name="Total Value (₦M)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="irr" 
              stroke="hsl(var(--secondary))" 
              strokeWidth={2}
              name="Average IRR (%)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="esgScore" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              name="ESG Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}