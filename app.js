const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const helmet = require("helmet")
app.use(helmet())
const port = 3000;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    next();
});

const adminRoute = require('./admin/router/router');
const authRoute = require('./routes/auth')
const serviceRoute = require('./routes/services')
const bioRoute = require('./routes/bio')
const followRoute = require('./routes/follow')
const likeRoute = require('./routes/likes')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comment')
const hashTagRoute = require('./routes/hashtag')
const groupRoute = require('./routes/group');



app.use('/admin', adminRoute)
app.use('/auth', authRoute)
app.use('/service', serviceRoute)
app.use('/bio', bioRoute)
app.use('/follow', followRoute)
app.use('/like', likeRoute)
app.use('/post', postRoute)
app.use('/comment', commentRoute)
app.use('/hashtag', hashTagRoute)
app.use('/group', groupRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
