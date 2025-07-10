import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Leaf, Menu, User, LogOut, Settings, BarChart3, TrendingUp, Gift, Brain, FolderOpen, Newspaper, Calculator, TreePine, Phone, CreditCard, Info, Wrench, BookOpen, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CurrencySelector from "./currency-selector";
import SocialLinks from "./social-links";
import PlatformSwitcher from "./platform-switcher";
import { MobileSideNav, MobileMenuButton } from "./mobile-side-nav";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [location] = useLocation();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  
  // Check if we're on mobile app platform - more robust detection
  const urlParams = new URLSearchParams(window.location.search);
  const platformParam = urlParams.get('platform');
  const isMobileApp = platformParam === 'mobile';
  
  // More comprehensive mobile detection that checks both URL and location
  const shouldForceMobile = isMobileApp || window.location.href.includes('platform=mobile') || window.location.search.includes('platform=mobile');

  // Website navigation items (Clean FinergyCloud website)
  const websiteNavItems = [
    { path: "/", label: "Home", icon: BookOpen },
    { path: "/about", label: "About", icon: Info },
    { path: "/solutions", label: "Solutions", icon: Wrench },
    { path: "/blog", label: "Blog", icon: Newspaper },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  // Mobile app navigation items (clean simplified list)
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

  // Use mobile app navigation if platform parameter exists
  const actuallyMobileApp = isMobileApp || shouldForceMobile;
  const navItems = actuallyMobileApp ? mobileAppNavItems : websiteNavItems;
  
  // Debug logging - removed for production

  const NavLink = ({ path, label, icon: Icon, className = "", isMobile = false }: { 
    path: string; 
    label: string; 
    icon?: any;
    className?: string;
    isMobile?: boolean;
  }) => {
    const isActive = location === path || (path === "/" && (location === "/" || location === "/dashboard"));
    
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
    <>
      {/* Fixed Hamburger Menu for Mobile App - Always visible */}
      {actuallyMobileApp && (
        <div className="fixed top-3 left-3 z-[55] lg:hidden">
          <MobileMenuButton onClick={() => setSideNavOpen(!sideNavOpen)} isOpen={sideNavOpen} />
        </div>
      )}
      
      <nav className={`${actuallyMobileApp ? 'bg-white border-b border-gray-200' : 'nav-glass nav-blur'} shadow-sm sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-12 sm:h-14">
          
          {/* Left Side - Brand */}
          <div className={`flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ${actuallyMobileApp ? 'ml-16' : ''}`}>
            {/* Brand */}
            <Link href={actuallyMobileApp ? "/?platform=mobile" : "/"} className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {actuallyMobileApp ? "FinergyCloud App" : "FinergyCloud"}
              </span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-1 flex-1 max-w-2xl mx-8">
            {actuallyMobileApp ? (
              // Mobile App Navigation - Keep within mobile app platform
              mobileAppNavItems.map(item => (
                <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} />
              ))
            ) : (
              // Website Navigation with Mobile App Link
              <>
                {websiteNavItems.map(item => (
                  <NavLink key={item.path} {...item} />
                ))}
                <button
                  onClick={() => window.open('/?platform=mobile', '_blank')}
                  className="nav-item block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer text-gray-600 hover:text-primary hover:bg-gray-50"
                >
                  Mobile App
                </button>
              </>
            )}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            
            {/* Mobile App Button for website */}
            {!actuallyMobileApp && (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => window.open('/?platform=mobile', '_blank')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile App
              </Button>
            )}
            
            {/* Website Button for mobile app - Always visible */}
            {actuallyMobileApp && (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-xs px-2 py-1 h-8"
                onClick={() => window.open('/', '_blank')}
              >
                <Info className="w-3 h-3 mr-1" />
                Website
              </Button>
            )}
            
            {/* Currency Selector - Hidden on small mobile */}
            <div className="hidden sm:block">
              <CurrencySelector />
            </div>
            
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
                    {!actuallyMobileApp && (
                      <DropdownMenuItem onClick={() => window.open('/?platform=mobile', '_blank')}>
                        <Smartphone className="mr-2 h-4 w-4" />
                        <span>Mobile App</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {/* Mobile Navigation - Only show for website, not mobile app */}
            {!actuallyMobileApp && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-gray-300 hover:bg-gray-50 xl:hidden">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Open navigation menu</span>
                  </Button>
                </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <div className="flex flex-col h-full">
                  
                  {/* Mobile Header */}
                  <div className="flex items-center space-x-3 pb-6 border-b border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900">
                        {actuallyMobileApp ? "Renewable Energy" : "FinergyCloud"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {actuallyMobileApp ? "Investment App" : "Official Website"}
                      </span>
                    </div>
                  </div>

                  {/* Mobile User Profile */}
                  {isAuthenticated && (
                    <div className="flex items-center space-x-3 py-4 border-b border-gray-100">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user?.profileImageUrl || ''} alt={user?.firstName || 'User'} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
                          {user?.firstName?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  )}



                  {/* Mobile Navigation Links */}
                  <div className="flex-1 py-3 overflow-y-auto min-h-0">
                    {!actuallyMobileApp ? (
                      // Website Navigation
                      <>
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Website</h3>
                          <div className="space-y-1">
                            {websiteNavItems.map(item => (
                              <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} isMobile={true} />
                            ))}
                            {/* Mobile App Link */}
                            <button
                              onClick={() => window.open('/?platform=mobile', '_blank')}
                              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 text-gray-600 hover:text-primary hover:bg-gray-50 text-left"
                            >
                              <Smartphone className="w-5 h-5 mr-3 flex-shrink-0" />
                              Open Mobile App
                            </button>
                          </div>
                        </div>
                        

                      </>
                    ) : (
                      // Mobile App Navigation - Only show app features
                      <>
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Mobile App</h3>
                          <div className="space-y-1">
                            {mobileAppNavItems.map(item => (
                              <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} isMobile={true} />
                            ))}
                            {/* Website Link */}
                            <button
                              onClick={() => window.open('/', '_blank')}
                              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 text-gray-600 hover:text-primary hover:bg-gray-50 text-left"
                            >
                              <Info className="w-5 h-5 mr-3 flex-shrink-0" />
                              Open Website
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    

                  </div>

                  {/* Mobile Footer Actions */}
                  <div className="flex-shrink-0 pt-3 border-t border-gray-200">
                    {/* User Actions */}
                    {isAuthenticated && (
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-gray-900">
                          <Settings className="mr-3 h-4 w-4" />
                          Settings
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            )}
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar - Only for mobile app */}
        {actuallyMobileApp && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-md z-40 safe-area-pb">
            <div className="flex justify-center items-center px-2 py-1.5">
              <div className="flex space-x-1 max-w-sm w-full justify-between">
                {mobileAppNavItems.slice(0, 4).map(item => {
                  const Icon = item.icon;
                  const isActive = location === item.path || (item.path === "/" && (location === "/" || location === "/dashboard"));
                  const linkPath = `${item.path}?platform=mobile`;
                  return (
                    <Link key={item.path} href={linkPath} className="flex-1">
                      <div
                        className={`flex flex-col items-center py-2 px-1 rounded-md transition-all duration-200 ${
                          isActive ? "text-primary bg-primary/10" : "text-gray-500 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1`} />
                        <span className="text-xs font-medium text-center leading-tight">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Side Navigation - Only for mobile app */}
      {actuallyMobileApp && (
        <MobileSideNav 
          isOpen={sideNavOpen} 
          onClose={() => setSideNavOpen(false)} 
          user={user}
        />
      )}
    </nav>
    </>
  );
}
