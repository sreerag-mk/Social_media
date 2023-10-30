
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

async function createUser(newUser) {
    try {
        console.log("the new user is here")
        console.log(newUser)
        const con = await connection.databaseConnection()
        const result = await con.query(
            'INSERT INTO user (first_name, last_name, user_name, password, phone_number, address, dob, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                newUser.first_name,
                newUser.last_name,
                newUser.user_name,
                newUser.password,
                newUser.phone_number,
                newUser.address,
                newUser.dob,
                newUser.gender,
            ]
        );
        con.end()
        console.log(result)
    }
    catch (error) {
        return error

    }
}

async function checkUser(user_name) {
    console.log(user_name)
    const con = await connection.databaseConnection()
    let qr = `select user_name from user where user_name="${user_name}"`
    const results = await con.query(qr)
    console.log(results[0])
    con.end()
    return results
}

async function checkUserLiked(userId, id, type) {
    console.log(userId);
    const con = await connection.databaseConnection()
    if (type == "post") {
        let qr = `select id from likes where user_id = ${userId} and post_id = ${id};`
        const results = await con.query(qr)
        console.log(results[0])
        con.end()
        return results
    }
    else if (type == "comment") {
        let qr = `select id from likes where user_id = ${userId} and comment_id = ${id};`
        const results = await con.query(qr)
        console.log(results[0])
        con.end()
        return results
    }
    else {
        return "the code has errors";
    }
}


async function queryUser(username, password) {
    try {
        const con = await connection.databaseConnection()
        let qr = `select id, user_name from user where user_name='${username}' and password = '${password}'`;
        const results = con.query(qr)
        con.end()
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
        con.end()
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
        con.end()
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

async function addingBio(userId, newBio) {
    try {
        console.log("inside")
        const con = await connection.databaseConnection()
        await con.query(
            `update user set bio = "${newBio}" where id = ${userId};`
        )

    }
    catch (error) {
        console.log(error)
    }
}

async function editingBio(userId, newBio) {
    try {
        const con = await connection.databaseConnection()
        await con.query(
            `update user set bio = "${newBio}" where id = ${userId};`
        )
    }
    catch (error) {
        console.log(error)
    }
}
async function addLike(newLike) {
    console.log("inside the addlike");
    try {
        const con = await connection.databaseConnection()
        console.log(newLike.type)
        if (newLike.type === "post") {
            await con.query(
                `insert into likes(user_id, post_id) values(${newLike.userId}, "${newLike.id}");`
            )
        }
        else if (newLike.type === "comment") {
            await con.query(
                `insert into likes(user_id, comment_id) values(${newLike.userId}, "${newLike.id}");`
            )
        }
        else {
            console.log("the entered type is not valid");
        }

    }
    catch (error) {
        console.log(error)
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
            console.log("error occured while deleting the data ")
        }
        // likeId2 = likeId
        const newLikeId = likeId[0][0].id
        await con.query(
            `delete from likes where id = ${newLikeId} ;`
        )
    }
    catch (error) {
        console.log(error)
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
            console.log("error occured while deleting the data ")
        }

    }
    catch (error) {
        console.log(error)
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
            console.log("error occured while deleting the data ")
        }

    }
    catch (error) {
        console.log(error)
    }
}

async function userLiked(newLike) {
    try {
        const con = await connection.databaseConnection();
        if (newLike.type === "post") {
            return await con.query(`SELECT  count(user.user_name) from likes inner join user as user on user.id = likes.user_id  where user.id = "${newLike.userId}" and post_id is not null;`)
        }
        else if (newLike.type === "comment") {
            return await con.query(`SELECT  count(user.user_name) from likes inner join user as user on user.id = likes.user_id  where user.id = "${newLike.userId}" and comment_id is not null;`)
        } else {
            console.log("error occured while deleting the data ")
        }

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
    checkUser,
    getFollowing,
    createPostUrl,
    deletePost,
    addingBio,
    editingBio,
    addLike,
    disLike,
    likedList,
    likeCount,
    userLiked,
    checkUserLiked,
};
