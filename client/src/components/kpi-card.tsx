import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: "success" | "warning" | "primary" | "secondary";
}

export default function KPICard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  badge,
  badgeColor = "primary"
}: KPICardProps) {
  const badgeColorClasses = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-gray-100 text-gray-500"
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${
            badgeColor === "success" 
              ? "bg-success/10" 
              : badgeColor === "warning"
              ? "bg-warning/10"
              : badgeColor === "primary"
              ? "bg-primary/10"
              : "bg-secondary/10"
          }`}>
            <Icon className={`w-5 h-5 ${
              badgeColor === "success" 
                ? "text-success" 
                : badgeColor === "warning"
                ? "text-warning"
                : badgeColor === "primary"
                ? "text-primary"
                : "text-secondary"
            }`} />
          </div>
          {badge && (
            <span className={`text-xs px-2 py-1 rounded-full ${badgeColorClasses[badgeColor]}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
