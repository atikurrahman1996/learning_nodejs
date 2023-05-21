const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

//MongoDB connection -approch 1
/*
mongoose
  .connect("mongodb://127.0.0.1:27017/testProductDB")

  //Extra info, if mongodb connect successfull show message mongodb is connected if not show mongodb is not connected
  .then(() => console.log("db is connected"))
  .catch((error) => {
    console.log("db is not connected");
    console.log(error);
    process.exit(1);
  });
*/

//MongoDB connection -approch 2 is better because we can call this function later

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testProductDB");
    console.log("mongo db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error.message);
    process.exit(1);
  }
};

app.listen(PORT, async () => {
  console.log(`The server is runnint at http://localhost:${PORT}`);
  await connectDB();
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the home");
});

app.get("/testing", (req, res) => {
  res.status(200).send("Welcome to the server");
});
