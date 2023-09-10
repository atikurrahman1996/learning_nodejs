const Joi = require("joi");

const userRegister = (req, res) => {
  try {
    // Create Schema

    const schema = Joi.object({
      name: Joi.string().min(3).max(31).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(12).required(),
    });

    // Validate data using Joi

    const result = schema.validate(req.body);
    console.log(result);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    return res.status(201).json({ message: "User was created", result });
  } catch (error) {
    return res.send({ message: "error.message" });
  }
};

const userLogin = (req, res) => {
  try {
    // Create Schema

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(12).required(),
    });

    // Validate data using Joi

    const result = schema.validate(req.body);

    return res.status(200).json({ message: "User was logged In", result });
  } catch (error) {
    return res.send({ message: "error.message" });
  }
};

module.exports = { userRegister, userLogin };
