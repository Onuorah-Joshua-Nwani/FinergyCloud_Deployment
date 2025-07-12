// Direct server start for Replit - no complexity, just works
import { exec } from 'child_process';
exec('NODE_ENV=development npx tsx server/index.ts', { stdio: 'inherit' });