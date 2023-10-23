/* eslint-disable no-undef */

async function databaseConnection() {
    const mySql = require('mysql2/promise');
    const con = await mySql.createConnection({
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