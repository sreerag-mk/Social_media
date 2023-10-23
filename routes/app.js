const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/middleware')
const app = express();
const port = 3000;

const userController = require('../controllers/auth');

const jsonParser = bodyParser.json();

app.post('/signup', jsonParser, userController.signup);
app.post('/login', jsonParser, userController.login);
app.get('/getfeed', middleWare.verifyToken, userController.getFeed);
app.post('/getotherfollower', middleWare.verifyToken, jsonParser, userController.getOtherFollower);
app.post('/getotherfollowing', middleWare.verifyToken, jsonParser, userController.getOtherFollowing);
app.get('/getfollower', middleWare.verifyToken, userController.getFollower);
app.get('/getfollowing', middleWare.verifyToken, userController.getFollowing);
app.post('/search', middleWare.verifyToken, jsonParser, userController.search);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
