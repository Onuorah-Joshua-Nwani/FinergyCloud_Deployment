import { useState } from "react";
import { Link } from "wouter";
import SocialLinks from "./social-links";
import PlatformSwitcher from "./platform-switcher";
import LegalModal from "./legal-modal";
import ResourcesModal from "./resources-modal";
import PlatformAccessModal from "./platform-access-modal";
import { Leaf, MapPin, Mail, Phone, Shield, FileText, Scale, Cookie, Database, Lock, Code, HelpCircle, Video, BookOpen, Users, BarChart3, FolderOpen, Brain, TreePine, TrendingUp, Calculator } from "lucide-react";

export default function Footer() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [resourcesModalOpen, setResourcesModalOpen] = useState(false);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<'privacy' | 'terms' | 'cookies' | 'compliance' | 'data-protection' | 'risk-disclosure'>('privacy');
  const [selectedResource, setSelectedResource] = useState<'docs' | 'api' | 'help' | 'webinars' | 'research' | 'case-studies' | 'partnerships'>('docs');
  const [selectedPlatformFeature, setSelectedPlatformFeature] = useState<'dashboard' | 'projects' | 'ai-model' | 'esg-scoring' | 'portfolio' | 'market-insights' | 'beta-signup'>('dashboard');

  const openLegalModal = (documentType: typeof selectedDocument) => {
    setSelectedDocument(documentType);
    setLegalModalOpen(true);
  };

  const openResourcesModal = (resourceType: typeof selectedResource) => {
    setSelectedResource(resourceType);
    setResourcesModalOpen(true);
  };

  const openPlatformModal = (featureType: typeof selectedPlatformFeature) => {
    setSelectedPlatformFeature(featureType);
    setPlatformModalOpen(true);
  };
  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Blog & Research", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];

  const platformLinks = [
    { name: "Platform Overview", href: "/platform" },
    { name: "Investment Dashboard", type: "dashboard" as const, icon: BarChart3 },
    { name: "Project Analytics", type: "projects" as const, icon: FolderOpen },
    { name: "AI Predictions", type: "ai-model" as const, icon: Brain },
    { name: "ESG Scoring", type: "esg-scoring" as const, icon: TreePine },
    { name: "Portfolio Management", type: "portfolio" as const, icon: TrendingUp },
    { name: "Market Insights", type: "market-insights" as const, icon: Calculator },
    { name: "Join Beta Program", type: "beta-signup" as const, icon: Users }
  ];

  const resourcesLinks = [
    { name: "Documentation", type: "docs" as const, icon: FileText },
    { name: "API Reference", type: "api" as const, icon: Code },
    { name: "Help Center", type: "help" as const, icon: HelpCircle },
    { name: "Partnership Program", type: "partnerships" as const, icon: Users },
    { name: "Webinars", type: "webinars" as const, icon: Video },
    { name: "White Papers", type: "research" as const, icon: BookOpen },
    { name: "Case Studies", type: "case-studies" as const, icon: Users }
  ];

  const legalLinks = [
    { name: "Privacy Policy", type: "privacy" as const, icon: Shield },
    { name: "Terms of Service", type: "terms" as const, icon: FileText },
    { name: "Cookie Policy", type: "cookies" as const, icon: Cookie },
    { name: "Compliance", type: "compliance" as const, icon: Scale },
    { name: "Data Protection", type: "data-protection" as const, icon: Lock },
    { name: "Risk Disclosure", type: "risk-disclosure" as const, icon: Database }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand & Contact Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">FinergyCloud</span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
              AI-powered renewable energy investment intelligence platform. 
              Transforming sustainable finance through advanced analytics, 
              predictive modeling, and comprehensive ESG assessment.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mt-1 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="text-gray-300">Registered Office:</p>
                  <p className="text-gray-400">London, United Kingdom</p>
                  <p className="text-gray-400">Company Registration: TBD</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <a href="mailto:hello@finergycloud.com" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors break-all">
                  hello@finergycloud.com
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-400">Support: Coming Soon</span>
              </div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-green-400">Connect with us</h4>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Company Links */}
          <div className="mt-6 sm:mt-0">
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-green-400">Company</h4>
            <ul className="space-y-1 sm:space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm cursor-pointer block py-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div className="mt-6 sm:mt-0">
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-green-400">Platform</h4>
            <ul className="space-y-1 sm:space-y-2">
              {platformLinks.map((link) => {
                // Handle direct links (Platform Overview, Beta Program)
                if ('href' in link) {
                  return (
                    <li key={link.name}>
                      <Link href={link.href}>
                        <span className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm cursor-pointer block py-1">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  );
                }
                // Handle modal links (platform features)
                if ('type' in link && link.icon) {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.name}>
                      <button
                        onClick={() => openPlatformModal(link.type)}
                        className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm cursor-pointer py-1 w-full text-left"
                      >
                        <IconComponent className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{link.name}</span>
                      </button>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="mt-6 sm:mt-0">
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-green-400">Resources</h4>
            <ul className="space-y-1 sm:space-y-2">
              {resourcesLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => openResourcesModal(link.type)}
                      className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm cursor-pointer py-1 w-full text-left"
                    >
                      <IconComponent className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{link.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Legal & Compliance Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-green-400">Legal & Compliance</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
              {legalLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => openLegalModal(link.type)}
                    className="flex items-center gap-1 sm:gap-2 text-xs text-gray-400 hover:text-white transition-colors p-2 sm:p-2 rounded hover:bg-gray-800 cursor-pointer text-left w-full"
                  >
                    <IconComponent className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Regulatory & Disclaimer */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h5 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-yellow-400">Important Regulatory Information</h5>
            <div className="text-xs text-gray-400 space-y-1 sm:space-y-2 leading-relaxed">
              <p>
                <strong>Investment Risk:</strong> FinergyCloud is an early-stage technology platform. All investment predictions and ESG scores are for informational purposes only and do not constitute financial advice. Past performance does not guarantee future results.
              </p>
              <p>
                <strong>Data & AI:</strong> Our AI models achieve 94% accuracy through historical backtesting. Actual market conditions may vary. All data processing complies with GDPR and UK Data Protection regulations.
              </p>
              <p>
                <strong>Regulatory Status:</strong> FinergyCloud is currently in pilot phase. We are committed to obtaining appropriate financial services authorizations as we scale operations in the UK and EU markets.
              </p>
              <p>
                <strong>Environmental Claims:</strong> ESG scores and sustainability metrics are calculated using industry-standard methodologies. Carbon footprint calculations are estimates based on available project data.
              </p>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-4 border-t border-gray-800 gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-0 text-center sm:text-left">
              <p>© {new Date().getFullYear()} FinergyCloud Limited. Founded by O.J. Nwani.</p>
              <p className="text-xs mt-1">Registered in England & Wales. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 text-xs text-gray-500">
              <span>MVP Platform</span>
              <span className="hidden sm:inline">•</span>
              <span>Pilot Program 2025</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Built with ❤️ for sustainable energy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      <LegalModal 
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        documentType={selectedDocument}
      />

      {/* Resources Modal */}
      <ResourcesModal 
        isOpen={resourcesModalOpen}
        onClose={() => setResourcesModalOpen(false)}
        resourceType={selectedResource}
      />

      {/* Platform Access Modal */}
      <PlatformAccessModal 
        isOpen={platformModalOpen}
        onClose={() => setPlatformModalOpen(false)}
        platformFeature={selectedPlatformFeature}
      />
    </footer>
  );
}