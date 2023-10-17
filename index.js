/* eslint-disable no-unreachable */
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('MySQL2');
const app = express();
const port = 3000;
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'social_media_application',
})
con.connect((err) => {
  if (err) {
    console.log(`${err.message}`);
  } else {
    console.log("database connection complete");
  }
});
const jsonParser = bodyParser.json();
const users = [];
app.post('/signup', (req, res) => {
  const { first_name, last_name, user_name, password, bio, phone_number, address, dob, gender, category_id, status, created_at, modified_at } = req.body;
  const newUser = {
    first_name, last_name, user_name, password, bio, phone_number, address, dob, gender, category_id, status, created_at, modified_at
  };
  con.query(
    'INSERT INTO user (first_name, last_name, user_name, password, bio, phone_number, address, dob, gender, category_id, status, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      newUser.first_name,
      newUser.last_name,
      newUser.user_name,
      newUser.password,
      newUser.bio,
      newUser.phone_number,
      newUser.address,
      newUser.dob,
      newUser.gender,
      newUser.category_id,
      newUser.status,
      newUser.created_at,
      newUser.modified_at,
    ],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully.');
      }
    }
  );
  con.end();
  users.push(newUser);
  console.log(users)
  return res.status(201).json({ message: 'User registered successfully' });
});

function verifyToken(req, res, next) {
  let authHeader = req.headers.authorization;
  if (authHeader == undefined) {
    res.status(401).send({ error: 'no token provided' })
  }
  let token = authHeader.split(" ")[1]
  jwt.verify(token, "sreerag", function (err, decoded) {
    if (err) {
      res.status(500).send({ error: 'Authentication failed' })
    } else {
      next()
    }
  })
}

app.post('/login', jsonParser, (req, res) => {
  const { testUsername, testPassword } = req.body;

  if (testUsername == undefined || testPassword == undefined) {
    res.status(500).send({ error: "authentication failed" });
  }
  console.log(testUsername)
  console.log(testPassword)
  let qr = `select * from user where user_name='${testUsername}' and password = '${testPassword}'`

  con.query(qr, (err, result) => {
    if (err || result.length == 0) {
      res.status(500).send({ error: "login failed" })
    } else {
      let resp = {
        id: result[0].id,
        user_name: result[0].user_name
      }

      let token = jwt.sign(resp, "sreerag", { expiresIn: 860000 });
      res.status(200).send({ auth: true, token: token })
    }
  })
})

app.get('/getfeed', verifyToken, (req, res) => {
  let ar = 'SELECT caption, media_url from post as post inner join post_media as media on post.post_media_id = media.id ORDER BY post.created_at;'
  con.query(ar, (err, result) => {
    if (err || result.length == 0) {
      res.status(500).send({ error: "login failed" })
    } else {
      console.log(result)
      res.status(200).send(result)
    }

  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
