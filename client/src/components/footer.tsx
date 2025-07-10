import { Link } from "wouter";
import SocialLinks from "./social-links";
import PlatformSwitcher from "./platform-switcher";
import { Leaf } from "lucide-react";

export default function Footer() {
  const companyLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];

  const platformLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    { name: "AI Model", href: "/ai-model" },
    { name: "ESG Scoring", href: "/esg-scoring" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FinergyCloud</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              AI-powered renewable energy investment platform. Intelligent insights, 
              comprehensive analytics, and sustainable portfolio management.
            </p>
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-3">Connect with us</h4>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <div>
                <a 
                  href="/login" 
                  className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
                >
                  🚀 Get Started
                </a>
                <p className="text-xs text-gray-500">Start investing today</p>
              </div>
              <div>
                <a 
                  href="/contact" 
                  className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
                >
                  📞 Contact Support
                </a>
                <p className="text-xs text-gray-500">Expert assistance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} FinergyCloud. Developed by O.J. Nwani. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}