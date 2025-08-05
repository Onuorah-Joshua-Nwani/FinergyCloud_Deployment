#!/bin/bash
pkill -f "npm\|node\|tsx\|vite" || true
sleep 2
cd /home/runner/workspace
npm run dev