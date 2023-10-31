const followModel = require('../models/follow');


async function getFollower(req, res) {
    try {
        const userName = await req.user.user_name;
        console.log(userName)
        const result = await followModel.getFollower(userName)
        if (result.length == 0) {
            const data = {
                message: 'Invallid user name',
                status: 500,
                success: false
            };
            res.status(500).send(data);
        } else {
            const data = {
                message: result[0],
                status: 200,
                success: true
            };
            console.log(result[0]);
            res.status(200).send(data);
        }
    }
    catch (error) {
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
        console.log("an error at getFollower")
    }
}


async function getOtherFollower(req, res) {
    try {
        const userName = await req.body.user_name;
        console.log(userName)
        const result = await followModel.getFollower(userName);
        if (result[0].length == 0) {
            const data = {
                message: 'No user found',
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
        console.log("an error occured at getOtherFollower")
        const data = {
            message: "ERROR",
            status: 500,
            success: false
        }
        res.status(200).send(data);
    }
}
async function getFollowing(req, res) {
    try {
        const userName = await req.user.user_name;
        console.log(userName)
        const result = await followModel.getFollowing(userName);

        if (result.length == 0) {
            const data = {
                message: 'No user found',
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
        console.log("error occured at get following")
        const data = {
            message: "ERROR",
            status: 500,
            success: false
        };
        res.status(500).send(data);
    }
}

async function getOtherFollowing(req, res) {
    try {
        const userName = await req.body.user_name;
        console.log(userName)
        const result = await followModel.getFollowing(userName);
        if (result.length == 0) {
            const data = {
                message: "User not found",
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
        console.log("an error occured at getOtherFollowing")
        const data = {
            message: "ERROR",
            status: 500,
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