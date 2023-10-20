/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const userModel = require('../models/model');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).send({ error: 'No token provided' });
    }
    let token = authHeader.split(" ")[1];
    jwt.verify(token, "sreerag", function (err, decoded) {
        if (err) {
            res.status(500).send({ error: 'Authentication failed' });
        } else {
            console.log(decoded)
            req.user = decoded
            next();
        }
    }
    )
}
async function signup(req, res) {
    const { first_name, last_name, user_name, password, bio, phone_number, address, dob, gender, category_id, status, created_at, modified_at } = req.body;
    const newUser = {
        first_name,
        last_name,
        user_name,
        password,
        bio,
        phone_number,
        address,
        dob,
        gender,
        category_id,
        status,
        created_at,
        modified_at,
    };

    try {
        await userModel.createUser(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: `User registration failed : ${error.message}` });
    }
}



function login(req, res) {
    const { testUsername, testPassword } = req.body;
    if (testUsername == undefined || testPassword == undefined) {
        res.status(500).send({ error: "Authentication failed" });
    }
    console.log(testUsername);
    console.log(testPassword);



    function callBack(err, result) {
        if (err || result.length == 0) {
            res.status(500).send({ error: "Login failed" });
        } else {
            let resp = {
                id: result[0].id,
                user_name: result[0].user_name
            };

            let token = jwt.sign(resp, "sreerag", { expiresIn: 860000 });
            res.status(200).send({ auth: true, token: token });
        }
    }
    userModel.queryUser(testUsername, testPassword, callBack);

}

function getfeed(req, res) {

    userModel.getFeedUser((err, result) => {
        if (err || result.length == 0) {
            res.status(500).send({ error: "Login failed" });
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
}

function getfollower(req, res) {
    const username = req.user.user_name;

    userModel.getFollower(username, (err, result) => {
        if (err || result.length == 0) {
            res.status(500).send({ error: "Login failed" });
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
}

function getOtherFollower(req, res) {
    const username = req.body.user_name;
    console.log(username)
    userModel.getFollower(username, (err, result) => {
        if (err || result.length == 0) {
            res.status(500).send({ error: "get other follower falied " });
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
}
function getfollowing(req, res) {
    const username = req.user.user_name;

    userModel.getFollowing(username, (err, result) => {
        if (err || result.length == 0) {
            res.status(500).send({ error: "Login failed" });
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
}

function getOtherFollowing(req, res) {
    const username = req.body.user_name;
    console.log(username)
    userModel.getFollowing(username, (err, result) => {
        if (err || result.length == 0) {
            res.status(500).send({ error: "get other follower falied " });
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
}

async function search(req, res) {
    try {
        const { user_name } = await req.body;
        if (user_name == undefined) {
            res.status(500).send({ error: "please type something " });
        } else {
            userModel.getSearch(user_name, (err, result) => {
                if (err || result.length == 0) {
                    res.status(500).send({ error: "No user found" });
                } else {
                    console.log(result);
                    res.status(200).send(result);
                }
            });

        }
    }
    catch (error) {
        console.log(error)
    }

}


module.exports = {
    signup,
    login,
    getfeed,
    getfollower,
    verifyToken,
    search,
    getOtherFollower,
    getOtherFollowing,
    getfollowing
};
