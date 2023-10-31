const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/authverify')
const like = require('../controllers/likes');
const jsonParser = bodyParser.json();

const app = express();
app.use(bodyParser.json());


app.post('/like', middleWare.verifyToken, jsonParser, like.like);
app.delete('/dislike', middleWare.verifyToken, jsonParser, like.disLike);
app.get('/likelist', middleWare.verifyToken, jsonParser, like.likedList);
app.get('/likecount', middleWare.verifyToken, jsonParser, like.likeCount);
app.get('/userLiked', middleWare.verifyToken, like.userLiked);



module.exports = app;