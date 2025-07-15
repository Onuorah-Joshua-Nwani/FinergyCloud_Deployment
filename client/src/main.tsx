import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

console.log('Starting FinergyCloud React app...');

const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <App />
    );
    console.log('✅ React app loaded successfully');
  } catch (error) {
    console.error('React mounting error:', error);
    // Simple fallback without complex HTML
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>FinergyCloud</h1>
        <p>Loading application...</p>
        <button onclick="window.location.reload()">Reload</button>
      </div>
    `;
  }
} else {
  console.error("Root element not found");
}
