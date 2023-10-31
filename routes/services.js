const express = require('express');
const bodyParser = require('body-parser');
const middleWare = require('../middle_ware/authverify')
const service = require('../controllers/services');
const jsonParser = bodyParser.json();

const app = express();
app.use(bodyParser.json());

app.post('/search', middleWare.verifyToken, jsonParser, service.search);
app.post('/blocked', middleWare.verifyToken, jsonParser, service.blocked)
app.get('/getfeed', middleWare.verifyToken, service.getFeed);

module.exports = app;