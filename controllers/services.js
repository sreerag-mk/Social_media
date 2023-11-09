const serviceModel = require('../models/sevices');
const { report } = require('../routes/auth');


async function getFeed(req, res) {
    try {
        const page = parseInt(req.body.page)
        const size = parseInt(req.body.size)
        console.log("the page and size are")
        console.log(page)
        console.log(size)
        const offset = (page - 1) * size
        const result = await serviceModel.getFeedUser(size, offset);
        if (result[0].length == 0) {
            const data = {
                message: 'Login failed',
                status: 500,
                success: false
            };
            res.status(500).send(data);
        } else {
            console.log(result[0]);
            const data = {
                message: result[0],
                status: 200,
                success: true
            };
            res.status(200).send(data);
        }
    }
    catch (error) {
        console.log("An error occured at get feed")
        const data = {
            message: 'Login failed',
            status: 500,
            success: false
        };
        res.status(500).send(data)
    }

}

async function search(req, res) {
    try {
        const { user_name } = await req.body;
        if (user_name == undefined) {
            res.status(500).send({ error: "please type something " });
        } else {
            const result = await serviceModel.getSearch(user_name);

            if (result[0].length == 0) {

                const data = {
                    message: "No user found",
                    status: 500,
                    success: false
                };
                res.status(500).send(data);
            } else {
                console.log(result[0]);

                const data = {
                    message: result[0],
                    status: 200,
                    success: true
                };
                res.status(200).send(data);
            }
        }
    }
    catch (error) {
        console.log("an error occured at search")
        const data = {
            message: "ERROR",
            status: 500,
            success: false
        };
        res.status(500).send(data);
    }

}

async function blocked(req, res) {
    const userId = await req.user.id;
    const { blockedUserId } = req.body;
    const blockCheck = await serviceModel.checkUserBlocked(userId, blockedUserId)
    console.log("after checking the user id in locked table")
    if (blockCheck[0].length === 0) {
        if (userId != "" || blockedUserId != "") {
            await serviceModel.blockUser(userId, blockedUserId)
            const data = {
                message: 'User blocked',
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
        if (userId != "" || blockedUserId != "") {
            await serviceModel.unblock(userId, blockedUserId)
            const data = {
                message: 'user has been unblocked',
                status: 200,
                success: true
            };
            res.status(500).send(data)
        }
    }

}

async function reports(req, res) {
    const userId = req.user.id;
    console.log("entering the controller 1 ")
    const { reportedUserId, reason } = req.body;
    if (userId != "" || reportedUserId != "") {
        console.log("entering the controller 1 ")
        await serviceModel.reportUser(userId, reportedUserId, reason)
        console.log("entering the controller 1 ")
        const data = {
            message: 'User reported',
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

module.exports = {
    getFeed,
    search,
    blocked,
    reports,
};
