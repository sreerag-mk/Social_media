const express = require('express');
const authentication = require('./controller');
const middleWare = require('../middle_ware/authverify')

const app = express();
app.post('/login', authentication.login);
app.post('/verifyuser', middleWare.verifyToken, authentication.verifyUser);
app.delete('/deleteverifieduser', middleWare.verifyToken, authentication.deleteUser)
app.post('/editVerifieduserStatus', middleWare.verifyToken, authentication.editVerifieduser)

module.exports = app;
