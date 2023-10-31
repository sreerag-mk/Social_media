const postModel = require('../models/post');


async function uploadImage(req, res) {
    const userId = await req.user.id;
    console.log(userId)
    console.log("the image is ")
    try {
        const image = req.file;
        const { content_type, caption, content, status } = req.body;
        // console.log(image)
        console.log(content_type)
        console.log(caption)
        console.log(content)
        console.log(status)
        console.log(userId)
        console.log(image.path)
        await postModel.uploadImage(image.path, content_type, caption, content, status, userId)
        const data = {
            message: 'Post created!',
            status: 200,
            success: true
        };
        res.status(500).send(data)

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

async function makePost(req, res) {
    try {
        const userId = await req.user.id;
        console.log(userId)
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
                status: 200,
                success: true
            };
            res.status(500).send(data)
            console.log(newPost)
        }
        else {
            console.log("An error occured at make post")
            const data = {
                message: 'Error occured',
                status: 500,
                success: false
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

async function deletePost(req, res) {
    console.log("this works")
    try {
        const userId = await req.user.id;
        console.log(userId)
        const { postId } = req.body;
        await postModel.deletePost(postId)
        const data = {
            message: 'Deleted succesfully',
            status: 200,
            success: true
        };
        res.status(500).send(data)
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

module.exports = {
    makePost,
    deletePost,
    uploadImage
};







