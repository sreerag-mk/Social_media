const express = require('express');
const middleWare = require('../middle_ware/authverify')
const hashtag = require('../controllers/hashtag');
const app = express();

const helmet = require("helmet")
app.use(helmet())
app.post('/makehashtag', middleWare.verifyToken, hashtag.makeHashtag);
app.post('/addpost', middleWare.verifyToken, hashtag.addPost);
app.delete('/deletehashtag', middleWare.verifyToken, hashtag.deleteHashtag);
app.delete('/deletepost', middleWare.verifyToken, hashtag.deletePost);


module.exports = app;