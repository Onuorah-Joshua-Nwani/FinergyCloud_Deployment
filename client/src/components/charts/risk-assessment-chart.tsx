import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { category: "Market Risk", low: 15, medium: 8, high: 2 },
  { category: "Technology Risk", low: 12, medium: 10, high: 3 },
  { category: "Regulatory Risk", low: 18, medium: 5, high: 2 },
  { category: "Financial Risk", low: 14, medium: 9, high: 2 },
  { category: "Operational Risk", low: 16, medium: 7, high: 2 },
];

export default function RiskAssessmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Assessment by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="low" stackId="a" fill="hsl(var(--success))" name="Low Risk" />
            <Bar dataKey="medium" stackId="a" fill="hsl(var(--warning))" name="Medium Risk" />
            <Bar dataKey="high" stackId="a" fill="hsl(var(--destructive))" name="High Risk" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}