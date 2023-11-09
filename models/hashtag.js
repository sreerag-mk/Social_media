const connection = require('../config/database')


async function addHashtag(userId, content) {
    try {
        const con = await connection.databaseConnection();
        await con.query(
            'insert into  hashtag(user_id, name) values (?, ?);',
            [
                userId,
                content
            ]
        );

    }
    catch (error) {
        console.log(error)
    }
}

async function deleteHashtag(userId, tag) {
    try {
        const con = await connection.databaseConnection();
        await con.query(
            `delete from hashtag where user_id = ${userId} and name = "${tag}"  ;`,
        );
    }
    catch (error) {
        console.log(error)
    }
}

async function userCheck(userId, postId, hashtagId) {
    try {
        const con = await connection.databaseConnection();
        console.log(userId)
        console.log(postId)
        const result = await con.query(
            `select id from post 
            where user_id = ${userId} and id = ${postId} ;`
        )
        console.log(result[0][0].id)
        return result[0][0].id
    }
    catch (error) {
        console.log(error)
    }
}

async function deletePost(userId, id) {
    try {
        const con = await connection.databaseConnection();
        const result = await con.query(
            `select hashtag_post.id from hashtag_post
            inner join post on post.id = hashtag_post.post_id
             where hashtag_post.id = ${id} and post.user_id = ${userId};`
        )
        console.log(result)
        console.log(result[0][0].id)
        await con.query(
            `delete from hashtag_post where id = ${result[0][0].id};`,
        );
    }
    catch (error) {
        console.log(error)
    }
}

async function addPost(userId, postId, hashtagId) {
    try {
        const con = await connection.databaseConnection();

        await con.query(
            'insert into  hashtag_post(post_id, hashtag_id) values (?, ?);',
            [
                postId,
                hashtagId
            ]
        );

    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    addHashtag,
    deleteHashtag,
    addPost,
    deletePost,
    userCheck,
}