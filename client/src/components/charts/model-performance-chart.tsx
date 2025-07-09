import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { epoch: 1, training: 0.65, validation: 0.62, auc: 0.68 },
  { epoch: 2, training: 0.72, validation: 0.70, auc: 0.74 },
  { epoch: 3, training: 0.78, validation: 0.75, auc: 0.79 },
  { epoch: 4, training: 0.83, validation: 0.80, auc: 0.84 },
  { epoch: 5, training: 0.86, validation: 0.83, auc: 0.87 },
  { epoch: 6, training: 0.89, validation: 0.85, auc: 0.90 },
  { epoch: 7, training: 0.91, validation: 0.87, auc: 0.92 },
  { epoch: 8, training: 0.92, validation: 0.87, auc: 0.92 },
];

export default function ModelPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" />
            <YAxis domain={[0.5, 1]} />
            <Tooltip 
              formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, '']}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="training" 
              stackId="1"
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              name="Training Accuracy"
            />
            <Area 
              type="monotone" 
              dataKey="validation" 
              stackId="2"
              stroke="hsl(var(--secondary))" 
              fill="hsl(var(--secondary))"
              fillOpacity={0.3}
              name="Validation Accuracy"
            />
            <Area 
              type="monotone" 
              dataKey="auc" 
              stackId="3"
              stroke="hsl(var(--accent))" 
              fill="hsl(var(--accent))"
              fillOpacity={0.3}
              name="AUC Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}