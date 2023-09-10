const express = require("express");
const Joi = require("joi");
const userRouter = require("./routes/user");

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);

app.get("/testing", (req, res) => {
  res.json({ message: "welcome to the server" });
});

app.listen(port, () => {
  console.log(`The server is running at localhost http://localhost:${port}`);
});
