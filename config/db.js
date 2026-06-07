const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT, // Added port
    waitForConnections: true,
    connectionLimit: 10,
    // Add this SSL block for Aiven
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool.promise();