import React from "react";
import { Link } from "wouter";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MobileBreadcrumbProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
  backButtonLabel?: string;
  className?: string;
}

export default function MobileBreadcrumb({ 
  items, 
  showBackButton = true, 
  backButtonLabel = "Back to Dashboard",
  className = ""
}: MobileBreadcrumbProps) {
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';

  if (!isMobileApp) {
    return null; // Only show on mobile app
  }

  return (
    <div className={`mb-4 ${className}`}>
      {/* Back Button */}
      {showBackButton && (
        <div className="mb-3">
          <Link href="/?platform=mobile">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {backButtonLabel}
            </Button>
          </Link>
        </div>
      )}

      {/* Breadcrumb Trail */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;
          
          return (
            <React.Fragment key={item.path}>
              {isLast ? (
                <span className="flex items-center text-gray-900 font-medium">
                  {Icon && <Icon className="w-4 h-4 mr-1" />}
                  {item.label}
                </span>
              ) : (
                <Link href={`${item.path}?platform=mobile`}>
                  <span className="flex items-center hover:text-gray-900 cursor-pointer transition-colors">
                    {Icon && <Icon className="w-4 h-4 mr-1" />}
                    {item.label}
                  </span>
                </Link>
              )}
              
              {!isLast && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}

// Common breadcrumb configurations for different pages
export const commonBreadcrumbs = {
  dashboard: [
    { label: "Dashboard", path: "/", icon: Home }
  ],
  projects: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Projects", path: "/projects" }
  ],
  aiModel: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "AI Risk Engine", path: "/ai-model" }
  ],
  esgScoring: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "ESG Scoring", path: "/esg-scoring" }
  ],
  irrCalculator: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Financial Models", path: "/irr-calculator" }
  ],
  marketInsights: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Market Insights", path: "/market-insights" }
  ],
  kpiDashboard: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "KPI Dashboard", path: "/kpi" }
  ],
  advancedFeatures: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Advanced Features", path: "/advanced-features" }
  ],
  rewards: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Rewards", path: "/rewards" }
  ]
};