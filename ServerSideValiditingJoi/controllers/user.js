const Joi = require("joi");

const userRegister = (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    return res.status(201).json({ message: "User was created", user });
  } catch (error) {
    return res.send({ message: "error.message" });
  }
};

const userLogin = (req, res) => {
  try {
    // Validate data using Joi
    return res.status(200).json({ message: "User was logged In" });
  } catch (error) {
    return res.send({ message: "error.message" });
  }
};

module.exports = { userRegister, userLogin };
