import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KPICard from "@/components/kpi-card";
import PortfolioPerformanceChart from "@/components/charts/portfolio-performance-chart";
import ProjectDistributionChart from "@/components/charts/project-distribution-chart";
import InvestmentPerformanceChart from "@/components/charts/investment-performance-chart";
import { useCurrencyFormat } from "@/hooks/use-currency-format";
import { 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  Shield, 
  BarChart3,
  Activity,
  Target,
  Zap
} from "lucide-react";

export default function KPIDashboard() {
  const { convertAndFormat } = useCurrencyFormat();
  const { data: dashboardMetrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  if (isLoadingMetrics) {
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
    <section className="py-4 md:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">KPI Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600">Comprehensive performance metrics and analytics</p>
        </div>

        {/* Primary KPI Cards */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Primary Metrics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <KPICard
              title="Average IRR"
              value={dashboardMetrics?.averageIRR ? `${dashboardMetrics.averageIRR}%` : "0%"}
              description="Return on Investment"
              icon={TrendingUp}
              badge="IRR"
              badgeColor="primary"
            />
            <KPICard
              title="ESG Score"
              value={dashboardMetrics?.esgScore ? `${dashboardMetrics.esgScore}` : "0"}
              description="Sustainability Rating"
              icon={Leaf}
              badge="ESG"
              badgeColor="success"
            />
            <KPICard
              title="Portfolio Value"
              value={dashboardMetrics?.analyzedValue ? convertAndFormat(parseFloat(dashboardMetrics.analyzedValue.replace(/[₦M]/g, '')) * 1000000) : convertAndFormat(0)}
              description="Total Investment Value"
              icon={DollarSign}
              badge="Value"
              badgeColor="primary"
            />
            <KPICard
              title="Risk Level"
              value={dashboardMetrics?.riskLevel || "Unknown"}
              description="Portfolio Risk Assessment"
              icon={Shield}
              badge={dashboardMetrics?.riskLevel === "Low" ? "Low Risk" : "Medium Risk"}
              badgeColor={dashboardMetrics?.riskLevel === "Low" ? "success" : "warning"}
            />
          </div>
        </div>

        {/* Secondary KPI Cards */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <KPICard
              title="Active Projects"
              value={dashboardMetrics?.activeProjects || "2"}
              description="Currently Running Projects"
              icon={Activity}
              badge="Active"
              badgeColor="success"
            />
            <KPICard
              title="Success Rate"
              value={dashboardMetrics?.successRate || "87%"}
              description="Project Success Probability"
              icon={Target}
              badge="Success"
              badgeColor="primary"
            />
            <KPICard
              title="Energy Generated"
              value={dashboardMetrics?.energyGenerated || "12.5 GWh"}
              description="Clean Energy Production"
              icon={Zap}
              badge="Energy"
              badgeColor="warning"
            />
            <KPICard
              title="CO2 Reduction"
              value={dashboardMetrics?.co2Reduction || "2,450 tons"}
              description="Annual Carbon Savings"
              icon={Leaf}
              badge="Impact"
              badgeColor="success"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
          <PortfolioPerformanceChart />
          <ProjectDistributionChart />
        </div>

        {/* Investment Performance */}
        <div className="mb-6 md:mb-8">
          <InvestmentPerformanceChart />
        </div>

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
  );
}