const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/authverify')
const comment = require('../controllers/comment');

const app = express();
app.use(bodyParser.json());


app.post('/comment', middleWare.verifyToken, comment.comment);
app.post('/replay', middleWare.verifyToken, comment.replay);
app.delete('/deletecomment', middleWare.verifyToken, comment.deleteComment);
app.delete('/deletereplay', middleWare.verifyToken, comment.deleteReplay);
app.get('/commentlist', middleWare.verifyToken, comment.commentList);
app.get('/commentcount', middleWare.verifyToken, comment.commentCount);
app.get('/replaycount', middleWare.verifyToken, comment.replayCount);
app.get('/userCommented', middleWare.verifyToken, comment.userCommented);






module.exports = app;