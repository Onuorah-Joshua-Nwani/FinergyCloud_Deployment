import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useCurrencyFormat } from "@/hooks/use-currency-format";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { convertAndFormat } = useCurrencyFormat();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "completed":
        return "bg-primary/10 text-primary";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-success";
      case "medium":
        return "text-warning";
      case "high":
        return "text-error";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Link href="/projects">
      <Card className="hover:shadow-lg transition-shadow border hover:border-primary/30 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-medium text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-600">
                {project.capacity} MW • {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
              </p>
            </div>
            <Badge className={getStatusColor(project.status)}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">IRR</p>
              <p className="font-medium text-success">{project.expectedIRR || project.irr}%</p>
            </div>
            <div>
              <p className="text-gray-500">Investment</p>
              <p className="font-medium text-gray-900">{convertAndFormat(project.investmentAmount)}</p>
            </div>
            <div>
              <p className="text-gray-500">Risk</p>
              <p className={`font-medium ${getRiskColor(project.riskLevel)}`}>
                {typeof project.riskLevel === 'number' ? 
                  (project.riskLevel <= 3 ? 'Low' : project.riskLevel <= 6 ? 'Medium' : 'High') :
                  project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
