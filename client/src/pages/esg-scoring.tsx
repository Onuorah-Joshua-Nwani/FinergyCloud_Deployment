import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ESGScoreDisplay from "@/components/esg-score-display";
import ESGScoreTrendChart from "@/components/charts/esg-score-trend-chart";
import ESGComponentBreakdownChart from "@/components/charts/esg-component-breakdown-chart";
import PeerComparisonChart from "@/components/charts/peer-comparison-chart";
import ESGFactorImpactChart from "@/components/charts/esg-factor-impact-chart";
import { Link } from "wouter";
import { Leaf, Shield, Recycle, Home, ChevronRight } from "lucide-react";
import type { EsgMetrics } from "@shared/schema";

export default function ESGScoring() {

  const { data: esgMetrics, isLoading } = useQuery<EsgMetrics[]>({
    queryKey: ["/api/esg-metrics"],
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

  const currentMetrics = esgMetrics?.[0];

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
    <div className="min-h-screen bg-gray-50">
      <section className="py-4 md:py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">ESG Scoring</h1>
          <p className="text-sm md:text-base text-gray-600">Environmental, Social & Governance assessment</p>
        </div>

        {/* ESG Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-base md:text-lg">Current ESG Assessment</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="solar">Solar Projects</SelectItem>
                      <SelectItem value="wind">Wind Projects</SelectItem>
                      <SelectItem value="hydro">Hydro Projects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ESGScoreDisplay metrics={currentMetrics} />
              </CardContent>
            </Card>
          </div>

          {/* ESG Metrics */}
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-base md:text-lg">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CO2 Reduction</span>
                    <span className="font-medium text-success">
                      {currentMetrics.co2Reduction.toLocaleString()} tons/year
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Clean Energy Generated</span>
                    <span className="font-medium text-primary">
                      {currentMetrics.cleanEnergyGenerated} GWh
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Water Saved</span>
                    <span className="font-medium text-secondary">
                      {currentMetrics.waterSaved.toLocaleString()} liters
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Jobs Created</span>
                    <span className="font-medium text-primary">{currentMetrics.jobsCreated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Communities Served</span>
                    <span className="font-medium text-secondary">{currentMetrics.communitiesServed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Education Programs</span>
                    <span className="font-medium text-accent">{currentMetrics.educationPrograms}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ESG Analytics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ESGScoreTrendChart />
          <ESGComponentBreakdownChart />
          <PeerComparisonChart />
          <ESGFactorImpactChart />
        </div>

        {/* ESG Improvement Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Improvement Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-secondary/30 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-secondary/10 rounded-lg mt-1">
                    <Leaf className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Enhance Community Engagement</h3>
                    <p className="text-sm text-gray-600">
                      Increase local stakeholder involvement to improve social scores by 0.8 points.
                    </p>
                    <div className="mt-3 text-xs text-secondary font-medium">Potential Impact: +0.8</div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary/30 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg mt-1">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Strengthen Risk Management</h3>
                    <p className="text-sm text-gray-600">
                      Implement comprehensive risk assessment frameworks for governance improvement.
                    </p>
                    <div className="mt-3 text-xs text-primary font-medium">Potential Impact: +0.6</div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-accent/30 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <Recycle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Optimize Waste Management</h3>
                    <p className="text-sm text-gray-600">
                      Implement circular economy principles to enhance environmental performance.
                    </p>
                    <div className="mt-3 text-xs text-accent font-medium">Potential Impact: +0.4</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </section>
    </div>
  );
}
