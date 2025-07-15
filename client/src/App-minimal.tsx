import React from "react";

export default function App() {
  // Check if we're on mobile app platform  
  const urlParams = new URLSearchParams(window.location.search);
  const platformParam = urlParams.get('platform');
  const isMobileApp = platformParam === 'mobile';

  if (isMobileApp) {
    return (
      <div className="mobile-professional min-h-screen pt-4 pb-8">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              📱
            </div>
            
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 text-orange-800 px-4 py-2 text-sm font-medium rounded-full">
                ⭐ Closed Beta - 10 Active Users
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-professional-navy mb-4">
              FinergyCloud
            </h1>
            <p className="text-lg text-professional-gray mb-8 max-w-2xl mx-auto">
              ESG risk scoring platform for renewable energy projects. Built with Django and Python for project developers, NGO finance teams, and climate consultants in Nigeria and Ghana.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/login?platform=mobile" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium text-center transition-colors">
                Join Pilot Program
              </a>
              <button 
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md font-medium transition-colors"
                onClick={() => window.open('/', '_blank')}
              >
                Visit Website
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="mobile-card-professional bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 text-green-600">📊</div>
                <h3 className="text-xl font-semibold text-professional-navy">Portfolio Tracking</h3>
              </div>
              <p className="text-professional-gray">
                Real-time monitoring of your renewable energy investments with detailed performance metrics and analytics.
              </p>
            </div>

            <div className="mobile-card-professional bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 text-blue-600">🌍</div>
                <h3 className="text-xl font-semibold text-professional-navy">ESG Scoring</h3>
              </div>
              <p className="text-professional-gray">
                Comprehensive Environmental, Social, and Governance scoring to ensure sustainable investment decisions.
              </p>
            </div>

            <div className="mobile-card-professional bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 text-purple-600">🛡️</div>
                <h3 className="text-xl font-semibold text-professional-navy">AI Predictions</h3>
              </div>
              <p className="text-professional-gray">
                Advanced machine learning models provide accurate project success predictions and market insights.
              </p>
            </div>
          </div>

          {/* App Info */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-professional-navy mb-4">
              Early Access Program
            </h2>
            <p className="text-professional-gray max-w-2xl mx-auto">
              Join our exclusive pilot program to test our revolutionary AI-powered platform before launch. 
              Shape the future of renewable energy investing with your feedback and insights.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Website version
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">FinergyCloud</h1>
          <p className="text-xl opacity-90 mb-8">AI-Powered Renewable Energy Investment Platform</p>
          <a href="/?platform=mobile" className="bg-white text-green-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Try Mobile App
          </a>
        </div>
      </div>
    </div>
  );
}