import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import { 
  Calculator, 
  Folder, 
  Brain,
  ArrowRight,
  Globe,
  BarChart3,
  Leaf,
  Trophy,
  Home,
  ChevronRight
} from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

export default function Dashboard() {

  const { data: projects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoadingProjects) {
    return (
      <div className="py-4 md:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 md:h-8 bg-gray-200 rounded w-32 md:w-48 mb-2"></div>
            <div className="h-3 md:h-4 bg-gray-200 rounded w-48 md:w-64 mb-6 md:mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-64 md:h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const recentProjects = projects?.slice(0, 2) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-4 md:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Dashboard</h1>
          <p className="text-xs md:text-sm lg:text-base text-gray-600">Welcome to FinergyCloud Web Platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Quick Actions */}
          <Card className="order-1">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-3">
                <Link href="/kpi?platform=mobile">
                  <Button 
                    variant="outline" 
                    className="h-auto p-2 md:p-3 lg:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <div className="p-1 md:p-1.5 lg:p-2 bg-purple-100 rounded-lg w-fit mb-1 md:mb-2">
                      <BarChart3 className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-1">KPI Dashboard</h3>
                    <p className="text-xs text-gray-600 hidden lg:block">View all metrics</p>
                  </Button>
                </Link>

                <Link href="/irr-calculator?platform=mobile">
                  <Button 
                    variant="outline" 
                    className="h-auto p-2 md:p-3 lg:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <div className="p-1 md:p-1.5 lg:p-2 bg-primary/10 rounded-lg w-fit mb-1 md:mb-2">
                      <Calculator className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-1">IRR Calculator</h3>
                    <p className="text-xs text-gray-600 hidden lg:block">Financial simulations</p>
                  </Button>
                </Link>

                <Link href="/projects?platform=mobile">
                  <Button 
                    variant="outline" 
                    className="h-auto p-2 md:p-3 lg:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <div className="p-1 md:p-1.5 lg:p-2 bg-secondary/10 rounded-lg w-fit mb-1 md:mb-2">
                      <Folder className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-1">Projects</h3>
                    <p className="text-xs text-gray-600 hidden lg:block">Manage portfolio</p>
                  </Button>
                </Link>

                <Link href="/market-insights?platform=mobile">
                  <Button 
                    variant="outline" 
                    className="h-auto p-2 md:p-3 lg:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <div className="p-1 md:p-1.5 lg:p-2 bg-blue-100 rounded-lg w-fit mb-1 md:mb-2">
                      <Globe className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-1">Market Insights</h3>
                    <p className="text-xs text-gray-600 hidden lg:block">Trends & analysis</p>
                  </Button>
                </Link>

                <Link href="/esg-scoring?platform=mobile">
                  <Button 
                    variant="outline" 
                    className="h-auto p-2 md:p-3 lg:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <div className="p-1 md:p-1.5 lg:p-2 bg-success/10 rounded-lg w-fit mb-1 md:mb-2">
                      <Leaf className="w-3 h-3 md:w-4 md:h-4 text-success" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-1">ESG Scoring</h3>
                    <p className="text-xs text-gray-600 hidden lg:block">Sustainability</p>
                  </Button>
                </Link>

                <Link href="/rewards?platform=mobile">
                  <Button 
                    variant="outline" 
                    className="h-auto p-2 md:p-3 lg:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <div className="p-1 md:p-1.5 lg:p-2 bg-yellow-100 rounded-lg w-fit mb-1 md:mb-2">
                      <Trophy className="w-3 h-3 md:w-4 md:h-4 text-yellow-600" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-1">Rewards</h3>
                    <p className="text-xs text-gray-600 hidden lg:block">Sustainability points</p>
                  </Button>
                </Link>

                <Link href="/advanced-features?platform=mobile">
                  <Button 
                    variant="outline" 
                    className="h-auto p-2 md:p-3 lg:p-4 flex flex-col items-start text-left w-full hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <div className="p-1 md:p-1.5 lg:p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg w-fit mb-1 md:mb-2">
                      <Brain className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-1">Advanced AI</h3>
                    <p className="text-xs text-gray-600 hidden lg:block">Next-gen features</p>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card className="order-2">
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg md:text-xl">Recent Projects</CardTitle>
                <Link href="/projects?platform=mobile">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs md:text-sm">
                    View All <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 md:space-y-3">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-6 md:py-8 text-sm">No recent projects available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>
    </div>
  );
}
