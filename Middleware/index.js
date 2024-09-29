const express = require("express");
const app = express();
const PORT = 3000;

const myMiddleware = (req, res, next) => {
  console.log("This is middle ware function");
  req.currentTime = new Date(Date.now());
  next();
};

app.use(myMiddleware);

app.get("/", (req, res) => {
  console.log("I am home " + req.currentTime);
  res.send("I am get request at home route");
});
app.get("/about", (req, res) => {
  console.log("I am about " + req.currentTime);
  res.send("I am get request at about route");
});

// Error handling

app.use((req, res, next) => {
  res.send("404 not found");
});

//Middleware Error handling, always take four arguments

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});
app.listen(PORT, () => {
  console.log(`the server is running at http://localhost:${PORT}`);
});
