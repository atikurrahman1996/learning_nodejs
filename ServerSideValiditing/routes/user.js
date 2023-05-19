const express = require("express");
const { runValidation } = require("../validation/auth");
const { registerUser, loginUser } = require("../controllers/users");
const {
  userRegistrationValidator,
  userLoginValidator,
} = require("../validation/authentication");
const userRoute = express.Router();

//body("name").trim().notEmpty() used for validation

userRoute.post(
  "/register",
  userRegistrationValidator,
  runValidation,
  registerUser
);

userRoute.post("/login", userLoginValidator, runValidation, loginUser);

module.exports = userRoute;
