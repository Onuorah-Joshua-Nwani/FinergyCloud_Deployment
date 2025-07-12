import { Link } from "wouter";
import SocialLinks from "./social-links";
import PlatformSwitcher from "./platform-switcher";
import { Leaf, MapPin, Mail, Phone, Shield, FileText, Scale } from "lucide-react";

export default function Footer() {
  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Solutions", href: "/solutions" },
    { name: "Blog & Research", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Press & Media", href: "/press" }
  ];

  const platformLinks = [
    { name: "Investment Dashboard", href: "/dashboard" },
    { name: "Project Analytics", href: "/projects" },
    { name: "AI Predictions", href: "/ai-model" },
    { name: "ESG Scoring", href: "/esg-scoring" },
    { name: "Portfolio Management", href: "/portfolio" },
    { name: "Market Insights", href: "/market-insights" }
  ];

  const resourcesLinks = [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Help Center", href: "/help" },
    { name: "Webinars", href: "/webinars" },
    { name: "White Papers", href: "/research" },
    { name: "Case Studies", href: "/case-studies" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy", icon: Shield },
    { name: "Terms of Service", href: "/terms", icon: FileText },
    { name: "Cookie Policy", href: "/cookies", icon: FileText },
    { name: "Compliance", href: "/compliance", icon: Scale },
    { name: "Data Protection", href: "/data-protection", icon: Shield },
    { name: "Risk Disclosure", href: "/risk-disclosure", icon: FileText }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Contact Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FinergyCloud</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              AI-powered renewable energy investment intelligence platform. 
              Transforming sustainable finance through advanced analytics, 
              predictive modeling, and comprehensive ESG assessment.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-gray-300">Registered Office:</p>
                  <p className="text-gray-400">London, United Kingdom</p>
                  <p className="text-gray-400">Company Registration: TBD</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a href="mailto:hello@finergycloud.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  hello@finergycloud.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">Support: Coming Soon</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 text-green-400">Connect with us</h4>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-green-400">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer block py-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-green-400">Platform</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer block py-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-green-400">Resources</h4>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer block py-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal & Compliance Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-4 text-green-400">Legal & Compliance</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {legalLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors p-2 rounded hover:bg-gray-800"
                  >
                    <IconComponent className="w-3 h-3" />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Regulatory & Disclaimer */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h5 className="text-sm font-semibold mb-3 text-yellow-400">Important Regulatory Information</h5>
            <div className="text-xs text-gray-400 space-y-2 leading-relaxed">
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
          <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-800">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} FinergyCloud Limited. Founded by O.J. Nwani.</p>
              <p className="text-xs mt-1">Registered in England & Wales. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>MVP Platform</span>
              <span>•</span>
              <span>Pilot Program 2025</span>
              <span>•</span>
              <span>Built with ❤️ for sustainable energy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}