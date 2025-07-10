import { Link, useLocation } from "wouter";
import { Leaf, Menu, User, LogOut, Settings, BarChart3, TrendingUp, Gift, Brain, FolderOpen, Newspaper, Calculator, TreePine, Phone, CreditCard, Info, Wrench, BookOpen, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CurrencySelector from "./currency-selector";
import SocialLinks from "./social-links";
import PlatformSwitcher from "./platform-switcher";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  // Check if we're on mobile app platform
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';

  // Website navigation items (Clean FinergyCloud website)
  const websiteNavItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/solutions", label: "Solutions" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  // Mobile app navigation items (functional app only)
  const mobileAppNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/projects", label: "Projects", icon: FolderOpen },
    { path: "/rewards", label: "Rewards", icon: Gift },
    { path: "/kpi", label: "Analytics", icon: TrendingUp },
    { path: "/ai-model", label: "AI Model", icon: Brain },
    { path: "/market-insights", label: "Market Insights", icon: Newspaper },
    { path: "/irr-calculator", label: "IRR Calculator", icon: Calculator },
    { path: "/esg-scoring", label: "ESG Scoring", icon: TreePine },
    { path: "/advanced-features", label: "Advanced Features", icon: Settings },
  ];

  const navItems = isMobileApp ? mobileAppNavItems : websiteNavItems;

  const NavLink = ({ path, label, icon: Icon, className = "", isMobile = false }: { 
    path: string; 
    label: string; 
    icon?: any;
    className?: string;
    isMobile?: boolean;
  }) => (
    <Link href={path}>
      <span
        className={`nav-item block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
          location === path || (path === "/" && location === "/")
            ? "bg-gray-100 text-primary border-b-2 border-primary"
            : "text-gray-600 hover:text-primary hover:bg-gray-50"
        } ${isMobile ? "mobile-menu-item text-base py-3 border-b border-gray-100" : ""} ${className}`}
      >
        {isMobile && Icon && (
          <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
        )}
        {label}
      </span>
    </Link>
  );

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="nav-glass nav-blur shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          
          {/* Brand - Left Side */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {isMobileApp ? "Renewable Energy App" : "FinergyCloud"}
            </span>
          </Link>

          {/* Center - Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-1 flex-1 max-w-2xl mx-8">
            {navItems.map(item => (
              <NavLink key={item.path} {...item} />
            ))}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            
            {/* Mobile App Button for website */}
            {!isMobileApp && (
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
            {isMobileApp && (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => window.open('/', '_blank')}
              >
                <Info className="w-4 h-4 mr-2" />
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
                    <DropdownMenuItem onClick={() => window.open(isMobileApp ? "/" : "/?platform=mobile", '_blank')}>
                      {isMobileApp ? <Info className="mr-2 h-4 w-4" /> : <Smartphone className="mr-2 h-4 w-4" />}
                      <span>{isMobileApp ? "FinergyCloud Website" : "Mobile App"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8 lg:hidden border-gray-300 hover:bg-gray-50">
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
                        {isMobileApp ? "Renewable Energy" : "FinergyCloud"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {isMobileApp ? "Investment App" : "Official Website"}
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

                  {/* Mobile Currency Selector */}
                  <div className="py-3 border-b border-gray-100 sm:hidden">
                    <div className="px-2">
                      <CurrencySelector />
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 py-4 space-y-4 overflow-y-auto min-h-0">
                    {!isMobileApp ? (
                      // Website Navigation
                      <>
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Website</h3>
                          <div className="space-y-1">
                            {websiteNavItems.map(item => (
                              <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} isMobile={true} />
                            ))}
                          </div>
                        </div>
                        
                        {isAuthenticated && (
                          <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Platform Tools</h3>
                            <div className="space-y-1">
                              {mobileAppNavItems.map(item => (
                                <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} isMobile={true} />
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      // Mobile App Navigation - Only show app features
                      <>
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Investment Tools</h3>
                          <div className="space-y-1">
                            {mobileAppNavItems.map(item => (
                              <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} isMobile={true} />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Extra spacing at bottom to prevent overlap */}
                    <div className="h-32"></div>
                  </div>

                  {/* Mobile Footer Actions - Fixed at bottom */}
                  <div className="flex-shrink-0 pt-4 border-t border-gray-200 space-y-3">
                    {/* Social Links - Only show for website, not mobile app */}
                    {!isMobileApp && (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Connect</h4>
                        <SocialLinks variant="sidebar" />
                      </div>
                    )}

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
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar - Only for mobile app */}
        {isMobileApp && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="flex justify-center items-center px-2 py-1">
              <div className="flex space-x-1 max-w-sm w-full justify-between">
                {mobileAppNavItems.slice(0, 4).map(item => {
                  const Icon = item.icon;
                  const isActive = location === item.path || (item.path === "/dashboard" && location === "/");
                  return (
                    <Link key={item.path} href={item.path} className="flex-1">
                      <div
                        className={`mobile-nav-item flex flex-col items-center py-2 px-1 rounded-md transition-all duration-200 ${
                          isActive ? "active text-primary" : "text-gray-500 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1 ${isActive ? "text-primary" : "text-gray-500"}`} />
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
    </nav>
  );
}
