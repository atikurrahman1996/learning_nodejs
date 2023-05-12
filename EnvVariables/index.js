require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("I am get request at home route");
});

app.listen(PORT, () => {
  console.log(`the server is running at http://localhost:${PORT}`);
});
