# Required .replit Configuration for Cloud Run Deployment

Since I cannot modify the .replit file directly, you need to add this deployment section to your .replit file:

## Add this to your .replit file:

```toml
run = "npm run dev"
modules = ["nodejs-20"]

[nix]
channel = "stable-24_05"

[[ports]]
localPort = 5000
externalPort = 80

[deployment]
run = ["sh", "-c", "node start.js"]
deploymentTarget = "cloudrun"
ignorePorts = false

[deployment.environment]
NODE_ENV = "production"
PORT = "8080"