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
    { name: "Platform Overview", href: "/solutions" },
    { name: "Investment Dashboard", type: "dashboard" as const, icon: BarChart3 },
    { name: "Project Analytics", type: "projects" as const, icon: FolderOpen },
    { name: "AI Predictions", type: "ai-model" as const, icon: Brain },
    { name: "ESG Scoring", type: "esg-scoring" as const, icon: TreePine },
    { name: "Portfolio Management", type: "portfolio" as const, icon: TrendingUp },
    { name: "Market Insights", type: "market-insights" as const, icon: Calculator },
    { name: "Explore Platform", type: "beta-signup" as const, icon: Users }
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
                        <span className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm cursor-pointer block py-1 hover:bg-gray-800 px-2 rounded">
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
                        className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm cursor-pointer py-1 w-full text-left hover:bg-gray-800 px-2 rounded min-h-[28px] touch-manipulation"
                        aria-label={`Open ${link.name} platform feature`}
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
                      className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm cursor-pointer py-1 w-full text-left hover:bg-gray-800 px-2 rounded min-h-[28px] touch-manipulation"
                      aria-label={`Open ${link.name} resource`}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
              {legalLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => openLegalModal(link.type)}
                    className="flex items-center gap-1 sm:gap-2 text-xs text-gray-400 hover:text-white transition-colors p-2 sm:p-3 rounded hover:bg-gray-800 cursor-pointer text-left w-full min-h-[36px] sm:min-h-[40px] touch-manipulation"
                    aria-label={`View ${link.name} legal document`}
                  >
                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate text-xs sm:text-sm">{link.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Regulatory & Disclaimer */}
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
            <h5 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-yellow-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
              Important Regulatory Information
            </h5>
            <div className="text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-3 leading-relaxed">
              <div className="border-l-2 border-yellow-400/30 pl-3">
                <p className="mb-1">
                  <strong className="text-yellow-300">Investment Risk:</strong> FinergyCloud is an early-stage technology platform. All investment predictions and ESG scores are for informational purposes only and do not constitute financial advice.
                </p>
              </div>
              <div className="border-l-2 border-blue-400/30 pl-3">
                <p className="mb-1">
                  <strong className="text-blue-300">Data & AI:</strong> Our AI models achieve 94% accuracy through historical backtesting. All data processing complies with GDPR and UK Data Protection regulations.
                </p>
              </div>
              <div className="border-l-2 border-green-400/30 pl-3">
                <p className="mb-1">
                  <strong className="text-green-300">Regulatory Status:</strong> FinergyCloud is in pilot phase. We are committed to obtaining appropriate financial services authorizations.
                </p>
              </div>
              <div className="border-l-2 border-purple-400/30 pl-3">
                <p className="mb-1">
                  <strong className="text-purple-300">Environmental Claims:</strong> ESG scores calculated using industry-standard methodologies. Carbon footprint calculations are estimates.
                </p>
              </div>
            </div>
          </div>

          {/* Founder Section */}
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-4 sm:p-6 mb-6 border border-green-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                OJ
              </div>
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Meet the Founder</h4>
                <p className="text-sm sm:text-base text-gray-300 mb-3">
                  <strong>Onuorah Joshua Nwani</strong> - MBA (Finance), SAP & AI Innovation Leader
                </p>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-3">
                  Joshua brings over 8 years of experience in financial technology and sustainable energy solutions. 
                  Former Senior Consultant at major financial institutions, with deep expertise in ESG analytics, 
                  machine learning applications, and renewable energy project financing across emerging markets.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <a href="https://www.linkedin.com/in/onuorah-joshua-nwani-952a06211/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BbXtN%2BNvDTnedOd3Es0IfXQ%3D%3D" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn Profile
                  </a>
                  <a href="https://github.com/Onuorah-Joshua-Nwani/FinergyCloud_Deployment" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-1 text-gray-400 hover:text-gray-300 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-4 border-t border-gray-800 gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-0 text-center sm:text-left">
              <p>© {new Date().getFullYear()} FinergyCloud Limited. Founded by O.J. Nwani.</p>
              <p className="text-xs mt-1">Registered in England & Wales. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 text-xs text-gray-500">
              <span className="px-2 py-1 bg-gray-800 rounded text-green-400">MVP Platform</span>
              <span className="hidden sm:inline">•</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-blue-400">Pilot Program 2025</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-purple-400">Built with ❤️ for sustainable energy</span>
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