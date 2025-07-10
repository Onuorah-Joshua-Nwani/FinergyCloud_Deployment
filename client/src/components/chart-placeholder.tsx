import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, LineChart, TrendingUp, Activity } from "lucide-react";

interface ChartPlaceholderProps {
  title: string;
  type?: "bar" | "line" | "area" | "radar";
  description?: string;
}

export default function ChartPlaceholder({ 
  title, 
  type = "line", 
  description = "Loading visualization..." 
}: ChartPlaceholderProps) {
  const getIcon = () => {
    switch (type) {
      case "bar":
        return BarChart3;
      case "line":
        return LineChart;
      case "area":
        return Activity;
      case "radar":
        return TrendingUp;
      default:
        return LineChart;
    }
  };

  const Icon = getIcon();

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <div className="h-48 md:h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center px-4">
            <Icon className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mb-2 md:mb-4 mx-auto" />
            <p className="text-sm md:text-base text-gray-500 font-medium line-clamp-1">{title}</p>
            <p className="text-xs md:text-sm text-gray-400 line-clamp-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
