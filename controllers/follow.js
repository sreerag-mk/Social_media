const followModel = require('../models/follow');


async function getFollower(req, res) {
    try {
        const userName = req.user.user_name;
        const result = await followModel.getFollower(userName)
        if (result.length == 0) {
            const data = {
                message: 'Invallid user name',
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
            message: 'Error occured',
            success: false
        };
        res.status(500).send(data)
    }
}


async function getOtherFollower(req, res) {
    try {
        const userName = req.body.user_name;
        const result = await followModel.getFollower(userName);
        if (result[0].length == 0) {
            const data = {
                message: 'No user found',
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
            message: "ERROR",
            success: false
        }
        res.status(500).send(data);
    }
}
async function getFollowing(req, res) {
    try {
        const userName = req.user.user_name;
        const result = await followModel.getFollowing(userName);

        if (result.length == 0) {
            const data = {
                message: 'No user found',
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
            message: "ERROR",
            success: false
        };
        res.status(500).send(data);
    }
}

async function getOtherFollowing(req, res) {
    try {
        const userName = req.body.user_name;
        const result = await followModel.getFollowing(userName);
        if (result.length == 0) {
            const data = {
                message: "User not found",
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
            message: "ERROR",
            success: false
        };
        res.status(500).send(data);

    }
}

module.exports = {
    getFollower,
    getFollowing,
    getOtherFollower,
    getOtherFollowing,
};