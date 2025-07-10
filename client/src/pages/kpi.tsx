import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import KPICard from "@/components/kpi-card";
import PortfolioPerformanceChart from "@/components/charts/portfolio-performance-chart";
import ProjectDistributionChart from "@/components/charts/project-distribution-chart";
import InvestmentPerformanceChart from "@/components/charts/investment-performance-chart";
import { useCurrencyFormat } from "@/hooks/use-currency-format";
import { Link } from "wouter";
import { 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  Shield, 
  BarChart3,
  Activity,
  Target,
  Zap,
  Sun,
  Wind,
  Droplets,
  Trees,
  Mountain,
  Filter,
  Home,
  ChevronRight
} from "lucide-react";

// Project type configuration with unique stories and characteristics
const PROJECT_TYPE_CONFIG = {
  all: {
    icon: BarChart3,
    name: "All Projects",
    color: "bg-gradient-to-r from-blue-500 to-purple-600",
    story: "Complete portfolio overview across all renewable energy technologies",
    keyMetrics: ["Portfolio Diversity", "Overall Performance", "Risk Distribution", "Total Impact"],
    focusAreas: ["diversification", "balance", "stability", "growth"]
  },
  solar: {
    icon: Sun,
    name: "Solar Projects", 
    color: "bg-gradient-to-r from-yellow-500 to-orange-600",
    story: "Harnessing the power of the sun for clean, scalable energy generation",
    keyMetrics: ["Solar Irradiance", "Panel Efficiency", "Land Utilization", "Grid Integration"],
    focusAreas: ["efficiency", "scalability", "technology", "reliability"]
  },
  wind: {
    icon: Wind,
    name: "Wind Projects",
    color: "bg-gradient-to-r from-cyan-500 to-blue-600", 
    story: "Capturing wind energy for consistent, large-scale power generation",
    keyMetrics: ["Wind Speed", "Turbine Efficiency", "Capacity Factor", "Grid Stability"],
    focusAreas: ["consistency", "scale", "technology", "integration"]
  },
  hydro: {
    icon: Droplets,
    name: "Hydro Projects",
    color: "bg-gradient-to-r from-blue-500 to-teal-600",
    story: "Leveraging water resources for reliable, long-term energy production", 
    keyMetrics: ["Water Flow", "Dam Efficiency", "Environmental Impact", "Community Benefits"],
    focusAreas: ["reliability", "longevity", "environment", "community"]
  },
  biomass: {
    icon: Trees,
    name: "Biomass Projects",
    color: "bg-gradient-to-r from-green-500 to-emerald-600",
    story: "Converting organic waste into clean energy while supporting circular economy",
    keyMetrics: ["Feedstock Supply", "Conversion Efficiency", "Waste Reduction", "Carbon Neutrality"],
    focusAreas: ["sustainability", "waste reduction", "circular economy", "neutrality"]
  },
  geothermal: {
    icon: Mountain,
    name: "Geothermal Projects", 
    color: "bg-gradient-to-r from-red-500 to-orange-600",
    story: "Tapping into Earth's natural heat for consistent, baseload power generation",
    keyMetrics: ["Ground Temperature", "Heat Recovery", "Baseload Capacity", "Geological Stability"],
    focusAreas: ["consistency", "baseload", "geology", "efficiency"]
  }
};

export default function KPIDashboard() {
  
  const [selectedProjectType, setSelectedProjectType] = useState<string>("all");
  const { convertAndFormat } = useCurrencyFormat();
  
  const { data: dashboardMetrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ["/api/projects"],
  });

  const { data: esgMetrics, isLoading: isLoadingEsg } = useQuery({
    queryKey: ["/api/esg-metrics"],
  });

  // Calculate project-type-specific metrics
  const getProjectTypeMetrics = (projectType: string) => {
    if (!projects || !esgMetrics) return null;

    const filteredProjects = projectType === "all" 
      ? projects 
      : projects.filter((p: any) => p.type === projectType);

    if (filteredProjects.length === 0) return null;

    const totalProjects = filteredProjects.length;
    const avgIRR = (filteredProjects.reduce((sum: number, p: any) => sum + p.irr, 0) / totalProjects).toFixed(1);
    const avgESG = (filteredProjects.reduce((sum: number, p: any) => sum + p.esgScore, 0) / totalProjects).toFixed(1);
    
    const relatedEsgMetrics = esgMetrics.filter((esg: any) => 
      filteredProjects.some((p: any) => p.id === esg.projectId)
    );

    const totalCO2 = relatedEsgMetrics.reduce((sum: number, esg: any) => sum + esg.co2Reduction, 0);
    const totalEnergy = relatedEsgMetrics.reduce((sum: number, esg: any) => sum + esg.cleanEnergyGenerated, 0);
    const totalJobs = relatedEsgMetrics.reduce((sum: number, esg: any) => sum + esg.jobsCreated, 0);
    const totalCommunities = relatedEsgMetrics.reduce((sum: number, esg: any) => sum + esg.communitiesServed, 0);

    const riskDistribution = {
      low: filteredProjects.filter((p: any) => p.riskLevel === "Low").length,
      medium: filteredProjects.filter((p: any) => p.riskLevel === "Medium").length,
      high: filteredProjects.filter((p: any) => p.riskLevel === "High").length
    };

    const totalCapacity = filteredProjects.reduce((sum: number, p: any) => sum + p.capacity, 0);

    return {
      totalProjects,
      avgIRR,
      avgESG,
      totalCO2,
      totalEnergy,
      totalJobs,
      totalCommunities,
      riskDistribution,
      totalCapacity,
      dominantRisk: Object.entries(riskDistribution).reduce((a, b) => riskDistribution[a[0]] > riskDistribution[b[0]] ? a : b)[0]
    };
  };

  const projectTypeMetrics = getProjectTypeMetrics(selectedProjectType);
  const selectedConfig = PROJECT_TYPE_CONFIG[selectedProjectType as keyof typeof PROJECT_TYPE_CONFIG];

  if (isLoadingMetrics || isLoadingProjects || isLoadingEsg) {
    return (
      <div className="py-4 md:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-4 md:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Header with Project Type Selector */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">KPI Dashboard</h1>
              <p className="text-sm md:text-base text-gray-600">Comprehensive performance metrics and analytics</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROJECT_TYPE_CONFIG).map(([key, config]) => {
                    const IconComponent = config.icon;
                    return (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" />
                          {config.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project Type Story Banner */}
          {selectedConfig && (
            <div className={`${selectedConfig.color} text-white rounded-lg p-4 mb-6`}>
              <div className="flex items-center gap-3 mb-2">
                <selectedConfig.icon className="w-6 h-6" />
                <h2 className="text-xl font-semibold">{selectedConfig.name}</h2>
              </div>
              <p className="text-sm opacity-90 mb-3">{selectedConfig.story}</p>
              <div className="flex flex-wrap gap-2">
                {selectedConfig.keyMetrics.map((metric, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary KPI Cards - Project Type Specific */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            {selectedConfig?.name} Primary Metrics
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <KPICard
              title="Average IRR"
              value={projectTypeMetrics ? `${projectTypeMetrics.avgIRR}%` : "0%"}
              description={selectedProjectType === "all" ? "Portfolio Return" : `${selectedConfig?.name} Return`}
              icon={TrendingUp}
              badge="IRR"
              badgeColor="primary"
            />
            <KPICard
              title="ESG Score"
              value={projectTypeMetrics ? `${projectTypeMetrics.avgESG}` : "0"}
              description={selectedProjectType === "all" ? "Portfolio Sustainability" : `${selectedConfig?.name} Impact`}
              icon={Leaf}
              badge="ESG"
              badgeColor="success"
            />
            <KPICard
              title="Active Projects"
              value={projectTypeMetrics ? `${projectTypeMetrics.totalProjects}` : "0"}
              description={selectedProjectType === "all" ? "Total Projects" : `${selectedConfig?.name} Count`}
              icon={Activity}
              badge="Projects"
              badgeColor="primary"
            />
            <KPICard
              title="Risk Profile"
              value={projectTypeMetrics ? projectTypeMetrics.dominantRisk.charAt(0).toUpperCase() + projectTypeMetrics.dominantRisk.slice(1) : "Unknown"}
              description={selectedProjectType === "all" ? "Portfolio Risk" : `${selectedConfig?.name} Risk`}
              icon={Shield}
              badge={projectTypeMetrics?.dominantRisk === "low" ? "Low Risk" : projectTypeMetrics?.dominantRisk === "medium" ? "Medium Risk" : "High Risk"}
              badgeColor={projectTypeMetrics?.dominantRisk === "low" ? "success" : projectTypeMetrics?.dominantRisk === "medium" ? "warning" : "secondary"}
            />
          </div>
        </div>

        {/* Impact Metrics - Project Type Specific */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            {selectedConfig?.name} Impact Metrics
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <KPICard
              title="Total Capacity"
              value={projectTypeMetrics ? `${projectTypeMetrics.totalCapacity.toFixed(1)} MW` : "0 MW"}
              description={selectedProjectType === "all" ? "Portfolio Capacity" : `${selectedConfig?.name} Power`}
              icon={Zap}
              badge="Capacity"
              badgeColor="warning"
            />
            <KPICard
              title="Energy Generated"
              value={projectTypeMetrics ? `${projectTypeMetrics.totalEnergy.toFixed(1)} GWh` : "0 GWh"}
              description={selectedProjectType === "all" ? "Total Energy" : `${selectedConfig?.name} Output`}
              icon={BarChart3}
              badge="Energy"
              badgeColor="primary"
            />
            <KPICard
              title="CO2 Reduction"
              value={projectTypeMetrics ? `${projectTypeMetrics.totalCO2.toLocaleString()} tons` : "0 tons"}
              description={selectedProjectType === "all" ? "Total Carbon Savings" : `${selectedConfig?.name} Impact`}
              icon={Leaf}
              badge="Impact"
              badgeColor="success"
            />
            <KPICard
              title="Jobs Created"
              value={projectTypeMetrics ? `${projectTypeMetrics.totalJobs.toLocaleString()}` : "0"}
              description={selectedProjectType === "all" ? "Total Employment" : `${selectedConfig?.name} Jobs`}
              icon={Target}
              badge="Jobs"
              badgeColor="primary"
            />
          </div>
        </div>

        {/* Community Impact - Project Type Specific */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            {selectedConfig?.name} Community Impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <KPICard
              title="Communities Served"
              value={projectTypeMetrics ? `${projectTypeMetrics.totalCommunities.toLocaleString()}` : "0"}
              description={selectedProjectType === "all" ? "Total Communities" : `${selectedConfig?.name} Reach`}
              icon={Target}
              badge="Communities"
              badgeColor="success"
            />
            <KPICard
              title="Low Risk Projects"
              value={projectTypeMetrics ? `${projectTypeMetrics.riskDistribution.low}` : "0"}
              description="Stable Investments"
              icon={Shield}
              badge="Low Risk"
              badgeColor="success"
            />
            <KPICard
              title="Medium Risk Projects"
              value={projectTypeMetrics ? `${projectTypeMetrics.riskDistribution.medium}` : "0"}
              description="Moderate Investments"
              icon={Shield}
              badge="Medium Risk"
              badgeColor="warning"
            />
            <KPICard
              title="High Risk Projects"
              value={projectTypeMetrics ? `${projectTypeMetrics.riskDistribution.high}` : "0"}
              description="Growth Investments"
              icon={Shield}
              badge="High Risk"
              badgeColor="secondary"
            />
          </div>
        </div>

        {/* Charts Section - Project Type Aware */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            {selectedConfig?.name} Analytics
          </h2>
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <PortfolioPerformanceChart projectType={selectedProjectType !== "all" ? selectedProjectType : undefined} />
            <ProjectDistributionChart projectType={selectedProjectType !== "all" ? selectedProjectType : undefined} />
          </div>
        </div>

        {/* Investment Performance */}
        <div className="mb-6 md:mb-8">
          <InvestmentPerformanceChart projectType={selectedProjectType !== "all" ? selectedProjectType : undefined} />
        </div>

        {/* Project Type Insights */}
        {selectedConfig && selectedProjectType !== "all" && (
          <div className="mb-6 md:mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedConfig.icon className="w-5 h-5" />
                  {selectedConfig.name} Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Focus Areas</h4>
                    <div className="space-y-2">
                      {selectedConfig.focusAreas.map((area, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 capitalize">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Performance Summary</h4>
                    <div className="text-sm text-gray-600">
                      {projectTypeMetrics && (
                        <div className="space-y-1">
                          <p>• {projectTypeMetrics.totalProjects} active projects generating {projectTypeMetrics.totalEnergy.toFixed(1)} GWh annually</p>
                          <p>• Average IRR of {projectTypeMetrics.avgIRR}% with {projectTypeMetrics.avgESG}/10 ESG rating</p>
                          <p>• Created {projectTypeMetrics.totalJobs.toLocaleString()} jobs serving {projectTypeMetrics.totalCommunities.toLocaleString()} communities</p>
                          <p>• Reduced CO2 emissions by {projectTypeMetrics.totalCO2.toLocaleString()} tons annually</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Additional Metrics Cards */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Additional Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Portfolio Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-2">+24.8%</div>
                <p className="text-sm text-gray-600">Year-over-year growth in portfolio value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-success" />
                  Target Achievement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-2">92%</div>
                <p className="text-sm text-gray-600">Goals achieved this quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" />
                  Efficiency Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-2">8.7/10</div>
                <p className="text-sm text-gray-600">Overall operational efficiency</p>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}