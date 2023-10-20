/* eslint-disable no-undef */

async function databaseConnection() {
    const mysql = require('mysql2/promise');
    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'sreerag',
    });

    return con
}
module.exports = {
    databaseConnection,
};