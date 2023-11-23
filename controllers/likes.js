const likeModel = require('../models/likes');

async function like(req, res) {
    try {
        const userId = req.user.id;
        const { type, id } = req.body;
        const userCheck = await likeModel.checkUserLiked(userId, id, type)
        const userChecked = userCheck[0]
        if (userChecked.length === 0) {
            if (type != "" || id != "") {
                const newLike = {
                    userId,
                    type,
                    id
                }
                await likeModel.addLike(newLike)
                const data = {
                    message: 'like created!',
                    success: true
                };
                res.status(200).send(data)
            }
            else {
                const data = {
                    message: 'please enter the values',
                    success: false
                };
                res.status(200).send(data)
            }
        }
        else if (type != "" || id != "") {
            const newLike = {
                userId,
                type,
                id
            }
            await likeModel.disLike(newLike)
            const data = {
                message: 'Like has been removed',
                success: true
            };
            res.status(200).send(data)
        } else {
            const data = {
                message: 'please enter some data',
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

async function disLike(req, res) {
    try {
        const userId = req.user.id;
        const { type, id } = req.body;
        if (type != "" || id != "") {
            const newLike = {
                userId,
                type,
                id
            }
            await likeModel.disLike(newLike)
            const data = {
                message: 'like has been removed',
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

async function likeCount(req, res) {
    try {
        const { type, id } = req.body;
        if (type != "" || id != "") {
            const newLike = {
                type,
                id
            }
            const result = await likeModel.likeCount(newLike)
            const data = {
                message: result[0][0].post,
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


async function likedList(req, res) {
    try {
        const { type, id } = req.body;
        if (type != "" || id != "") {
            const newLike = {
                type,
                id
            }
            const count = await likeModel.likeCount(newLike)
            const result = await likeModel.likedList(newLike)
            let finalResult = [];
            for (let i = 0; i < count[0][0].post; i++) {
                finalResult.push(result[0][i].user_name)
            }
            const data = {
                message: finalResult,
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


async function userLiked(req, res) {
    const userId = req.user.id;
    try {
        const { type } = req.body;
        if (type != "") {
            const newLike = {
                type,
                userId
            }
            const result = await likeModel.userLiked(newLike)
            const finalResult = result[0][0].user
            const data = {
                message: finalResult,
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

module.exports = {
    like,
    disLike,
    likedList,
    likeCount,
    userLiked
}