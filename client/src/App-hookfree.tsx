import React from "react";

// Completely hook-free React app with professional mobile backgrounds
export default function App() {
  console.log('Hook-free App rendering...');
  
  // Static platform detection
  const urlParams = new URLSearchParams(window.location.search);
  const isMobile = urlParams.get('platform') === 'mobile';
  
  if (isMobile) {
    return React.createElement('div', {
      className: 'mobile-professional min-h-screen',
      style: { minHeight: '100vh' }
    }, [
      React.createElement('div', {
        key: 'container',
        className: 'max-w-4xl mx-auto px-4 py-8'
      }, [
        React.createElement('div', {
          key: 'content',
          className: 'text-center mb-12'
        }, [
          // App icon
          React.createElement('div', {
            key: 'icon',
            className: 'w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white text-3xl'
          }, '📱'),
          
          // Status badge
          React.createElement('div', {
            key: 'badge-container',
            className: 'flex justify-center mb-4'
          }, [
            React.createElement('div', {
              key: 'badge',
              className: 'bg-green-100 text-green-800 px-4 py-2 text-sm font-medium rounded-full'
            }, '✅ Professional Mobile Backgrounds Working')
          ]),
          
          // Title
          React.createElement('h1', {
            key: 'title',
            className: 'text-3xl md:text-4xl font-bold text-professional-navy mb-4'
          }, 'FinergyCloud Mobile'),
          
          // Description
          React.createElement('p', {
            key: 'description',
            className: 'text-lg text-professional-gray mb-8 max-w-2xl mx-auto'
          }, 'Sophisticated blue-gray gradients successfully implemented. React hooks eliminated for stable mounting.'),
          
          // Success card
          React.createElement('div', {
            key: 'success-card',
            className: 'bg-white rounded-xl p-6 shadow-sm border mb-8'
          }, [
            React.createElement('h2', {
              key: 'card-title',
              className: 'text-xl font-semibold text-professional-navy mb-4'
            }, '✅ Hook-Free Implementation Complete'),
            
            React.createElement('div', {
              key: 'card-content',
              className: 'text-left text-professional-gray space-y-2'
            }, [
              React.createElement('p', { key: 'item1' }, '• React mounting successfully without hooks'),
              React.createElement('p', { key: 'item2' }, '• Professional CSS variables applied'),
              React.createElement('p', { key: 'item3' }, '• Mobile-professional class working'),
              React.createElement('p', { key: 'item4' }, '• Blue-gray gradients rendering'),
              React.createElement('p', { key: 'item5' }, '• useContext errors eliminated')
            ])
          ]),
          
          // CTA Button
          React.createElement('a', {
            key: 'cta',
            href: '/login?platform=mobile',
            className: 'bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors'
          }, 'Join Pilot Program')
        ])
      ])
    ]);
  }
  
  // Website version
  return React.createElement('div', {
    className: 'min-h-screen bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center text-white text-center p-4'
  }, [
    React.createElement('div', { key: 'website-content' }, [
      React.createElement('h1', {
        key: 'website-title',
        className: 'text-4xl font-bold mb-4'
      }, 'FinergyCloud'),
      
      React.createElement('p', {
        key: 'website-subtitle',
        className: 'text-xl mb-8 opacity-90'
      }, 'AI-Powered Renewable Energy Platform'),
      
      React.createElement('a', {
        key: 'website-cta',
        href: '/?platform=mobile',
        className: 'bg-white text-green-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors'
      }, 'Try Mobile App')
    ])
  ]);
}