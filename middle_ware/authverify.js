const jwt = require('jsonwebtoken');

require('dotenv').config();

const userToken = process.env.userToken;

const adminToken = process.env.adminToken;

function verifyToken(req, res, next) {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).send({ error: 'No token provided' });
    }
    let token = authHeader.split(" ")[1];
    jwt.verify(token, userToken, function (err, decoded) {
        if (err) {
            res.status(500).send({ error: 'Authentication failed' });
        } else {
            req.user = decoded
            next();
        }
    }
    )
}

function verifyAdmin(req, res, next) {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).send({ error: 'No token provided' });
    }
    let token = authHeader.split(" ")[1];
    jwt.verify(token, adminToken, function (err, decoded) {
        if (err) {
            res.status(500).send({ error: 'Authentication failed' });
        } else {
            req.user = decoded
            next();
        }
    }
    )
}

module.exports = {
    verifyToken,
    verifyAdmin,
    jwt,
}