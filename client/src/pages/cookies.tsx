import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ChevronRight, 
  Cookie, 
  Settings, 
  Shield, 
  Mail, 
  ArrowLeft,
  BarChart3,
  Eye,
  Globe
} from "lucide-react";

export default function Cookies() {
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Cookie Policy", path: "/cookies" }
  ];

  const lastUpdated = "January 12, 2025";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium flex items-center">
                    <Cookie className="w-4 h-4 mr-1" />
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.path} className="hover:text-green-600 transition-colors flex items-center">
                    {index === 0 && <Home className="w-4 h-4 mr-1" />}
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-orange-100 mb-6">
            How we use cookies and tracking technologies
          </p>
          <Badge className="bg-white/20 text-white px-4 py-2">
            Last Updated: {lastUpdated}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-orange-600" />
                1. What Are Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                keeping you logged in, and understanding how you use our platform.
              </p>
              <p>
                FinergyCloud uses cookies and similar tracking technologies to improve our renewable 
                energy investment platform, analyze usage patterns, and ensure security.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800 mb-0">
                  <strong>Your Choice:</strong> You can control cookie settings through your browser 
                  or our Cookie Preference Center. Some cookies are essential for platform functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Types of Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-600" />
                2. Types of Cookies We Use
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Essential Cookies (Always Active)
              </h4>
              <p>These cookies are necessary for the platform to function properly:</p>
              <ul>
                <li><strong>Authentication:</strong> Keep you logged in securely</li>
                <li><strong>Session Management:</strong> Maintain your platform session</li>
                <li><strong>Security:</strong> Protect against fraud and unauthorized access</li>
                <li><strong>Preferences:</strong> Remember your language and currency settings</li>
              </ul>

              <h4 className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Analytics Cookies (Optional)
              </h4>
              <p>Help us understand how you use our platform:</p>
              <ul>
                <li><strong>Usage Analytics:</strong> Track page visits and user interactions</li>
                <li><strong>Performance Monitoring:</strong> Identify and fix platform issues</li>
                <li><strong>Feature Usage:</strong> Understand which AI tools are most valuable</li>
                <li><strong>A/B Testing:</strong> Test improvements to user experience</li>
              </ul>

              <h4 className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-600" />
                Functional Cookies (Optional)
              </h4>
              <p>Enhance your platform experience:</p>
              <ul>
                <li><strong>Personalization:</strong> Remember your dashboard layout preferences</li>
                <li><strong>AI Model Settings:</strong> Save your prediction and ESG scoring preferences</li>
                <li><strong>Portfolio Views:</strong> Remember your investment display preferences</li>
                <li><strong>Notification Settings:</strong> Store your communication preferences</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-600" />
                3. Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Platform Analytics</h4>
              <ul>
                <li><strong>Purpose:</strong> Anonymous usage statistics and performance monitoring</li>
                <li><strong>Data:</strong> Page views, click patterns, session duration (anonymized)</li>
                <li><strong>Retention:</strong> 24 months</li>
                <li><strong>Control:</strong> Can be disabled in Cookie Preferences</li>
              </ul>

              <h4>Security Services</h4>
              <ul>
                <li><strong>Purpose:</strong> Fraud prevention and security monitoring</li>
                <li><strong>Data:</strong> IP address, device fingerprint, suspicious activity detection</li>
                <li><strong>Retention:</strong> 12 months</li>
                <li><strong>Control:</strong> Essential for platform security (cannot be disabled)</li>
              </ul>

              <h4>Payment Processing</h4>
              <ul>
                <li><strong>Purpose:</strong> Secure subscription and payment processing</li>
                <li><strong>Data:</strong> Payment tokens, transaction verification</li>
                <li><strong>Retention:</strong> As required by financial regulations</li>
                <li><strong>Control:</strong> Essential for subscription services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookie Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-600" />
                4. Managing Your Cookie Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Cookie Preference Center</h4>
              <p>
                You can manage your cookie preferences through our Cookie Preference Center, 
                accessible from any page footer. You can:
              </p>
              <ul>
                <li>Enable or disable optional cookie categories</li>
                <li>View detailed information about each cookie type</li>
                <li>Update your preferences at any time</li>
                <li>Export your current cookie settings</li>
              </ul>

              <h4>Browser Settings</h4>
              <p>You can also control cookies through your browser settings:</p>
              <ul>
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800 mb-0">
                  <strong>Important:</strong> Disabling essential cookies may affect platform 
                  functionality. Some features like login, dashboard personalization, and 
                  AI model preferences may not work properly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                5. Data Protection & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>GDPR Compliance</h4>
              <ul>
                <li>All cookie data processing complies with UK GDPR</li>
                <li>Explicit consent required for non-essential cookies</li>
                <li>Right to withdraw consent at any time</li>
                <li>Data minimization: only collect necessary information</li>
              </ul>

              <h4>Data Security</h4>
              <ul>
                <li>All cookie data is encrypted in transit and at rest</li>
                <li>Access controls limit who can view cookie data</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Secure deletion when cookies expire or are removed</li>
              </ul>

              <h4>International Transfers</h4>
              <p>
                Cookie data may be processed by service providers in different countries. 
                We ensure appropriate safeguards are in place, including:
              </p>
              <ul>
                <li>Standard Contractual Clauses for EU data transfers</li>
                <li>Adequacy decisions where available</li>
                <li>Additional security measures for sensitive data</li>
              </ul>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-600" />
                6. Policy Updates & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Policy Changes</h4>
              <p>
                We may update this Cookie Policy as our platform evolves or to comply with 
                new regulations. We will notify you of material changes through:
              </p>
              <ul>
                <li>Email notification to registered users</li>
                <li>Banner notification on the platform</li>
                <li>Updated "Last Modified" date</li>
              </ul>

              <h4>Contact Information</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="mb-2">
                  <strong>Cookie Questions:</strong> cookies@finergycloud.com
                </p>
                <p className="mb-2">
                  <strong>Privacy Officer:</strong> privacy@finergycloud.com
                </p>
                <p className="mb-2">
                  <strong>General Support:</strong> hello@finergycloud.com
                </p>
                <p className="mb-0">
                  <strong>Response Time:</strong> Within 5 business days
                </p>
              </div>

              <h4>Related Policies</h4>
              <p>For more information about how we handle your data:</p>
              <ul>
                <li>
                  <Link href="/privacy" className="text-orange-600 hover:text-orange-700">
                    Privacy Policy
                  </Link> - Comprehensive data protection information
                </li>
                <li>
                  <Link href="/terms" className="text-orange-600 hover:text-orange-700">
                    Terms of Service
                  </Link> - Platform usage terms and conditions
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex gap-4">
              <Link href="/privacy">
                <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
                  Privacy Policy
                </Button>
              </Link>
              <Link href="/terms">
                <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
                  Terms of Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}