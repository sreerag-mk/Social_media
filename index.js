/* eslint-disable no-console */
// eslint-disable-next-line prettier/prettier
const express = require("express");
const server = express();
server.get("/", (req, res) => {
  res.send("welcome");
});
server.listen(8000, () => {
  console.log("Sreerag Manoj");
});
