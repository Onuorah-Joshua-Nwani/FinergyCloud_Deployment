import React from "react";
import { Link } from "wouter";
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
  CheckCircle
} from "lucide-react";

export default function ESGScoringSimple() {
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
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{score}</div>
          <div className="text-sm text-gray-600">/ 10</div>
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
      <div className="grid grid-cols-3 gap-4 mt-4">
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
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Link href="/?platform=mobile">
            <span className="hover:text-gray-900 cursor-pointer">
              <Home className="w-4 h-4 inline mr-1" />
              Dashboard
            </span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">ESG Scoring</span>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Generate ESG Report
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Compare Projects
          </button>
        </div>
      </div>
    </div>
  );
}