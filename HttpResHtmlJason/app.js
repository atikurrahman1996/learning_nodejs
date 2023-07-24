const express = require("express");
const app = express();
const userRouter = require("./routes/users.route");
const bodyParser = require("body-parser");

app.use("/api/user", userRouter);

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/register", (req, res) => {
  res.statusCode = 202;
  res.sendFile(__dirname + "/views/register.html");
});
app.get("/login", (req, res) => {
  res.send("Hi, I am login page");

  // send cookies & clear cookies

  //   res.cookie("name", "israt");
  //   res.cookie("age", "23");
  //res.clearCookie("name");
  //res.append("id", "130000");
  //res.end();
});

app.use("/", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/index.html");
});

app.use((req, res) => {
  res.send("<h1>404 !!! Not a valid url</h1>");
});

module.exports = app;
