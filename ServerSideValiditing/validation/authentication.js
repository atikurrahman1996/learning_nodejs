const { check } = require("express-validator");

exports.userRegistrationValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("name is missing")
    .isLength({ min: 5 })
    .withMessage("name must have 5 characters")
    .isLength({ max: 32 })
    .withMessage("name max have 32 characters"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Not a valid email"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("password is missing")
    .isLength({ min: 5 })
    .withMessage("password must have min 5 characters "),
  check("dob")
    .trim()
    .notEmpty()
    .withMessage("dob is missing")
    .isISO8601()
    .toDate()
    .withMessage("not a valid dob"),
];

exports.userLoginValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Not a valid email"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("password is missing")
    .isLength({ min: 5 })
    .withMessage("password must have min 5 characters "),
];
