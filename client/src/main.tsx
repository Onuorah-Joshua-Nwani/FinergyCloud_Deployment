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
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('✅ React app loaded successfully');
  } catch (error) {
    console.error('React app loading error:', error);
    // Fallback for deployment issues
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; background: linear-gradient(135deg, #059669, #2563eb); color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div>
          <h1 style="font-size: 48px; margin-bottom: 16px;">FinergyCloud</h1>
          <p style="font-size: 20px; margin-bottom: 32px; opacity: 0.9;">AI-Powered Renewable Energy Platform</p>
          <a href="/?platform=mobile" style="display: inline-block; background: white; color: #059669; padding: 12px 24px; border-radius: 6px; font-weight: 500; text-decoration: none;">
            Try Mobile App
          </a>
        </div>
      </div>
    `;
  }
} else {
  console.error("Root element not found");
}
