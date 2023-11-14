const express = require('express');
const bodyParser = require('body-parser')
const cros = require('cros')
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded());
app.use(cros());

const authRoute = require('./routes/auth')
const serviceRoute = require('./routes/services')
const bioRoute = require('./routes/bio')
const followRoute = require('./routes/follow')
const likeRoute = require('./routes/likes')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comment')
const hashTagRoute = require('./routes/hashtag')
const groupRoute = require('./routes/group');



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
