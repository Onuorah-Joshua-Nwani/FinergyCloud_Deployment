import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "wouter";
import { 
  Plus, 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Zap,
  Sun,
  Wind,
  Droplets,
  Leaf,
  Mountain,
  Edit,
  Trash2,
  Eye,
  Home,
  ChevronRight,
} from "lucide-react";
import { insertProjectSchema, type Project, type InsertProject } from "@shared/schema";
import { useCurrencyFormat } from "@/hooks/use-currency-format";
import { useCurrency } from "@/lib/currency-context";
import type { Currency } from "@shared/currency";

// Project type configurations
const projectTypeConfigs = {
  solar: {
    name: "Solar",
    icon: Sun,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    description: "Photovoltaic solar energy systems"
  },
  wind: {
    name: "Wind",
    icon: Wind,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "Wind turbine energy generation"
  },
  hydro: {
    name: "Hydro",
    icon: Droplets,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    description: "Hydroelectric power systems"
  },
  biomass: {
    name: "Biomass",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    description: "Organic matter energy conversion"
  },
  geothermal: {
    name: "Geothermal",
    icon: Mountain,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: "Earth's thermal energy systems"
  }
};

// Regional mappings for automatic currency selection
const regionMappings = {
  nigeria: { 
    currency: "NGN" as Currency, 
    cities: ["Lagos", "Abuja", "Kano", "Port Harcourt", "Ibadan", "Enugu", "Kaduna"] 
  },
  uk: { 
    currency: "GBP" as Currency, 
    cities: ["London", "Manchester", "Birmingham", "Glasgow", "Edinburgh", "Cardiff", "Belfast"] 
  },
  europe: { 
    currency: "EUR" as Currency, 
    cities: ["Berlin", "Paris", "Rome", "Madrid", "Amsterdam", "Brussels", "Vienna"] 
  }
};

const getAllCities = () => {
  return Object.values(regionMappings).flatMap(region => region.cities);
};

const getCurrencyFromLocation = (location: string): Currency => {
  for (const region of Object.values(regionMappings)) {
    if (region.cities.includes(location)) {
      return region.currency;
    }
  }
  return "NGN"; // Default
};

const getRiskLevel = (risk: number) => {
  if (risk <= 3) return { label: "Low", color: "bg-green-100 text-green-800", icon: "🟢" };
  if (risk <= 6) return { label: "Medium", color: "bg-yellow-100 text-yellow-800", icon: "🟡" };
  return { label: "High", color: "bg-red-100 text-red-800", icon: "🔴" };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-green-100 text-green-800";
    case "planned": return "bg-blue-100 text-blue-800";
    case "completed": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function ProjectManagement() {

  const { convertAndFormat } = useCurrencyFormat();
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch projects
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Create project form
  const form = useForm({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      name: "",
      type: "",
      location: "",
      capacity: 0,
      investmentAmount: 0,
      investmentCurrency: selectedCurrency,
      expectedIRR: 0,
      riskLevel: 1,
      status: "planned",
      description: "",
    },
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create project");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsCreateDialogOpen(false);
      form.reset();
    },
  });

  const onSubmit = (data: any) => {
    const currency = getCurrencyFromLocation(data.location);
    const projectData = {
      ...data,
      investmentCurrency: currency
    };
    createProjectMutation.mutate(projectData);
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const config = projectTypeConfigs[project.type as keyof typeof projectTypeConfigs];
    const IconComponent = config?.icon || Building2;
    const riskLevel = getRiskLevel(project.riskLevel);

    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setSelectedProject(project)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config?.bgColor} ${config?.borderColor} border`}>
                <IconComponent className={`w-5 h-5 ${config?.color}`} />
              </div>
              <div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <p className="text-sm text-gray-600">{config?.name} • {project.location}</p>
              </div>
            </div>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Capacity:</span>
              <span className="font-medium ml-2">{project.capacity} MW</span>
            </div>
            <div>
              <span className="text-gray-600">Investment:</span>
              <span className="font-medium ml-2">
                {convertAndFormat(project.investmentAmount, project.investmentCurrency as Currency)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Expected IRR:</span>
              <span className="font-medium ml-2">{project.expectedIRR}%</span>
            </div>
            <div>
              <span className="text-gray-600">Risk Level:</span>
              <Badge className={`ml-2 ${riskLevel.color}`}>
                {riskLevel.icon} {riskLevel.label}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProjectDetailsDialog = () => {
    if (!selectedProject) return null;

    const config = projectTypeConfigs[selectedProject.type as keyof typeof projectTypeConfigs];
    const IconComponent = config?.icon || Building2;
    const riskLevel = getRiskLevel(selectedProject.riskLevel);

    return (
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config?.bgColor} ${config?.borderColor} border`}>
                <IconComponent className={`w-5 h-5 ${config?.color}`} />
              </div>
              {selectedProject.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Project Overview */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Project Type</label>
                  <p className="text-lg">{config?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedProject.location}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <Badge className={getStatusColor(selectedProject.status)}>
                    {selectedProject.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Capacity</label>
                  <p className="text-lg flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {selectedProject.capacity} MW
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Investment</label>
                  <p className="text-lg flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {convertAndFormat(selectedProject.investmentAmount, selectedProject.investmentCurrency as Currency)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Risk Level</label>
                  <Badge className={riskLevel.color}>
                    {riskLevel.icon} {riskLevel.label}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Financial Metrics */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Financial Metrics
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{selectedProject.expectedIRR}%</p>
                  <p className="text-sm text-gray-600">Expected IRR</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {convertAndFormat(selectedProject.investmentAmount * 0.15, selectedProject.investmentCurrency as Currency)}
                  </p>
                  <p className="text-sm text-gray-600">Est. Annual Returns</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(100 / selectedProject.expectedIRR * 10) / 10} years
                  </p>
                  <p className="text-sm text-gray-600">Payback Period</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {selectedProject.description && (
              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="mt-1 text-gray-900">{selectedProject.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                Edit Project
              </Button>
              <Button variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
            <p className="text-gray-600 mt-2">Manage and onboard renewable energy projects</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(projectTypeConfigs).map(([key, config]) => {
                                const IconComponent = config.icon;
                                return (
                                  <SelectItem key={key} value={key}>
                                    <div className="flex items-center gap-2">
                                      <IconComponent className={`w-4 h-4 ${config.color}`} />
                                      <span>{config.name}</span>
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              const currency = getCurrencyFromLocation(value);
                              setSelectedCurrency(currency);
                              form.setValue('investmentCurrency', currency);
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <div className="space-y-2">
                                <div className="px-2 py-1 text-sm font-medium text-gray-500">Nigeria</div>
                                {regionMappings.nigeria.cities.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                                <div className="px-2 py-1 text-sm font-medium text-gray-500">United Kingdom</div>
                                {regionMappings.uk.cities.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                                <div className="px-2 py-1 text-sm font-medium text-gray-500">Europe</div>
                                {regionMappings.europe.cities.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </div>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity (MW)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1" 
                              min="0" 
                              placeholder="Enter capacity"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="investmentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Investment Amount ({selectedCurrency})</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="1000" 
                              min="0" 
                              placeholder="Enter investment"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expectedIRR"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected IRR (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1" 
                              min="0" 
                              max="100"
                              placeholder="Enter IRR"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="riskLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Risk Level (1-10)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              max="10"
                              placeholder="Risk level"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="planned">Planned</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter project description"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      disabled={createProjectMutation.isPending}
                      className="flex-1"
                    >
                      {createProjectMutation.isPending ? "Creating..." : "Create Project"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Create your first renewable energy project to get started</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Project Details Dialog */}
        <ProjectDetailsDialog />
        </div>
      </div>
  );
}