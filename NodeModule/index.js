//fs.writeFile use to create new files

const fs = require("fs");

// fs.writeFile("demo1.txt", "this is example text", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successful, file is created");
//   }
// });

//fs.writeFile use to overwrite text

// fs.writeFile("demo1.txt", "My name is Atik", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successful");
//   }
// });

//fs.appendFile use add or update file

// fs.appendFile("demo1.txt", "  I am 26 years old", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successful");
//   }
// });

//fs.readFile use to read the file

// fs.readFile("demo1.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

//fs.rename use to rename the file

// fs.rename("demo1.txt", "demo2.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successful");
//   }
// });

//fs.unlink use to delete the file

fs.unlink("demo2.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("successful");
  }
});
