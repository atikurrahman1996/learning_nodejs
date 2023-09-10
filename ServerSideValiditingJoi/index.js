const express = require("express");

const app = express();

const port = 3000;

app.get("/testing", (req, res) => {
  res.json({ message: "welcome to the server" });
});

app.listen(port, () => {
  console.log(`The server is running at localhost http://localhost:${port}`);
});
