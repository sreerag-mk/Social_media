const express = require('express');
const middleWare = require('../middle_ware/authverify')
const service = require('../controllers/services');

const app = express();

app.post('/search', middleWare.verifyToken, service.search);
app.post('/blocked', middleWare.verifyToken, service.blocked)
app.post('/report', middleWare.verifyToken, service.reports)
app.get('/getfeed', middleWare.verifyToken, service.getFeed);

module.exports = app;