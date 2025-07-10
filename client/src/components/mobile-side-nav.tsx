import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
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
  X,
  Menu,
  Info,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

const mobileAppNavItems = [
  { path: "/", label: "Dashboard", icon: BarChart3 },
  { path: "/projects", label: "Projects", icon: FolderOpen },
  { path: "/rewards", label: "Rewards", icon: Gift },
  { path: "/kpi", label: "Analytics", icon: TrendingUp },
  { path: "/ai-model", label: "AI Model", icon: Brain },
  { path: "/market-insights", label: "Market Insights", icon: Newspaper },
  { path: "/irr-calculator", label: "IRR Calculator", icon: Calculator },
  { path: "/esg-scoring", label: "ESG Scoring", icon: TreePine },
  { path: "/advanced-features", label: "Advanced Features", icon: Settings },
];

export function MobileSideNav({ isOpen, onClose, user }: SideNavProps) {
  const [location] = useLocation();

  // Close side nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sideNav = document.getElementById('mobile-side-nav');
      const menuButton = document.getElementById('mobile-menu-button');
      
      if (isOpen && sideNav && !sideNav.contains(event.target as Node) && 
          menuButton && !menuButton.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/?platform=mobile';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: any }) => {
    const isActive = location === path || (path === "/" && (location === "/" || location === "/dashboard"));
    const linkPath = `${path}?platform=mobile`;
    
    return (
      <Link href={linkPath} onClick={onClose}>
        <div
          className={`flex items-center px-4 py-3 text-base font-medium rounded-lg mx-2 mb-1 transition-all duration-200 cursor-pointer ${
            isActive
              ? "bg-green-600 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
          }`}
        >
          <Icon className="w-5 h-5 mr-4 flex-shrink-0" />
          {label}
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Side Navigation */}
      <div
        id="mobile-side-nav"
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FC</span>
            </div>
            <span className="text-lg font-bold text-gray-900">FinergyCloud App</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.profileImageUrl || ''} alt={user?.firstName || 'User'} />
                <AvatarFallback className="bg-green-100 text-green-600 font-medium text-lg">
                  {user?.firstName?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {mobileAppNavItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start border-green-200 text-green-600 hover:bg-green-50"
            onClick={() => {
              window.open('/', '_blank');
              onClose();
            }}
          >
            <Info className="w-4 h-4 mr-3" />
            Open Website
          </Button>
          
          {user && (
            <Button
              variant="outline"
              className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      id="mobile-menu-button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="flex lg:hidden p-2 hover:bg-gray-100 rounded-md"
    >
      <Menu className="w-6 h-6 text-gray-700" />
    </Button>
  );
}