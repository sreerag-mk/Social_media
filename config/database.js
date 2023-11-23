/* eslint-disable no-undef */

require('dotenv').config();
const host = process.env.MYSQL_URL;
const user = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

async function databaseConnection() {
    const mySql = require('mysql2/promise');
    const con = await mySql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });

    return con
}
module.exports = {
    databaseConnection,
};