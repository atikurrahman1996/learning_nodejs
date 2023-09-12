const Joi = require("joi");

exports.schema = {
  registerSchema: Joi.object({
    name: Joi.string().min(3).max(31).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
    confirmedpassword: Joi.ref("password"),
    dob: Joi.date().required(),
  }),

  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  }),
};
