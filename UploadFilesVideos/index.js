const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 5000;

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

app.post("/register", upload.single("image"), (req, res) => {
  res.status(200).send("File is uploaded ");
});

app.get("/test", (req, res) => {
  res.status(200).send("testing api");
});

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
