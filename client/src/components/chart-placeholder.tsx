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
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <Icon className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
            <p className="text-gray-500 font-medium">{title}</p>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
