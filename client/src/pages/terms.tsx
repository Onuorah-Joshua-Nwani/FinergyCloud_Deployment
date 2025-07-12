import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ChevronRight, 
  FileText, 
  AlertTriangle, 
  Scale, 
  Mail, 
  ArrowLeft,
  Shield,
  Globe,
  DollarSign,
  Users
} from "lucide-react";

export default function Terms() {
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Terms of Service", path: "/terms" }
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
                    <Scale className="w-4 h-4 mr-1" />
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
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-blue-100 mb-6">
            Terms and conditions for using FinergyCloud platform
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
          {/* Acceptance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                1. Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                By accessing and using FinergyCloud ("the Platform"), you accept and agree to be bound by 
                these Terms of Service ("Terms"). These Terms constitute a legal agreement between you and 
                FinergyCloud Limited, a company registered in England and Wales.
              </p>
              <p>
                If you do not agree to these Terms, you must not use our Platform. Your continued use 
                of the Platform constitutes acceptance of any updates to these Terms.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Pilot Program Notice:</strong> FinergyCloud is currently in pilot phase. 
                    These terms apply to pilot users and early access customers. Features and 
                    availability may change as we develop the platform.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                2. Platform Description
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Service Overview</h4>
              <p>
                FinergyCloud provides AI-powered renewable energy investment intelligence, including:
              </p>
              <ul>
                <li>Machine learning-based project success predictions (94% historical accuracy)</li>
                <li>Comprehensive ESG scoring and sustainability assessment</li>
                <li>Multi-currency financial modeling (NGN, GBP, EUR)</li>
                <li>Portfolio management and risk analysis tools</li>
                <li>Market intelligence and investment insights</li>
              </ul>

              <h4>Early Stage Platform</h4>
              <p>
                As an MVP platform, our services are provided on a pilot basis. We are actively 
                developing features and onboarding select customers to refine our offering before 
                full commercial launch.
              </p>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                3. User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Account Requirements</h4>
              <ul>
                <li>You must be at least 18 years old and legally capable of entering contracts</li>
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>

              <h4>Prohibited Activities</h4>
              <ul>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with the proper functioning of the Platform</li>
                <li>Using the Platform for illegal or fraudulent activities</li>
                <li>Reverse engineering or copying our AI algorithms</li>
                <li>Sharing account access with unauthorized third parties</li>
              </ul>

              <h4>Professional Use</h4>
              <p>
                Our Platform is designed for professional investors and organizations. You represent 
                that you have appropriate knowledge and experience to understand the investment 
                information and analysis provided.
              </p>
            </CardContent>
          </Card>

          {/* Investment Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                4. Investment Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div className="text-sm text-red-800">
                    <strong>Important:</strong> FinergyCloud does not provide financial advice. 
                    All information is for educational and analytical purposes only.
                  </div>
                </div>
              </div>

              <h4>No Financial Advice</h4>
              <ul>
                <li>All predictions, scores, and analysis are informational only</li>
                <li>Past performance does not guarantee future results</li>
                <li>AI predictions achieve 94% accuracy based on historical backtesting</li>
                <li>Actual market conditions may differ from modeled scenarios</li>
              </ul>

              <h4>Investment Risks</h4>
              <ul>
                <li>Renewable energy investments carry inherent risks</li>
                <li>Emerging market investments may have additional volatility</li>
                <li>Regulatory changes may affect project viability</li>
                <li>Currency fluctuations may impact returns</li>
              </ul>

              <h4>Professional Advice</h4>
              <p>
                Always consult with qualified financial advisors before making investment decisions. 
                Consider your financial situation, investment objectives, and risk tolerance.
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                5. Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Our Rights</h4>
              <ul>
                <li>FinergyCloud owns all proprietary algorithms, AI models, and software</li>
                <li>Platform design, interface, and content are protected by copyright</li>
                <li>Our brand, logos, and trademarks are owned by FinergyCloud Limited</li>
                <li>ESG scoring methodologies and financial models are proprietary</li>
              </ul>

              <h4>Your Rights</h4>
              <ul>
                <li>Limited license to use the Platform for authorized purposes</li>
                <li>Right to your own data and investment information</li>
                <li>Right to export your data in standard formats</li>
              </ul>

              <h4>Restrictions</h4>
              <ul>
                <li>No copying, modifying, or distributing our software</li>
                <li>No reverse engineering of AI algorithms or models</li>
                <li>No use of our branding or intellectual property without permission</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                6. Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Data Processing</h4>
              <ul>
                <li>We process your data in accordance with our Privacy Policy</li>
                <li>All data handling complies with UK GDPR and Data Protection Act 2018</li>
                <li>Investment data is encrypted and securely stored</li>
                <li>Anonymous analytics help improve our AI models</li>
              </ul>

              <h4>Data Sharing</h4>
              <ul>
                <li>We do not sell or rent your personal data</li>
                <li>Aggregated, anonymized data may be used for research</li>
                <li>Legal compliance may require data disclosure to authorities</li>
              </ul>

              <p>
                For detailed information about data handling, see our{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
                7. Limitations of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Platform Availability</h4>
              <ul>
                <li>Services provided on an "as is" and "as available" basis</li>
                <li>We do not guarantee uninterrupted or error-free operation</li>
                <li>Maintenance and updates may temporarily affect availability</li>
                <li>Beta features may have limited functionality</li>
              </ul>

              <h4>Limitation of Damages</h4>
              <p>
                To the maximum extent permitted by law, FinergyCloud shall not be liable for any:
              </p>
              <ul>
                <li>Investment losses based on Platform information</li>
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages exceeding fees paid for Platform access</li>
              </ul>

              <h4>Force Majeure</h4>
              <p>
                We are not liable for delays or failures due to circumstances beyond our reasonable 
                control, including natural disasters, government actions, or technical failures.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                8. Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Your Rights</h4>
              <ul>
                <li>You may terminate your account at any time</li>
                <li>Data export available before account closure</li>
                <li>Unused subscription fees may be refunded (pilot program)</li>
              </ul>

              <h4>Our Rights</h4>
              <ul>
                <li>We may suspend accounts for Terms violations</li>
                <li>Platform access may be terminated for security reasons</li>
                <li>We reserve the right to discontinue services with notice</li>
              </ul>

              <h4>Effect of Termination</h4>
              <ul>
                <li>Access to Platform services will cease immediately</li>
                <li>Data retention subject to Privacy Policy terms</li>
                <li>Surviving clauses include intellectual property and liability limitations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                9. Governing Law
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Jurisdiction</h4>
              <ul>
                <li>These Terms are governed by the laws of England and Wales</li>
                <li>Disputes subject to exclusive jurisdiction of English courts</li>
                <li>EU users retain rights under applicable consumer protection laws</li>
              </ul>

              <h4>Dispute Resolution</h4>
              <ul>
                <li>Good faith negotiation preferred for dispute resolution</li>
                <li>Mediation available through recognized UK mediation services</li>
                <li>Court proceedings as last resort</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                10. Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Legal Inquiries</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="mb-2"><strong>Email:</strong> legal@finergycloud.com</p>
                <p className="mb-2"><strong>Address:</strong> FinergyCloud Limited, London, United Kingdom</p>
                <p className="mb-0"><strong>Response Time:</strong> 5-7 business days for legal matters</p>
              </div>

              <h4>General Support</h4>
              <p>
                For platform support and general inquiries: 
                <a href="mailto:hello@finergycloud.com" className="text-blue-600 hover:text-blue-700 ml-1">
                  hello@finergycloud.com
                </a>
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
              <Link href="/privacy">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Button>
              </Link>
              <Link href="/cookies">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
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