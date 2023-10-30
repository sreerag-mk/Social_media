const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/middleware')
const app = express();
const port = 3000;

const userController = require('../controllers/auth');
const postController = require('../controllers/post');
const bioController = require('../controllers/bio');
const likeController = require('../controllers/likes');

const jsonParser = bodyParser.json();

app.post('/signup', jsonParser, userController.signup);
app.post('/login', jsonParser, userController.login);
app.get('/getfeed', middleWare.verifyToken, userController.getFeed);
app.post('/getotherfollower', middleWare.verifyToken, jsonParser, userController.getOtherFollower);
app.post('/getotherfollowing', middleWare.verifyToken, jsonParser, userController.getOtherFollowing);
app.get('/getfollower', middleWare.verifyToken, userController.getFollower);
app.get('/getfollowing', middleWare.verifyToken, userController.getFollowing);
app.post('/search', middleWare.verifyToken, jsonParser, userController.search);
app.post('/makepost', middleWare.verifyToken, jsonParser, postController.makePost);
app.delete('/deletepost', middleWare.verifyToken, jsonParser, postController.deletePost);
app.post('/addbio', middleWare.verifyToken, jsonParser, bioController.addBio);
app.patch('/editbio', middleWare.verifyToken, jsonParser, bioController.addBio);
app.post('/like', middleWare.verifyToken, jsonParser, likeController.like);
app.delete('/dislike', middleWare.verifyToken, jsonParser, likeController.disLike);
app.get('/likelist', middleWare.verifyToken, jsonParser, likeController.likedList);
app.get('/likecount', middleWare.verifyToken, jsonParser, likeController.likeCount);
app.get('/userLiked', middleWare.verifyToken, likeController.userLiked);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
