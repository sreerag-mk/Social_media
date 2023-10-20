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

async function createUser(newUser) {
    try {
        const result = await con.query(
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
            ]
        );
        console.log(result)
    }
    catch (error) {
        return error

    }


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
function getFollowing(username, callback) {
    let ar = `SELECT user.id,user_name,(SELECT COUNT(*) FROM follower AS f2 WHERE f2.following_user_id = user.id) AS following FROM user WHERE user.user_name = "${username}" ORDER BY user.id;`;
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
function getSearch(value, callback) {
    console.log(value)
    let ar = `SELECT * from user where user_name= "${value}"`;
    con.query(ar, (error, results) => {
        callback(error, results);
    });
}

module.exports = {
    createUser,
    queryUser,
    getFeedUser,
    getFollower,
    getSearch,
    getFollowing,
};
