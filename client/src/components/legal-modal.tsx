import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  X, 
  Shield, 
  FileText, 
  Scale, 
  Cookie, 
  Database, 
  Lock,
  Home,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: 'privacy' | 'terms' | 'cookies' | 'compliance' | 'data-protection' | 'risk-disclosure';
}

export default function LegalModal({ isOpen, onClose, documentType }: LegalModalProps) {
  const getLegalDocument = (type: string) => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: Shield,
          lastUpdated: 'January 12, 2025',
          sections: [
            {
              title: '1. Information We Collect',
              icon: Database,
              content: `We collect information you provide directly, such as account details, investment preferences, and platform usage data. We also collect technical information including IP addresses, device information, and usage analytics to improve our AI models and platform security.`
            },
            {
              title: '2. How We Use Your Data',
              icon: Lock,
              content: `Your data powers our AI investment intelligence platform, enables personalized ESG scoring, and helps us provide market insights. We use aggregated, anonymized data to improve our machine learning models while keeping individual investment strategies confidential.`
            },
            {
              title: '3. Data Sharing & Security',
              icon: Shield,
              content: `We never sell your data. Information is shared only with essential service providers under strict confidentiality agreements. All data is encrypted in transit and at rest, with regular security audits and UK GDPR compliance.`
            },
            {
              title: '4. Your Rights',
              icon: Scale,
              content: `You have full control over your data including rights to access, correct, delete, or export your information. Contact privacy@finergycloud.com to exercise these rights or for any privacy-related questions.`
            }
          ]
        };
      
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: FileText,
          lastUpdated: 'January 12, 2025',
          sections: [
            {
              title: '1. Platform Access & Use',
              icon: Lock,
              content: `FinergyCloud provides AI-powered renewable energy investment intelligence. You must be 18+ and authorized to make investment decisions. The platform is for informational purposes and does not constitute financial advice.`
            },
            {
              title: '2. Investment Disclaimers',
              icon: Shield,
              content: `All AI predictions, ESG scores, and investment insights are provided "as is" without guarantees. Past performance doesn't predict future results. You're responsible for your own investment decisions and should consult financial advisors.`
            },
            {
              title: '3. Account Responsibilities',
              icon: Database,
              content: `You're responsible for account security, accurate information, and complying with applicable laws. Don't share login credentials or use the platform for illegal activities. We reserve the right to suspend accounts for violations.`
            },
            {
              title: '4. Intellectual Property',
              icon: Scale,
              content: `FinergyCloud's AI models, algorithms, and platform technology are proprietary. You receive a limited license to use the platform but cannot copy, modify, or redistribute our technology or data.`
            }
          ]
        };

      case 'cookies':
        return {
          title: 'Cookie Policy',
          icon: Cookie,
          lastUpdated: 'January 12, 2025',
          sections: [
            {
              title: '1. Essential Cookies',
              icon: Shield,
              content: `Required for platform functionality including user authentication, session management, and security. These cannot be disabled as they're necessary for the platform to work properly.`
            },
            {
              title: '2. Analytics Cookies',
              icon: Database,
              content: `Help us understand how users interact with our platform to improve the AI models and user experience. These collect anonymized usage statistics and can be disabled in your cookie preferences.`
            },
            {
              title: '3. Your Cookie Choices',
              icon: Lock,
              content: `You can manage cookie preferences through your browser settings or our cookie preference center. Note that disabling certain cookies may limit platform functionality.`
            }
          ]
        };

      default:
        return {
          title: 'Legal Document',
          icon: FileText,
          lastUpdated: 'January 12, 2025',
          sections: [
            {
              title: 'Document Content',
              icon: FileText,
              content: 'This legal document is currently being updated. Please check back soon or contact our legal team for specific questions.'
            }
          ]
        };
    }
  };

  const document = getLegalDocument(documentType);
  const IconComponent = document.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <IconComponent className="w-6 h-6 text-blue-600" />
            {document.title}
          </DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <span>Last updated: {document.lastUpdated}</span>
            <Badge variant="outline" className="text-xs">
              FinergyCloud Legal
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span>Legal</span>
              <ChevronRight className="w-4 h-4" />
              <span>{document.title}</span>
            </div>

            {/* Content Sections */}
            {document.sections.map((section, index) => {
              const SectionIcon = section.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <SectionIcon className="w-5 h-5 text-blue-600" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}

            {/* Contact Information */}
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-blue-900 mb-2">Questions about this document?</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Our legal team is available to help clarify any aspects of our policies.
                </p>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                    legal@finergycloud.com
                  </Button>
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Full Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => window.open(`/${documentType}`, '_blank')}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Full Page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}