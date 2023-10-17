/* eslint-disable no-undef */
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sreerag',
});

con.connect((err) => {
    if (err) {
        console.log(`${err.message}`);
    } else {
        console.log("Database connection complete");
    }
});

function createUser(newUser, callback) {
    con.query(
        'INSERT INTO user (first_name, last_name, user_name, password, bio, phone_number, address, dob, gender, category_id, status, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            newUser.first_name,
            newUser.last_name,
            newUser.user_name,
            newUser.password,
            newUser.bio,
            newUser.phone_number,
            newUser.address,
            newUser.dob,
            newUser.gender,
            newUser.category_id,
            newUser.status,
            newUser.created_at,
            newUser.modified_at,
        ],
        (error, results) => {
            if (error) {
                console.error('Error inserting data:', error);
                callback(error, null);
            } else {
                console.log('Data inserted successfully.');
                callback(null, results);
            }
        });
}

function queryUser(query, callback) {
    con.query(query, (error, results) => {
        callback(error, results);
    });
}

module.exports = {
    createUser,
    queryUser,
};
