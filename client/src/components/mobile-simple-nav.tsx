import React from 'react';
import { Link } from 'wouter';
import { 
  BarChart3, 
  FolderOpen, 
  Gift, 
  TrendingUp, 
  Brain, 
  Newspaper, 
  Calculator, 
  TreePine, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SimpleNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const mobileAppNavItems = [
  { path: "/", label: "Dashboard", icon: BarChart3 },
  { path: "/project-management", label: "Projects", icon: FolderOpen },
  { path: "/rewards", label: "Rewards", icon: Gift },
  { path: "/kpi", label: "Analytics", icon: TrendingUp },
  { path: "/ai-model", label: "AI Model", icon: Brain },
  { path: "/market-insights", label: "Market Insights", icon: Newspaper },
  { path: "/irr-calculator", label: "IRR Calculator", icon: Calculator },
  { path: "/esg-scoring", label: "ESG Scoring", icon: TreePine },
  { path: "/advanced-features", label: "Advanced Features", icon: Settings },
];

export function MobileSimpleNav({ isOpen, onToggle }: SimpleNavProps) {
  const currentPath = window.location.pathname;

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: any }) => {
    const isActive = currentPath === path || (path === "/" && currentPath === "/");
    const linkPath = `${path}?platform=mobile`;
    
    return (
      <Link href={linkPath}>
        <div 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
            isActive 
              ? 'bg-green-100 text-green-700' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={onToggle}
        >
          <Icon className="w-5 h-5 mr-3" />
          {label}
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-md bg-white shadow-lg border"
        onClick={onToggle}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Side Navigation */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-[65] lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 pt-16">
          <h2 className="text-lg font-bold text-gray-900 mb-6">FinergyCloud Studio</h2>
          <nav className="space-y-2">
            {mobileAppNavItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}