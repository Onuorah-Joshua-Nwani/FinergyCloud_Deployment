import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Plus, 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Sun,
  Wind,
  Droplets,
  Leaf,
  Mountain,
  Eye,
  Edit,
  Trash2,
  Home,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency } from "@shared/currency";
import ProjectForm from "@/components/project-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectManagementSimple() {
  const { selectedCurrency } = useCurrency();
  
  // Fetch projects from database
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    },
  });

  // Add mock investment amounts for display purposes
  const enhancedProjects = projects.map((project: any) => ({
    ...project,
    investmentAmount: project.capacity * 50000, // Estimate $50k per MW
    progress: project.status === 'completed' ? 100 : 
              project.status === 'active' ? 65 : 
              project.status === 'planning' ? 25 : 50,
    startDate: project.createdAt ? new Date(project.createdAt).toISOString().split('T')[0] : "2024-01-01",
    expectedCompletion: project.status === 'completed' ? "2024-12-31" : "2025-06-30"
  }));

  const projectTypeConfigs = {
    solar: {
      name: "Solar",
      icon: Sun,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    wind: {
      name: "Wind", 
      icon: Wind,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    hydro: {
      name: "Hydro",
      icon: Droplets,
      color: "text-cyan-600", 
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200"
    },
    biomass: {
      name: "Biomass",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50", 
      borderColor: "border-green-200"
    },
    geothermal: {
      name: "Geothermal",
      icon: Mountain,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
              <p className="text-gray-600">Loading projects...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
              <p className="text-gray-600">Failed to load projects. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ProjectCard = ({ project }: { project: any }) => {
    const config = projectTypeConfigs[project.type as keyof typeof projectTypeConfigs];
    const Icon = config.icon;

    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
              <Icon className={`w-5 h-5 ${config.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                {project.location}
              </p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'Active' 
              ? 'bg-green-100 text-green-700'
              : project.status === 'Planning'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {project.status}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Capacity</span>
            <span className="font-medium">{project.capacity} MW</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Investment</span>
            <span className="font-medium">{formatCurrency(project.investmentAmount, selectedCurrency)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Expected IRR</span>
            <span className="font-medium text-green-600">{project.irr}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Link href={`/projects?platform=mobile&project=${project.id}`}>
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors">
              <Eye className="w-4 h-4 inline mr-2" />
              View Details
            </button>
          </Link>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

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
          <span className="text-gray-900">Projects</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Project Management
            </h1>
            <p className="text-gray-600">
              Manage your renewable energy projects and track their progress
            </p>
          </div>
          <ProjectForm 
            trigger={
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            }
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{enhancedProjects.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(enhancedProjects.reduce((sum, p) => sum + p.investmentAmount, 0), selectedCurrency)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. ROI</p>
                <p className="text-2xl font-bold text-gray-900">
                  {enhancedProjects.length > 0 ? (enhancedProjects.reduce((sum, p) => sum + p.irr, 0) / enhancedProjects.length).toFixed(1) : 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enhancedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}