import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

const data = [
  { subject: "Environmental", score: 8.7, fullMark: 10 },
  { subject: "Social", score: 8.1, fullMark: 10 },
  { subject: "Governance", score: 8.4, fullMark: 10 },
  { subject: "Transparency", score: 8.2, fullMark: 10 },
  { subject: "Innovation", score: 8.6, fullMark: 10 },
  { subject: "Community", score: 7.9, fullMark: 10 },
];

export default function ESGComponentBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ESG Component Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 10]} 
              tick={false}
            />
            <Radar
              name="ESG Score"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}