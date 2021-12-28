const { Pool } = require('pg');

const localDb = "postgres://postgres:bbbold90001@localhost:5432/staphbank";
const remoteDb = process.env.DATABASE_URL;

const pool = (process.env.NODE_ENV == 'production')
  ? new Pool({ connectionString: remoteDb, ssl: { rejectUnauthorized: false }})
  : new Pool({connectionString: localDb});

module.exports = pool;

