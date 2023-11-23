const express = require('express');
const upload = require('../middle_ware/imageUpload')
const middleWare = require('../middle_ware/authverify')
const post = require('../controllers/post');
const app = express();
const helmet = require("helmet")
app.use(helmet())
app.post('/makepost', middleWare.verifyToken, post.makePost);
app.post('/savedpost', middleWare.verifyToken, post.savedpost);
app.post('/removesavedpost', middleWare.verifyToken, post.removesavedpost);
app.post('/upload', middleWare.verifyToken, upload.array('image', 3), post.uploadImage)
app.delete('/deletepost', middleWare.verifyToken, post.deletePost);

module.exports = app;