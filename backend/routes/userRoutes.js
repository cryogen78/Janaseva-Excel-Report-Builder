const express = require("express");

const router = express.Router();

const {
  getUsers,
  createUser,
  deleteUser,
  disableUser,
  enableUser,
  resetPassword
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put("/disable/:id", disableUser);

router.put("/enable/:id", enableUser);

router.put("/reset-password/:id", resetPassword);

module.exports = router;