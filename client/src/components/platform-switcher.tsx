import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Monitor, ArrowRight, Download, Globe } from "lucide-react";

interface PlatformSwitcherProps {
  currentPlatform?: "web" | "mobile";
  variant?: "card" | "banner" | "menu";
  className?: string;
}

export default function PlatformSwitcher({ 
  currentPlatform = "web", 
  variant = "card", 
  className = "" 
}: PlatformSwitcherProps) {
  
  const platforms = {
    web: {
      name: "Web Platform",
      icon: Monitor,
      url: "https://www.finergycloud.com",
      description: "Full-featured desktop experience with advanced analytics",
      features: ["AI-Powered Analytics", "Advanced Reporting", "Portfolio Management"],
      badge: "Desktop & Tablet"
    },
    mobile: {
      name: "Mobile App",
      icon: Smartphone,
      url: "#", // This will be updated when mobile app is deployed
      description: "On-the-go investment tracking and quick insights",
      features: ["Real-time Notifications", "Quick Actions", "Offline Access"],
      badge: "iOS & Android"
    }
  };

  const otherPlatform = currentPlatform === "web" ? "mobile" : "web";
  const platform = platforms[otherPlatform];
  const Icon = platform.icon;

  if (variant === "banner") {
    return (
      <div className={`bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 text-green-600" />
            <div>
              <h4 className="font-semibold text-gray-900">Try our {platform.name}</h4>
              <p className="text-sm text-gray-600">{platform.description}</p>
            </div>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
            <a href={platform.url} target="_blank" rel="noopener noreferrer">
              {otherPlatform === "mobile" ? <Download className="w-4 h-4 mr-1" /> : <Globe className="w-4 h-4 mr-1" />}
              {otherPlatform === "mobile" ? "Get App" : "Open Web"}
            </a>
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <Button
        variant="ghost"
        className={`w-full justify-start ${className}`}
        asChild
      >
        <a href={platform.url} target="_blank" rel="noopener noreferrer">
          <Icon className="w-4 h-4 mr-2" />
          Switch to {platform.name}
          <ArrowRight className="w-3 h-3 ml-auto" />
        </a>
      </Button>
    );
  }

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-green-600" />
            {platform.name}
          </CardTitle>
          <Badge variant="secondary">{platform.badge}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{platform.description}</p>
        <ul className="space-y-1 mb-4">
          {platform.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-center">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
          <a href={platform.url} target="_blank" rel="noopener noreferrer">
            {otherPlatform === "mobile" ? (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download App
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 mr-2" />
                Open Web Platform
              </>
            )}
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}