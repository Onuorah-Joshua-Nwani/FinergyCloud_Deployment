import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Simple wrapper without hooks
function AppWrapper() {
  return <App />;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    createRoot(rootElement).render(<AppWrapper />);
  } catch (error) {
    console.error('React mounting error:', error);
    // Fallback static HTML
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>FinergyCloud</h1>
        <p>Loading application...</p>
        <button onclick="window.location.reload()">Reload</button>
      </div>
    `;
  }
}
