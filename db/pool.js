require("dotenv").config();
const { Pool } = require("pg");

//Dev
const pool = new Pool({
  user: process.env.DEV_DB_USER,
  password: process.env.DEV_DB_PASSWORD,
  host: process.env.DEV_DB_HOST,
  port: process.env.DEV_DB_PORT,
  database: process.env.DEV_DB_NAME,
});

//prod


// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false 
//   },
//   connectionTimeoutMillis: 5000, 
//   idleTimeoutMillis: 30000
  
// });
console.log("Attempting to connect to:", process.env.DATABASE_URL ? "URL found" : "URL NOT FOUND");

module.exports = pool;