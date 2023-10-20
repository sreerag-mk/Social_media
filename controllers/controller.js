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
            console.log("decoded value is")
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



async function login(req, res) {
    try {
        const { testUsername, testPassword } = await req.body;
        if (testUsername == undefined || testPassword == undefined) {
            res.status(500).send({ error: "Authentication failed" });
        }
        console.log(testUsername);
        console.log(testPassword);
        const result = await userModel.queryUser(testUsername, testPassword);

        if (result[0].length == 0) {
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
    catch (error) {
        console.log(error)
    }
}

async function getfeed(req, res) {
    try {
        const result = await userModel.getFeedUser();
        if (result[0].length == 0) {
            res.status(500).send({ error: "Login failed" });
        } else {
            console.log(result[0]);
            res.status(200).send(result[0]);
        }
    }
    catch (error) {
        console.log(error)
    }

}

async function getfollower(req, res) {
    try {
        const username = await req.user.user_name;
        console.log(username)
        const result = await userModel.getFollower(username)
        if (result.length == 0) {
            res.status(500).send({ error: "Login failed" });
        } else {
            console.log(result[0]);
            res.status(200).send(result[0]);
        }
    }
    catch (error) {
        console.log(error)
    }
}


async function getOtherFollower(req, res) {
    try {
        const username = await req.body.user_name;
        console.log(username)
        const result = await userModel.getFollower(username);
        if (result[0].length == 0) {
            res.status(500).send({ error: "get other follower falied " });
        } else {
            console.log(result[0]);
            res.status(200).send(result[0]);
        }

    }
    catch (error) {
        console.log(error)
    }
}
async function getfollowing(req, res) {
    try {
        const username = await req.user.user_name;
        console.log(username)
        const result = await userModel.getFollowing(username);

        if (result.length == 0) {
            res.status(500).send({ error: "Login failed" });
        } else {
            console.log(result[0]);
            res.status(200).send(result[0]);
        }

    }
    catch (error) {
        console.log(error)
    }
}

async function getOtherFollowing(req, res) {
    try {
        const username = await req.body.user_name;
        console.log(username)
        const result = await userModel.getFollowing(username);
        if (result.length == 0) {
            res.status(500).send({ error: "get other follower falied " });
        } else {
            console.log(result[0]);
            res.status(200).send(result[0]);
        }
    }
    catch (error) {
        console.log(error)
    }
}

async function search(req, res) {
    try {
        const { user_name } = await req.body;
        if (user_name == undefined) {
            res.status(500).send({ error: "please type something " });
        } else {
            const result = await userModel.getSearch(user_name);

            if (result[0].length == 0) {
                res.status(500).send({ error: "No user found" });
            } else {
                console.log(result[0]);
                res.status(200).send(result[0]);
            }


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
