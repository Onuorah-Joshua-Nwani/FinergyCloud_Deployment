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
  X,
  Globe,
  Award
} from 'lucide-react';
import CurrencySelector from './currency-selector';

interface SimpleNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const mobileAppNavItems = [
  { path: "/", label: "Dashboard", icon: BarChart3 },
  { path: "/projects", label: "Projects", icon: FolderOpen },
  { path: "/esg-scoring", label: "ESG Scoring", icon: TreePine },
  { path: "/esg-result", label: "ESG Results", icon: TrendingUp },
  { path: "/irr-calculator", label: "Financial Models", icon: Calculator },
  { path: "/ai-model", label: "Risk Engine", icon: Brain },
  { path: "/advanced-features", label: "Analytics", icon: Settings },
  { path: "/market-insights", label: "Market Insights", icon: Newspaper },
  { path: "/rewards", label: "Rewards", icon: Gift },
  { path: "/kpi", label: "KPI Dashboard", icon: TrendingUp },
  { path: "/customer-analytics", label: "Customer Analytics", icon: Award },
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
          
          {/* Currency Selector */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Globe className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Currency</span>
            </div>
            <CurrencySelector />
          </div>
          
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