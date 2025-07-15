import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavigationHeader from "@/components/navigation";
import SEOHead from "@/components/seo-head";
import Dashboard from "@/pages/dashboard";
import AIModel from "@/pages/ai-model";
import ESGScoring from "@/pages/esg-scoring";
import IRRCalculator from "@/pages/irr-calculator";
import ProjectManagement from "@/pages/project-management";
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

function Router() {
  // Check URL parameters directly
  const urlParams = new URLSearchParams(window.location.search);
  const platformParam = urlParams.get('platform');
  const isMobileApp = platformParam === 'mobile';
  
  // MOBILE APP PLATFORM
  if (isMobileApp) {
    return (
      <div className="min-h-screen mobile-professional">
        <NavigationHeader />
        <main className="pb-16 lg:pb-0">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={MobileLanding} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/kpi" component={KPIDashboard} />
            <Route path="/advanced-features" component={AdvancedFeatures} />
            <Route path="/rewards" component={RewardsPage} />
            <Route path="/ai-model" component={AIModel} />
            <Route path="/market-insights" component={MarketInsights} />
            <Route path="/esg-scoring" component={ESGScoring} />
            <Route path="/irr-calculator" component={IRRCalculator} />
            <Route path="/project-management" component={ProjectManagement} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/cookies" component={Cookies} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
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