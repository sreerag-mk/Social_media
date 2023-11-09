const commentModel = require('../models/comment')
async function comment(req, res) {
    try {
        const userId = await req.user.id;
        const { id, content } = req.body;
        const commentCheck = await commentModel.checkUserComment(userId, id, content);
        const commentChecked = commentCheck[0];
        if (commentChecked.length === 0) {
            if (content != "" || id != "") {
                const newComment = {
                    userId,
                    content,
                    id
                }
                await commentModel.addComment(newComment)
                const data = {
                    message: 'comment created!',
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
        } else {
            const data = {
                message: 'comment alreasy exsist',
                status: 500,
                success: true
            };
            res.status(500).send(data)
        }

    }
    catch {
        console.log("An error occured at comment")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }
}
async function replay(req, res) {
    try {
        const userId = await req.user.id;
        const { id, content } = req.body;
        if (id != "") {
            const newReplay = {
                userId,
                content,
                id
            }
            await commentModel.addReplay(newReplay)
            const data = {
                message: 'replay created created!',
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
    catch {
        console.log("An error occured at comment")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }
}


async function deleteComment(req, res) {
    try {
        const userId = await req.user.id;
        const { id } = req.body;
        if (id != "") {
            const newComment = {
                userId,
                id
            }
            await commentModel.removeComment(newComment)
            const data = {
                message: 'comment has been removed',
                status: 200,
                success: true
            };
            res.status(200).send(data)
        }

    }
    catch {
        console.log("An error occured at comment")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }

}


async function deleteReplay(req, res) {
    try {
        const userId = await req.user.id;
        const { content, id } = req.body;
        if (id != "" || content != "") {
            const newReplay = {
                userId,
                content,
                id
            }
            await commentModel.removeReplay(newReplay)
            const data = {
                message: 'replay has been removed',
                status: 200,
                success: true
            };
            res.status(200).send(data)
        }

    }
    catch {
        console.log("An error occured at comment")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }

}


async function commentCount(req, res) {
    try {
        const { id } = req.body;
        if (id != "") {
            const newLike = {
                id
            }
            const result = await commentModel.commentCount(newLike)
            const data = {
                message: result[0][0].comments,
                status: 200,
                success: true
            };
            res.status(500).send(data)
        }

    }
    catch {
        console.log("An error occured at comment count")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(200).send(data)
    }

}



async function replayCount(req, res) {
    try {
        const { id } = req.body;
        if (id != "") {
            const newReplay = {
                id
            }
            const result = await commentModel.replayCount(newReplay)
            const data = {
                message: result[0][0].replays,
                status: 200,
                success: true
            };
            res.status(200).send(data)
        }

    }
    catch {
        console.log("An error occured at replay count")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }

}

async function commentList(req, res) {
    console.log("commentList is open");
    try {
        const { id } = req.body;
        if (id != "") {
            const newComment = {
                id
            }
            const count = await commentModel.commentCount(newComment)
            const result = await commentModel.commentList(newComment)
            let finalResult = [];
            console.log(count)
            console.log(result)
            for (let i = 0; i < count[0][0].comments; i++) {
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
        console.log("An error occured at comment list")
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }
}


async function userCommented(req, res) {
    console.log("userCommented is open");
    const userId = await req.user.id;
    console.log(userId)
    try {
        const result = await commentModel.userCommented(userId)
        console.log(result)
        const finalResult = result[0][0].user
        const data = {
            message: finalResult,
            status: 200,
            success: true
        };
        res.status(500).send(data)
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
    comment,
    deleteComment,
    commentList,
    commentCount,
    userCommented,
    replay,
    deleteReplay,
    replayCount,
}