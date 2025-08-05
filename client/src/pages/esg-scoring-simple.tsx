import React, { useState } from "react";
import { Link } from "wouter";
import MobileBreadcrumb, { commonBreadcrumbs } from "@/components/mobile-breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Globe, 
  Home, 
  ChevronRight, 
  Leaf, 
  Users, 
  Shield, 
  TrendingUp,
  BarChart3,
  Target,
  Star,
  CheckCircle,
  FileText,
  GitCompare,
  Download,
  Eye
} from "lucide-react";

export default function ESGScoringSimple() {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  
  const esgData = {
    overall: 8.4,
    environmental: 8.9,
    social: 7.8,
    governance: 8.5
  };

  const projects = [
    {
      id: 1,
      name: "Solar Farm Lagos",
      type: "Solar",
      location: "Lagos, Nigeria",
      esg: { overall: 8.2, environmental: 8.8, social: 7.5, governance: 8.3 }
    },
    {
      id: 2,
      name: "Wind Project Ghana", 
      type: "Wind",
      location: "Accra, Ghana",
      esg: { overall: 8.6, environmental: 9.0, social: 8.1, governance: 8.7 }
    }
  ];

  const ESGCard = ({ title, score, icon: Icon, description, color }: any) => (
    <div className="bg-white rounded-lg mobile-p-2 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 sm:p-3 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
          </div>
          <div>
            <h3 className="mobile-text-base font-semibold text-gray-900">{title}</h3>
            <p className="mobile-text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="mobile-text-2xl font-bold text-gray-900">{score}</div>
          <div className="mobile-text-sm text-gray-600">/ 10</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color} bg-opacity-80`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );

  const ProjectESG = ({ project }: any) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-600">{project.location}</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">{project.esg.overall}</div>
          <div className="text-sm text-gray-600">Overall ESG</div>
        </div>
      </div>
      <div className="mobile-grid-3 mobile-gap-2 mt-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">{project.esg.environmental}</div>
          <div className="text-xs text-gray-600">Environmental</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">{project.esg.social}</div>
          <div className="text-xs text-gray-600">Social</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">{project.esg.governance}</div>
          <div className="text-xs text-gray-600">Governance</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Breadcrumb Navigation */}
        <MobileBreadcrumb items={commonBreadcrumbs.esgScoring} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            ESG Scoring
          </h1>
          <p className="text-gray-600">
            Environmental, Social, and Governance assessment for renewable energy projects
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{esgData.overall}</div>
            <div className="text-lg text-gray-600 mb-4">Overall ESG Score</div>
            <div className="flex justify-center items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">Excellent Rating</span>
            </div>
          </div>
        </div>

        {/* ESG Categories */}
        <div className="mobile-grid-3 mobile-gap-4 mb-8">
          <ESGCard 
            title="Environmental"
            score={esgData.environmental}
            icon={Leaf}
            description="Carbon footprint, renewable energy usage"
            color="text-green-600"
          />
          <ESGCard 
            title="Social"
            score={esgData.social}
            icon={Users}
            description="Community impact, workforce diversity"
            color="text-blue-600"
          />
          <ESGCard 
            title="Governance"
            score={esgData.governance}
            icon={Shield}
            description="Ethics, transparency, board structure"
            color="text-purple-600"
          />
        </div>

        {/* Key Metrics */}
        <div className="mobile-grid-4 mobile-gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-sm text-gray-600">Renewable Energy</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12,500</div>
            <div className="text-sm text-gray-600">Jobs Created</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">85%</div>
            <div className="text-sm text-gray-600">Board Independence</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
            <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.2M</div>
            <div className="text-sm text-gray-600">CO2 Avoided (tons)</div>
          </div>
        </div>

        {/* Project Scores */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Project ESG Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectESG key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Action Buttons - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button 
            onClick={() => setShowReportDialog(true)}
            className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate ESG Report
          </Button>
          <Button 
            onClick={() => setShowCompareDialog(true)}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            <GitCompare className="w-4 h-4 mr-2" />
            Compare Projects
          </Button>
        </div>

        {/* ESG Report Dialog - Mobile Responsive */}
        <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                ESG Performance Report
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                  {esgData.overall}/10
                </div>
                <p className="text-sm sm:text-base text-gray-600">Overall ESG Score</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center p-2 sm:p-4 bg-green-50 rounded-lg">
                  <div className="text-base sm:text-xl font-bold text-green-600">{esgData.environmental}</div>
                  <p className="text-xs sm:text-sm text-gray-600">Environmental</p>
                </div>
                <div className="text-center p-2 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="text-base sm:text-xl font-bold text-blue-600">{esgData.social}</div>
                  <p className="text-xs sm:text-sm text-gray-600">Social</p>
                </div>
                <div className="text-center p-2 sm:p-4 bg-purple-50 rounded-lg">
                  <div className="text-base sm:text-xl font-bold text-purple-600">{esgData.governance}</div>
                  <p className="text-xs sm:text-sm text-gray-600">Governance</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">Key Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="truncate">95% Renewable Energy Usage</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="truncate">12,500 Jobs Created</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="truncate">4.2M Tons CO2 Avoided</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="truncate">85% Board Independence</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button className="flex-1 text-sm" onClick={() => alert('Download functionality would be implemented here')}>
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1 text-sm" onClick={() => alert('View detailed report functionality would be implemented here')}>
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Compare Projects Dialog - Mobile Responsive */}
        <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <GitCompare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                Project Comparison
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {projects.slice(0, 2).map((project) => (
                  <Card key={project.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                        <span className="truncate">{project.name}</span>
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{project.location}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                          <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">
                            {project.esg.overall}/10
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600">Overall ESG Score</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-gray-600">Environmental</span>
                            <span className="text-xs sm:text-sm font-medium">{project.esg.environmental}/10</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-gray-600">Social</span>
                            <span className="text-xs sm:text-sm font-medium">{project.esg.social}/10</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-gray-600">Governance</span>
                            <span className="text-xs sm:text-sm font-medium">{project.esg.governance}/10</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Comparison Summary</h3>
                <div className="text-xs sm:text-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Best Environmental Performance:</span>
                    <span className="font-medium text-right ml-2 truncate">{projects[0].name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Best Social Impact:</span>
                    <span className="font-medium text-right ml-2 truncate">{projects[1].name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Best Governance:</span>
                    <span className="font-medium text-right ml-2 truncate">{projects[0].name}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}