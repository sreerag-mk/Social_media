/* eslint-disable prefer-destructuring */
const postModel = require('../models/post');
const fs = require('fs');



async function uploadImage(req, res) {
    const userId = req.user.id;
    try {
        const image = req.files;
        const { content_type, caption, content, status } = req.body;
        if (content_type == "photo") {
            await postModel.uploadImage(image, content_type, caption, content, status, userId);
            const data = {
                message: 'Post created!',
                success: true
            };
            res.status(200).send(data)
        } else if (content_type == "video") {
            if (req.file.size > 15000000) {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({ error: 'File size exceeds the 15 MB limit' });
            }
            else {
                await postModel.uploadImage(image.path, content_type, caption, content, status, userId)
                const data = {
                    message: 'Post created!',
                    success: true
                };
                res.status(200).send(data)
            }
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

async function makePost(req, res) {
    try {
        const userId = req.user.id;
        const { media_url, content_type, caption, content, status } = req.body;

        if (media_url != "") {
            const newPost = {
                userId,
                media_url,
                content_type,
                caption,
                content,
                status,
            }
            await postModel.createPostUrl(newPost);
            const data = {
                message: 'Post created!',
                success: true
            };
            res.status(200).send(data)
        }
        else {
            const data = {
                message: 'Error occured',
                success: false
            };
            res.status(500).send(data)
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

async function deletePost(req, res) {
    try {
        const userId = req.user.id;
        const { postId } = req.body;
        await postModel.deletePost(postId, userId)
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



async function savedpost(req, res) {
    const userId = req.user.id;
    const { savedposts } = req.body
    if (savedpost != "") {
        await postModel.savedpost(userId, savedposts)
        const data = {
            message: 'post saved',
            success: true
        };
        res.status(200).send(data)
    }
    else {
        const data = {
            message: 'please enter the values',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }
}




module.exports = {
    makePost,
    deletePost,
    uploadImage,
    savedpost,
};







