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
  CheckCircle,
  Sun,
  Wind,
  Droplets,
  Monitor
} from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency } from "@shared/currency";

export default function MobileBusinessDashboard() {
  const { selectedCurrency } = useCurrency();
  
  // Real FinergyCloud business metrics for renewable energy investment platform
  const businessMetrics = [
    {
      title: "Portfolio Value",
      value: formatCurrency(2850000, selectedCurrency),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Projects",
      value: "12",
      icon: Folder,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Monthly ROI",
      value: "15.2%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "ESG Score",
      value: "8.4/10",
      icon: Leaf,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Total Capacity",
      value: "285 MW",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "CO2 Avoided",
      value: "142K tons",
      icon: Shield,
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    }
  ];

  // Professional renewable energy projects - currency-aware
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
      investment: formatCurrency(12000000, selectedCurrency),
      progress: 85,
      icon: Sun,
      color: "text-orange-600"
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
      investment: formatCurrency(18000000, selectedCurrency),
      progress: 65,
      icon: Wind,
      color: "text-blue-600"
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
      investment: formatCurrency(8000000, selectedCurrency),
      progress: 25,
      icon: Droplets,
      color: "text-cyan-600"
    }
  ];

  // Platform features - All links include mobile platform parameter
  const platformFeatures = [
    {
      title: "AI Predictions",
      description: "94% accuracy",
      icon: Brain,
      link: "/ai-model?platform=mobile"
    },
    {
      title: "ESG Scoring",
      description: "Real-time ESG",
      icon: Leaf,
      link: "/esg-scoring?platform=mobile"
    },
    {
      title: "IRR Calculator",
      description: "Multi-currency",
      icon: Calculator,
      link: "/irr-calculator?platform=mobile"
    },
    {
      title: "Market Insights",
      description: "West Africa",
      icon: Globe,
      link: "/market-insights?platform=mobile"
    },
    {
      title: "Project Management",
      description: "Portfolio",
      icon: Folder,
      link: "/project-management?platform=mobile"
    },
    {
      title: "KPI Dashboard",
      description: "Real-time",
      icon: BarChart3,
      link: "/kpi?platform=mobile"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-slate-900">
            FinergyCloud Business Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors cursor-pointer">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Website</span>
            </a>
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{selectedCurrency}</span>
            </div>
          </div>
        </div>
        <p className="text-slate-600 text-sm">
          Renewable Energy Investment Platform
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {businessMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
            <div className="flex items-center justify-center mb-2">
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 text-center">{metric.value}</h3>
            <p className="text-xs text-slate-500 text-center">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Platform Features */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Platform Features</h2>
        <div className="grid grid-cols-3 gap-3">
          {platformFeatures.map((feature, index) => (
            <Link key={index} href={feature.link}>
              <div className="bg-white rounded-xl p-2 shadow-md border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 h-[100px] flex flex-col group">
                <div className="flex items-center justify-center mb-1">
                  <div className="p-1 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <feature.icon className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-xs font-semibold text-slate-900 text-center mb-1 leading-tight px-1">{feature.title}</h3>
                  <p className="text-xs text-slate-600 text-center leading-tight overflow-hidden px-1">{feature.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Active Projects */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Active Projects</h2>
        <div className="space-y-3">
          {recentProjects.map((project, index) => (
            <Link key={index} href={`/projects?platform=mobile&project=${project.id}`}>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <project.icon className={`w-5 h-5 ${project.color} mr-3`} />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{project.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-green-600">{project.roi}</div>
                    <div className="text-xs text-slate-500">ROI</div>
                  </div>
                </div>
              
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-slate-500">Capacity</div>
                  <div className="font-medium">{project.capacity}</div>
                </div>
                <div>
                  <div className="text-slate-500">ESG Score</div>
                  <div className="font-medium">{project.esg}/10</div>
                </div>
                <div>
                  <div className="text-slate-500">Investment</div>
                  <div className="font-medium">{project.investment}</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500">Progress</span>
                  <span className="text-xs font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Business Impact Summary */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-4 text-white">
        <h2 className="text-lg font-semibold mb-3">Business Impact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold">1,250</div>
            <div className="text-sm opacity-90">Jobs Created</div>
          </div>
          <div>
            <div className="text-2xl font-bold">$45M</div>
            <div className="text-sm opacity-90">Investment Pipeline</div>
          </div>
        </div>
      </div>
    </div>
  );
}