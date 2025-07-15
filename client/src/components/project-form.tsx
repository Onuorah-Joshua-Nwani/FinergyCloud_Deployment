import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, Loader2, Sun, Wind, Droplets, Leaf, Mountain, DollarSign } from "lucide-react";
import { insertProjectSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency } from "@shared/currency";
import type { Project } from "@shared/schema";

interface ProjectFormProps {
  trigger?: React.ReactNode;
  onSuccess?: (project: Project) => void;
}

const projectTypeOptions = [
  { value: "solar", label: "Solar", icon: Sun, color: "text-yellow-600" },
  { value: "wind", label: "Wind", icon: Wind, color: "text-blue-600" },
  { value: "hydro", label: "Hydro", icon: Droplets, color: "text-cyan-600" },
  { value: "biomass", label: "Biomass", icon: Leaf, color: "text-green-600" },
  { value: "geothermal", label: "Geothermal", icon: Mountain, color: "text-red-600" }
];

const locationOptions = [
  { value: "Lagos, Nigeria", label: "Lagos, Nigeria" },
  { value: "Abuja, Nigeria", label: "Abuja, Nigeria" },
  { value: "Kano, Nigeria", label: "Kano, Nigeria" },
  { value: "Port Harcourt, Nigeria", label: "Port Harcourt, Nigeria" },
  { value: "Accra, Ghana", label: "Accra, Ghana" },
  { value: "Kumasi, Ghana", label: "Kumasi, Ghana" },
  { value: "Cape Coast, Ghana", label: "Cape Coast, Ghana" },
  { value: "Tema, Ghana", label: "Tema, Ghana" }
];

const statusOptions = [
  { value: "planning", label: "Planning" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" }
];

const riskLevelOptions = [
  { value: "low", label: "Low Risk" },
  { value: "medium", label: "Medium Risk" },
  { value: "high", label: "High Risk" }
];

export default function ProjectForm({ trigger, onSuccess }: ProjectFormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { selectedCurrency } = useCurrency();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      name: "",
      type: "",
      location: "",
      capacity: 0,
      status: "planning",
      irr: 0,
      esgScore: 0,
      riskLevel: "medium",
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest(`/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setOpen(false);
      form.reset();
      onSuccess?.(data);
      toast({
        title: "Project Created",
        description: "New renewable energy project has been successfully created.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: any) => {
    createProjectMutation.mutate(data);
  };

  const selectedProjectType = form.watch("type");
  const selectedProjectTypeConfig = projectTypeOptions.find(type => type.value === selectedProjectType);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-green-600" />
            Create New Renewable Energy Project
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Solar Farm Lagos" {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectTypeOptions.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className={`w-4 h-4 ${type.color}`} />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationOptions.map((location) => (
                          <SelectItem key={location.value} value={location.value}>
                            {location.label}
                          </SelectItem>
                        ))}
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
                        placeholder="e.g., 50"
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="irr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected IRR (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        max="100"
                        placeholder="e.g., 15.5"
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
                name="esgScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ESG Score (0-10)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        max="10"
                        placeholder="e.g., 8.5"
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
                    <FormLabel>Risk Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {riskLevelOptions.map((risk) => (
                          <SelectItem key={risk.value} value={risk.value}>
                            {risk.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Project Summary */}
            {selectedProjectType && (
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {selectedProjectTypeConfig && (
                      <selectedProjectTypeConfig.icon className={`w-5 h-5 ${selectedProjectTypeConfig.color}`} />
                    )}
                    Project Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Type</p>
                      <Badge variant="outline" className="mt-1">
                        {selectedProjectTypeConfig?.label || selectedProjectType}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-600">Capacity</p>
                      <p className="font-medium">{form.watch("capacity")} MW</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Expected IRR</p>
                      <p className="font-medium">{form.watch("irr")}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ESG Score</p>
                      <p className="font-medium">{form.watch("esgScore")}/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createProjectMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {createProjectMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4 mr-2" />
                    Create Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}