import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CurrencyProvider } from "./lib/currency-context";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
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
import Login from "@/pages/login";
import WebsiteLanding from "@/pages/website/website-landing";
import MobileLanding from "@/pages/mobile-app/mobile-landing";
import NotFound from "@/pages/not-found";


function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Check URL parameters directly
  const urlParams = new URLSearchParams(window.location.search);
  const platformParam = urlParams.get('platform');
  const isMobileApp = platformParam === 'mobile';
  
  // Debug logging
  console.log('Router Debug:', {
    url: window.location.href,
    search: window.location.search,
    pathname: window.location.pathname,
    platformParam,
    isMobileApp,
    isAuthenticated,
    isLoading
  });

  // MOBILE APP PLATFORM
  if (isMobileApp) {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Switch>
          <Route path="/login" component={Login} />
          {!isAuthenticated ? (
            <>
              <Route path="/" component={MobileLanding} />
              <Route path="*" component={MobileLanding} />
            </>
          ) : (
            <>
              <Route path="/" component={Dashboard} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/kpi" component={KPIDashboard} />
              <Route path="/advanced-features" component={AdvancedFeatures} />
              <Route path="/rewards" component={RewardsPage} />
              <Route path="/ai-model" component={AIModel} />
              <Route path="/esg-scoring" component={ESGScoring} />
              <Route path="/irr-calculator" component={IRRCalculator} />
              <Route path="/projects" component={ProjectManagement} />
              <Route path="/market-insights" component={MarketInsights} />
              <Route path="/subscribe" component={Subscribe} />
              <Route path="*" component={NotFound} />
            </>
          )}
        </Switch>
      </div>
    );
  }

  // WEBSITE PLATFORM (Default)
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Switch>
        <Route path="/" component={WebsiteLanding} />
        <Route path="/about" component={About} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <TooltipProvider>
          <SEOHead />
          <Toaster />
          <Router />
        </TooltipProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
