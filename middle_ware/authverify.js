const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).send({ error: 'No token provided' });
    }
    let token = authHeader.split(" ")[1];
    jwt.verify(token, "asdfghjkl1234567890qwertyuiop1234567890-qwertyuiopasdfghjklzxcvbnm,asdfghjklwertyuio234567890-qwertyuiopasdfghjkla3w4sex5dcr6tv7byuhnim2aes4dr5tf6g7y8hu9jik3w4xe5rctf6yubhjim", function (err, decoded) {
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
    jwt,
}