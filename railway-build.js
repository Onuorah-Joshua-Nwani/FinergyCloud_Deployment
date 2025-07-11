import { build } from 'vite';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildProject() {
  console.log('Starting Railway build process...');
  
  try {
    // Build the client
    console.log('Building client application...');
    await build({
      configFile: path.resolve(__dirname, 'vite.config.production.ts'),
      root: path.resolve(__dirname, 'client'),
      build: {
        outDir: path.resolve(__dirname, 'dist/public'),
        emptyOutDir: true
      }
    });
    
    console.log('Client build completed!');
    
    // Build the server
    console.log('Building server...');
    const esbuild = spawn('npx', [
      'esbuild',
      'server/index.ts',
      '--platform=node',
      '--packages=external',
      '--bundle',
      '--format=esm',
      '--outdir=dist'
    ], { stdio: 'inherit' });
    
    esbuild.on('close', (code) => {
      if (code === 0) {
        console.log('Server build completed!');
        console.log('Build process finished successfully!');
      } else {
        console.error('Server build failed with code', code);
        process.exit(code);
      }
    });
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();