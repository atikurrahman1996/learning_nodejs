const express = require("express");
const app = express();

// will print single digit

app.get("/products/:id([0-9])", (req, res) => {
  res.send(`ID = ${req.params.id}`);
});

// will print combination of 3 digit

app.get("/products/:id([0-9]{3})", (req, res) => {
  res.send(`ID = ${req.params.id}`);
});

// title would be 5 chracter

app.get("/products/:title([a-z]{5})", (req, res) => {
  res.send(`title = ${req.params.title}`);
});

// if product id is not matched user will get this message. "*" is the wild card

app.use("*", (req, res) => {
  res.status(404).send({
    message: "not a valid route",
  });
});

app.listen(3000, () => {
  console.log(" The server is running at http://localhost:3000");
});
