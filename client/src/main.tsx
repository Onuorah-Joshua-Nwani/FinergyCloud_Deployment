import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Verify React is properly loaded
console.log('React version:', React.version);
console.log('React hooks available:', {
  useState: typeof React.useState,
  useEffect: typeof React.useEffect,
  useContext: typeof React.useContext
});

// Only proceed if React is properly loaded
if (!React || !React.useState) {
  console.error('React not properly loaded - reloading page');
  window.location.reload();
  throw new Error('React not available');
}

// Error boundary for React mounting issues
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (error.message.includes('Cannot read properties of null')) {
        setHasError(true);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>FinergyCloud</h1>
        <p>Application error detected. Reloading...</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  return <>{children}</>;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
