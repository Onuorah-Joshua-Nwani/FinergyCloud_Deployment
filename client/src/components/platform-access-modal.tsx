import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { 
  BarChart3, 
  FolderOpen, 
  Brain, 
  TreePine, 
  TrendingUp,
  Calculator,
  Lock,
  Users,
  ExternalLink,
  CheckCircle,
  Clock
} from 'lucide-react';

interface PlatformAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformFeature: 'dashboard' | 'projects' | 'ai-model' | 'esg-scoring' | 'portfolio' | 'market-insights' | 'beta-signup';
}

export default function PlatformAccessModal({ isOpen, onClose, platformFeature }: PlatformAccessModalProps) {
  const getPlatformFeatureInfo = (feature: string) => {
    switch (feature) {
      case 'dashboard':
        return {
          title: 'Investment Dashboard',
          icon: BarChart3,
          status: 'Live',
          access: 'Beta Users',
          description: 'Real-time overview of your renewable energy investment portfolio',
          features: [
            'Portfolio performance analytics',
            'Risk assessment summaries', 
            'ESG impact tracking',
            'Multi-currency financial metrics',
            'AI-powered insights'
          ],
          action: 'Access Dashboard',
          link: '/dashboard',
          requiresAuth: true
        };
        
      case 'projects':
        return {
          title: 'Project Analytics',
          icon: FolderOpen,
          status: 'Live',
          access: 'Beta Users',
          description: 'Detailed analysis and management of individual renewable energy projects',
          features: [
            'Project-specific ESG scoring',
            'Financial performance tracking',
            'Risk assessment reports',
            'Community impact metrics',
            'Investment timeline management'
          ],
          action: 'View Projects',
          link: '/projects',
          requiresAuth: true
        };

      case 'ai-model':
        return {
          title: 'AI Predictions',
          icon: Brain,
          status: 'Live Beta',
          access: 'Pilot Program',
          description: 'XGBoost machine learning predictions for renewable energy project success',
          features: [
            '94% accuracy prediction model',
            'Multi-factor risk analysis',
            'Success probability scoring',
            'IRR and financial projections',
            'Market condition assessment'
          ],
          action: 'Try AI Model',
          link: '/ai-model',
          requiresAuth: true
        };

      case 'esg-scoring':
        return {
          title: 'ESG Scoring',
          icon: TreePine,
          status: 'Live',
          access: 'All Users',
          description: 'Comprehensive Environmental, Social & Governance impact assessment',
          features: [
            'Project-specific ESG profiles',
            'Environmental impact calculations',
            'Social benefit assessments',
            'Governance risk evaluation',
            'Comparative benchmarking'
          ],
          action: 'Access ESG Scoring',
          link: '/esg-scoring',
          requiresAuth: false
        };

      case 'portfolio':
        return {
          title: 'Portfolio Management',
          icon: TrendingUp,
          status: 'Coming Soon',
          access: 'Q2 2025',
          description: 'Advanced portfolio optimization and management tools',
          features: [
            'Portfolio diversification analysis',
            'Risk-return optimization',
            'Geographic distribution insights',
            'Technology mix recommendations',
            'Performance benchmarking'
          ],
          action: 'Get Notified',
          link: 'mailto:portfolio@finergycloud.com',
          requiresAuth: false
        };

      case 'market-insights':
        return {
          title: 'Market Insights',
          icon: Calculator,
          status: 'Basic Version',
          access: 'Beta Users',
          description: 'Market intelligence and investment opportunity analysis',
          features: [
            'West Africa market trends',
            'Investment opportunity alerts',
            'Regulatory environment updates',
            'Currency and policy impacts',
            'Competitive landscape analysis'
          ],
          action: 'View Insights',
          link: '/market-insights',
          requiresAuth: true
        };

      case 'beta-signup':
        return {
          title: 'Join Beta Program',
          icon: Users,
          status: 'Open',
          access: 'Free Access',
          description: 'Get early access to FinergyCloud\'s AI-powered renewable energy investment platform',
          features: [
            'Full MVP platform access during beta',
            'AI prediction models with 94% accuracy',
            'Complete ESG scoring framework',
            'Multi-currency IRR calculator',
            'Direct founder feedback channel',
            'Priority access to full platform launch'
          ],
          action: 'Join Program',
          link: 'mailto:beta@finergycloud.com?subject=Beta Program Application',
          requiresAuth: false
        };

      default:
        return {
          title: 'Platform Feature',
          icon: BarChart3,
          status: 'Unknown',
          access: 'TBD',
          description: 'Platform feature information',
          features: [],
          action: 'Learn More',
          link: '/',
          requiresAuth: false
        };
    }
  };

  const feature = getPlatformFeatureInfo(platformFeature);
  const IconComponent = feature.icon;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-800';
      case 'Live Beta': return 'bg-blue-100 text-blue-800';
      case 'Basic Version': return 'bg-yellow-100 text-yellow-800';
      case 'Coming Soon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAccess = () => {
    if (feature.requiresAuth) {
      // Check if user is authenticated (you'd implement this based on your auth system)
      const isAuthenticated = false; // This would come from your auth context
      
      if (!isAuthenticated) {
        window.location.href = '/login';
      } else {
        window.location.href = feature.link;
      }
    } else {
      if (feature.link.startsWith('mailto:')) {
        window.location.href = feature.link;
      } else {
        window.location.href = feature.link;
      }
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <IconComponent className="w-6 h-6 text-blue-600" />
            {feature.title}
          </DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <span>{feature.description}</span>
            <div className="flex gap-2">
              <Badge className={getStatusColor(feature.status)}>
                {feature.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {feature.access}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Features List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.features.map((featureItem, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{featureItem}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Access Information */}
          {feature.requiresAuth && (
            <Card className="bg-blue-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Authentication Required</h4>
                    <p className="text-blue-800 text-sm">
                      This feature requires a FinergyCloud account. Join our pilot program for access.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {feature.status === 'Coming Soon' && (
            <Card className="bg-amber-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <h4 className="font-semibold text-amber-900">In Development</h4>
                    <p className="text-amber-800 text-sm">
                      We're actively building this feature. Expected availability: {feature.access}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <div className="flex gap-3">
              {feature.requiresAuth && (
                <Link href="/beta">
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Join Pilot Program
                  </Button>
                </Link>
              )}
              <Button onClick={handleAccess} className="bg-blue-600 hover:bg-blue-700">
                {feature.link.startsWith('mailto:') ? (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {feature.action}
                  </>
                ) : (
                  <>
                    <IconComponent className="w-4 h-4 mr-2" />
                    {feature.action}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}