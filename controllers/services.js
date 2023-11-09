const serviceModel = require('../models/sevices');

async function getFeed(req, res) {
    try {
        const page = parseInt(req.body.page)
        const size = parseInt(req.body.size)
        const offset = (page - 1) * size
        const result = await serviceModel.getFeedUser(size, offset);
        if (result[0].length == 0) {
            const data = {
                message: 'Login failed',
                success: false
            };
            res.status(500).send(data);
        } else {
            const data = {
                message: result[0],
                success: true
            };
            res.status(200).send(data);
        }
    }
    catch (error) {
        const data = {
            message: 'Login failed',
            success: false
        };
        res.status(500).send(data)
    }

}

async function search(req, res) {
    try {
        const { user_name } = req.body;
        if (user_name == undefined) {
            res.status(500).send({ error: "please type something ", success: false });
        } else {
            const result = await serviceModel.getSearch(user_name);

            if (result[0].length == 0) {

                const data = {
                    message: "No user found",
                    success: false
                };
                res.status(500).send(data);
            } else {
                const data = {
                    message: result[0],
                    success: true
                };
                res.status(200).send(data);
            }
        }
    }
    catch (error) {
        const data = {
            message: "ERROR",
            success: false
        };
        res.status(500).send(data);
    }

}

async function blocked(req, res) {
    const userId = req.user.id;
    const { blockedUserId } = req.body;
    const blockCheck = await serviceModel.checkUserBlocked(userId, blockedUserId)
    if (blockCheck[0].length === 0) {
        if (userId != "" || blockedUserId != "") {
            await serviceModel.blockUser(userId, blockedUserId)
            const data = {
                message: 'User blocked',
                success: true
            };
            res.status(500).send(data)
        }
        else {
            const data = {
                message: 'please enter the values',
                success: false
            };
            res.status(500).send(data)
        }
    } else {
        if (userId != "" || blockedUserId != "") {
            await serviceModel.unblock(userId, blockedUserId)
            const data = {
                message: 'user has been unblocked',
                success: true
            };
            res.status(500).send(data)
        }
    }

}

async function reports(req, res) {
    const userId = req.user.id;
    const { reportedUserId, reason } = req.body;
    if (userId != "" || reportedUserId != "") {
        await serviceModel.reportUser(userId, reportedUserId, reason)
        const data = {
            message: 'User reported',
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

module.exports = {
    getFeed,
    search,
    blocked,
    reports,
};
