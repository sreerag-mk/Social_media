const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const userController = require('../controllers/controller');

const jsonParser = bodyParser.json();

app.post('/signup', jsonParser, userController.signup);
app.post('/login', jsonParser, userController.login);
app.get('/getfeed', userController.verifyToken, userController.getfeed);
app.post('/getotherfollower', userController.verifyToken, jsonParser, userController.getOtherFollower);
app.post('/getotherfollowing', userController.verifyToken, jsonParser, userController.getOtherFollowing);
app.get('/getfollower', userController.verifyToken, userController.getfollower);
app.get('/getfollowing', userController.verifyToken, userController.getfollowing);
app.post('/search', userController.verifyToken, jsonParser, userController.search);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
