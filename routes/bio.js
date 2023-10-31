const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/authverify')
const bio = require('../controllers/bio');
const jsonParser = bodyParser.json();

const app = express();
app.use(bodyParser.json());

app.post('/addbio', middleWare.verifyToken, jsonParser, bio.addBio);
app.patch('/editbio', middleWare.verifyToken, jsonParser, bio.addBio);


module.exports = app;