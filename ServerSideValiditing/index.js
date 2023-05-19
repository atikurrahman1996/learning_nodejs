const express = require("express");
const userRoute = require("./routes/user");

const app = express();

const PORT = 3000;

app.get("/testing", (req, res) => {
  res.status(200).send("Welcome to the server");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`The server is runnint at http://localhost:${PORT}`);
});

// A user Resgistration, (Name, Email, password, DOB)
// api/register
// api/login
