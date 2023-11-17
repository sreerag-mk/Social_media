const express = require('express');
const authentication = require('./controller');
const middleWare = require('../middle_ware/authverify')

const app = express();
app.post('/login', authentication.login);
app.post('/verifyuser', middleWare.verifyToken, authentication.verifyUser);
app.delete('/deleteverifieduser', middleWare.verifyToken, authentication.deleteUser)
app.post('/editVerifieduserStatus', middleWare.verifyToken, authentication.editVerifieduser)
app.post('/disableuser', middleWare.verifyToken, authentication.disableUser)
app.get('/reporteduser', middleWare.verifyToken, authentication.reportedUser)

module.exports = app;
