const express = require('express');
const app = express();
const port = 3000;

const authRoute = require('./routes/auth')
const serviceRoute = require('./routes/services')
const bioRoute = require('./routes/bio')
const followRoute = require('./routes/follow')
const likeRoute = require('./routes/likes')
const postRoute = require('./routes/post')

// console.log("this is the real app")
app.use('/auth', authRoute)
app.use('/service', serviceRoute)
app.use('/bio', bioRoute)
app.use('/follow', followRoute)
app.use('/like', likeRoute)
app.use('/post', postRoute)



// const path = require("path");
// const multer = require("multer");

// app.use(express.urlencoded({ extended: false }));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '/uploads'));
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({ storage: storage })

// app.post("/upload", upload.single("image"), (req, res) => {
//     console.log(req.body);
//     console.log("hello world")
//     console.log(req.file);
// })




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
