const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
require("./config/db");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(userRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

//route error handling

app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found! envalid url",
  });
});

//server error handling

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "server not found! something broken",
  });
});

module.exports = app;
