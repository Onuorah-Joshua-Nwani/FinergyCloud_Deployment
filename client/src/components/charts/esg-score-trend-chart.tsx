import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Project } from "@shared/schema";

interface ESGScoreTrendChartProps {
  selectedProjectId: string;
  projects?: Project[];
}

// Generate project-specific ESG trend data
const generateTrendData = (selectedProjectId: string, projects?: Project[]) => {
  const selectedProject = projects?.find(p => p.id.toString() === selectedProjectId);
  
  // Base portfolio data
  const portfolioData = [
    { month: "Jan '24", environmental: 8.2, social: 7.8, governance: 8.0, overall: 8.0 },
    { month: "Feb '24", environmental: 8.3, social: 7.9, governance: 8.1, overall: 8.1 },
    { month: "Mar '24", environmental: 8.5, social: 8.0, governance: 8.2, overall: 8.2 },
    { month: "Apr '24", environmental: 8.6, social: 8.1, governance: 8.3, overall: 8.3 },
    { month: "May '24", environmental: 8.7, social: 8.1, governance: 8.4, overall: 8.4 },
    { month: "Jun '24", environmental: 8.7, social: 8.1, governance: 8.4, overall: 8.4 },
  ];

  if (selectedProjectId === "all" || !selectedProject) {
    return portfolioData;
  }

  // Generate project-specific data based on project type
  const projectTypeMultipliers = {
    solar: { environmental: 1.05, social: 0.95, governance: 1.02 },
    wind: { environmental: 1.03, social: 1.08, governance: 0.98 },
    hydro: { environmental: 0.98, social: 1.05, governance: 1.05 },
    geothermal: { environmental: 1.02, social: 0.92, governance: 1.08 },
    biomass: { environmental: 0.95, social: 1.12, governance: 0.95 }
  };

  const multiplier = projectTypeMultipliers[selectedProject.type as keyof typeof projectTypeMultipliers] || 
                   { environmental: 1.0, social: 1.0, governance: 1.0 };

  return portfolioData.map(data => ({
    ...data,
    environmental: Math.min(10, Math.max(6, data.environmental * multiplier.environmental)),
    social: Math.min(10, Math.max(6, data.social * multiplier.social)),
    governance: Math.min(10, Math.max(6, data.governance * multiplier.governance)),
    overall: Math.min(10, Math.max(6, 
      (data.environmental * multiplier.environmental + 
       data.social * multiplier.social + 
       data.governance * multiplier.governance) / 3
    ))
  }));
};

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
            <span className="font-medium text-gray-900">{Number(entry.value).toFixed(1)}/10</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ESGScoreTrendChart({ selectedProjectId, projects }: ESGScoreTrendChartProps) {
  const data = generateTrendData(selectedProjectId, projects);
  const selectedProject = projects?.find(p => p.id.toString() === selectedProjectId);
  const projectName = selectedProjectId === "all" ? "Portfolio" : selectedProject?.name || "Selected Project";
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          <span className="text-sm sm:text-base lg:text-lg font-semibold">ESG Performance Trends</span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-xs sm:text-sm font-medium text-gray-700">{projectName}</span>
            <span className="text-xs font-normal text-gray-500">6-Month Overview</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
          {selectedProjectId === "all" ? 
            "Track Environmental, Social, and Governance scores across your entire project portfolio over time." :
            `Monitor ${selectedProject?.type || 'project'} ESG performance trends to identify improvement areas and sustainability progress.`
          }
        </div>
        <div className="chart-container flex justify-center">
          <ResponsiveContainer width="100%" height={380} className="sm:h-[400px] lg:h-[450px] xl:h-[480px]">
          <LineChart data={data} margin={{ top: 50, right: 40, left: 70, bottom: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 8 }}
              tickLine={{ stroke: '#d1d5db' }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={70}
              label={{ value: 'Month', position: 'insideBottom', offset: -5, style: { fontSize: '8px', textAnchor: 'middle' } }}
            />
            <YAxis 
              domain={[6, 10]} 
              tick={{ fontSize: 8 }}
              tickLine={{ stroke: '#d1d5db' }}
              tickFormatter={(value) => Number(value).toFixed(1)}
              label={{ value: 'ESG Score', angle: -90, position: 'insideLeft', style: { fontSize: '8px', textAnchor: 'middle' } }}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '30px', fontSize: '10px' }}
              iconType="circle"
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
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="Governance"
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 3 }}
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