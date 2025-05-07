const express = require("express");
const router = express.Router();
const { signup, login, reset } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset", reset);

module.exports = router;
