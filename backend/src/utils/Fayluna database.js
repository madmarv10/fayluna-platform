// utils/database.js

const { Pool } = require('pg');
const logger = require('./logger');

// Create a new pool instance using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true', // Optional, depending on hosting
});

// Log successful connection
pool.on('connect', () => {
  logger.info('Connected to the database');
});

// Handle unexpected errors
pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Export query function
const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  logger.info('executed query', { text, duration, rows: res.rowCount });
  return res;
};

module.exports = {
  query,
  pool, // Optional: for transactions or manual client usage
};
