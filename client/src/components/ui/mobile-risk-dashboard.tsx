import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency } from "@shared/currency";
import { 
  TrendingUp, 
  Activity, 
  BarChart3,
  Sun,
  Wind, 
  Droplets,
  Trees,
  Mountain,
  DollarSign,
  Calendar,
  Filter
} from "lucide-react";

interface MobileRiskDashboardProps {
  isMobile?: boolean;
}

interface ProjectTypeData {
  name: string;
  icon: any;
  percentage: number;
  investment: number;
  projects: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
}

export default function MobileRiskDashboard({ isMobile = true }: MobileRiskDashboardProps) {
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [selectedProjectType, setSelectedProjectType] = useState("all");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("12M");

  // Dynamic data based on selected time period
  const getPortfolioMetrics = () => {
    const baseMetrics = {
      "6M": {
        totalInvestment: 1800000000, // ₦1.8B
        growthRate: 8,
        activeProjects: 35,
        projectGrowth: 3,
        avgESGScore: 7.9,
        esgImprovement: 0.4
      },
      "12M": {
        totalInvestment: 2400000000, // ₦2.4B
        growthRate: 15,
        activeProjects: 47,
        projectGrowth: 5,
        avgESGScore: 8.2,
        esgImprovement: 0.8
      },
      "24M": {
        totalInvestment: 3200000000, // ₦3.2B
        growthRate: 22,
        activeProjects: 62,
        projectGrowth: 8,
        avgESGScore: 8.5,
        esgImprovement: 1.2
      },
      "36M": {
        totalInvestment: 4100000000, // ₦4.1B
        growthRate: 28,
        activeProjects: 78,
        projectGrowth: 12,
        avgESGScore: 8.7,
        esgImprovement: 1.5
      }
    };
    
    return baseMetrics[selectedTimePeriod as keyof typeof baseMetrics] || baseMetrics["12M"];
  };

  const portfolioMetrics = getPortfolioMetrics();

  // Dynamic project distribution based on time period
  const getProjectTypeDistribution = (): ProjectTypeData[] => {
    const distributionData = {
      "6M": [
        { name: "Solar", icon: Sun, percentage: 38, investment: 720000000, projects: 14, riskDistribution: { low: 10, medium: 3, high: 1 } },
        { name: "Wind", icon: Wind, percentage: 28, investment: 540000000, projects: 11, riskDistribution: { low: 8, medium: 2, high: 1 } },
        { name: "Hydro", icon: Droplets, percentage: 18, investment: 270000000, projects: 5, riskDistribution: { low: 4, medium: 1, high: 0 } },
        { name: "Biomass", icon: Trees, percentage: 11, investment: 180000000, projects: 3, riskDistribution: { low: 2, medium: 1, high: 0 } },
        { name: "Geo.", icon: Mountain, percentage: 5, investment: 90000000, projects: 2, riskDistribution: { low: 2, medium: 0, high: 0 } }
      ],
      "12M": [
        { name: "Solar", icon: Sun, percentage: 35, investment: 840000000, projects: 17, riskDistribution: { low: 12, medium: 4, high: 1 } },
        { name: "Wind", icon: Wind, percentage: 25, investment: 600000000, projects: 12, riskDistribution: { low: 8, medium: 3, high: 1 } },
        { name: "Hydro", icon: Droplets, percentage: 20, investment: 480000000, projects: 9, riskDistribution: { low: 6, medium: 2, high: 1 } },
        { name: "Biomass", icon: Trees, percentage: 12, investment: 288000000, projects: 6, riskDistribution: { low: 3, medium: 2, high: 1 } },
        { name: "Geo.", icon: Mountain, percentage: 8, investment: 192000000, projects: 3, riskDistribution: { low: 2, medium: 1, high: 0 } }
      ],
      "24M": [
        { name: "Solar", icon: Sun, percentage: 32, investment: 1024000000, projects: 20, riskDistribution: { low: 15, medium: 4, high: 1 } },
        { name: "Wind", icon: Wind, percentage: 27, investment: 896000000, projects: 17, riskDistribution: { low: 12, medium: 4, high: 1 } },
        { name: "Hydro", icon: Droplets, percentage: 22, investment: 704000000, projects: 14, riskDistribution: { low: 10, medium: 3, high: 1 } },
        { name: "Biomass", icon: Trees, percentage: 13, investment: 384000000, projects: 7, riskDistribution: { low: 4, medium: 2, high: 1 } },
        { name: "Geo.", icon: Mountain, percentage: 6, investment: 192000000, projects: 4, riskDistribution: { low: 3, medium: 1, high: 0 } }
      ],
      "36M": [
        { name: "Solar", icon: Sun, percentage: 30, investment: 1230000000, projects: 23, riskDistribution: { low: 18, medium: 4, high: 1 } },
        { name: "Wind", icon: Wind, percentage: 26, investment: 1230000000, projects: 23, riskDistribution: { low: 17, medium: 5, high: 1 } },
        { name: "Hydro", icon: Droplets, percentage: 25, investment: 1025000000, projects: 20, riskDistribution: { low: 15, medium: 4, high: 1 } },
        { name: "Biomass", icon: Trees, percentage: 14, investment: 410000000, projects: 8, riskDistribution: { low: 5, medium: 2, high: 1 } },
        { name: "Geo.", icon: Mountain, percentage: 5, investment: 205000000, projects: 4, riskDistribution: { low: 3, medium: 1, high: 0 } }
      ]
    };
    
    return distributionData[selectedTimePeriod as keyof typeof distributionData] || distributionData["12M"];
  };

  const projectTypeDistribution = getProjectTypeDistribution();

  const currencyOptions = ["NGN", "GBP", "EUR"];
  const projectTypeOptions = ["All", "Solar", "Wind", "Hydro", "Biomass", "Geothermal"];
  const timePeriodOptions = ["6M", "12M", "24M", "36M"];

  const formatInvestment = (amount: number) => {
    if (selectedCurrency === "NGN") {
      if (amount >= 1000000000) return `₦${(amount / 1000000000).toFixed(1)}B`;
      if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(0)}M`;
      return `₦${amount.toLocaleString()}`;
    }
    return formatCurrency(amount, selectedCurrency as "NGN" | "GBP" | "EUR");
  };

  const RiskBar = ({ riskData, totalProjects }: { riskData: { low: number; medium: number; high: number }, totalProjects: number }) => {
    const lowPercent = (riskData.low / totalProjects) * 100;
    const mediumPercent = (riskData.medium / totalProjects) * 100;
    const highPercent = (riskData.high / totalProjects) * 100;

    return (
      <div className="flex items-center space-x-2 text-xs">
        <div className={`flex-1 bg-gray-200 rounded-full ${isMobile ? 'h-3' : 'h-4'} flex overflow-hidden`}>
          <div 
            className="bg-green-500 h-full"
            style={{ width: `${lowPercent}%` }}
            title={`Low Risk: ${riskData.low} projects`}
          />
          <div 
            className="bg-yellow-500 h-full"
            style={{ width: `${mediumPercent}%` }}
            title={`Medium Risk: ${riskData.medium} projects`}
          />
          <div 
            className="bg-red-500 h-full"
            style={{ width: `${highPercent}%` }}
            title={`High Risk: ${riskData.high} projects`}
          />
        </div>
        <span className={`text-gray-600 font-medium ${isMobile ? 'w-12 text-xs' : 'w-16'} text-right`}>
          {totalProjects} {isMobile ? 'proj' : 'projects'}
        </span>
      </div>
    );
  };

  const DistributionBar = ({ percentage, color = "bg-blue-500" }: { percentage: number; color?: string }) => (
    <div className="flex items-center space-x-3">
      <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className={`${color} h-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-right min-w-[60px]">
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
    </div>
  );

  return (
    <div className={`${isMobile ? 'px-2 pb-4' : 'max-w-4xl mx-auto'}`}>
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-4">
          <CardTitle className="flex items-center gap-2 text-blue-700 text-base sm:text-lg">
            📊 KPI Dashboard - Portfolio Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className={`${isMobile ? 'p-3' : 'p-6'} space-y-4 sm:space-y-6`}>
          
          {/* Performance Metrics */}
          <div>
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900 mb-3`}>
              Performance Metrics (Last {selectedTimePeriod})
            </h3>
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-4'}`}>
              <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-r from-green-50 to-blue-50`}>
                <div className="text-center">
                  <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 flex items-center justify-center gap-2`}>
                    <span className={isMobile ? 'text-base' : ''}>{formatInvestment(portfolioMetrics.totalInvestment)}</span>
                    <div className="flex items-center text-green-600 text-xs sm:text-sm">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      +{portfolioMetrics.growthRate}%
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Investment</div>
                </div>
              </Card>

              <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-r from-blue-50 to-purple-50`}>
                <div className="text-center">
                  <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 flex items-center justify-center gap-2`}>
                    {portfolioMetrics.activeProjects}
                    <div className="flex items-center text-blue-600 text-xs sm:text-sm">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      projects
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Active Projects</div>
                </div>
              </Card>

              <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-r from-purple-50 to-green-50`}>
                <div className="text-center">
                  <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 flex items-center justify-center gap-2`}>
                    {portfolioMetrics.avgESGScore}/10
                    <div className="flex items-center text-green-600 text-xs sm:text-sm">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      +{portfolioMetrics.esgImprovement}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Avg. ESG Score</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Project Distribution by Type */}
          <div>
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900 mb-3`}>
              Project Distribution by Type
            </h3>
            <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-gray-50`}>
              <div className="space-y-3">
                {projectTypeDistribution.map((projectType, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className={`flex items-center space-x-2 ${isMobile ? 'min-w-[60px]' : 'min-w-[80px]'}`}>
                      <projectType.icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-blue-600`} />
                      <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>{projectType.name}</span>
                    </div>
                    
                    <div className={`flex-1 ${isMobile ? 'mx-2' : 'mx-4'}`}>
                      <DistributionBar 
                        percentage={projectType.percentage} 
                        color={
                          projectType.name === "Solar" ? "bg-yellow-500" :
                          projectType.name === "Wind" ? "bg-blue-500" :
                          projectType.name === "Hydro" ? "bg-cyan-500" :
                          projectType.name === "Biomass" ? "bg-green-500" :
                          "bg-purple-500"
                        }
                      />
                    </div>
                    
                    {!isMobile && (
                      <div className={`text-right min-w-[100px]`}>
                        <div className="text-xs text-gray-600">
                          ({formatInvestment(projectType.investment)})
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Risk Assessment Matrix */}
          <div>
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900 mb-3`}>
              Risk Assessment Matrix
            </h3>
            <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-gray-50`}>
              {/* Risk Legend */}
              <div className={`flex justify-center ${isMobile ? 'space-x-3' : 'space-x-6'} mb-4 ${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                <div className="flex items-center space-x-1">
                  <div className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} bg-green-500 rounded`}></div>
                  <span>Low Risk</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} bg-yellow-500 rounded`}></div>
                  <span>Medium Risk</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} bg-red-500 rounded`}></div>
                  <span>High Risk</span>
                </div>
              </div>

              {/* Risk Matrix */}
              <div className="space-y-3">
                {projectTypeDistribution.map((projectType, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className={`flex items-center space-x-2 ${isMobile ? 'min-w-[60px]' : 'min-w-[80px]'}`}>
                      <projectType.icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-gray-600`} />
                      <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>{projectType.name}</span>
                    </div>
                    
                    <div className={`flex-1 ${isMobile ? 'mx-2' : 'mx-4'}`}>
                      <RiskBar 
                        riskData={projectType.riskDistribution} 
                        totalProjects={projectType.projects}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="border-t pt-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Currency:</span>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Project Type:</span>
                <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                  <SelectTrigger className="w-24 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypeOptions.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Time Period:</span>
                <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
                  <SelectTrigger className={`${isMobile ? 'w-16 h-7' : 'w-20 h-8'}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timePeriodOptions.map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}