import { Button } from "@/components/ui/button";
import { Github, Linkedin, Youtube, Facebook, FileText, ExternalLink } from "lucide-react";

interface SocialLinksProps {
  variant?: "default" | "footer" | "sidebar";
  showLabels?: boolean;
  className?: string;
}

export default function SocialLinks({ variant = "default", showLabels = false, className = "" }: SocialLinksProps) {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud",
      icon: Github,
      color: "hover:text-gray-900"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/finergycloud",
      icon: Linkedin,
      color: "hover:text-blue-600"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@FinergyCloud_official",
      icon: Youtube,
      color: "hover:text-red-600"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/onuorah.joshua.nwani",
      icon: Facebook,
      color: "hover:text-blue-700"
    },
    {
      name: "Medium",
      url: "https://medium.com/@onuorahani",
      icon: FileText,
      color: "hover:text-green-600"
    }
  ];

  if (variant === "footer") {
    return (
      <div className={`flex space-x-4 ${className}`}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-600 ${link.color} transition-colors duration-200`}
              title={link.name}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className={`space-y-2 ${className}`}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Button
              key={link.name}
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900"
              asChild
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <Icon className="w-4 h-4 mr-2" />
                {link.name}
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Button
            key={link.name}
            variant="outline"
            size={showLabels ? "default" : "icon"}
            className={`${link.color} border-gray-300`}
            asChild
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <Icon className={showLabels ? "w-4 h-4 mr-2" : "w-4 h-4"} />
              {showLabels && link.name}
              {showLabels && <ExternalLink className="w-3 h-3 ml-1" />}
            </a>
          </Button>
        );
      })}
    </div>
  );
}