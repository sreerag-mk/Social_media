const connection = require('../config/database')


async function checkUserComment(userId, id) {
    const con = await connection.databaseConnection()
    let qr = `select id from comments where user_id = ${userId} and post_id = ${id};`
    const results = await con.query(qr)
    con.end()
    return results
}

async function addComment(newComment) {
    try {
        const con = await connection.databaseConnection()
        await con.query(
            `insert into comments(user_id, post_id, content) values (${newComment.userId}, ${newComment.id}, "${newComment.content}");`
        )
    }
    catch (error) {
        return error
    }
}

async function addReplay(newReplay) {
    try {
        const con = await connection.databaseConnection()
        await con.query(
            `insert into replays(user_id, comment_id, content) values ("${newReplay.userId}", "${newReplay.id}", "${newReplay.content}")`
        )
    }
    catch (error) {
        return error
    }
}

async function removeComment(newComment) {
    try {
        const con = await connection.databaseConnection()
        const commentId = await con.query(`select comments.id from comments inner join post as post on post.id = comments.post_id where comments.id = ${newComment.id} and (post.user_id = ${newComment.userId} or comments.user_id = ${newComment.userId});`)
        const newCommentId = commentId[0][0].id
        await con.query(
            `delete from comments where id = ${newCommentId} ;`
        )
    }
    catch (error) {
        return error
    }
}

async function removeReplay(newReplay) {
    try {
        const con = await connection.databaseConnection()
        const replayId = await con.query(`select id from replays where user_id = ${newReplay.userId}  and comment_id = ${newReplay.id};`)
        const newReplayId = replayId[0][0].id

        await con.query(
            `delete from replays where id = ${newReplayId} ;`
        )
    }
    catch (error) {
        return error
    }
}

async function commentCount(newComment) {
    try {
        const con = await connection.databaseConnection();
        return await con.query(`select count(id) as comments from comments group by post_id having post_id = ${newComment.id} ;`)
    }
    catch (error) {
        return error
    }
}

async function replayCount(newReplay) {
    try {
        const con = await connection.databaseConnection();
        return await con.query(`select count(id) as replays from replays group by comment_id having comment_id = ${newReplay.id} ;`)
    }
    catch (error) {
        return error
    }
}



async function commentList(newComment) {
    try {
        const con = await connection.databaseConnection();
        return await con.query(`SELECT user.user_name from comments inner join user as user on user.id = comments.user_id  where post_id = "${newComment.id}" ;`)
    }
    catch (error) {
        return error
    }
}

async function userCommented(userId) {
    try {
        const con = await connection.databaseConnection();
        return await con.query(`SELECT  count(user.user_name) as user from comments inner join user as user on user.id = comments.user_id  where user.id = "${userId}";`)
    }
    catch (error) {
        return error
    }
}

module.exports = {
    checkUserComment,
    addComment,
    removeComment,
    commentCount,
    commentList,
    userCommented,
    addReplay,
    removeReplay,
    replayCount,
}