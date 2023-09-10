const Joi = require("joi");

const runValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(31).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  });

  // Validate data using Joi

  const { error } = schema.validate(req.body, {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  });

  if (error) {
    const errorList = error.details.map((err) => err.message);
    return res.status(201).json({ message: "Invalid Input", errorList });
  }
  next();
};

module.exports = runValidation;
