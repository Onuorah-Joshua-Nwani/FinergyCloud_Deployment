import React from "react";
import { Link } from "wouter";
import { Leaf, Menu, User, LogOut, Settings, BarChart3, TrendingUp, Gift, Brain, FolderOpen, Newspaper, Calculator, TreePine, Phone, CreditCard, Info, Wrench, BookOpen, Smartphone, Users } from "lucide-react";

export default function NavigationHookFree() {
  // Safe location detection without hooks
  const currentPath = window.location.pathname;
  
  // Safe auth detection without hooks  
  const user = null;
  const isAuthenticated = false;
  
  // Check if we're on mobile app platform
  const urlParams = new URLSearchParams(window.location.search);
  const platformParam = urlParams.get('platform');
  const isMobileApp = platformParam === 'mobile';
  
  // Website navigation items
  const websiteNavItems = [
    { path: "/", label: "Home", icon: BookOpen },
    { path: "/about", label: "About", icon: Info },
    { path: "/platform", label: "Platform", icon: Wrench },
    { path: "/blog", label: "Blog", icon: Newspaper },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  // Mobile app navigation items
  const mobileAppNavItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/projects", label: "Projects", icon: FolderOpen },
    { path: "/esg-scoring", label: "ESG Scoring", icon: TreePine },
    { path: "/irr-calculator", label: "Financial Models", icon: Calculator },
    { path: "/ai-model", label: "Risk Engine", icon: Brain },
    { path: "/advanced-features", label: "Analytics", icon: Settings },
  ];

  const actuallyMobileApp = isMobileApp;
  const navItems = actuallyMobileApp ? mobileAppNavItems : websiteNavItems;

  const NavLink = ({ path, label, icon: Icon }: { path: string; label: string; icon: any }) => {
    const isActive = currentPath === path || (path !== "/" && currentPath.startsWith(path));
    
    return (
      <Link href={path}>
        <a className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isActive 
            ? 'bg-green-100 text-green-700' 
            : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
        }`}>
          <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
          {label}
        </a>
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={actuallyMobileApp ? "/" : "/"}>
              <a className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">FinergyCloud</span>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map(item => (
              <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} />
            ))}
          </div>

          {/* Simple User Menu - Desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link href="/login">
              <a className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                {actuallyMobileApp ? "Join Pilot" : "Sign In"}
              </a>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => {
                const mobileMenu = document.getElementById('mobile-menu-hookfree');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu-hookfree" className="hidden lg:hidden border-t border-gray-200 py-4">
          <div className="space-y-2">
            {navItems.map(item => (
              <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} />
            ))}
          </div>
          
          {/* Mobile User Actions */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link href="/login">
              <a className="block w-full bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-green-700 transition-colors">
                {actuallyMobileApp ? "Join Pilot Program" : "Sign In"}
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar - Only for mobile app */}
      {actuallyMobileApp && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-md z-40">
          <div className="flex justify-center items-center px-2 py-1.5">
            <div className="flex space-x-1 max-w-sm w-full justify-between">
              {mobileAppNavItems.slice(0, 4).map(item => {
                const Icon = item.icon;
                const isActive = currentPath === item.path || (item.path === "/" && (currentPath === "/" || currentPath === "/dashboard"));
                const linkPath = `${item.path}?platform=mobile`;
                return (
                  <Link key={item.path} href={linkPath}>
                    <a className="flex-1">
                      <div className={`flex flex-col items-center py-2 px-1 rounded-md transition-all duration-200 ${
                        isActive ? "text-green-600 bg-green-50" : "text-gray-500 hover:text-green-600 hover:bg-gray-50"
                      }`}>
                        <Icon className="w-4 h-4 mb-1" />
                        <span className="text-xs font-medium text-center leading-tight">
                          {item.label}
                        </span>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}