import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Disable database connection in development to prevent errors
let pool: Pool | null = null;
let db: any = null;

// Only attempt database connection in production with valid URL
if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('disabled')) {
  try {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed, running without database:', error.message);
  }
} else {
  console.log('Database disabled - running in development mode without database');
}

export { pool, db };