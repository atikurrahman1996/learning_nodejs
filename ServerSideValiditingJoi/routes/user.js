const express = require("express");
const { userRegister, userLogin } = require("../controllers/user");
const runValidation = require("../validation");
const userRouter = express.Router();

userRouter.post("/register", runValidation, userRegister);
userRouter.post("/login", userLogin);

module.exports = userRouter;
