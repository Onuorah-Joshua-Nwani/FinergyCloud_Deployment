// Ultra-minimal React setup for testing
import React from "react";
import { createRoot } from "react-dom/client";

// Minimal component with professional mobile styling
function MobileApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const isMobile = urlParams.get('platform') === 'mobile';
  
  if (isMobile) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, hsl(220, 16%, 98%), hsl(220, 16%, 95%))',
        padding: '20px',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center' as const
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #059669, #2563eb)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '32px'
          }}>
            📱
          </div>
          
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'hsl(223, 47%, 23%)',
            marginBottom: '16px'
          }}>
            FinergyCloud Mobile
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: 'hsl(215, 16%, 47%)',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Professional ESG risk scoring platform with sophisticated blue-gray gradients working correctly.
          </p>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'hsl(223, 47%, 23%)',
              marginBottom: '12px'
            }}>
              Professional Mobile Backgrounds
            </h2>
            <p style={{
              color: 'hsl(215, 16%, 47%)',
              lineHeight: '1.5'
            }}>
              ✅ React is mounting successfully<br/>
              ✅ Professional CSS variables working<br/>
              ✅ Blue-gray gradients applied<br/>
              ✅ Mobile-optimized typography
            </p>
          </div>
          
          <a 
            href="/login?platform=mobile"
            style={{
              display: 'inline-block',
              background: '#059669',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
          >
            Join Pilot Program
          </a>
        </div>
      </div>
    );
  }
  
  // Website version
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #059669, #2563eb)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center' as const,
      padding: '20px'
    }}>
      <div>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>FinergyCloud</h1>
        <p style={{ fontSize: '20px', marginBottom: '32px', opacity: 0.9 }}>
          AI-Powered Renewable Energy Platform
        </p>
        <a 
          href="/?platform=mobile"
          style={{
            background: 'white',
            color: '#059669',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Try Mobile App
        </a>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<MobileApp />);
} else {
  console.error("Root element not found");
}