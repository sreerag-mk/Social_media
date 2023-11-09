const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/authverify')
const like = require('../controllers/likes');

const app = express();
app.use(bodyParser.json());


app.post('/like', middleWare.verifyToken, like.like);
app.delete('/dislike', middleWare.verifyToken, like.disLike);
app.get('/likelist', middleWare.verifyToken, like.likedList);
app.get('/likecount', middleWare.verifyToken, like.likeCount);
app.get('/userLiked', middleWare.verifyToken, like.userLiked);



module.exports = app;