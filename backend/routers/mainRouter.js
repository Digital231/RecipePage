const express = require("express");
const {
  register,
  login,
  getUserByUsername,
} = require("../controllers/mainController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:username", getUserByUsername);

module.exports = router;
