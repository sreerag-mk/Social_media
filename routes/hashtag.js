const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/authverify')
const hashtag = require('../controllers/hashtag');
const jsonParser = bodyParser.urlencoded();
const app = express();


app.post('/makehashtag', middleWare.verifyToken, jsonParser, hashtag.makeHashtag);
app.post('/addpost', middleWare.verifyToken, jsonParser, hashtag.addPost);
app.delete('/deletehashtag', middleWare.verifyToken, jsonParser, hashtag.deleteHashtag);
app.delete('/deletepost', middleWare.verifyToken, jsonParser, hashtag.deletePost);


module.exports = app;