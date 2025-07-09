import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", environmental: 8.2, social: 7.8, governance: 8.0, overall: 8.0 },
  { month: "Feb", environmental: 8.3, social: 7.9, governance: 8.1, overall: 8.1 },
  { month: "Mar", environmental: 8.5, social: 8.0, governance: 8.2, overall: 8.2 },
  { month: "Apr", environmental: 8.6, social: 8.1, governance: 8.3, overall: 8.3 },
  { month: "May", environmental: 8.7, social: 8.1, governance: 8.4, overall: 8.4 },
  { month: "Jun", environmental: 8.7, social: 8.1, governance: 8.4, overall: 8.4 },
];

export default function ESGScoreTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ESG Score Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[7.5, 9]} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="environmental" 
              stroke="hsl(var(--secondary))" 
              strokeWidth={2}
              name="Environmental"
            />
            <Line 
              type="monotone" 
              dataKey="social" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Social"
            />
            <Line 
              type="monotone" 
              dataKey="governance" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              name="Governance"
            />
            <Line 
              type="monotone" 
              dataKey="overall" 
              stroke="hsl(var(--foreground))" 
              strokeWidth={3}
              name="Overall"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}