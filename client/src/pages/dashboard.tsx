import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import PullToRefresh from "@/components/mobile-pull-to-refresh";
import MobileLoadingSkeleton from "@/components/mobile-loading-skeleton";
import MobileErrorBoundary from "@/components/mobile-error-boundary";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
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
  ChevronRight,
  Zap,
  TreePine
} from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

export default function Dashboard() {
  // Check if this is mobile app platform
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';

  const { deviceInfo, isOnline, isSlowConnection } = useMobileOptimization();

  const { data: projects, isLoading: isLoadingProjects, error, refetch } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    staleTime: isSlowConnection ? 10 * 60 * 1000 : 5 * 60 * 1000, // Longer cache for slow connections
    retry: isOnline ? 3 : 0,
  });

  const handleRefresh = async () => {
    await refetch();
  };

  if (error && !isOnline) {
    return <MobileErrorBoundary error={error} onRetry={handleRefresh} type="network" />;
  }

  if (error) {
    return <MobileErrorBoundary error={error} onRetry={handleRefresh} type="api" />;
  }

  if (isLoadingProjects) {
    return <MobileLoadingSkeleton type="dashboard" />;
  }

  const recentProjects = projects?.slice(0, 2) || [];

  const dashboardContent = (
    <div className="min-h-screen bg-mobile-background">
      <section className="py-4 md:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
              {isMobileApp ? "FinergyCloud Studio" : "Dashboard"}
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-600">
              {isMobileApp 
                ? "Django-powered ESG risk scoring platform - Beta users: 10 across Nigeria & Ghana"
                : "UK-registered ESG risk platform serving West African renewable energy developers"
              }
            </p>
          </div>

        {/* Dashboard Cards - 3x2 Grid Layout */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Row 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1.5 bg-blue-500 rounded-full">
                <Folder className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold text-blue-800 text-center mb-1">30</div>
            <div className="text-xs text-blue-600 font-medium text-center">Total Projects</div>
            <div className="text-xs text-blue-500 text-center">Active portfolio</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl border border-green-200">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1.5 bg-green-500 rounded-full">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold text-green-800 text-center mb-1">349</div>
            <div className="text-xs text-green-600 font-medium text-center">Total Capacity</div>
            <div className="text-xs text-green-500 text-center">MW installed</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl border border-purple-200">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1.5 bg-purple-500 rounded-full">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold text-purple-800 text-center mb-1">₦1.2B</div>
            <div className="text-xs text-purple-600 font-medium text-center">Total Investment</div>
            <div className="text-xs text-purple-500 text-center">Capital deployed</div>
          </div>

          {/* Row 2 */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl border border-orange-200">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1.5 bg-orange-500 rounded-full">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold text-orange-800 text-center mb-1">15.9%</div>
            <div className="text-xs text-orange-600 font-medium text-center">Weighted IRR</div>
            <div className="text-xs text-orange-500 text-center">Portfolio average</div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-3 rounded-xl border border-teal-200">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1.5 bg-teal-500 rounded-full">
                <Trophy className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold text-teal-800 text-center mb-1">94%</div>
            <div className="text-xs text-teal-600 font-medium text-center">Success Rate</div>
            <div className="text-xs text-teal-500 text-center">AI predictions</div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-3 rounded-xl border border-indigo-200">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1.5 bg-indigo-500 rounded-full">
                <Globe className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold text-indigo-800 text-center mb-1">12</div>
            <div className="text-xs text-indigo-600 font-medium text-center">Markets</div>
            <div className="text-xs text-indigo-500 text-center">West Africa</div>
          </div>
        </div>

        {/* Platform Features - 3x2 Grid Layout */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Platform Features</h3>
          <div className="grid grid-cols-3 gap-2">
            {/* Row 1 */}
            <Card className="p-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Brain className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">AI Predictions</p>
                  <p className="text-xs text-gray-600">94% accuracy</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <Leaf className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">ESG Scoring</p>
                  <p className="text-xs text-gray-600">Real-time risk</p>
                </div>
              </div>
            </Card>

            <Card className="p-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Calculator className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">IRR Calculator</p>
                  <p className="text-xs text-gray-600">Multi-currency</p>
                </div>
              </div>
            </Card>

            {/* Row 2 */}
            <Card className="p-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">Market Insights</p>
                  <p className="text-xs text-gray-600">West Africa</p>
                </div>
              </div>
            </Card>

            <Card className="p-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Folder className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">Project Mgmt</p>
                  <p className="text-xs text-gray-600">Portfolio</p>
                </div>
              </div>
            </Card>

            <Card className="p-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">KPI Dashboard</p>
                  <p className="text-xs text-gray-600">Real-time</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions & Market Activity - 3x2 Grid Layout */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions & Market Activity</h3>
          <div className="grid grid-cols-3 gap-2">
            {/* Row 1 - Quick Actions */}
            <Link href="/irr-calculator?platform=mobile">
              <Card className="p-2 hover:shadow-sm transition-shadow">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calculator className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900">IRR Calculator</p>
                    <p className="text-xs text-gray-600">Calculate</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/esg-scoring?platform=mobile">
              <Card className="p-2 hover:shadow-sm transition-shadow">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-success/10 rounded-full">
                    <Leaf className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900">ESG Scoring</p>
                    <p className="text-xs text-gray-600">Assess</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/advanced-features?platform=mobile">
              <Card className="p-2 hover:shadow-sm transition-shadow">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Brain className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900">AI Model</p>
                    <p className="text-xs text-gray-600">Predict</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Row 2 - Market Activity */}
            <Card className="p-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <Globe className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">Solar NGN</p>
                  <p className="text-xs text-green-600">+2.1%</p>
                </div>
              </div>
            </Card>

            <Card className="p-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Globe className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">Wind GBP</p>
                  <p className="text-xs text-blue-600">+1.7%</p>
                </div>
              </div>
            </Card>

            <Card className="p-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-success/10 rounded-full">
                  <Leaf className="w-4 h-4 text-success" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">ESG Updated</p>
                  <p className="text-xs text-gray-500">2 min ago</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Projects - Full Width */}
        <Card className="mt-4 md:mt-6">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base md:text-lg">Recent Projects</CardTitle>
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
                <p className="text-gray-500 text-center py-4 md:py-6 text-sm">No recent projects available</p>
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </section>
    </div>
  );

  // For mobile app, wrap with pull-to-refresh
  if (isMobileApp && deviceInfo.isMobile) {
    return (
      <PullToRefresh onRefresh={handleRefresh}>
        {dashboardContent}
      </PullToRefresh>
    );
  }

  return dashboardContent;
}
