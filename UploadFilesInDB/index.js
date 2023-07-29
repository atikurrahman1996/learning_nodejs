const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();
const PORT = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connecting to database

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/usersTestDB"); //Data Stored in local machine in mongodb compass

    //"mongodb+srv://atikurrahman:Atik123456@cluster0.18ow1rv.mongodb.net/usersTestDB"  // if we use this data will  store in mongodb atlas cloud

    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error);
    process.exit(1);
  }
};

//creating schema & model

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
  },
  image: {
    type: String,
    required: [true, "user image is required"],
  },
});

const User = mongoose.model("Users", userSchema);

//File Upload, bring code from multer package

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

app.get("/register", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.post("/register", upload.single("image"), async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      image: req.file.filename,
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/test", (req, res) => {
  res.status(200).send("testing api");
});

app.listen(PORT, async () => {
  console.log(`The server is running at http://localhost:${PORT}`);
  await connectDB();
});
