const express = require('express');
const authentication = require('../controllers/auth');

const app = express();
app.post('/login', authentication.login);
app.post('/signup', authentication.signup);


module.exports = app;

