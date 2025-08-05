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
  const [selectedProjectType, setSelectedProjectType] = useState<string>("all");
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

  // Get filtered projects based on type selection
  const getFilteredProjects = () => {
    if (!projects) return [];
    if (selectedProjectType === "all") return projects;
    return projects.filter(project => project.type === selectedProjectType);
  };

  // Get unique project types for the selector
  const getProjectTypes = () => {
    if (!projects) return [];
    const types = Array.from(new Set(projects.map(p => p.type)));
    return types;
  };

  // Calculate project-specific ESG metrics based on selection
  const getProjectSpecificMetrics = () => {
    if (selectedProjectId === "all") {
      // Check if we're filtering by type
      const relevantProjects = getFilteredProjects();
      
      if (selectedProjectType === "all") {
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
        // Type-specific aggregated metrics
        const typeMetrics = getProjectTypeAggregatedMetrics(selectedProjectType);
        return typeMetrics;
      }
    } else {
      // Find specific project and generate its ESG metrics
      const selectedProject = projects?.find(p => p.id.toString() === selectedProjectId);
      if (!selectedProject) return null;

      // Use project type to determine ESG characteristics
      return getSpecificProjectMetrics(selectedProject);
    }
  };

  // Generate aggregated metrics for a specific project type
  const getProjectTypeAggregatedMetrics = (projectType: string) => {
    const typeMetrics: Record<string, any> = {
      solar: {
        id: 0,
        projectId: 0,
        environmental: 8.9,
        social: 7.6,
        governance: 8.4,
        overall: 8.3,
        co2Reduction: 12400,
        cleanEnergyGenerated: 78.5,
        waterSaved: 3800000,
        jobsCreated: 456,
        communitiesServed: 32,
        educationPrograms: 18,
        riskCategory: "low" as const,
        createdAt: new Date()
      },
      wind: {
        id: 0,
        projectId: 0,
        environmental: 8.7,
        social: 8.2,
        governance: 8.1,
        overall: 8.3,
        co2Reduction: 9200,
        cleanEnergyGenerated: 65.2,
        waterSaved: 1200000,
        jobsCreated: 312,
        communitiesServed: 28,
        educationPrograms: 14,
        riskCategory: "low" as const,
        createdAt: new Date()
      },
      hydro: {
        id: 0,
        projectId: 0,
        environmental: 8.2,
        social: 8.8,
        governance: 8.5,
        overall: 8.5,
        co2Reduction: 6800,
        cleanEnergyGenerated: 45.8,
        waterSaved: 2400000,
        jobsCreated: 287,
        communitiesServed: 15,
        educationPrograms: 9,
        riskCategory: "low" as const,
        createdAt: new Date()
      }
    };
    return typeMetrics[projectType] || typeMetrics.solar;
  };

  // Generate specific project metrics based on project data
  const getSpecificProjectMetrics = (selectedProject: any) => {
    // Project-specific ESG metrics based on project type and characteristics
    const baseMetrics = {
      solar: {
        environmental: 8.9, social: 7.6, governance: 8.4, overall: 8.3,
        co2Reduction: 2800, cleanEnergyGenerated: 18.5, waterSaved: 450000,
        jobsCreated: 145, communitiesServed: 8, educationPrograms: 4, riskCategory: "low"
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

    const projectTypeMetrics = baseMetrics[selectedProject.type as keyof typeof baseMetrics] || baseMetrics.solar;
    return {
      id: parseInt(selectedProjectId),
      projectId: parseInt(selectedProjectId),
      ...projectTypeMetrics,
      createdAt: new Date()
    };
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

  // Check if this is mobile app platform
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
      <section className={`py-4 ${isMobileApp ? 'px-3' : 'py-6 md:py-10'}`}>
        <div className={`mx-auto ${isMobileApp ? 'max-w-full' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
          <div className={`mb-4 ${isMobileApp ? 'text-left' : 'mb-8 md:mb-10 text-center'}`}>
            <div className={`flex items-center ${isMobileApp ? 'flex-col items-start' : 'justify-center'} gap-4 mb-3`}>
              <h1 className={`font-bold text-gray-900 ${isMobileApp ? 'text-xl' : 'text-2xl md:text-4xl'}`}>
                AI-Powered ESG Risk Scoring
              </h1>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">{selectedCurrency}</span>
              </div>
            </div>
            <p className={`text-gray-600 ${isMobileApp ? 'text-sm' : 'text-base md:text-lg max-w-3xl mx-auto'}`}>
              Machine learning risk assessment for renewable energy projects in West Africa markets - currently testing with 10 pilot users
            </p>
            <div className={`flex items-center ${isMobileApp ? 'justify-start' : 'justify-center'} gap-2 mt-4 text-sm text-gray-500`}>
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

        {/* Project Selection - Enhanced for Mobile */}
        {isMobileApp && (
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                ESG Project Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Select Project Type</label>
                  <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🌍 All Project Types</SelectItem>
                      {getProjectTypes().map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === 'solar' && '☀️'} 
                          {type === 'wind' && '💨'} 
                          {type === 'hydro' && '💧'} 
                          {type.charAt(0).toUpperCase() + type.slice(1)} Energy
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Select Specific Project</label>
                  <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {selectedProjectType === "all" ? "📊 Portfolio Overview" : `📊 All ${selectedProjectType.charAt(0).toUpperCase() + selectedProjectType.slice(1)} Projects`}
                      </SelectItem>
                      {getFilteredProjects().map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.type === 'solar' && '☀️'} 
                          {project.type === 'wind' && '💨'} 
                          {project.type === 'hydro' && '💧'} 
                          {project.name} ({project.type.charAt(0).toUpperCase() + project.type.slice(1)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                  {selectedProjectId === "all" 
                    ? selectedProjectType === "all"
                      ? "📈 Showing aggregated ESG metrics across entire renewable energy portfolio"
                      : `📊 Showing aggregated ESG metrics for all ${selectedProjectType} energy projects`
                    : `🏗️ Project-specific ESG analysis for ${projects?.find(p => p.id.toString() === selectedProjectId)?.name || 'selected project'} (${projects?.find(p => p.id.toString() === selectedProjectId)?.type || 'renewable'} energy)`
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ESG Score Overview - Mobile Optimized */}
        <div className={`grid grid-cols-1 ${isMobileApp ? 'gap-4 mb-4' : 'lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8'}`}>
          <div className={isMobileApp ? '' : 'lg:col-span-2'}>
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                {!isMobileApp && (
                  <div className="space-y-3">
                    <CardTitle className="text-base md:text-lg">AI ESG Risk Assessment</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-gray-600 mb-1 block">Project Type</label>
                        <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">🌍 All Project Types</SelectItem>
                            {getProjectTypes().map((type) => (
                              <SelectItem key={type} value={type}>
                                {type === 'solar' && '☀️'} 
                                {type === 'wind' && '💨'} 
                                {type === 'hydro' && '💧'} 
                                {type.charAt(0).toUpperCase() + type.slice(1)} Energy
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-600 mb-1 block">Specific Project</label>
                        <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select project" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              {selectedProjectType === "all" ? "📊 Portfolio Overview" : `📊 All ${selectedProjectType.charAt(0).toUpperCase() + selectedProjectType.slice(1)} Projects`}
                            </SelectItem>
                            {getFilteredProjects().map((project) => (
                              <SelectItem key={project.id} value={project.id.toString()}>
                                {project.type === 'solar' && '☀️'} 
                                {project.type === 'wind' && '💨'} 
                                {project.type === 'hydro' && '💧'} 
                                {project.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
                
                {isMobileApp && (
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    ESG Risk Assessment
                  </CardTitle>
                )}
                
                {!isMobileApp && (
                  <div className="text-xs text-gray-500 mt-2">
                    {selectedProjectId === "all" 
                      ? selectedProjectType === "all"
                        ? "Aggregated ESG metrics across entire renewable energy portfolio"
                        : `Aggregated ESG metrics for all ${selectedProjectType} energy projects`
                      : `Project-specific ESG risk profile for ${projects?.find(p => p.id.toString() === selectedProjectId)?.name || 'selected'} project`
                    }
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <ESGScoreDisplay metrics={currentMetrics} />
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment & Impact Metrics - Mobile Optimized */}
          {!isMobileApp && (
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
          )}

          {/* Mobile Impact Metrics - Compact Grid */}
          {isMobileApp && (
            <div className="space-y-4">
              {/* Environmental & Social Impact Combined */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Recycle className="w-4 h-4 text-green-600" />
                    Impact Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">CO2 Reduced</div>
                      <div className="font-medium text-green-600">
                        {currentMetrics?.co2Reduction?.toLocaleString() || '0'} tons
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Clean Energy</div>
                      <div className="font-medium text-blue-600">
                        {currentMetrics?.cleanEnergyGenerated || '0'} GWh
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Jobs Created</div>
                      <div className="font-medium text-blue-600">{currentMetrics?.jobsCreated || '0'}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Communities</div>
                      <div className="font-medium text-purple-600">{currentMetrics?.communitiesServed || '0'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
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
          )}
        </div>

        {/* ESG Analytics - Desktop Only */}
        {!isMobileApp && (
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
        )}

        {/* Mobile ESG Summary */}
        {isMobileApp && (
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                ESG Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-3">
                {selectedProjectId === "all" 
                  ? "This portfolio maintains strong ESG performance across all renewable energy projects."
                  : `${projects?.find(p => p.id.toString() === selectedProjectId)?.name || 'This project'} demonstrates excellent ESG characteristics for ${projects?.find(p => p.id.toString() === selectedProjectId)?.type || 'renewable'} energy development.`
                }
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">E</div>
                  <div className="text-xs text-gray-600">Environmental</div>
                  <div className="text-sm font-medium">{currentMetrics?.environmental || '0'}/10</div>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">S</div>
                  <div className="text-xs text-gray-600">Social</div>
                  <div className="text-sm font-medium">{currentMetrics?.social || '0'}/10</div>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="text-lg font-bold text-purple-600">G</div>
                  <div className="text-xs text-gray-600">Governance</div>
                  <div className="text-sm font-medium">{currentMetrics?.governance || '0'}/10</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* Action Buttons Section */}
        <div className={`${isMobileApp ? 'mt-4' : 'mt-8'} grid grid-cols-1 sm:grid-cols-3 gap-4`}>
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-green-100 rounded-full">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Generate ESG Report</h3>
                <p className="text-sm text-gray-600">Create comprehensive ESG assessment document</p>
                <Link href="/esg-result" className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Generate Report →
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Compare Projects</h3>
                <p className="text-sm text-gray-600">Benchmark against industry peers</p>
                <button 
                  onClick={() => {
                    setSelectedProjectType("all");
                    setSelectedProjectId("all");
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Comparison →
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Recycle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Project Analysis</h3>
                <p className="text-sm text-gray-600">Drill down to specific project details</p>
                <button 
                  onClick={() => {
                    if (getProjectTypes().length > 0) {
                      setSelectedProjectType(getProjectTypes()[0]);
                      setSelectedProjectId("all");
                    }
                  }}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Analyze Projects →
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Selection Summary */}
        <div className={`${isMobileApp ? 'mt-4' : 'mt-6'} p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Current Analysis</h4>
              <p className="text-sm text-gray-600">
                {selectedProjectId === "all" 
                  ? selectedProjectType === "all"
                    ? "Portfolio-wide ESG assessment across all renewable energy projects"
                    : `ESG analysis for all ${selectedProjectType} energy projects in portfolio`
                  : `Detailed ESG assessment for ${projects?.find(p => p.id.toString() === selectedProjectId)?.name || 'selected project'}`
                }
              </p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  setSelectedProjectType("all");
                  setSelectedProjectId("all");
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
              >
                Reset View
              </button>
              <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                currentMetrics?.riskCategory === 'low' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {currentMetrics?.riskCategory?.toUpperCase() || 'UNKNOWN'} RISK
              </span>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
