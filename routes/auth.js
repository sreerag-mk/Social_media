const express = require('express');
const bodyParser = require('body-parser');
const authentication = require('../controllers/auth');

const app = express();
app.use(bodyParser.json());
app.post('/login', authentication.login);
app.post('/signup', authentication.signup);


module.exports = app;

