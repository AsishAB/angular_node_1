const { Pool } = require("pg");

// require('dotenv').config()

// dotenv package is not required to be installed if we use nodemon.json

// const db_config = {
//     host:process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME,
// }

const db_config = {
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
}


const pool = new Pool(db_config);

module.exports = pool ; 