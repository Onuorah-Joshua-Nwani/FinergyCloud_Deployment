import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CurrencyProvider } from "./lib/currency-context";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import Dashboard from "@/pages/dashboard";
import AIModel from "@/pages/ai-model";
import ESGScoring from "@/pages/esg-scoring";
import IRRCalculator from "@/pages/irr-calculator";
import ProjectManagement from "@/pages/project-management";
import MarketInsights from "@/pages/market-insights";
import KPIDashboard from "@/pages/kpi";
import AdvancedFeatures from "@/pages/advanced-features";
import Subscribe from "@/pages/subscribe";
import Login from "@/pages/login";
import Landing from "@/pages/landing";
import MarketingLanding from "@/pages/landing-marketing";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Marketing Landing Page - Always show for root path */}
      <Route path="/" component={MarketingLanding} />
      
      {/* Web Application Routes - Under /app path */}
      <Route path="/app/login" component={Login} />
      <Route path="/app*">
        {isLoading || !isAuthenticated ? (
          <Route path="*" component={Landing} />
        ) : (
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Switch>
              <Route path="/app" component={Dashboard} />
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/kpi" component={KPIDashboard} />
              <Route path="/app/advanced-features" component={AdvancedFeatures} />
              <Route path="/app/ai-model" component={AIModel} />
              <Route path="/app/esg-scoring" component={ESGScoring} />
              <Route path="/app/irr-calculator" component={IRRCalculator} />
              <Route path="/app/projects" component={ProjectManagement} />
              <Route path="/app/market-insights" component={MarketInsights} />
              <Route path="/app/subscribe" component={Subscribe} />
              <Route component={NotFound} />
            </Switch>
          </div>
        )}
      </Route>

      
      {/* Fallback for unknown routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
