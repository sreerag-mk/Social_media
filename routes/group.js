const express = require('express');
const middleWare = require('../middle_ware/authverify');
const http = require('http');
const expressWs = require('express-ws');
const group = require('../controllers/group');
const app = express();
const server = http.createServer(app);
const wsInstance = expressWs(app, server);
const helmet = require("helmet")
app.use(helmet())
app.post('/creategroup', middleWare.verifyToken, group.createGroup);
app.delete('/deletegroup', middleWare.verifyToken, group.deleteGroup);
app.post('/adduser', middleWare.verifyToken, group.addUser);
app.delete('/deleteuser', middleWare.verifyToken, group.deleteUser);
app.ws('/message', (ws, req) => {
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    group.handleConnection(ws);
});



module.exports = app

