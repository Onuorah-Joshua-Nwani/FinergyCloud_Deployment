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
        <div className="space-y-6">
          {/* Simple Progress Bars for Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Environmental</span>
                <span className="text-lg font-bold text-green-600">{data[data.length - 1]?.environmental}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${(data[data.length - 1]?.environmental / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Social</span>
                <span className="text-lg font-bold text-blue-600">{data[data.length - 1]?.social}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${(data[data.length - 1]?.social / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Governance</span>
                <span className="text-lg font-bold text-purple-600">{data[data.length - 1]?.governance}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${(data[data.length - 1]?.governance / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall ESG</span>
                <span className="text-lg font-bold text-gray-800">{data[data.length - 1]?.overall}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gray-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${(data[data.length - 1]?.overall / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Trend Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {data.slice(-4).map((item, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">{item.month}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>E:</span><span className="font-medium text-green-600">{item.environmental}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>S:</span><span className="font-medium text-blue-600">{item.social}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>G:</span><span className="font-medium text-purple-600">{item.governance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}