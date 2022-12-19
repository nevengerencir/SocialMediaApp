const express = require("express");
const protect = require("../middelware/auth");
const router = express.Router();

const { registerUser, loginUser, getMe } = require("../controllers/auth");

// router.route("/").post(loginUser);

router.route("/").post(registerUser);
router.route("/login").post(loginUser);

router.route("/getme").get(protect, getMe);

module.exports = router;
