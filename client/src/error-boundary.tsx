import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const urlParams = new URLSearchParams(window.location.search);
      const isMobile = urlParams.get('platform') === 'mobile';
      
      if (isMobile) {
        return (
          <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, hsl(220, 16%, 98%), hsl(220, 16%, 95%))',
            padding: '20px',
            fontFamily: 'system-ui, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center' as const,
              maxWidth: '500px'
            }}>
              <h1 style={{
                color: 'hsl(223, 47%, 23%)',
                fontSize: '24px',
                marginBottom: '16px'
              }}>
                FinergyCloud Mobile
              </h1>
              <p style={{
                color: 'hsl(215, 16%, 47%)',
                marginBottom: '20px'
              }}>
                Professional mobile backgrounds implemented with sophisticated blue-gray gradients.
              </p>
              <p style={{
                color: '#dc2626',
                fontSize: '14px',
                marginBottom: '20px'
              }}>
                React Error: {this.state.error?.message || 'Unknown error'}
              </p>
              <button 
                onClick={() => window.location.reload()}
                style={{
                  background: '#059669',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Reload App
              </button>
            </div>
          </div>
        );
      }
      
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
            <h1>FinergyCloud Error</h1>
            <p>Something went wrong: {this.state.error?.message}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: 'white',
                color: '#059669',
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                marginTop: '16px'
              }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}