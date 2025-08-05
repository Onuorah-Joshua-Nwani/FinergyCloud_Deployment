import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MobileBreadcrumb, { commonBreadcrumbs } from '@/components/mobile-breadcrumb';
import ProjectRecommendationEngine from '@/components/project-recommendation-engine';
import RiskHeatMap from '@/components/risk-heat-map';
import EcoImpactCalculator from '@/components/eco-impact-calculator';

import { 
  Sparkles, 
  Smartphone, 
  Brain, 
  Thermometer, 
  Leaf, 
  Mic,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function AdvancedFeatures() {
  // Check if this is mobile app platform
  const urlParams = new URLSearchParams(window.location.search);
  const isMobileApp = urlParams.get('platform') === 'mobile';
  
  const [activeFeature, setActiveFeature] = useState<string>('recommendations');

  const features = [
    {
      id: 'recommendations',
      title: 'Data Analytics Beta',
      description: 'Early access to dashboard analytics for project developers and climate consultants',
      icon: <Brain className="w-6 h-6" />,
      component: <ProjectRecommendationEngine />,
      color: 'bg-purple-100 text-purple-800',
      status: 'Beta'
    },
    {
      id: 'risk-map',
      title: 'West Africa Risk Intelligence',
      description: 'Country-specific risk assessment for Nigeria, Ghana, and regional markets',
      icon: <Thermometer className="w-6 h-6" />,
      component: <RiskHeatMap />,
      color: 'bg-orange-100 text-orange-800',
      status: 'Regional'
    },
    {
      id: 'eco-calculator',
      title: 'Eco-Impact Calculator',
      description: 'Gamified environmental impact assessment with achievements',
      icon: <Leaf className="w-6 h-6" />,
      component: <EcoImpactCalculator />,
      color: 'bg-green-100 text-green-800',
      status: 'Interactive'
    }

  ];

  const currentFeature = features.find(f => f.id === activeFeature);

  return (
    <section className="py-4 md:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Mobile Breadcrumb Navigation */}
        <MobileBreadcrumb items={commonBreadcrumbs.advancedFeatures} />
        
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isMobileApp ? "Analytics Beta" : "Advanced Features"}
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-600">
            {isMobileApp 
              ? "Beta access to Django-powered analytics for West Africa renewable energy risk assessment"
              : "Early access to AI-powered investment tools and data visualization features"
            }
          </p>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {features.map(feature => (
            <Card 
              key={feature.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeFeature === feature.id ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg">{feature.title}</CardTitle>
                      <Badge className={feature.color} variant="secondary">{feature.status}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Feature Display */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {currentFeature?.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{currentFeature?.title}</CardTitle>
                  <p className="text-sm text-gray-600">{currentFeature?.description}</p>
                </div>
              </div>
              <Badge className={currentFeature?.color}>{currentFeature?.status}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Feature Content */}
        <div className="mt-6">
          {currentFeature?.component}
        </div>

        {/* Feature Statistics */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">4</div>
              <div className="text-sm text-gray-600">Advanced Features</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
              <div className="text-sm text-gray-600">AI Accuracy</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">Real-time</div>
              <div className="text-sm text-gray-600">Updates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Monitoring</div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Powered By Advanced Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-medium text-sm">Machine Learning</div>
                <div className="text-xs text-gray-600">XGBoost & Neural Networks</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-medium text-sm">Real-time Analytics</div>
                <div className="text-xs text-gray-600">Live Data Processing</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Mic className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-medium text-sm">Voice AI</div>
                <div className="text-xs text-gray-600">Speech Synthesis & Recognition</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Smartphone className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="font-medium text-sm">Mobile-First</div>
                <div className="text-xs text-gray-600">Touch & Gesture Controls</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}