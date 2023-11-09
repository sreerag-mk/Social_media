const commentModel = require('../models/comment')
async function comment(req, res) {
    try {
        const userId = req.user.id;
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
                    success: true
                };
                res.status(200).send(data)
            }
            else {
                const data = {
                    message: 'please enter the values',
                    success: false
                };
                res.status(500).send(data)
            }
        } else {
            const data = {
                message: 'comment alreasy exsist',
                success: true
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
async function replay(req, res) {
    try {
        const userId = req.user.id;
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
                success: true
            };
            res.status(200).send(data)
        }
        else {
            const data = {
                message: 'please enter the values',
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


async function deleteComment(req, res) {
    try {
        const userId = req.user.id;
        const { id } = req.body;
        if (id != "") {
            const newComment = {
                userId,
                id
            }
            await commentModel.removeComment(newComment)
            const data = {
                message: 'comment has been removed',
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


async function deleteReplay(req, res) {
    try {
        const userId = req.user.id;
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
                success: true
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

async function commentList(req, res) {
    try {
        const { id } = req.body;
        if (id != "") {
            const newComment = {
                id
            }
            const count = await commentModel.commentCount(newComment)
            const result = await commentModel.commentList(newComment)
            let finalResult = [];
            for (let i = 0; i < count[0][0].comments; i++) {
                finalResult.push(result[0][i].user_name)
            }
            const data = {
                message: finalResult,
                success: true
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


async function userCommented(req, res) {
    const userId = req.user.id;
    try {
        const result = await commentModel.userCommented(userId)
        const finalResult = result[0][0].user
        const data = {
            message: finalResult,
            success: true
        };
        res.status(200).send(data)
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
    comment,
    deleteComment,
    commentList,
    commentCount,
    userCommented,
    replay,
    deleteReplay,
    replayCount,
}