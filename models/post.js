const connection = require('../config/database')
const { post } = require('../routes/group')


async function deletePost(postId, userId) {
    try {
        const con = await connection.databaseConnection()
        const urlId = await con.query(`select post_media_id from post where id = ${postId} and user_id = ${userId}; `)
        const mediaId = urlId[0][0].post_media_id
        // postId = parseInt(postId)

        if (mediaId) {
            await con.query(`delete from post where id = ${postId}`)
            await con.query(`delete from post_media where id = ${mediaId}`)
            return true
        }
        else {
            return false
        }
    }
    catch (error) {
        return false

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
        return false
    }

}

async function uploadImage(image, content_type, caption, content, status, userId) {
    try {
        const con = await connection.databaseConnection()
        let arrayImages = []
        image.forEach(element => {
            arrayImages.push(element.path)
        });
        const imagesPath = JSON.stringify(arrayImages);
        const result = await con.query(
            `insert into  post_media(media_url, content_type) values (?, ?);`,
            [
                imagesPath,
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
        return true
    }
    catch (error) {
        return false
    }
}

async function savedpost(userId, savedpost) {
    try {
        const con = await connection.databaseConnection();
        await con.query(`insert into saved_post(user_id, post_id) values(${userId}, ${savedpost});`)
    }
    catch (error) {
        return false
    }
}

module.exports = {
    createPostUrl,
    deletePost,
    uploadImage,
    savedpost,
};