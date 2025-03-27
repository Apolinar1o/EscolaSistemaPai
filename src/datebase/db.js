require("dotenv").config(); 
const db = require("mysql2/promise");

const pool = db.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hyslla21',
    database: 'celcb',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
})

module.exports = pool;