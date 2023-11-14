const connection = require('../config/database')


async function checkUserLiked(userId, id, type) {
    const con = await connection.databaseConnection()
    if (type == "post") {
        let qr = `select id from likes where user_id = ${userId} and post_id = ${id};`
        const results = await con.query(qr)
        con.end()
        return results
    }
    else if (type == "comment") {
        let qr = `select id from likes where user_id = ${userId} and comment_id = ${id};`
        const results = await con.query(qr)
        con.end()
        return results
    }
    else {
        return false
    }
}

async function addLike(newLike) {
    try {
        const con = await connection.databaseConnection()
        if (newLike.type === "post") {
            await con.query(
                `insert into likes(user_id, post_id) values(${newLike.userId}, "${newLike.id}");`
            )
            con.end()
        }
        else if (newLike.type === "comment") {
            await con.query(
                `insert into likes(user_id, comment_id) values(${newLike.userId}, "${newLike.id}");`
            )
            con.end()
        }
        else {
            con.end()
            return false
        }

    }
    catch (error) {
        return false
    }
}
async function disLike(newLike) {
    try {
        const con = await connection.databaseConnection()
        let likeId = 0
        if (newLike.type === "post") {
            likeId = await con.query(`select id from likes where user_id = ${newLike.userId} and post_id = ${newLike.id};`)

        }
        else if (newLike.type === "comment") {
            likeId = await con.query(`select id from likes where user_id = ${newLike.userId} and comment_id = ${newLike.id}; `)
        } else {
            return Error
        }
        const newLikeId = likeId[0][0].id
        await con.query(
            `delete from likes where id = ${newLikeId} ;`
        )
        con.end()
    }
    catch (error) {
        return false
    }
}
async function likedList(newLike) {
    try {
        const con = await connection.databaseConnection();
        if (newLike.type === "post") {
            return await con.query(`SELECT  user.user_name from likes inner join user as user on user.id = likes.user_id where post_id = ${newLike.id}; `)
        }
        else if (newLike.type === "comment") {
            return await con.query(`SELECT  user.user_name from likes inner join user as user on user.id = likes.user_id where comment_id = ${newLike.id};`)
        } else {
            con.end()
            return false;
        }

    }
    catch (error) {
        return false;
    }
}

async function likeCount(newLike) {
    try {
        const con = await connection.databaseConnection();
        if (newLike.type === "post") {
            return await con.query(`SELECT count(post_id) as post from likes inner join user as user on user.id = likes.user_id where post_id = ${newLike.id};`)
        }
        else if (newLike.type === "comment") {
            return await con.query(`SELECT count(comment_id) as comment from likes inner join user as user on user.id = likes.user_id where comment_id = ${newLike.id};`)
        } else {
            con.end()
            return false;
        }

    }
    catch (error) {
        return false;
    }
}

async function userLiked(newLike) {
    try {
        const con = await connection.databaseConnection();
        if (newLike.type === "post") {
            return await con.query(`SELECT  count(user.user_name) as user from likes inner join user as user on user.id = likes.user_id  where user.id = "${newLike.userId}" and post_id is not null;`)
        }
        else if (newLike.type === "comment") {
            return await con.query(`SELECT  count(user.user_name) as user from likes inner join user as user on user.id = likes.user_id  where user.id = "${newLike.userId}" and comment_id is not null;`)
        } else {
            con.end()
            return false;
        }

    }
    catch (error) {
        return false;
    }
}

module.exports = {
    addLike,
    disLike,
    likedList,
    likeCount,
    userLiked,
    checkUserLiked,
}