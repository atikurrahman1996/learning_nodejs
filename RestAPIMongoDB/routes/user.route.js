const express = require("express");
const {
  getAllUsers,
  getOneUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getOneUsers);
router.post("/", createUsers);
//router.put("/", updateUsers);
router.patch("/:id", updateUsers); //put & patch both are used for update
router.delete("/:id", deleteUsers); //put & patch both are used for update

module.exports = router;
