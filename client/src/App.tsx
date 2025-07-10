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
import Landing from "@/pages/landing";
import MarketingLanding from "@/pages/landing-marketing";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Detect if we're on mobile app URL or using mobile platform parameter
  const isMobileApp = typeof window !== 'undefined' && (() => {
    const urlParams = new URLSearchParams(window.location.search);
    const platformParam = urlParams.get('platform');
    if (platformParam === 'mobile') {
      return true;
    } else if (platformParam === 'web') {
      return false;
    }
    // Default to mobile app for the base URL
    return true;
  })();

  return (
    <Switch>
      {/* Direct access to platform - Root path shows platform */}
      <Route path="/login" component={Login} />
      
      {/* Public Pages - Only available on website, not mobile app */}
      {!isMobileApp && (
        <>
          <Route path="/solutions" component={Solutions} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
        </>
      )}
      
      {/* Main Platform Routes */}
      <Route path="*">
        {!isMobileApp ? (
          // Website Mode - Show marketing pages with optional authentication for platform access
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Switch>
              <Route path="/" component={Landing} />
              <Route path="/about" component={About} />
              <Route path="/solutions" component={Solutions} />
              <Route path="/blog" component={Blog} />
              <Route path="/contact" component={Contact} />
              <Route path="/login" component={Login} />
              {isAuthenticated && (
                <>
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
                </>
              )}
              <Route component={NotFound} />
            </Switch>
          </div>
        ) : (
          // Mobile App Mode - Functional app only
          isLoading || !isAuthenticated ? (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Landing} />
              <Route path="*" component={Landing} />
            </Switch>
          ) : (
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <Switch>
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
                <Route component={NotFound} />
              </Switch>
            </div>
          )
        )}
      </Route>
    </Switch>
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
