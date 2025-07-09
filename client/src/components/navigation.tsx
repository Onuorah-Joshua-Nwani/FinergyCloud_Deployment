import { Link, useLocation } from "wouter";
import { Leaf, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/ai-model", label: "AI Model" },
    { path: "/esg-scoring", label: "ESG Scoring" },
  ];

  const NavLink = ({ path, label }: { path: string; label: string }) => (
    <Link href={path}>
      <a
        className={`transition-colors ${
          location === path || (path === "/dashboard" && location === "/")
            ? "text-primary font-medium"
            : "text-gray-600 hover:text-primary"
        }`}
      >
        {label}
      </a>
    </Link>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <a className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FinergyCloud</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <NavLink key={item.path} {...item} />
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map(item => (
                    <NavLink key={item.path} {...item} />
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Profile */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
