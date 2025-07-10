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
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Globe, 
  Calendar, 
  Eye,
  Edit,
  Trash2,
  Lightbulb,
  DollarSign,
  Zap,
  Activity,
  ArrowRight,
  FileText,
  Filter,
  Home,
  ChevronRight
} from "lucide-react";
import { insertMarketInsightSchema, type MarketInsight, type InsertMarketInsight } from "@shared/schema";
import { useCurrencyFormat } from "@/hooks/use-currency-format";

const insightCategories = {
  market: {
    name: "Market Analysis",
    icon: BarChart3,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "Market trends and analysis"
  },
  technology: {
    name: "Technology",
    icon: Lightbulb,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    description: "Technology developments and innovations"
  },
  policy: {
    name: "Policy & Regulation",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    description: "Policy updates and regulatory changes"
  },
  investment: {
    name: "Investment Trends",
    icon: DollarSign,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    description: "Investment patterns and opportunities"
  },
  energy: {
    name: "Energy Markets",
    icon: Zap,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: "Energy sector developments"
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high": return "bg-red-100 text-red-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getTimeAgo = (date: string) => {
  const now = new Date();
  const insightDate = new Date(date);
  const diffInDays = Math.floor((now.getTime() - insightDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
};

export default function MarketInsights() {

  const { convertAndFormat } = useCurrencyFormat();
  const queryClient = useQueryClient();
  const [selectedInsight, setSelectedInsight] = useState<MarketInsight | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch market insights
  const { data: insights = [], isLoading } = useQuery<MarketInsight[]>({
    queryKey: ["/api/market-insights"],
  });

  // Create insight form
  const form = useForm({
    resolver: zodResolver(insertMarketInsightSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      impact: "medium",
      source: "",
      publishedAt: new Date().toISOString().split('T')[0],
    },
  });

  // Create insight mutation
  const createInsightMutation = useMutation({
    mutationFn: async (data: InsertMarketInsight) => {
      const response = await fetch("/api/market-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create insight");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/market-insights"] });
      setIsCreateDialogOpen(false);
      form.reset();
    },
  });

  const onSubmit = (data: any) => {
    createInsightMutation.mutate(data);
  };

  // Filter insights
  const filteredInsights = insights.filter(insight => {
    const matchesCategory = selectedCategory === "all" || insight.category === selectedCategory;
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const InsightCard = ({ insight }: { insight: MarketInsight }) => {
    const config = insightCategories[insight.category as keyof typeof insightCategories];
    const IconComponent = config?.icon || FileText;

    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setSelectedInsight(insight)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config?.bgColor} ${config?.borderColor} border`}>
                <IconComponent className={`w-5 h-5 ${config?.color}`} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2">{insight.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {config?.name} • {getTimeAgo(insight.publishedAt)}
                </p>
              </div>
            </div>
            <Badge className={getImpactColor(insight.impact)}>
              {insight.impact}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 line-clamp-3 text-sm mb-3">
            {insight.content}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Source: {insight.source}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Read more
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const InsightDetailsDialog = () => {
    if (!selectedInsight) return null;

    const config = insightCategories[selectedInsight.category as keyof typeof insightCategories];
    const IconComponent = config?.icon || FileText;

    return (
      <Dialog open={!!selectedInsight} onOpenChange={() => setSelectedInsight(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config?.bgColor} ${config?.borderColor} border`}>
                <IconComponent className={`w-5 h-5 ${config?.color}`} />
              </div>
              {selectedInsight.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Insight Metadata */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Category:</span>
                  <p className="font-medium">{config?.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Impact:</span>
                  <Badge className={getImpactColor(selectedInsight.impact)}>
                    {selectedInsight.impact}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-600">Published:</span>
                  <p className="font-medium">{getTimeAgo(selectedInsight.publishedAt)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Source:</span>
                  <p className="font-medium">{selectedInsight.source}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-lg font-medium mb-3">Full Analysis</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {selectedInsight.content}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                Edit Insight
              </Button>
              <Button variant="outline" className="flex-1">
                <Activity className="w-4 h-4 mr-2" />
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
            <h1 className="text-3xl font-bold text-gray-900">Market Insights</h1>
            <p className="text-gray-600 mt-2">Stay updated with renewable energy market trends and analysis</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Insight
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Market Insight</DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter insight title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(insightCategories).map(([key, config]) => {
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

                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="impact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Impact Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select impact" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low Impact</SelectItem>
                              <SelectItem value="medium">Medium Impact</SelectItem>
                              <SelectItem value="high">High Impact</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Source</FormLabel>
                          <FormControl>
                            <Input placeholder="Data source" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="publishedAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Published Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter detailed insight content"
                            className="min-h-[150px]"
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
                      disabled={createInsightMutation.isPending}
                      className="flex-1"
                    >
                      {createInsightMutation.isPending ? "Creating..." : "Create Insight"}
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

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(insightCategories).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{insights.length}</p>
              <p className="text-sm text-gray-600">Total Insights</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {insights.filter(i => i.impact === "high").length}
              </p>
              <p className="text-sm text-gray-600">High Impact</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {insights.filter(i => getTimeAgo(i.publishedAt).includes("days")).length}
              </p>
              <p className="text-sm text-gray-600">This Week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {new Set(insights.map(i => i.category)).size}
              </p>
              <p className="text-sm text-gray-600">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Insights Grid */}
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
        ) : filteredInsights.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchQuery || selectedCategory !== "all" ? "No insights found" : "No insights yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Create your first market insight to get started"}
            </p>
            {!searchQuery && selectedCategory === "all" && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Insight
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}

        {/* Insight Details Dialog */}
        <InsightDetailsDialog />
      </div>
    </div>
  );
}