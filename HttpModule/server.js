const http = require("http");
/*
const myServer = http.createServer((req, res) => {
  res.end("Hello, I am your first server ");
});
myServer.listen(3000, () => {
  console.log("server is running at localhost:3000");
});
*/

const port = 3000;
const hostname = "127.0.0.1";

const myServer = http.createServer((req, res) => {
  res.end("Hello, I am your first server ");
});
myServer.listen(port, () => {
  console.log(`server is running successfully at http://${hostname}:${port}`);
});
