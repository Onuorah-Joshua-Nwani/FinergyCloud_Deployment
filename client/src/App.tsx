import React, { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavigationHeader from "@/components/navigation";
import SEOHead from "@/components/seo-head";
import { MobileSimpleNav } from "@/components/mobile-simple-nav";
import DashboardSimple from "@/pages/dashboard-simple";
import MobileBusinessDashboard from "@/pages/mobile-business-dashboard";
import ProjectManagementSimple from "@/pages/project-management-simple";
import AIModelSimple from "@/pages/ai-model-simple";
import ESGScoringSimple from "@/pages/esg-scoring-simple";
import IRRCalculator from "@/pages/irr-calculator";
import MarketInsights from "@/pages/market-insights";
import KPIDashboard from "@/pages/kpi";
import AdvancedFeatures from "@/pages/advanced-features";
import RewardsPage from "@/pages/rewards";
import Subscribe from "@/pages/subscribe";
import Contact from "@/pages/contact";
import Solutions from "@/pages/solutions";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import Login from "@/pages/login";
import WebsiteLanding from "@/pages/website/website-landing";
import MobileLanding from "@/pages/mobile-app/mobile-landing";
import NotFound from "@/pages/not-found";

function MobileAppRouter() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  return (
    <div className="min-h-screen mobile-professional">
      <MobileSimpleNav 
        isOpen={mobileNavOpen} 
        onToggle={() => setMobileNavOpen(!mobileNavOpen)} 
      />
      <main className="pb-16 lg:pb-0">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={MobileBusinessDashboard} />
          <Route path="/dashboard" component={MobileBusinessDashboard} />
          <Route path="/business-dashboard" component={MobileBusinessDashboard} />
          <Route path="/project-management" component={ProjectManagementSimple} />
          <Route path="/kpi" component={KPIDashboard} />
          <Route path="/advanced-features" component={AdvancedFeatures} />
          <Route path="/rewards" component={RewardsPage} />
          <Route path="/ai-model" component={AIModelSimple} />
          <Route path="/market-insights" component={MarketInsights} />
          <Route path="/esg-scoring" component={ESGScoringSimple} />
          <Route path="/irr-calculator" component={IRRCalculator} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/cookies" component={Cookies} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function Router() {
  // Check URL parameters directly
  const urlParams = new URLSearchParams(window.location.search);
  const platformParam = urlParams.get('platform');
  const isMobileApp = platformParam === 'mobile';
  
  // MOBILE APP PLATFORM
  if (isMobileApp) {
    return (
      <MobileAppRouter />
    );
  }

  // WEBSITE PLATFORM
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600">
      <NavigationHeader />
      <main>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={WebsiteLanding} />
          <Route path="/about" component={About} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/subscribe" component={Subscribe} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/cookies" component={Cookies} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SEOHead />
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;