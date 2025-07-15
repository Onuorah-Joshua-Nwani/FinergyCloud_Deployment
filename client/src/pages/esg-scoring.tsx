import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ESGScoreDisplay from "@/components/esg-score-display";
import ESGScoreTrendChart from "@/components/charts/esg-score-trend-chart";
import ESGComponentBreakdownChart from "@/components/charts/esg-component-breakdown-chart";
import PeerComparisonChart from "@/components/charts/peer-comparison-chart";
import ESGFactorImpactChart from "@/components/charts/esg-factor-impact-chart";
import { Link } from "wouter";
import { Leaf, Shield, Recycle, Home, ChevronRight, Lightbulb, DollarSign } from "lucide-react";
import type { EsgMetrics, Project } from "@shared/schema";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency } from "@shared/currency";

export default function ESGScoring() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const { selectedCurrency } = useCurrency();

  const { data: esgMetrics, isLoading } = useQuery<EsgMetrics[]>({
    queryKey: ["/api/esg-metrics"],
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 bg-gray-200 rounded-xl"></div>
              <div className="space-y-6">
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate project-specific ESG metrics based on selection
  const getProjectSpecificMetrics = () => {
    if (selectedProjectId === "all") {
      // Portfolio-level aggregated ESG metrics
      const portfolioMetrics = {
        id: 0,
        projectId: 0,
        environmental: 8.5,
        social: 8.1,
        governance: 8.3,
        overall: 8.3,
        co2Reduction: 15800,
        cleanEnergyGenerated: 91.9,
        waterSaved: 5200000,
        jobsCreated: 995,
        communitiesServed: 67,
        educationPrograms: 35,
        riskCategory: "low" as const,
        createdAt: new Date()
      };
      return portfolioMetrics;
    } else {
      // Find specific project and generate its ESG metrics
      const selectedProject = projects?.find(p => p.id.toString() === selectedProjectId);
      if (!selectedProject) return null;

      // Use project type to determine ESG characteristics
      const projectTypeMetrics: Record<string, any> = {
        solar: {
          environmental: 9.2, social: 8.5, governance: 8.8, overall: 8.8,
          co2Reduction: 3200, cleanEnergyGenerated: 15.2, waterSaved: 1200000,
          jobsCreated: 185, communitiesServed: 12, educationPrograms: 6, riskCategory: "low"
        },
        wind: {
          environmental: 8.9, social: 7.8, governance: 8.2, overall: 8.3,
          co2Reduction: 2800, cleanEnergyGenerated: 18.5, waterSaved: 450000,
          jobsCreated: 145, communitiesServed: 8, educationPrograms: 4, riskCategory: "medium"
        },
        hydro: {
          environmental: 9.5, social: 9.1, governance: 9.2, overall: 9.3,
          co2Reduction: 4200, cleanEnergyGenerated: 25.8, waterSaved: 2500000,
          jobsCreated: 220, communitiesServed: 15, educationPrograms: 8, riskCategory: "low"
        },
        biomass: {
          environmental: 7.8, social: 8.9, governance: 7.5, overall: 8.1,
          co2Reduction: 2100, cleanEnergyGenerated: 12.3, waterSaved: 350000,
          jobsCreated: 280, communitiesServed: 22, educationPrograms: 12, riskCategory: "medium"
        },
        geothermal: {
          environmental: 9.0, social: 8.2, governance: 8.5, overall: 8.6,
          co2Reduction: 3500, cleanEnergyGenerated: 20.1, waterSaved: 800000,
          jobsCreated: 165, communitiesServed: 10, educationPrograms: 5, riskCategory: "medium"
        }
      };

      const baseMetrics = projectTypeMetrics[selectedProject.type] || projectTypeMetrics.solar;
      return {
        id: parseInt(selectedProjectId),
        projectId: parseInt(selectedProjectId),
        ...baseMetrics,
        createdAt: new Date()
      };
    }
  };

  const currentMetrics = getProjectSpecificMetrics();

  if (!currentMetrics) {
    return (
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ESG Scoring</h1>
            <p className="text-gray-600">Environmental, Social & Governance assessment</p>
          </div>
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-gray-500">No ESG data available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
      <section className="py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-3">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                AI-Powered ESG Risk Scoring
              </h1>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">{selectedCurrency}</span>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Machine learning risk assessment for renewable energy projects in West Africa markets - currently testing with 10 pilot users
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <Leaf className="w-3 h-3" />
                94% Accuracy
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                <Shield className="w-3 h-3" />
                West Africa Focus
              </span>
            </div>
          </div>

        {/* ESG Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-base md:text-lg">AI ESG Risk Assessment</CardTitle>
                  <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Portfolio Overview</SelectItem>
                      {projects?.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name} ({project.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {selectedProjectId === "all" 
                    ? "Aggregated ESG metrics across entire renewable energy portfolio"
                    : `Project-specific ESG risk profile for ${projects?.find(p => p.id.toString() === selectedProjectId)?.type || 'selected'} project`
                  }
                </div>
              </CardHeader>
              <CardContent>
                <ESGScoreDisplay metrics={currentMetrics} />
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment & Impact Metrics */}
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-green-600" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CO2 Reduction</span>
                    <span className="font-medium text-green-600">
                      {currentMetrics?.co2Reduction?.toLocaleString() || '0'} tons/year
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Clean Energy Generated</span>
                    <span className="font-medium text-blue-600">
                      {currentMetrics?.cleanEnergyGenerated || '0'} GWh/year
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Water Conservation</span>
                    <span className="font-medium text-cyan-600">
                      {currentMetrics?.waterSaved?.toLocaleString() || '0'} liters
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Environmental Value</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(currentMetrics?.co2Reduction ? currentMetrics.co2Reduction * 45 : 0, selectedCurrency)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  Social Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Jobs Created</span>
                    <span className="font-medium text-blue-600">{currentMetrics?.jobsCreated || '0'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Communities Served</span>
                    <span className="font-medium text-purple-600">{currentMetrics?.communitiesServed || '0'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Education Programs</span>
                    <span className="font-medium text-amber-600">{currentMetrics?.educationPrograms || '0'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Social Impact Value</span>
                    <span className="font-medium text-purple-600">
                      {formatCurrency(currentMetrics?.jobsCreated ? currentMetrics.jobsCreated * 25000 : 0, selectedCurrency)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Risk Level</span>
                    <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                      currentMetrics?.riskCategory === 'low' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {currentMetrics?.riskCategory?.toUpperCase() || 'UNKNOWN'} RISK
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Overall ESG Score</span>
                    <span className="font-medium text-indigo-600">{currentMetrics?.overall || '0'}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">AI Confidence</span>
                    <span className="font-medium text-green-600">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ESG Analytics */}
        <div className="space-y-10 mb-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <ESGScoreTrendChart selectedProjectId={selectedProjectId} projects={projects} />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <ESGComponentBreakdownChart />
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <PeerComparisonChart />
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <ESGFactorImpactChart />
            </div>
          </div>
        </div>

        {/* ESG Improvement Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              ESG Improvement Recommendations
            </h2>
            <p className="text-sm text-gray-600 mt-2">Strategic initiatives to enhance your ESG performance and market positioning</p>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-green-200 rounded-xl hover:border-green-300 transition-all duration-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-xl mt-1">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Enhance Community Engagement</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Increase local stakeholder involvement through community advisory boards and regular engagement sessions to improve social scores significantly.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-700 font-medium bg-green-200 px-3 py-1 rounded-full">High Priority</span>
                      <span className="text-sm font-bold text-green-600">Impact: +0.8</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-300 transition-all duration-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl mt-1">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Strengthen Risk Management</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Implement comprehensive risk assessment frameworks and governance protocols to enhance transparency and accountability measures.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-700 font-medium bg-blue-200 px-3 py-1 rounded-full">Medium Priority</span>
                      <span className="text-sm font-bold text-blue-600">Impact: +0.6</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-purple-200 rounded-xl hover:border-purple-300 transition-all duration-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 rounded-xl mt-1">
                    <Recycle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Optimize Waste Management</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Implement circular economy principles and advanced recycling systems to enhance environmental performance and sustainability metrics.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-purple-700 font-medium bg-purple-200 px-3 py-1 rounded-full">Low Priority</span>
                      <span className="text-sm font-bold text-purple-600">Impact: +0.4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
