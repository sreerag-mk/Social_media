const userModel = require('../models/model');

async function like(req, res) {
    try {
        const userId = await req.user.id;
        const { type, id } = req.body;
        const userCheck = await userModel.checkUserLiked(userId, id, type)
        console.log(userCheck)
        const userChecked = userCheck[0]
        if (userChecked.length === 0) {
            console.log("inside 1st condition")
            if (type != "" || id != "") {

                const newLike = {
                    userId,
                    type,
                    id
                }
                await userModel.addLike(newLike)
                const data = {
                    message: 'like created!',
                    status: 200,
                    success: true
                };
                res.status(500).send(data)
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
        else {
            if (type != "" || id != "") {
                const newLike = {
                    userId,
                    type,
                    id
                }
                await userModel.disLike(newLike)
                const data = {
                    message: 'Like has been removed',
                    status: 200,
                    success: true
                };
                res.status(500).send(data)
            }
        }
        console.log("UserCheck")


    }
    catch {
        console.log("An error occured at like")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }

}

async function disLike(req, res) {
    try {
        const userId = await req.user.id;
        console.log(userId)
        const { type, id } = req.body;
        if (type != "" || id != "") {
            const newLike = {
                userId,
                type,
                id
            }
            await userModel.disLike(newLike)
            const data = {
                message: 'like has been removed',
                status: 200,
                success: true
            };
            res.status(500).send(data)
        }

    }
    catch {
        console.log("An error occured at like")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }

}

async function likeCount(req, res) {
    console.log("likeCount is open");
    try {
        const { type, id } = req.body;
        if (type != "" || id != "") {
            const newLike = {
                type,
                id
            }
            const result = await userModel.likeCount(newLike)
            const data = {
                message: result[0][0].post,
                status: 200,
                success: true
            };
            res.status(500).send(data)
        }

    }
    catch {
        console.log("An error occured at like count")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }

}


async function likedList(req, res) {
    console.log("likedList is open");
    try {
        const { type, id } = req.body;
        if (type != "" || id != "") {
            const newLike = {
                type,
                id
            }
            const count = await userModel.likeCount(newLike)
            const result = await userModel.likedList(newLike)
            let finalResult = [];
            for (let i = 0; i < count[0][0].post; i++) {
                finalResult.push(result[0][i].user_name)
            }
            console.log(finalResult)
            const data = {
                message: finalResult,
                status: 200,
                success: true
            };
            res.status(500).send(data)
        }

    }
    catch {
        console.log("An error occured at liked user")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }

}


async function userLiked(req, res) {
    console.log("userliked is open");
    const userId = await req.user.id;
    console.log(userId)
    try {
        const { type } = req.body;
        if (type != "") {
            const newLike = {
                type,
                userId
            }
            const result = await userModel.userLiked(newLike)
            console.log(result)
            const data = {
                message: result,
                status: 200,
                success: true
            };
            res.status(500).send(data)
        }

    }
    catch {
        console.log("An error occured at liked user")
        const data = {
            message: 'Error occured',
            status: 500,
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