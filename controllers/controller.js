/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const userModel = require('../models/model');
const jwt = require('jsonwebtoken');

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

    // userModel.createUser(newUser, (error, results) => {
    //     if (error) {
    //         res.status(500).send({ error: 'User registration failed' });
    //     } else {
    //         res.status(201).json({ message: 'User registered successfully' });
    //     }
    // });

    try {
        await userModel.createUser(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: `User registration failed : ${error.message}` });
    }
}

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

function login(req, res) {
    const { testUsername, testPassword } = req.body;
    if (testUsername == undefined || testPassword == undefined) {
        res.status(500).send({ error: "Authentication failed" });
    }
    console.log(testUsername);
    console.log(testPassword);

    userModel.queryUser(testUsername, testPassword, (err, result) => {
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
    });
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



module.exports = {
    signup,
    login,
    getfeed,
    getfollower,
    verifyToken,
};
