import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Leaf,
  Users,
  Shield,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Target,
  Calendar,
  Download,
  Share2,
  ArrowLeft,
  Home,
  BarChart3
} from "lucide-react";
import { Link, useLocation } from "wouter";
import PowerBIESGDashboard from "@/components/powerbi-esg-dashboard";

// ESG Scoring data structure
interface ESGScore {
  category: string;
  score: number;
  maxScore: number;
  breakdown: {
    factor: string;
    score: number;
    weight: number;
  }[];
}

interface ProjectAssessment {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  overallScore: number;
  riskBand: "LOW" | "MEDIUM" | "HIGH";
  esgScores: {
    environmental: ESGScore;
    social: ESGScore;
    governance: ESGScore;
  };
  predictions: {
    successProbability: number;
    projectedIRR: number;
    paybackPeriod: number;
    co2Reduction: number;
    jobsCreated: number;
  };
  assessmentDate: string;
  confidence: number;
}

export default function WebESGDashboard() {
  const [selectedProject, setSelectedProject] = useState<string>("solar-farm-lagos");
  const [location] = useLocation();
  const [showBackButton, setShowBackButton] = useState(true);

  // Sample ESG assessment data
  const projectAssessments: ProjectAssessment[] = [
    {
      id: "solar-farm-lagos",
      name: "Lagos Solar Farm Project",
      type: "Solar",
      capacity: 50,
      location: "Lagos, Nigeria",
      overallScore: 8.4,
      riskBand: "LOW",
      esgScores: {
        environmental: {
          category: "Environmental",
          score: 9.2,
          maxScore: 10,
          breakdown: [
            { factor: "Carbon Footprint", score: 9.5, weight: 0.4 },
            { factor: "Resource Efficiency", score: 9.0, weight: 0.3 },
            { factor: "Waste Management", score: 8.8, weight: 0.3 }
          ]
        },
        social: {
          category: "Social",
          score: 8.1,
          maxScore: 10,
          breakdown: [
            { factor: "Community Impact", score: 8.5, weight: 0.4 },
            { factor: "Job Creation", score: 7.8, weight: 0.3 },
            { factor: "Health & Safety", score: 8.0, weight: 0.3 }
          ]
        },
        governance: {
          category: "Governance",
          score: 7.9,
          maxScore: 10,
          breakdown: [
            { factor: "Transparency", score: 8.2, weight: 0.4 },
            { factor: "Risk Management", score: 7.5, weight: 0.3 },
            { factor: "Compliance", score: 8.0, weight: 0.3 }
          ]
        }
      },
      predictions: {
        successProbability: 94.2,
        projectedIRR: 18.5,
        paybackPeriod: 7.2,
        co2Reduction: 125000,
        jobsCreated: 450
      },
      assessmentDate: "2025-01-23",
      confidence: 94.2
    },
    {
      id: "wind-farm-kano",
      name: "Kano Wind Energy Project",
      type: "Wind",
      capacity: 75,
      location: "Kano, Nigeria",
      overallScore: 7.8,
      riskBand: "MEDIUM",
      esgScores: {
        environmental: {
          category: "Environmental",
          score: 8.9,
          maxScore: 10,
          breakdown: [
            { factor: "Carbon Footprint", score: 9.3, weight: 0.4 },
            { factor: "Resource Efficiency", score: 8.7, weight: 0.3 },
            { factor: "Waste Management", score: 8.6, weight: 0.3 }
          ]
        },
        social: {
          category: "Social",
          score: 7.2,
          maxScore: 10,
          breakdown: [
            { factor: "Community Impact", score: 7.5, weight: 0.4 },
            { factor: "Job Creation", score: 6.8, weight: 0.3 },
            { factor: "Health & Safety", score: 7.3, weight: 0.3 }
          ]
        },
        governance: {
          category: "Governance",
          score: 7.3,
          maxScore: 10,
          breakdown: [
            { factor: "Transparency", score: 7.8, weight: 0.4 },
            { factor: "Risk Management", score: 6.9, weight: 0.3 },
            { factor: "Compliance", score: 7.2, weight: 0.3 }
          ]
        }
      },
      predictions: {
        successProbability: 87.5,
        projectedIRR: 16.2,
        paybackPeriod: 8.5,
        co2Reduction: 180000,
        jobsCreated: 320
      },
      assessmentDate: "2025-01-22",
      confidence: 87.5
    }
  ];

  const currentProject = projectAssessments.find(p => p.id === selectedProject) || projectAssessments[0];

  const getRiskBandColor = (band: string) => {
    switch (band) {
      case "LOW": return "bg-green-500 text-white";
      case "MEDIUM": return "bg-yellow-500 text-white";
      case "HIGH": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  // Chart data
  const esgBreakdownData = [
    { name: "Environmental", score: currentProject.esgScores.environmental.score, color: "#22c55e" },
    { name: "Social", score: currentProject.esgScores.social.score, color: "#3b82f6" },
    { name: "Governance", score: currentProject.esgScores.governance.score, color: "#8b5cf6" }
  ];

  const performanceMetrics = [
    { metric: "Success Probability", value: currentProject.predictions.successProbability, unit: "%" },
    { metric: "Projected IRR", value: currentProject.predictions.projectedIRR, unit: "%" },
    { metric: "Payback Period", value: currentProject.predictions.paybackPeriod, unit: "years" },
    { metric: "CO₂ Reduction", value: currentProject.predictions.co2Reduction / 1000, unit: "kt/year" }
  ];

  const radialData = [
    { name: "Overall ESG Score", value: currentProject.overallScore * 10, fill: "#22c55e" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            <Link href="/demo-access">
              <Button variant="outline" size="sm" className="self-start">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Demo
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">ESG Assessment Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Comprehensive ESG scoring methodology and framework for renewable energy projects</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button variant="outline" className="flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Export Framework
            </Button>
            <Button variant="outline" className="flex items-center gap-2 text-sm">
              <Share2 className="w-4 h-4" />
              Share Methodology
            </Button>
          </div>
        </div>

        {/* ESG Framework Overview */}
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Leaf className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">Environmental</p>
                  <p className="text-xs text-green-600">Carbon impact, resource efficiency</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">Social</p>
                  <p className="text-xs text-blue-600">Community impact, job creation</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-semibold text-purple-800">Governance</p>
                  <p className="text-xs text-purple-600">Transparency, compliance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ESG Methodology Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">AI Model Accuracy</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
                    94.2%
                  </p>
                </div>
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              </div>
              <Badge className="mt-2 text-xs bg-green-500 text-white">
                XGBoost ENGINE
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">ESG Factors</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
                    30+
                  </p>
                </div>
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Multi-factor analysis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Risk Bands</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">
                    3
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Low, Medium, High
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Market Coverage</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">
                    West Africa
                  </p>
                </div>
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                5+ Countries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* ESG Score Breakdown */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  ESG Score Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <Tabs defaultValue="overview" className="w-full">
                  <div className="w-full overflow-x-auto mb-4 sm:mb-6">
                    <TabsList className="inline-flex w-max min-w-full h-8 sm:h-10">
                      <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-3 whitespace-nowrap">Overview</TabsTrigger>
                      <TabsTrigger value="powerbi" className="text-xs sm:text-sm px-2 sm:px-3 whitespace-nowrap">PowerBI</TabsTrigger>
                      <TabsTrigger value="environmental" className="text-xs sm:text-sm px-2 sm:px-3 whitespace-nowrap">Environment</TabsTrigger>
                      <TabsTrigger value="social" className="text-xs sm:text-sm px-2 sm:px-3 whitespace-nowrap">Social</TabsTrigger>
                      <TabsTrigger value="governance" className="text-xs sm:text-sm px-2 sm:px-3 whitespace-nowrap">Governance</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">ESG Scoring Framework</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Environmental (40%)</span>
                            <Badge className="bg-green-100 text-green-800">High Impact</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Social (35%)</span>
                            <Badge className="bg-blue-100 text-blue-800">Community Focus</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Governance (25%)</span>
                            <Badge className="bg-purple-100 text-purple-800">Risk Mgmt</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">AI Model Features</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">XGBoost Algorithm</span>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Multi-Factor Analysis</span>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Real-time Scoring</span>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="powerbi" className="space-y-4">
                    <div className="w-full">
                      <PowerBIESGDashboard isMobile={false} showTitle={false} />
                    </div>
                  </TabsContent>

                  <TabsContent value="environmental" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-green-600" />
                            Environmental Factors
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Carbon Footprint Reduction</span>
                              <span className="text-green-600">40% Weight</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Resource Efficiency</span>
                              <span className="text-green-600">30% Weight</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Waste Management</span>
                              <span className="text-green-600">30% Weight</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Assessment Criteria</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-600">
                          <p>• CO₂ emissions reduction potential</p>
                          <p>• Renewable energy generation capacity</p>
                          <p>• Environmental impact mitigation</p>
                          <p>• Biodiversity protection measures</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="social" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            Social Impact Factors
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Community Engagement</span>
                              <span className="text-blue-600">40% Weight</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Job Creation</span>
                              <span className="text-blue-600">30% Weight</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Health & Safety</span>
                              <span className="text-blue-600">30% Weight</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Assessment Criteria</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-600">
                          <p>• Local community benefits</p>
                          <p>• Employment opportunities created</p>
                          <p>• Skills development programs</p>
                          <p>• Health and safety standards</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="governance" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Shield className="w-4 h-4 text-purple-600" />
                            Governance Factors
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Transparency</span>
                              <span className="text-purple-600">40% Weight</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Risk Management</span>
                              <span className="text-purple-600">30% Weight</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Regulatory Compliance</span>
                              <span className="text-purple-600">30% Weight</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Assessment Criteria</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-600">
                          <p>• Financial transparency standards</p>
                          <p>• Risk mitigation strategies</p>
                          <p>• Regulatory compliance tracking</p>
                          <p>• Stakeholder engagement protocols</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* ESG Methodology & Tools */}
          <div className="space-y-4 sm:space-y-6">
            {/* AI Model Performance */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">AI Model Performance</CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Model Accuracy</span>
                    <span className="text-xl font-bold text-green-600">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-800">Training Data</div>
                      <div className="text-blue-600">1000+ Projects</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <div className="font-semibold text-green-800">Validation</div>
                      <div className="text-green-600">Cross-validated</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Features */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  Platform Features
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Real-time ESG scoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Multi-currency analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Risk band classification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>PowerBI integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Mobile optimization</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Guide */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2 text-sm">Quick Start Guide</h4>
                  <p className="text-xs text-blue-700 mb-2">
                    Use the PowerBI tab to analyze specific projects with real-time data.
                  </p>
                  <Link href="/powerbi-dashboard">
                    <Button size="sm" className="text-xs">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analyze Projects
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Review ESG methodology above</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Switch to PowerBI for project analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Compare multiple projects and risk factors</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access Links */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">Platform Navigation</CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Link href="/powerbi-dashboard?from=demo">
                <Button variant="outline" className="w-full justify-start text-sm h-auto p-3">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">PowerBI Dashboard</div>
                    <div className="text-xs text-gray-500">Project Analysis</div>
                  </div>
                </Button>
              </Link>
              <Link href="/mobile-scoring?platform=mobile&from=demo">
                <Button variant="outline" className="w-full justify-start text-sm h-auto p-3">
                  <Target className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Mobile Scoring</div>
                    <div className="text-xs text-gray-500">ESG Assessment</div>
                  </div>
                </Button>
              </Link>
              <Link href="/ai-risk-simulation?from=demo">
                <Button variant="outline" className="w-full justify-start text-sm h-auto p-3">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">AI Risk Simulation</div>
                    <div className="text-xs text-gray-500">Country Comparison</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}