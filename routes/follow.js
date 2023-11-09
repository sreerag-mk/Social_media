const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/authverify')
const follow = require('../controllers/follow');

const app = express();
app.use(bodyParser.json());

app.post('/getotherfollower', middleWare.verifyToken, follow.getOtherFollower);
app.post('/getotherfollowing', middleWare.verifyToken, follow.getOtherFollowing);
app.get('/getfollower', middleWare.verifyToken, follow.getFollower);
app.get('/getfollowing', middleWare.verifyToken, follow.getFollowing);

module.exports = app;