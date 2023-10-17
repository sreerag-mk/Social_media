/* eslint-disable prefer-destructuring */
const userModel = require('./model');
const jwt = require('jsonwebtoken');

function signup(req, res) {
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

    userModel.createUser(newUser, (error, results) => {
        if (error) {
            res.status(500).send({ error: 'User registration failed' });
        } else {
            res.status(201).json({ message: 'User registered successfully' });
        }
    });
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
    let qr = `select * from user where user_name='${testUsername}' and password = '${testPassword}'`;

    userModel.queryUser(qr, (err, result) => {
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
    let ar = 'SELECT caption, media_url from post as post inner join post_media as media on post.post_media_id = media.id ORDER BY post.created_at;';
    userModel.queryUser(ar, (err, result) => {
        if (err || result.length == 0) {
            res.status(500).send({ error: "Login failed" });
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
}

function getfollower(req, res) {
    const user_name = req.user.user_name;
    let ar = `select user.id as id, user_name, count(following_user_id) as follower from user left join follower as followers on user.id = followers.followed_user_id group by id having user.user_name = "${user_name}"`;
    userModel.queryUser(ar, (err, result) => {
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
