import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { factor: "Carbon Footprint", impact: 9.2, improvement: 8.7 },
  { factor: "Energy Efficiency", impact: 8.8, improvement: 8.5 },
  { factor: "Community Engagement", impact: 8.1, improvement: 7.8 },
  { factor: "Board Diversity", impact: 8.4, improvement: 8.2 },
  { factor: "Risk Management", impact: 8.6, improvement: 8.4 },
  { factor: "Transparency", impact: 8.2, improvement: 8.0 },
];

export default function ESGFactorImpactChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ESG Factor Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="factor" />
            <YAxis domain={[7, 10]} />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="improvement" 
              stackId="1"
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              name="Current Score"
            />
            <Area 
              type="monotone" 
              dataKey="impact" 
              stackId="2"
              stroke="hsl(var(--secondary))" 
              fill="hsl(var(--secondary))"
              fillOpacity={0.3}
              name="Potential Impact"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}