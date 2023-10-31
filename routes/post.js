const express = require('express');
const bodyParser = require('body-parser');
const upload = require('../middle_ware/imageUpload')
const middleWare = require('../middle_ware/authverify')
const post = require('../controllers/post');
const jsonParser = bodyParser.urlencoded();
console.log("this is from the  ------------------------------------")
const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// console.log("this is from api post")
app.post('/makepost', middleWare.verifyToken, jsonParser, post.makePost);
app.post('/upload', middleWare.verifyToken, upload.single('image'), jsonParser, post.uploadImage)
app.delete('/deletepost', middleWare.verifyToken, jsonParser, post.deletePost);




module.exports = app;