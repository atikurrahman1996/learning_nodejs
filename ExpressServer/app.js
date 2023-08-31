const express = require("express");
const app = express();

const userRouter = require("./routes/users.route");

app.use("/api/users", userRouter);

// get request used to read or retrive the data

app.use("/", (req, res) => {
  res.send("I am a get request at home route");
  res.end();
});

/*

app.get("/", (req, res) => {
  res.send("I am a get request at home route");
  res.end();
});

app.post("/", (req, res) => {
  // post request used to create new entity
  res.send("I am a post request at home route");
  res.end();
});
app.put("/", (req, res) => {
  // put request used to update
  res.send("I am a put request at home route");
  res.end();
});
app.delete("/", (req, res) => {
  // delete request used to delete
  res.send("I am a delete request at home route");
  res.end();
});


app.get("/register", (req, res) => {
  res.send("I am a get request at register route");
  res.end();
});
app.get("/login", (req, res) => {
  res.send("I am a get request at login route");
  res.end();
});

*/

//if users go to the wrong url show this message

app.use((req, res) => {
  res.send("404 ! not a valid url");
});

/*//if users go to an of the the wrong url show this message
app.all("*", (req, res) => {

  res.status(404).send('resource not found!')
})
*/
module.exports = app;
