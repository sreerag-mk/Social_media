const hashtagModel = require('../models/hashtag');

async function makeHashtag(req, res) {
    const userId = req.user.id;
    try {
        const { tag } = req.body;
        if (tag) {
            await hashtagModel.addHashtag(userId, tag)
            const data = {
                message: 'hashtag created!',
                success: true
            };
            res.status(200).send(data)
        }
    }
    catch {
        const data = {
            message: 'Error occured',
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
            success: true
        };
        res.status(200).send(data)
    }
    catch (error) {
        const data = {
            message: 'Error occured',
            success: false
        };
        res.status(500).send(data)
    }
}

async function deletePost(req, res) {
    try {
        const userId = req.user.id;
        const { id } = req.body;
        console.log('this is the 3 st')
        const result = await hashtagModel.deletePost(userId, id);
        console.log('this is the 2 st')
        console.log(result[0])
        if (result[0] == []) {
            const data = {
                message: 'No mathch found',
                success: true
            };
            res.status(200).send(data)
        }
        else {
            const data = {
                message: 'Deleted succesfully',
                success: true
            };
            res.status(200).send(data)
        }
    }
    catch (error) {
        const data = {
            message: 'Error occured',
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
        if (userCheck == postId) {
            await hashtagModel.addPost(userId, postId, hashtagId);
            const data = {
                message: 'post added to hastag succesfully',
                success: true
            };
            res.status(200).send(data)
        } else {
            const data = {
                message: 'This user cant add this post to the hashtag',
                success: false
            };
            res.status(500).send(data)
        }
    }
    catch (error) {
        const data = {
            message: 'Error occured at adding post to an hashtag',
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