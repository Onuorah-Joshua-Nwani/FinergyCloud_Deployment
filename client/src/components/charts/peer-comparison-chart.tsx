import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { company: "FinergyCloud", environmental: 8.7, social: 8.1, governance: 8.4, overall: 8.4 },
  { company: "GreenTech A", environmental: 8.2, social: 7.8, governance: 8.0, overall: 8.0 },
  { company: "SolarCorp B", environmental: 8.5, social: 7.9, governance: 7.7, overall: 8.0 },
  { company: "WindPower C", environmental: 8.1, social: 8.3, governance: 8.2, overall: 8.2 },
  { company: "EcoEnergy D", environmental: 7.9, social: 8.0, governance: 7.8, overall: 7.9 },
];

export default function PeerComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Peer Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="company" />
            <YAxis domain={[7, 9]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="environmental" fill="hsl(var(--secondary))" name="Environmental" />
            <Bar dataKey="social" fill="hsl(var(--primary))" name="Social" />
            <Bar dataKey="governance" fill="hsl(var(--accent))" name="Governance" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}