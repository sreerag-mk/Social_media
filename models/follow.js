const connection = require('../config/database')

async function getFollower(username) {
    try {
        const con = await connection.databaseConnection()
        let ar = `select user.id as id, user_name, count(following_user_id) as follower from user left join follower as followers on user.id = followers.followed_user_id group by id having user.user_name = "${username}"`;
        const result = con.query(ar)
        con.end()
        return result
    }
    catch (error) {
        return error
    }
}
async function getFollowing(username) {
    try {
        const con = await connection.databaseConnection()
        let ar = `SELECT user.id,user_name,(SELECT COUNT(*) FROM follower AS f2 WHERE f2.following_user_id = user.id) AS following FROM user WHERE user.user_name = "${username}" ORDER BY user.id;`;
        const result = con.query(ar)
        con.end()
        return result

    }
    catch (error) {
        return error
    }

}

module.exports = {
    getFollower,
    getFollowing,
}