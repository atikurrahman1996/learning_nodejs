const express = require("express");
const chalk = require("chalk");
const app = express();

app.get("/products", (req, res) => {
  res.send("list all the products");
});

app.listen(3000, () => {
  console.log(chalk.blue(`The server is running at http://localhost:3000`)); // server color will be blue in the terminal

  //console.log(chalk.blue.bgRed.bold((`The server is running at http://localhost:3000`)) // server color will be blue, background red bold in the terminal
});
