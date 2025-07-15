import React from "react";
import { createRoot } from "react-dom/client";
// import App from "./App-minimal";
import "./index.css";

// Test if React can render anything at all
function AppWrapper() {
  console.log('AppWrapper rendering...');
  return React.createElement('div', {
    style: { padding: '20px', backgroundColor: 'lightblue' },
    className: 'mobile-professional'
  }, 'TEST: React is working! Professional mobile backgrounds should be visible.');
}

const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    createRoot(rootElement).render(<AppWrapper />);
  } catch (error) {
    console.error('React mounting error:', error);
    console.error('Error details:', error.message, error.stack);
    // Fallback static HTML
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>FinergyCloud</h1>
        <p>React Error: ${error.message}</p>
        <button onclick="window.location.reload()">Reload</button>
        <details style="margin-top: 20px; text-align: left;">
          <summary>Error Details</summary>
          <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto;">${error.stack || error.message}</pre>
        </details>
      </div>
    `;
  }
}
