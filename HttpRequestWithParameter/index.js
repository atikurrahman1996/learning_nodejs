const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");

//for query parameter

/*
app.get("/", (req, res) => {
  //const id = req.query.id;   //for single query we can use like this
  const { id, name } = req.query;
  res.send(`<h1>Student name is:${name}, id is: ${id}</>`);
});
*/
/*
//for route parameter

app.get("/userId/:id/userAge/:age", (req, res) => {
  const id = req.params.id;
  const age = req.params.age;
  res.send(`<h1>Student id is:${id}, age is: ${age}</>`);
});

*/

//for header parameter
/*
app.get("/", (req, res) => {
  const id = req.header("id");
  const name = req.header("name");
  res.send(`<h1>Student id is:${id}, name is: ${name}</>`);
});
*/

/*
//post request with json data using postman

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.post("/user", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  res.send(`I am ${name}, My age is ${age}`);
});
*/

//send and receive data from HTML form

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/register", (req, res) => {
  const fullName = req.body.fullName;
  const age = req.body.age;
  res.send(`Your name is ${fullName} and your age is ${age}`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
