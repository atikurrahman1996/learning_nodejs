//built in module : os, path

//built in module : os

//const os = require("os");

//console.log(os.userInfo());
//console.log(os.homedir());
//console.log(os.hostname());
//console.log(os.totalmem());
//console.log(os.freemem());

//console.log(__dirname);  // find directory
//console.log(__filename);  // find file name

//built in module : path

const path = require("path");

// const extensionName = path.extname("index.html"); //finding file extension
// console.log(extensionName);

//const joinName = path.join(__dirname + "/views");  // join directory + views
const joinName = path.join(__dirname + "/../views"); // join directory with one steps back
console.log(joinName);
