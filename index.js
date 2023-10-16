const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
const users = [];
let newUser = {};
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  newUser = {
    username,
    email,
    password,
  };
  users.push(newUser);
  console.log(users)
  console.log("the first")
  return res.status(201).json({ message: 'User registered successfully' });
});
app.post('/login', (req, res) => {
  const { testEmail, testPassword } = req.body;

  const finduser = users.filter(obj => obj.email === testEmail && obj.password === testPassword);

  if (finduser.length > 0) {
    console.log('Found Objects:', finduser);
    return res.status(201).json({ message: 'User logged in successfully' });
  } else {
    console.log('No matching objects found');
    return res.status(201).json({ message: 'User is not found please register first' });
  }

})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

