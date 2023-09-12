const express = require("express");
const { userRegister, userLogin } = require("../controllers/user");
const runValidation = require("../validation");
const { schema } = require("../validation/schema");
const userRouter = express.Router();

userRouter.post(
  "/register",
  runValidation(schema.registerSchema),
  userRegister
);
userRouter.post("/login", runValidation(schema.loginSchema), userLogin);

module.exports = userRouter;
