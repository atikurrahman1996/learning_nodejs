const { v4: uuidv4 } = require("uuid");

const users = [
  {
    id: uuidv4(),
    username: "atikur rahman",
    email: "atik@yahoo.com",
  },
  {
    id: uuidv4(),
    username: "atik rahman",
    email: "atik123@yahoo.com",
  },
];

module.exports = users;
