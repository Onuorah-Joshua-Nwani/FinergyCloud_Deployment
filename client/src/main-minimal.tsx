import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Minimal test app without any hooks or context
function MinimalApp() {
  return (
    <div className="min-h-screen mobile-professional">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-professional-navy mb-4">
          FinergyCloud Mobile App
        </h1>
        <p className="text-professional-gray mb-6">
          Testing professional background colors without React hooks
        </p>
        <div className="mobile-card-professional p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Professional Card</h2>
          <p>This card should have professional styling with blue-gray gradients.</p>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    createRoot(rootElement).render(<MinimalApp />);
    console.log("✓ React app mounted successfully without hooks");
  } catch (error) {
    console.error('React mounting error:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px;">
        <h1>FinergyCloud</h1>
        <p>React mounting failed: ${error}</p>
      </div>
    `;
  }
}