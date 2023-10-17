const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const userController = require('./contreoller');

const jsonParser = bodyParser.json();

app.post('/signup', jsonParser, userController.signup);
app.post('/login', jsonParser, userController.login);
app.get('/getfeed', userController.verifyToken, userController.getfeed);
app.get('/getfollower', userController.verifyToken, userController.getfollower);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
