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

function createUser(newUser) {
    return new Promise((resolve, reject) => {
        con.query(
            'INSERT INTO user (first_name, last_name, user_name, password, bio, phone_number, address, dob, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
            ],
            (error, results) => {
                if (error) {
                    if (error) {
                        reject(error)
                    }
                } else {
                    resolve(results)
                }
            }
        );
    })

}

function queryUser(username, password, callback) {

    let qr = `select * from user where user_name='${username}' and password = '${password}'`;
    con.query(qr, (error, results) => {
        callback(error, results);
    });
}
function getFollower(username, callback) {
    let ar = `select user.id as id, user_name, count(following_user_id) as follower from user left join follower as followers on user.id = followers.followed_user_id group by id having user.user_name = "${username}"`;
    con.query(ar, (error, results) => {
        callback(error, results);
    });
}
function getFeedUser(callback) {

    let ar = 'SELECT caption, media_url from post as post inner join post_media as media on post.post_media_id = media.id ORDER BY post.created_at;';
    con.query(ar, (error, results) => {
        callback(error, results);
    });
}

module.exports = {
    createUser,
    queryUser,
    getFeedUser,
    getFollower,
};
