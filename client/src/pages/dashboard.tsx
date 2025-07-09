import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import KPICard from "@/components/kpi-card";
import ProjectCard from "@/components/project-card";
import { 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  Shield, 
  Calculator, 
  Folder, 
  Brain,
  ArrowRight 
} from "lucide-react";
import { Link } from "wouter";
import type { Project, MarketInsight } from "@shared/schema";

export default function Dashboard() {
  const { data: dashboardMetrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: projects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: marketInsights, isLoading: isLoadingInsights } = useQuery<MarketInsight[]>({
    queryKey: ["/api/market-insights"],
  });

  if (isLoadingMetrics || isLoadingProjects || isLoadingInsights) {
    return (
      <div className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const recentProjects = projects?.slice(0, 2) || [];

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to FinergyCloud Mobile</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Average IRR"
            value={dashboardMetrics?.averageIRR ? `${dashboardMetrics.averageIRR}%` : "0%"}
            description="Average IRR"
            icon={TrendingUp}
            badge="IRR"
            badgeColor="secondary"
          />
          <KPICard
            title="ESG Score"
            value={dashboardMetrics?.esgScore ? `${dashboardMetrics.esgScore}` : "0"}
            description="ESG Score"
            icon={Leaf}
            badge="ESG"
            badgeColor="secondary"
          />
          <KPICard
            title="Analyzed Value"
            value={dashboardMetrics?.analyzedValue || "₦0M"}
            description="Analyzed Value"
            icon={DollarSign}
            badge="Value"
            badgeColor="secondary"
          />
          <KPICard
            title="Risk Level"
            value={dashboardMetrics?.riskLevel || "Unknown"}
            description="Risk Level"
            icon={Shield}
            badge={dashboardMetrics?.riskLevel === "Low" ? "Low Risk" : "Medium Risk"}
            badgeColor={dashboardMetrics?.riskLevel === "Low" ? "success" : "warning"}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/ai-model">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                      <Calculator className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">IRR Calculator</h3>
                    <p className="text-sm text-gray-600">Run financial simulations</p>
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-2 bg-secondary/10 rounded-lg w-fit mb-3">
                      <Folder className="w-4 h-4 text-secondary" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Projects</h3>
                    <p className="text-sm text-gray-600">Manage your investments</p>
                  </Button>
                </Link>

                <Link href="/esg-scoring">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-2 bg-success/10 rounded-lg w-fit mb-3">
                      <Leaf className="w-4 h-4 text-success" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">ESG Scoring</h3>
                    <p className="text-sm text-gray-600">Assess sustainability</p>
                  </Button>
                </Link>

                <Link href="/ai-model">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-2 bg-accent/10 rounded-lg w-fit mb-3">
                      <Brain className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">AI Prediction</h3>
                    <p className="text-sm text-gray-600">XGBoost model insights</p>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Projects</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No recent projects available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Insights */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Market Insights</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {marketInsights && marketInsights.length > 0 ? (
                marketInsights.map((insight) => (
                  <article key={insight.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-primary cursor-pointer">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(insight.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {insight.excerpt}
                    </p>
                  </article>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No market insights available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
