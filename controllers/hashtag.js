const hashtagModel = require('../models/hashtag');

async function makeHashtag(req, res) {
    const userId = await req.user.id;
    try {
        const { tag } = req.body;
        if (tag) {
            console.log("inside hashtag creation")
            await hashtagModel.addHashtag(userId, tag)
            const data = {
                message: 'hashtag created!',
                status: 200,
                success: true
            };
            res.status(500).send(data)
        }
    }
    catch {
        console.log("An error occured at make post")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }
}

async function deleteHashtag(req, res) {
    try {
        const userId = req.user.id;
        const { tag } = req.body;
        await hashtagModel.deleteHashtag(userId, tag);
        const data = {
            message: 'Deleted succesfully',
            status: 200,
            success: true
        };
        res.status(200).send(data)
    }
    catch (error) {
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }
}

async function deletePost(req, res) {
    try {
        const userId = req.user.id;
        const { id } = req.body;
        await hashtagModel.deletePost(userId, id);
        const data = {
            message: 'Deleted succesfully',
            status: 200,
            success: true
        };
        res.status(200).send(data)
    }
    catch (error) {
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }
}

async function addPost(req, res) {
    try {
        const userId = req.user.id;
        const { postId, hashtagId } = req.body;
        const userCheck = await hashtagModel.userCheck(userId, postId, hashtagId);
        console.log("user check")
        console.log(userCheck)
        console.log(postId)
        if (userCheck == postId) {
            await hashtagModel.addPost(userId, postId, hashtagId);
            const data = {
                message: 'post added to hastag succesfully',
                status: 200,
                success: true
            };
            res.status(200).send(data)
        } else {
            const data = {
                message: 'This user cant add this post to the hashtag',
                status: 500,
                success: false
            };
            res.status(500).send(data)
        }
    }
    catch (error) {
        const data = {
            message: 'Error occured at adding post to an hashtag',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }
}

module.exports = {
    makeHashtag,
    deleteHashtag,
    addPost,
    deletePost,
}