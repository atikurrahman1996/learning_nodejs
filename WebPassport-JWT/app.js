require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const app = express();
require("./server/config/database");
require("./server/config/passport");
const User = require("./server/models/user.model");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

//home route
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

//register route

app.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("user already exists");

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        username: req.body.username,
        password: hash,
      });
      await newUser.save().then((user) => {
        res.send({
          success: true,
          message: "User is created successfully",

          user: {
            id: user._id,
            username: user.username,
          },
        });
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//login route

app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "User is not found",
    });
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      success: false,
      message: "Incorrect password",
    });
  }

  const payload = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return res.status(200).send({
    success: true,
    message: "User is loggedIn successfully",
    token: "Bearer " + token,
  });
});

//profile route

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),

  function (req, res) {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);

//route not found error

app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//handling server error

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something is broken",
  });
});

module.exports = app;
