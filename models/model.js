
const connection = require('./database')


async function createUser(newUser) {
    try {
        const con = await connection.databaseConnection()
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

async function queryUser(username, password) {
    try {
        const con = await connection.databaseConnection()
        let qr = `select * from user where user_name='${username}' and password = '${password}'`;
        const results = con.query(qr)
        return results
    }
    catch (error) {
        console.log(error)
    }
}
async function getFollower(username) {
    try {
        const con = await connection.databaseConnection()
        let ar = `select user.id as id, user_name, count(following_user_id) as follower from user left join follower as followers on user.id = followers.followed_user_id group by id having user.user_name = "${username}"`;
        const result = con.query(ar)
        return result
    }
    catch (error) {
        console.log(error)
    }
}
async function getFollowing(username) {
    try {
        const con = await connection.databaseConnection()
        let ar = `SELECT user.id,user_name,(SELECT COUNT(*) FROM follower AS f2 WHERE f2.following_user_id = user.id) AS following FROM user WHERE user.user_name = "${username}" ORDER BY user.id;`;
        const result = con.query(ar)
        return result

    }
    catch (error) {
        console.log(error)
    }

}
async function getFeedUser() {
    try {
        const con = await connection.databaseConnection()
        let ar = 'SELECT caption, media_url from post as post inner join post_media as media on post.post_media_id = media.id ORDER BY post.created_at;';
        const result = con.query(ar);
        return result;
    }
    catch (error) {
        console.log(error)
    }

}
async function getSearch(value) {
    try {
        const con = await connection.databaseConnection()
        console.log(value)
        let ar = `SELECT * from user where user_name= "${value}"`;
        const result = con.query(ar)
        return result;
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser,
    queryUser,
    getFeedUser,
    getFollower,
    getSearch,
    getFollowing,
};
