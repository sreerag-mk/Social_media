const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/authverify')
const comment = require('../controllers/comment');
const jsonParser = bodyParser.json();

const app = express();
app.use(bodyParser.json());


app.post('/comment', middleWare.verifyToken, jsonParser, comment.comment);
app.post('/replay', middleWare.verifyToken, jsonParser, comment.replay);
app.delete('/deletecomment', middleWare.verifyToken, jsonParser, comment.deleteComment);
app.delete('/deletereplay', middleWare.verifyToken, jsonParser, comment.deleteReplay);
app.get('/commentlist', middleWare.verifyToken, jsonParser, comment.commentList);
app.get('/commentcount', middleWare.verifyToken, jsonParser, comment.commentCount);
app.get('/replaycount', middleWare.verifyToken, jsonParser, comment.replayCount);
app.get('/userCommented', middleWare.verifyToken, comment.userCommented);






module.exports = app;