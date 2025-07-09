import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import PortfolioPerformanceChart from "@/components/charts/portfolio-performance-chart";
import ProjectDistributionChart from "@/components/charts/project-distribution-chart";
import InvestmentPerformanceChart from "@/components/charts/investment-performance-chart";
import { 
  Calculator, 
  Folder, 
  Brain,
  ArrowRight,
  Globe,
  BarChart3,
  Leaf
} from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

export default function Dashboard() {
  const { data: projects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoadingProjects) {
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
    <section className="py-4 md:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600">Welcome to FinergyCloud Mobile</p>
        </div>



        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
                <Link href="/kpi">
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 md:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg w-fit mb-2 md:mb-3">
                      <BarChart3 className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-1">KPI Dashboard</h3>
                    <p className="text-xs text-gray-600 hidden md:block">View all metrics</p>
                  </Button>
                </Link>

                <Link href="/irr-calculator">
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 md:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg w-fit mb-2 md:mb-3">
                      <Calculator className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-1">IRR Calculator</h3>
                    <p className="text-xs text-gray-600 hidden md:block">Run financial simulations</p>
                  </Button>
                </Link>

                <Link href="/projects">
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 md:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-1.5 md:p-2 bg-secondary/10 rounded-lg w-fit mb-2 md:mb-3">
                      <Folder className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-1">Manage Projects</h3>
                    <p className="text-xs text-gray-600 hidden md:block">Create and manage projects</p>
                  </Button>
                </Link>

                <Link href="/market-insights">
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 md:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg w-fit mb-2 md:mb-3">
                      <Globe className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-1">Market Insights</h3>
                    <p className="text-xs text-gray-600 hidden md:block">Trends and analysis</p>
                  </Button>
                </Link>

                <Link href="/esg-scoring">
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 md:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-1.5 md:p-2 bg-success/10 rounded-lg w-fit mb-2 md:mb-3">
                      <Leaf className="w-3 h-3 md:w-4 md:h-4 text-success" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-1">ESG Scoring</h3>
                    <p className="text-xs text-gray-600 hidden md:block">Assess sustainability</p>
                  </Button>
                </Link>

                <Link href="/ai-model">
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 md:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5"
                  >
                    <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg w-fit mb-2 md:mb-3">
                      <Brain className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-1">AI Prediction</h3>
                    <p className="text-xs text-gray-600 hidden md:block">XGBoost model insights</p>
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
                <Link href="/projects">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
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

        {/* Portfolio Analytics */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8">
          <PortfolioPerformanceChart />
          <ProjectDistributionChart />
        </div>

        {/* Investment Performance */}
        <div className="mt-6 md:mt-8">
          <InvestmentPerformanceChart />
        </div>


      </div>
    </section>
  );
}
