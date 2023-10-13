const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
const users = [];
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = {
    username,
    email,
    password,
  };
  console.log(newUser)
  users.push(newUser);
  return res.status(201).json({ message: 'User registered successfully' });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

