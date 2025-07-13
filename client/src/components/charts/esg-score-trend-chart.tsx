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
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 40, left: 60, bottom: 80 }}>
              <defs>
                <linearGradient id="environmentalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="socialGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="governanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#374151' }}
                tickLine={{ stroke: '#d1d5db' }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[6, 10]} 
                tick={{ fontSize: 12, fill: '#374151' }}
                tickLine={{ stroke: '#d1d5db' }}
                tickFormatter={(value) => Number(value).toFixed(1)}
                label={{ value: 'ESG Score', angle: -90, position: 'insideLeft', style: { fontSize: '12px', textAnchor: 'middle' } }}
                width={50}
              />
            <Tooltip 
              content={<CustomTooltip />} 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                fontSize: '13px'
              }}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '25px', 
                fontSize: '13px', 
                fontWeight: 500,
                color: '#374151'
              }}
              iconType="circle"
            />
            <Line 
              type="monotone" 
              dataKey="environmental" 
              stroke="#10b981" 
              strokeWidth={3.5}
              name="Environmental"
              dot={{ fill: '#ffffff', stroke: '#10b981', strokeWidth: 3, r: 5 }}
              activeDot={{ r: 7, stroke: '#10b981', strokeWidth: 3, fill: '#10b981' }}
            />
            <Line 
              type="monotone" 
              dataKey="social" 
              stroke="#3b82f6" 
              strokeWidth={3.5}
              name="Social"
              dot={{ fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 3, r: 5 }}
              activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 3, fill: '#3b82f6' }}
            />
            <Line 
              type="monotone" 
              dataKey="governance" 
              stroke="#8b5cf6" 
              strokeWidth={3.5}
              name="Governance"
              dot={{ fill: '#ffffff', stroke: '#8b5cf6', strokeWidth: 3, r: 5 }}
              activeDot={{ r: 7, stroke: '#8b5cf6', strokeWidth: 3, fill: '#8b5cf6' }}
            />
            <Line 
              type="monotone" 
              dataKey="overall" 
              stroke="#1e293b" 
              strokeWidth={4}
              strokeDasharray="8 4"
              name="Overall ESG"
              dot={{ fill: '#ffffff', stroke: '#1e293b', strokeWidth: 3, r: 6 }}
              activeDot={{ r: 8, stroke: '#1e293b', strokeWidth: 3, fill: '#1e293b' }}
            />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}