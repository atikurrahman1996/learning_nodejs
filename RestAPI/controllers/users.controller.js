let users = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");

//get users
const getAllUser = (req, res) => {
  res.status(200).json({ users });
};

//create users
const createUser = (req, res) => {
  const newUser = {
    id: uuidv4(),
    username: req.body.username,
    email: req.body.email,
  };

  users.push(newUser);

  res.status(201).json(users);
};

//update users
const updateUser = (req, res) => {
  const userid = req.params.id;
  const { username, email } = req.body;
  users
    .filter((user) => user.id === userid)
    .map((selecteduser) => {
      selecteduser.username = username;
      selecteduser.email = email;
    });
  res.status(200).json(users);
};

//delete users

const deleteUser = (req, res) => {
  const userid = req.params.id;
  users = users.filter((user) => user.id !== userid);

  res.status(200).json(users);
};

module.exports = { getAllUser, createUser, updateUser, deleteUser };
