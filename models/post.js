const connection = require('../config/database')


async function deletePost(postId, userId) {
    try {
        const con = await connection.databaseConnection()
        const urlId = await con.query(`select post_media_id from post where id = ${postId} and user_id = ${userId}; `)
        const mediaId = urlId[0][0].post_media_id
        // postId = parseInt(postId)

        if (mediaId) {
            console.log(mediaId)
            await con.query(`delete from post where id = ${postId}`)
            console.log(postId)
            await con.query(`delete from post_media where id = ${mediaId}`)
            console.log("inside delete model")
        }
        else {
            return Error
        }
    }
    catch (error) {
        return Error
    }
}

async function createPostUrl(newPost) {
    try {
        const con = await connection.databaseConnection()
        const result = await con.query(
            'insert into  post_media(media_url, content_type) values (?, ?);',
            [
                newPost.media_url,
                newPost.content_type
            ]
        );
        const insertedId = result[0].insertId;

        await con.query(
            'insert into  post(user_id, caption, post_media_id, content, status) values (?, ?, ?, ?, ?);',
            [
                newPost.userId,
                newPost.caption,
                insertedId,
                newPost.content,
                newPost.status
            ]
        )

        con.end()
        return insertedId
    }
    catch (error) {
        return Error
    }

}

async function uploadImage(image, content_type, caption, content, status, userId) {
    try {
        const con = await connection.databaseConnection()
        const result = await con.query(
            'insert into  post_media(media_url, content_type) values (?, ?);',
            [
                image,
                content_type
            ]
        );
        const insertedId = result[0].insertId;
        await con.query(
            'insert into  post(user_id, caption, post_media_id, content, status) values (?, ?, ?, ?, ?);',
            [
                userId,
                caption,
                insertedId,
                content,
                status
            ]
        )
    }
    catch (error) {
        return Error
    }
}

async function savedpost(userId, savedpost) {
    try {
        const con = await connection.databaseConnection();
        await con.query(`insert into saved_post(user_id, post_id) values(${userId}, ${savedpost});`)
    }
    catch (error) {
        return Error
    }
}

module.exports = {
    createPostUrl,
    deletePost,
    uploadImage,
    savedpost,
};