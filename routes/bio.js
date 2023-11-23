const express = require('express');
const middleWare = require('../middle_ware/authverify')
const bio = require('../controllers/bio');

const app = express();
const helmet = require("helmet")
app.use(helmet())
app.post('/addbio', middleWare.verifyToken, bio.addBio);
app.patch('/editbio', middleWare.verifyToken, bio.addBio);


module.exports = app;