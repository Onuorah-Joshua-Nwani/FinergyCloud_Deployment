import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Code, 
  HelpCircle, 
  Video, 
  BookOpen, 
  Users,
  Calendar,
  ExternalLink,
  Mail,
  Bell
} from 'lucide-react';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: 'docs' | 'api' | 'help' | 'webinars' | 'research' | 'case-studies' | 'partnerships';
}

export default function ResourcesModal({ isOpen, onClose, resourceType }: ResourcesModalProps) {
  const getResourceInfo = (type: string) => {
    switch (type) {
      case 'docs':
        return {
          title: 'Documentation',
          icon: FileText,
          status: 'Coming Soon',
          description: 'Comprehensive guides for using FinergyCloud\'s AI investment platform',
          content: `We're preparing detailed documentation covering:
          
• Getting started with AI-powered investment analysis
• ESG scoring methodology and interpretation  
• XGBoost risk engine technical specifications
• Multi-currency financial modeling guides
• Platform API integration tutorials

Documentation will be available when we launch our public beta program.`,
          actionText: 'Notify me when ready',
          timeline: 'Q2 2025'
        };
        
      case 'api':
        return {
          title: 'API Reference',
          icon: Code,
          status: 'Beta Access',
          description: 'Developer API for integrating FinergyCloud\'s AI models',
          content: `Our REST API will provide programmatic access to:

• Project risk assessment endpoints
• ESG scoring algorithms  
• Financial modeling calculations
• Real-time market intelligence data
• Portfolio analytics and reporting

Currently available for beta partners only. Public API access coming Q3 2025.`,
          actionText: 'Request beta access',
          timeline: 'Public Q3 2025'
        };

      case 'help':
        return {
          title: 'Help Center',
          icon: HelpCircle,
          status: 'Basic Support',
          description: 'Get help with platform features and investment analysis',
          content: `Current support options:

• Email support: help@finergycloud.com
• Platform onboarding for pilot users
• Basic troubleshooting guidance
• Investment methodology explanations

Expanded help center with live chat, video tutorials, and comprehensive FAQ coming with public launch.`,
          actionText: 'Contact support',
          timeline: 'Enhanced Q2 2025'
        };

      case 'webinars':
        return {
          title: 'Webinars & Training',
          icon: Video,
          status: 'Pilot Only',
          description: 'Educational content on renewable energy investment and AI analysis',
          content: `Planned webinar series:

• "AI-Powered ESG Analysis for Renewable Energy"
• "Understanding XGBoost Risk Predictions"  
• "Multi-Currency Investment Strategies"
• "Emerging Market Investment Best Practices"

Currently available for pilot program participants. Public webinars launching Q2 2025.`,
          actionText: 'Join pilot program',
          timeline: 'Public Q2 2025'
        };

      case 'research':
        return {
          title: 'White Papers & Research',
          icon: BookOpen,
          status: 'In Development',
          description: 'Research insights on renewable energy investment trends',
          content: `Upcoming research publications:

• "AI Models for Emerging Market Renewable Energy Risk Assessment"
• "ESG Impact Correlation with Financial Returns in West Africa"
• "Currency Risk Management for Cross-Border Green Investments"
• "Comparative Analysis: Traditional vs AI-Powered Investment Strategies"

First white paper releasing Q1 2025.`,
          actionText: 'Subscribe for updates',
          timeline: 'First release Q1 2025'
        };

      case 'case-studies':
        return {
          title: 'Case Studies',
          icon: Users,
          status: 'Coming Soon',
          description: 'Real-world examples of successful renewable energy investments',
          content: `We're documenting case studies from our pilot program:

• Solar project success stories from Nigeria
• Wind farm investment analysis from Ghana  
• Community impact assessments
• ROI analysis and lessons learned

Case studies will be published with permission from pilot participants.`,
          actionText: 'Get notified',
          timeline: 'Q2 2025'
        };

      case 'partnerships':
        return {
          title: 'Partnership Program',
          icon: Users,
          status: 'Open Applications',
          description: 'Strategic partnerships for renewable energy ecosystem development',
          content: `We're seeking partnerships with:

• Universities & Research Institutions
  - AI model validation and research collaboration
  - Student internship and thesis programs
  - Academic publication opportunities

• NGOs & Development Organizations  
  - Community engagement and ESG validation
  - Local project sourcing and due diligence
  - Impact measurement frameworks

• Financial Institutions
  - Investment facilitation and risk sharing
  - Local currency hedging solutions
  - Regulatory compliance expertise

• Technology Partners
  - Satellite data providers for environmental monitoring
  - IoT sensor networks for project performance tracking
  - Blockchain solutions for transparent ESG reporting

Current partnership discussions: 3 universities, 2 NGOs, 1 development finance institution.`,
          actionText: 'Submit Partnership Proposal',
          timeline: 'Rolling Applications'
        };

      default:
        return {
          title: 'Resource',
          icon: FileText,
          status: 'Coming Soon',
          description: 'This resource is currently in development',
          content: 'More information will be available soon.',
          actionText: 'Stay tuned',
          timeline: '2025'
        };
    }
  };

  const resource = getResourceInfo(resourceType);
  const IconComponent = resource.icon;

  const handleAction = () => {
    if (resourceType === 'help') {
      window.location.href = 'mailto:help@finergycloud.com';
    } else if (resourceType === 'api') {
      window.location.href = 'mailto:api@finergycloud.com?subject=Beta API Access Request';
    } else if (resourceType === 'partnerships') {
      window.location.href = 'mailto:partnerships@finergycloud.com?subject=Partnership Proposal Submission';
    } else {
      // For other resources, could integrate with newsletter signup
      window.location.href = 'mailto:updates@finergycloud.com?subject=Resource Updates Subscription';
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
            <span className="truncate">{resource.title}</span>
          </DialogTitle>
          <DialogDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <span className="text-sm sm:text-base text-gray-600 leading-relaxed">{resource.description}</span>
            <div>
              <Badge 
                variant={resource.status === 'Coming Soon' ? 'secondary' : 'outline'}
                className="text-xs whitespace-nowrap"
              >
                {resource.status}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Main Content */}
          <Card>
            <CardContent className="p-3 sm:p-4 lg:pt-6">
              <div className="whitespace-pre-line text-sm sm:text-base text-gray-700 leading-relaxed">
                {resource.content}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm sm:text-base">Expected Availability</h4>
                  <p className="text-blue-800 text-xs sm:text-sm mt-1">{resource.timeline}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto min-h-[44px] sm:min-h-[40px] touch-manipulation">
              Close
            </Button>
            <div className="flex gap-3">
              <Button onClick={handleAction} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto min-h-[44px] sm:min-h-[40px] touch-manipulation">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{resource.actionText}</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}