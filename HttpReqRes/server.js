const http = require("http");

const port = 3000;
const hostname = "127.0.0.1";

const myServer = http.createServer((req, res) => {
  res.writeHead(202, { "Content-Type": "text/plain" });
  //res.writeHead(202, { "Content-Type": "text/html" });

  res.write("Hello, I am your first server ");
  //res.write(" <h1> Hello </h1>");

  res.end();
});
myServer.listen(port, () => {
  console.log(`Server is running successfully at http://${hostname}:${port}`);
});
