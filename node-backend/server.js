const { Pool, Client } = require("pg");
require('dotenv').config()

const db_config = {
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
}

//console.log(db_config)
const pool = new Pool(db_config);

module.exports = pool;


