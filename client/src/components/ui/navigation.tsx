import React, { useState } from "react";
import { Link } from "wouter";
import { Leaf, Menu, User, LogOut, Settings, BarChart3, TrendingUp, Gift, Brain, FolderOpen, Newspaper, Calculator, TreePine, Phone, CreditCard, Info, Wrench, BookOpen, Smartphone, Users, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SocialLinks from "./social-links";
import PlatformSwitcher from "./platform-switcher";
import { MobileSideNav, MobileMenuButton } from "./mobile-side-nav";
import { WebsiteMobileNav } from "./website-mobile-nav";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Safe location detection without hooks
  const currentPath = window.location.pathname;
  
  // Safe auth detection without hooks  
  const user = null;
  const isAuthenticated = false;
  
  // Check if we're on mobile app platform - more robust detection
  const urlParams = new URLSearchParams(window.location.search);
  const platformParam = urlParams.get('platform');
  const isMobileApp = platformParam === 'mobile';
  
  // More comprehensive mobile detection that checks both URL and location
  const shouldForceMobile = isMobileApp || window.location.href.includes('platform=mobile') || window.location.search.includes('platform=mobile');

  // Website navigation items (Simple MVP website)
  const websiteNavItems = [
    { path: "/", label: "Home", icon: BookOpen },
    { path: "/about", label: "About", icon: Info },
    { path: "/solutions", label: "Platform", icon: Wrench },
    { path: "/blog", label: "Blog", icon: Newspaper },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  // Mobile app navigation items (Core MVP features)
  const mobileAppNavItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/projects", label: "Projects", icon: FolderOpen },
    { path: "/esg-scoring", label: "ESG Scoring", icon: TreePine },
    { path: "/irr-calculator", label: "Financial Models", icon: Calculator },
    { path: "/ai-model", label: "Risk Engine", icon: Brain },
    { path: "/customer-analytics", label: "Customer Analytics", icon: Users },
    { path: "/advanced-features", label: "Analytics", icon: Settings },
  ];

  // Use mobile app navigation if platform parameter exists
  const actuallyMobileApp = isMobileApp || shouldForceMobile;
  const navItems = actuallyMobileApp ? mobileAppNavItems : websiteNavItems;

  const NavLink = ({ path, label, icon: Icon, className = "", isMobile = false }: { 
    path: string; 
    label: string; 
    icon?: any;
    className?: string;
    isMobile?: boolean;
  }) => {
    const isActive = currentPath === path || (path === "/" && (currentPath === "/" || currentPath === "/dashboard"));
    
    // Preserve platform parameter for mobile app navigation
    const linkPath = actuallyMobileApp ? `${path}?platform=mobile` : path;
    
    return (
      <Link href={linkPath}>
        <span
          className={`nav-item block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
            isActive
              ? "bg-primary text-white"
              : "text-gray-600 hover:text-primary hover:bg-gray-50"
          } ${isMobile ? "text-base py-3 flex items-center" : ""} ${className}`}
        >
          {isMobile && Icon && (
            <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
          )}
          {label}
        </span>
      </Link>
    );
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = actuallyMobileApp ? '/?platform=mobile' : '/';
    } catch (error) {
      // Logout failed - redirect anyway for better UX
    }
  };

  return (
    <div className="navigation-container">
      {/* Fixed Hamburger Menu for Mobile App - Always visible */}
      {actuallyMobileApp && (
        <div className="lg:hidden fixed top-2 left-2 z-[60]">
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} isOpen={mobileMenuOpen} />
        </div>
      )}
      
      <nav className={`${actuallyMobileApp ? 'bg-white border-b border-gray-200' : 'nav-glass nav-blur'} shadow-sm fixed top-0 left-0 right-0 z-50`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-12 sm:h-14">
          
          {/* Left Side - Brand */}
          <div className={`flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ${actuallyMobileApp ? 'ml-12 lg:ml-0' : ''}`}>
            {/* Brand */}
            <Link href={actuallyMobileApp ? "/?platform=mobile" : "/"} className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {actuallyMobileApp ? "FinergyCloud Studio" : "FinergyCloud"}
              </span>
            </Link>
            
            {/* Website Link for Mobile App - Next to title */}
            {actuallyMobileApp && (
              <div className="ml-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-green-600 hover:bg-green-50 hover:text-green-700 text-xs px-2 py-1 h-7"
                  onClick={() => window.open('/', '_blank')}
                >
                  <Info className="w-3 h-3 mr-1" />
                  Website
                </Button>
              </div>
            )}
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-1 flex-1 max-w-2xl mx-8">
            {actuallyMobileApp ? (
              // Mobile App Navigation - Keep within mobile app platform
              mobileAppNavItems.map(item => (
                <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} />
              ))
            ) : (
              // Website Navigation - No duplicate mobile link
              <>
                {websiteNavItems.map(item => (
                  <NavLink key={item.path} {...item} />
                ))}
              </>
            )}
          </div>

          {/* Right Side - Actions */}
          <div className={`flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ${actuallyMobileApp ? 'mr-2' : ''}`}>
            
            {/* Mobile App Button for website */}
            {!actuallyMobileApp && (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => window.open('/?platform=mobile', '_blank')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Experience
              </Button>
            )}
            

            
            {/* User Profile - Desktop */}
            {isAuthenticated && (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full avatar-ring">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profileImageUrl || ''} alt={user?.firstName || 'User'} />
                        <AvatarFallback className="bg-gray-100 text-primary font-medium">
                          {user?.firstName?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {/* Mobile Navigation - Hamburger menu button */}
            {!actuallyMobileApp && (
              <div className="lg:hidden">
                <Button 
                  id="website-menu-button"
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 border-gray-300 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </div>
            )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Side Navigation */}
      {actuallyMobileApp ? (
        <MobileSideNav 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
          user={user}
        />
      ) : (
        <WebsiteMobileNav 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
          user={user}
        />
      )}
    </div>
  );
}