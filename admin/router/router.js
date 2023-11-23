const express = require('express');
const authentication = require('../controller/controller');
const middleWare = require('../../middle_ware/authverify')

const app = express();
const helmet = require("helmet")
app.use(helmet())
app.post('/login', authentication.login);
app.post('/verifyuser', middleWare.verifyAdmin, authentication.verifyUser);
app.delete('/deleteverifieduser', middleWare.verifyAdmin, authentication.deleteUser)
app.post('/editVerifieduserStatus', middleWare.verifyAdmin, authentication.editVerifieduser)
app.post('/disableuser', middleWare.verifyAdmin, authentication.disableUser)
app.get('/reporteduser', middleWare.verifyAdmin, authentication.reportedUser)

module.exports = app;
