const express = require("express");
const protect = require("../middelware/auth");
const router = express.Router();

//Include other resource routers
const postRouter = require("./postRoutes");
router.use("/:userId/posts", postRouter);

const { registerUser, loginUser, getMe } = require("../controllers/auth");

// router.route("/").post(loginUser);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/getme").get(protect, getMe);

module.exports = router;
