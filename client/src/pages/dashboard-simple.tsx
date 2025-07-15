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
  Target
} from "lucide-react";

export default function DashboardSimple() {
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';

  const quickActions = [
    {
      title: "New Project",
      description: "Create a new renewable energy project",
      icon: Folder,
      href: "/project-management?platform=mobile",
      color: "bg-blue-500",
    },
    {
      title: "AI Predictions",
      description: "Get AI-powered project insights",
      icon: Brain,
      href: "/ai-model?platform=mobile",
      color: "bg-purple-500",
    },
    {
      title: "ESG Scoring",
      description: "Evaluate sustainability metrics",
      icon: Globe,
      href: "/esg-scoring?platform=mobile",
      color: "bg-green-500",
    },
    {
      title: "Financial Models",
      description: "Calculate project returns",
      icon: Calculator,
      href: "/irr-calculator?platform=mobile",
      color: "bg-yellow-500",
    },
  ];

  const stats = [
    { label: "Active Projects", value: "12", icon: Folder, color: "text-blue-600" },
    { label: "Total Investment", value: "$2.4M", icon: TrendingUp, color: "text-green-600" },
    { label: "AI Predictions", value: "94%", icon: Brain, color: "text-purple-600" },
    { label: "ESG Score", value: "8.7", icon: Leaf, color: "text-emerald-600" },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Solar Farm Lagos",
      type: "Solar",
      location: "Lagos, Nigeria",
      capacity: "50MW",
      progress: 65,
      status: "Active"
    },
    {
      id: 2,
      name: "Wind Project Ghana",
      type: "Wind", 
      location: "Accra, Ghana",
      capacity: "30MW",
      progress: 40,
      status: "Planning"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {isMobileApp ? "FinergyCloud Studio" : "Dashboard"}
          </h1>
          <p className="text-gray-600">
            {isMobileApp 
              ? "AI-powered ESG risk scoring platform - Beta testing with 10 users"
              : "Renewable energy investment analytics platform"
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            <Link href="/project-management?platform=mobile">
              <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                View All <ArrowRight className="w-4 h-4 inline ml-1" />
              </span>
            </Link>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{project.type}</span>
                      <span>{project.capacity}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Progress</div>
                    <div className="text-lg font-semibold text-gray-900">{project.progress}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}