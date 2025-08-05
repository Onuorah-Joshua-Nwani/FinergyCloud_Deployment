import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { 
  BookOpen, 
  Info, 
  Wrench, 
  Newspaper, 
  Phone, 
  Users, 
  X, 
  Leaf,
  Settings,
  LogOut,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SocialLinks from './social-links';

interface WebsiteMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

const websiteNavItems = [
  { path: "/", label: "Home", icon: BookOpen },
  { path: "/about", label: "About", icon: Info },
  { path: "/platform", label: "Platform", icon: Wrench },
  { path: "/blog", label: "Blog", icon: Newspaper },
  { path: "/contact", label: "Contact", icon: Phone },
];

export function WebsiteMobileNav({ isOpen, onClose, user }: WebsiteMobileNavProps) {
  const currentPath = window.location.pathname;

  // Close side nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sideNav = document.getElementById('website-mobile-nav');
      const menuButton = document.getElementById('website-menu-button');
      
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
      window.location.href = '/';
    } catch (error) {
      // Logout failed - redirect anyway for better UX
      window.location.href = '/';
    }
  };

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: any }) => {
    const isActive = currentPath === path || (path === "/" && currentPath === "/");
    
    return (
      <Link href={path}>
        <div 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
            isActive 
              ? 'bg-green-100 text-green-700' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={onClose}
        >
          <Icon className="w-5 h-5 mr-3" />
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
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Side Navigation */}
      <div 
        id="website-mobile-nav"
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-[70] lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">FinergyCloud</span>
                <span className="text-sm text-gray-500">Official Website</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* User Profile Section */}
          {user && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.profileImageUrl || ''} alt={user?.firstName || 'User'} />
                  <AvatarFallback className="bg-green-100 text-green-600 font-medium">
                    {user?.firstName?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="space-y-1 px-4">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Website</h3>
                <div className="space-y-1">
                  {websiteNavItems.map((item) => (
                    <NavItem key={item.path} {...item} />
                  ))}
                </div>
              </div>
              
              {/* Platform Access Section */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Platform Access</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      window.location.href = 'mailto:beta@finergycloud.com?subject=Beta Program Application';
                      onClose();
                    }}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Users className="w-5 h-5 mr-3" />
                    Join Beta Program
                  </button>
                  <button
                    onClick={() => {
                      window.open('/?platform=mobile', '_blank');
                      onClose();
                    }}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Smartphone className="w-5 h-5 mr-3" />
                    Mobile Experience
                  </button>
                </div>
              </div>
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            {user && (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-700 hover:text-gray-900"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
            
            {/* Social Links */}
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-3">Follow us</p>
              <div className="flex justify-center">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}