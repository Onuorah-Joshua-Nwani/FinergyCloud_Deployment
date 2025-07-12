import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ChevronRight, 
  Shield, 
  Database, 
  Cookie, 
  Mail, 
  ArrowLeft,
  FileText,
  Globe,
  Lock
} from "lucide-react";

export default function Privacy() {
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Privacy Policy", path: "/privacy" }
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
                    <Shield className="w-4 h-4 mr-1" />
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
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-green-100 mb-6">
            How we protect and handle your personal information
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
                <FileText className="w-5 h-5 text-green-600" />
                1. Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                FinergyCloud Limited ("we," "our," or "us") is committed to protecting your privacy and personal data. 
                This Privacy Policy explains how we collect, use, process, and safeguard your information when you use 
                our renewable energy investment intelligence platform.
              </p>
              <p>
                As a UK-registered company, we comply with the UK General Data Protection Regulation (UK GDPR) and 
                the Data Protection Act 2018. This policy applies to all users of our platform, whether accessing 
                via web or mobile applications.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800 mb-0">
                  <strong>Early Stage Notice:</strong> FinergyCloud is currently in pilot phase. This privacy policy 
                  reflects our data handling practices as we develop our platform and onboard pilot customers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600" />
                2. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Personal Information</h4>
              <ul>
                <li>Name, email address, and contact details</li>
                <li>Professional information (company, role, investment experience)</li>
                <li>Account credentials and authentication data</li>
                <li>Communication preferences</li>
              </ul>

              <h4>Platform Usage Data</h4>
              <ul>
                <li>Investment portfolio data and preferences</li>
                <li>Platform interaction and navigation patterns</li>
                <li>ESG scoring preferences and customizations</li>
                <li>AI model usage and query history</li>
              </ul>

              <h4>Technical Data</h4>
              <ul>
                <li>IP address, browser type, and device information</li>
                <li>Log files and error reports</li>
                <li>Performance and analytics data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                3. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Platform Services</h4>
              <ul>
                <li>Provide AI-powered investment predictions and analytics</li>
                <li>Generate personalized ESG scores and sustainability metrics</li>
                <li>Deliver portfolio management and risk assessment tools</li>
                <li>Process multi-currency financial modeling (NGN, GBP, EUR)</li>
              </ul>

              <h4>Account Management</h4>
              <ul>
                <li>Create and maintain your user account</li>
                <li>Authenticate access and ensure platform security</li>
                <li>Provide customer support and technical assistance</li>
                <li>Send important platform updates and notifications</li>
              </ul>

              <h4>Research & Development</h4>
              <ul>
                <li>Improve our AI algorithms and prediction accuracy</li>
                <li>Develop new features and platform capabilities</li>
                <li>Conduct anonymized research on renewable energy investment trends</li>
                <li>Validate and enhance our ESG scoring methodologies</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                4. Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Security Measures</h4>
              <ul>
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure database storage with access controls</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Multi-factor authentication for sensitive operations</li>
              </ul>

              <h4>Data Retention</h4>
              <ul>
                <li>Account data: Retained while your account is active</li>
                <li>Platform usage data: 2 years for analytics purposes</li>
                <li>Communication records: 1 year for support purposes</li>
                <li>Legal compliance data: As required by applicable law</li>
              </ul>

              <h4>Data Sharing</h4>
              <p>
                We do not sell, trade, or rent your personal information to third parties. 
                We may share data only in the following circumstances:
              </p>
              <ul>
                <li>With your explicit consent</li>
                <li>For legal compliance or regulatory requirements</li>
                <li>With trusted service providers under strict confidentiality agreements</li>
                <li>In anonymized form for research and industry analysis</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                5. Your Rights Under UK GDPR
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>As a data subject, you have the following rights:</p>
              <ul>
                <li><strong>Right of Access:</strong> Request copies of your personal data</li>
                <li><strong>Right of Rectification:</strong> Correct inaccurate personal data</li>
                <li><strong>Right of Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right of Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@finergycloud.com" className="text-green-600 hover:text-green-700">
                  privacy@finergycloud.com
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-green-600" />
                6. Cookies & Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Essential Cookies</h4>
              <ul>
                <li>Authentication and session management</li>
                <li>Platform functionality and user preferences</li>
                <li>Security and fraud prevention</li>
              </ul>

              <h4>Analytics Cookies</h4>
              <ul>
                <li>Platform usage statistics (anonymized)</li>
                <li>Performance monitoring and optimization</li>
                <li>User experience improvement</li>
              </ul>
              <p>
                You can manage cookie preferences through your browser settings or our 
                Cookie Preference Center accessible from any page footer.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                7. Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Data Protection Officer</h4>
              <p>
                For all privacy-related inquiries, please contact our Data Protection Officer:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="mb-2"><strong>Email:</strong> privacy@finergycloud.com</p>
                <p className="mb-2"><strong>Address:</strong> FinergyCloud Limited, London, United Kingdom</p>
                <p className="mb-0"><strong>Response Time:</strong> We aim to respond within 72 hours</p>
              </div>

              <h4>Supervisory Authority</h4>
              <p>
                If you believe we have not adequately resolved your concerns, you have the right 
                to lodge a complaint with the UK Information Commissioner's Office (ICO):
              </p>
              <p>
                <strong>Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">ico.org.uk</a><br />
                <strong>Phone:</strong> 0303 123 1113
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                8. Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update this Privacy Policy as our platform evolves and to ensure 
                continued compliance with applicable laws. Material changes will be 
                communicated through:
              </p>
              <ul>
                <li>Email notification to registered users</li>
                <li>Prominent notice on our platform</li>
                <li>Updated "Last Modified" date at the top of this policy</li>
              </ul>
              <p>
                Continued use of our platform after policy updates constitutes acceptance 
                of the revised terms.
              </p>
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
              <Link href="/terms">
                <Button variant="ghost" className="text-green-600 hover:text-green-700">
                  Terms of Service
                </Button>
              </Link>
              <Link href="/cookies">
                <Button variant="ghost" className="text-green-600 hover:text-green-700">
                  Cookie Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}