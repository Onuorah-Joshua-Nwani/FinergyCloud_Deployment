import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Solar", value: 45, color: "hsl(var(--primary))" },
  { name: "Wind", value: 30, color: "hsl(var(--secondary))" },
  { name: "Hydro", value: 15, color: "hsl(var(--accent))" },
  { name: "Biomass", value: 8, color: "hsl(var(--warning))" },
  { name: "Geothermal", value: 2, color: "hsl(var(--muted-foreground))" },
];

export default function ProjectDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}