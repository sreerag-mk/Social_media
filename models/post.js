const connection = require('../config/database')


async function deletePost(postId) {
    try {
        console.log("delete post");
        const con = await connection.databaseConnection()
        const urlId = await con.query(`select post_media_id from post where id = ${postId} `)
        const mediaId = urlId[0][0].post_media_id
        await con.query(
            `delete from post where id = ${postId} ;`
        )
        await con.query(
            `delete from post_media where id = ${mediaId} ;`
        )
    }
    catch (error) {
        console.log(error)
    }
}

async function createPostUrl(newPost) {
    try {
        console.log("new user");
        const con = await connection.databaseConnection()
        const result = await con.query(
            'insert into  post_media(media_url, content_type) values (?, ?);',
            [
                newPost.media_url,
                newPost.content_type
            ]
        );
        // const insertedId = await result[1][0].newId;
        const insertedId = result[0].insertId;
        console.log(insertedId)
        console.log("-------------------------------------------------------------------------------------------------------")

        const createdPost = await con.query(
            'insert into  post(user_id, caption, post_media_id, content, status) values (?, ?, ?, ?, ?);',
            [
                newPost.userId,
                newPost.caption,
                insertedId,
                newPost.content,
                newPost.status
            ]
        )

        console.log(createdPost)
        con.end()
        return insertedId
    }
    catch (error) {
        console.log("issue at post creation module")
        console.log(error)
    }

}

async function uploadImage(image, content_type, caption, content, status, userId) {
    try {
        console.log("upload post");
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
        console.log(error)
    }
}

module.exports = {
    createPostUrl,
    deletePost,
    uploadImage,
};