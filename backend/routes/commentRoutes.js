const express = require("express");
const protect = require("../middelware/auth");
const router = express.Router({ mergeParams: true });

const { createComment, getComments } = require("../controllers/comment");

router.route("/").post(protect, createComment).get(protect, getComments);

module.exports = router;
