//install nodemon for auto update of our code if we change anything
/*
const http = require("http");
const PORT = 3000;
const hostName = "127.0.0.1";

const server = http.createServer((req, res) => {
  res.end("Welcome to the server");
});

server.listen(PORT, hostName, () => {
  console.log(`server is running at http://${hostName}:${PORT}`);
});
*/

//http Routing
/*
const http = require("http");
const fs = require("fs");

const PORT = 3000;
const hostName = "127.0.0.1";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/about") {
    fs.readFile("about.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/contact") {
    fs.readFile("contact.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else {
    fs.readFile("error.html", (err, data) => {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
});

server.listen(PORT, hostName, () => {
  console.log(`server is running at http://${hostName}:${PORT}`);
});
*/

//http Routing short ways

const http = require("http");
const fs = require("fs");

const PORT = 3000;
const hostName = "127.0.0.1";

const server = http.createServer((req, res) => {
  const handleReadFile = (statusCode, fileLocation) => {
    fs.readFile(fileLocation, (err, data) => {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  };
  if (req.url === "/") {
    handleReadFile(200, "./views/index.html");
  } else if (req.url === "/about") {
    handleReadFile(200, "./views/about.html");
  } else if (req.url === "/contact") {
    handleReadFile(200, "./views/contact.html");
  } else {
    fs.readFile("error.html", (err, data) => {
      handleReadFile(200, "./views/error.html");
    });
  }
});

server.listen(PORT, hostName, () => {
  console.log(`server is running at http://${hostName}:${PORT}`);
});
