//databse hashing + salting password   (more secure)

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
const User = require("./models/user.model");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const dbURL = process.env.MONGO_URL;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("mongodb atlas is connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});
app.post("/register", async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      const newUser = new User({
        email: req.body.email,
        password: hash,
      });
      await newUser.save();
      res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          res.status(200).json({ status: "valid user" });
        }
      });
    } else {
      res.status(404).json({ status: "not a valid user" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//handling client error

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

app.listen(PORT, () => {
  console.log(`The Server is running at http://localhost:${PORT}`);
});
