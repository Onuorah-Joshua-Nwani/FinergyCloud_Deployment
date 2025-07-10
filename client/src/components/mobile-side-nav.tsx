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
  User,
  Leaf
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
      // Logout failed - redirect anyway for better UX
    }
  };

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: any }) => {
    const isActive = location === path || (path === "/" && (location === "/" || location === "/dashboard"));
    const linkPath = `${path}?platform=mobile`;
    
    return (
      <Link href={linkPath} onClick={onClose}>
        <div
          className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md mx-2 mb-0.5 transition-all duration-200 cursor-pointer ${
            isActive
              ? "bg-green-600 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
          }`}
        >
          <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
          <span className="truncate">{label}</span>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300"
          onClick={onClose}
          style={{ touchAction: 'none' }}
        />
      )}
      
      {/* Side Navigation */}
      <div
        id="mobile-side-nav"
        className={`fixed top-0 left-0 h-full w-64 max-w-[80vw] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">FinergyCloud App</span>
          </div>
          {/* Remove close button - hamburger menu handles all toggle functionality */}
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.profileImageUrl || ''} alt={user?.firstName || 'User'} />
                <AvatarFallback className="bg-green-100 text-green-600 font-medium text-sm">
                  {user?.firstName?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 py-3 overflow-y-auto">
          <nav className="space-y-0.5">
            {mobileAppNavItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-3 space-y-2">
          <Button
            variant="default"
            size="sm"
            className="w-full justify-start bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md text-xs"
            onClick={() => {
              window.open('/', '_blank');
              onClose();
            }}
          >
            <Info className="w-3 h-3 mr-2" />
            Visit Website
          </Button>
          
          {user && (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 text-xs"
              onClick={handleLogout}
            >
              <LogOut className="w-3 h-3 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export function MobileMenuButton({ onClick, isOpen = false }: { onClick: () => void; isOpen?: boolean }) {
  return (
    <button
      id="mobile-menu-button"
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 bg-white border-2 border-green-600 rounded-lg shadow-md hover:bg-green-50 active:bg-green-100 transition-all duration-200 hover:scale-105"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      {isOpen ? (
        <X className="w-5 h-5 text-green-600" />
      ) : (
        <Menu className="w-5 h-5 text-green-600" />
      )}
    </button>
  );
}