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
  currentPlatform, 
  variant = "card", 
  className = "" 
}: PlatformSwitcherProps) {
  // Auto-detect platform if not specified
  const detectedPlatform = currentPlatform || (() => {
    // Check URL parameters or default behavior
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const platformParam = urlParams.get('platform');
      if (platformParam === 'mobile') {
        return "mobile";
      } else if (platformParam === 'web') {
        return "web";
      }
      // Default to mobile for the base app URL
      return "mobile";
    }
    return "web";
  })();
  const actualCurrentPlatform = detectedPlatform;
  
  const platforms = {
    web: {
      name: "FinergyCloud Website",
      icon: Monitor,
      url: "/?platform=web",
      description: "Official FinergyCloud company website with full platform access",
      features: ["Company Information", "Full Web Platform", "Advanced Analytics", "Portfolio Management"],
      badge: "Official Website"
    },
    mobile: {
      name: "Mobile Investment App",
      icon: Smartphone,
      url: "/?platform=mobile",
      description: "Dedicated mobile app for renewable energy investment tracking",
      features: ["Portfolio Tracking", "Real-time Notifications", "Quick Actions", "Offline Access"],
      badge: "Mobile App"
    }
  };

  const otherPlatform = actualCurrentPlatform === "web" ? "mobile" : "web";
  const platform = platforms[otherPlatform];
  const Icon = platform.icon;

  if (variant === "banner") {
    return (
      <div className={`bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 text-green-600" />
            <div>
              <h4 className="font-semibold text-gray-900">{platform.name}</h4>
              <p className="text-sm text-gray-600">{platform.description}</p>
            </div>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
            <a href={platform.url} target="_blank" rel="noopener noreferrer">
              {otherPlatform === "mobile" ? <Download className="w-4 h-4 mr-1" /> : <Globe className="w-4 h-4 mr-1" />}
              {otherPlatform === "mobile" ? "Launch App" : "Visit Website"}
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
          {platform.name}
          <ArrowRight className="w-3 h-3 ml-auto" />
        </a>
      </Button>
    );
  }

  // For card variant, show the platform we're switching TO, not the current one
  const displayPlatform = platforms[otherPlatform];
  const DisplayIcon = displayPlatform.icon;

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DisplayIcon className="w-5 h-5 text-green-600" />
            {displayPlatform.name}
          </CardTitle>
          <Badge variant="secondary">{displayPlatform.badge}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{displayPlatform.description}</p>
        <ul className="space-y-1 mb-4">
          {displayPlatform.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-center">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
          <a href={displayPlatform.url} target="_blank" rel="noopener noreferrer">
            {otherPlatform === "mobile" ? (
              <>
                <Download className="w-4 h-4 mr-2" />
                Launch Mobile App
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 mr-2" />
                Visit Website
              </>
            )}
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}