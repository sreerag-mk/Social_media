
const connection = require('../config/database')

async function getFeedUser(size, offset) {
    try {
        const con = await connection.databaseConnection()
        let ar = `SELECT post.id, caption, media_url from post as post inner join post_media as media on post.post_media_id = media.id ORDER BY post.created_at LIMIT ${size} OFFSET ${offset};`;
        const result = con.query(ar);
        con.end()
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
        let ar = `SELECT * from user where user_name like "${value}%"`;
        const result = con.query(ar)
        con.end()
        return result;
    }
    catch (error) {
        console.log(error)
    }
}

async function checkUserBlocked(userId, blockedUserId) {
    const con = await connection.databaseConnection();
    let qr = `select id from blocked where rid = ${userId} and bid = ${blockedUserId};`;
    const result = await con.query(qr)
    con.end()
    return result
}

async function blockUser(userId, blockedUserId) {
    try {
        const con = await connection.databaseConnection();
        await con.query(`insert into blocked(rid, bid) values(${userId}, ${blockedUserId})`)
    }
    catch (error) {
        console.log(error)
    }
}
async function unblock(userId, blockedUserId) {
    try {
        const con = await connection.databaseConnection();
        await con.query(`delete from blocked where rid = ${userId} and bid = ${blockedUserId}`)
    }
    catch (error) {
        console.log(error)
    }
}

async function reportUser(userId, reportedUserId, reason) {
    try {
        console.log("entering the module ")
        const con = await connection.databaseConnection();
        await con.query(`insert into report(reporter_user_id, reported_user_id, reason) values(${userId}, ${reportedUserId}, '${reason}')`)
    }
    catch (error) {
        console.log(error)
    }
}



module.exports = {
    getFeedUser,
    getSearch,
    blockUser,
    checkUserBlocked,
    unblock,
    reportUser,
};
