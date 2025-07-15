import React from "react";
import { Link } from "wouter";
import { 
  Calculator, 
  Folder, 
  Brain,
  ArrowRight,
  Globe,
  BarChart3,
  Leaf,
  Trophy,
  TrendingUp,
  Users,
  Zap,
  Target,
  DollarSign,
  Activity,
  Shield,
  Award,
  MapPin,
  Calendar,
  Star,
  CheckCircle
} from "lucide-react";

export default function MobileBusinessDashboard() {
  // Real FinergyCloud business metrics for renewable energy investment platform
  const businessMetrics = {
    portfolioValue: 2850000,
    activeProjects: 12,
    monthlyROI: 15.2,
    esgScore: 8.4,
    totalCapacity: "285 MW",
    co2Avoided: "142,000 tons",
    jobsCreated: 1250,
    investmentPipeline: "$45M"
  };

  // Professional renewable energy projects
  const recentProjects = [
    {
      id: 1,
      name: "Solar Farm Lagos",
      location: "Lagos, Nigeria",
      type: "Solar PV",
      capacity: "50 MW",
      status: "Active",
      roi: "16.8%",
      esg: 8.9,
      investment: "$12M",
      progress: 85
    },
    {
      id: 2,
      name: "Wind Project Accra",
      location: "Accra, Ghana", 
      type: "Wind Turbine",
      capacity: "75 MW",
      status: "Development",
      roi: "14.2%",
      esg: 8.1,
      investment: "$18M",
      progress: 65
    },
    {
      id: 3,
      name: "Hydroelectric Kaduna",
      location: "Kaduna, Nigeria",
      type: "Hydro",
      capacity: "25 MW", 
      status: "Planning",
      roi: "17.5%",
      esg: 8.7,
      investment: "$8M",
      progress: 25
    }
  ];

  const quickActions = [
    {
      title: "New Project Assessment",
      description: "AI-powered project feasibility analysis",
      icon: Brain,
      href: "/ai-model?platform=mobile",
      color: "bg-purple-500",
      badge: "94% Accuracy"
    },
    {
      title: "ESG Risk Scoring",
      description: "Environmental impact assessment",
      icon: Globe,
      href: "/esg-scoring?platform=mobile",
      color: "bg-green-500",
      badge: "Real-time"
    },
    {
      title: "Financial Modeling",
      description: "Multi-currency IRR calculations",
      icon: Calculator,
      href: "/irr-calculator?platform=mobile",
      color: "bg-blue-500",
      badge: "NGN/GBP/EUR"
    },
    {
      title: "Portfolio Analytics",
      description: "Investment performance tracking",
      icon: BarChart3,
      href: "/kpi?platform=mobile",
      color: "bg-orange-500",
      badge: "Live Data"
    }
  ];

  const kpiMetrics = [
    { 
      label: "Portfolio Value", 
      value: `$${(businessMetrics.portfolioValue / 1000000).toFixed(1)}M`, 
      icon: DollarSign, 
      color: "text-green-600",
      change: "+12.5%"
    },
    { 
      label: "Active Projects", 
      value: businessMetrics.activeProjects.toString(), 
      icon: Folder, 
      color: "text-blue-600",
      change: "+3 new"
    },
    { 
      label: "Monthly ROI", 
      value: `${businessMetrics.monthlyROI}%`, 
      icon: TrendingUp, 
      color: "text-purple-600",
      change: "+2.1%"
    },
    { 
      label: "ESG Score", 
      value: businessMetrics.esgScore.toString(), 
      icon: Leaf, 
      color: "text-green-600",
      change: "Excellent"
    },
    { 
      label: "Total Capacity", 
      value: businessMetrics.totalCapacity, 
      icon: Zap, 
      color: "text-yellow-600",
      change: "+45 MW"
    },
    { 
      label: "CO₂ Avoided", 
      value: `${(parseInt(businessMetrics.co2Avoided.replace(/,/g, '')) / 1000).toFixed(0)}K tons`, 
      icon: Shield, 
      color: "text-green-600",
      change: "This year"
    }
  ];

  const ProjectCard = ({ project }: { project: any }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{project.name}</h3>
          <p className="text-xs text-gray-600 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {project.location}
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">{project.roi}</div>
          <div className="text-xs text-gray-600">Expected ROI</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">{project.type}</span>
        <span className="text-sm font-medium text-gray-900">{project.capacity}</span>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-600">Progress</span>
        <span className="text-xs font-medium text-gray-900">{project.progress}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${project.progress}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          project.status === 'Active' 
            ? 'bg-green-100 text-green-700'
            : project.status === 'Development'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {project.status}
        </span>
        <span className="text-sm font-medium text-gray-900">{project.investment}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                FinergyCloud Business Dashboard
              </h1>
              <p className="text-gray-600">
                AI-powered renewable energy investment platform
              </p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Live Platform
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {kpiMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <span className="text-xs text-gray-500">{metric.change}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${action.color} bg-opacity-10`}>
                      <action.icon className={`w-5 h-5 ${action.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {action.badge}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Projects</h2>
            <Link href="/project-management?platform=mobile">
              <span className="text-sm text-blue-600 hover:text-blue-700 flex items-center cursor-pointer">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Business Impact Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{businessMetrics.totalCapacity}</div>
              <div className="text-sm text-gray-600">Total Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{businessMetrics.co2Avoided}</div>
              <div className="text-sm text-gray-600">CO₂ Avoided</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{businessMetrics.jobsCreated.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Jobs Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{businessMetrics.investmentPipeline}</div>
              <div className="text-sm text-gray-600">Pipeline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}