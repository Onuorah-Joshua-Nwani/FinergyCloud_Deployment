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
  
  // Detect if we're on mobile app URL
  const isMobileApp = typeof window !== 'undefined' && 
    (window.location.href.includes('7dd13212-e6ad-4c47-be70-2f844171b442') || 
     window.location.href.includes('spock.replit.dev'));

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
        {isLoading || !isAuthenticated ? (
          <Switch>
            <Route path="/login" component={Login} />
            {!isMobileApp && (
              <>
                <Route path="/solutions" component={Solutions} />
                <Route path="/about" component={About} />
                <Route path="/blog" component={Blog} />
                <Route path="/contact" component={Contact} />
              </>
            )}
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
              {!isMobileApp && (
                <>
                  <Route path="/solutions" component={Solutions} />
                  <Route path="/about" component={About} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/contact" component={Contact} />
                </>
              )}
              <Route component={NotFound} />
            </Switch>
          </div>
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
