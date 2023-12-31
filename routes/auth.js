const express = require('express');
const authentication = require('../controllers/auth');
const middleWare = require('../middle_ware/authverify')

const app = express();
app.post('/login', authentication.login);
app.post('/signup', authentication.signup);
app.post('/delete', middleWare.verifyToken, authentication.deleteUser);

module.exports = app;

