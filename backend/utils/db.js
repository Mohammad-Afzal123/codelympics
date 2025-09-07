import 'dotenv/config';  // loads .env before anything else
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Supabase requires SSL
  },
  max: 20,                     // max connections
  idleTimeoutMillis: 30000,    // 30s idle timeout
  connectionTimeoutMillis: 2000, // 2s connection timeout
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
