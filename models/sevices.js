
const connection = require('../config/database')

async function getFeedUser(size, offset) {
    try {
        const con = await connection.databaseConnection()
        let query = `SELECT post.id, caption, media_url from post as post inner join post_media as media on post.post_media_id = media.id ORDER BY post.created_at LIMIT ${size} OFFSET ${offset};`;
        const result = con.query(query);
        con.end()
        return result;
    }
    catch (error) {
        return false;
    }

}
async function getSearch(value) {
    try {
        const con = await connection.databaseConnection()
        let query = `SELECT * from user where user_name like "${value}%"`;
        const result = con.query(query)
        con.end()
        return result;
    }
    catch (error) {
        return false;
    }
}

async function checkUserBlocked(userId, blockedUserId) {
    try {
        const con = await connection.databaseConnection();
        let qr = `select id from blocked where rid = ${userId} and bid = ${blockedUserId};`;
        const result = await con.query(qr)
        con.end()
        return result
    }
    catch (error) {
        return false;
    }

}

async function blockUser(userId, blockedUserId) {
    try {
        const con = await connection.databaseConnection();
        await con.query(`insert into blocked(rid, bid) values(${userId}, ${blockedUserId})`)
        con.end()
        return true

    }
    catch (error) {
        return false
    }
}
async function unblock(userId, blockedUserId) {
    try {
        const con = await connection.databaseConnection();
        await con.query(`delete from blocked where rid = ${userId} and bid = ${blockedUserId}`)
        con.end()
        return true
    }
    catch (error) {
        return false
    }
}

async function reportUser(userId, reportedUserId, reason) {
    try {
        const con = await connection.databaseConnection();
        await con.query(`insert into report(reporter_user_id, reported_user_id, reason) values(${userId}, ${reportedUserId}, '${reason}')`)
        con.end()
        return true
    }
    catch (error) {
        return false
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
