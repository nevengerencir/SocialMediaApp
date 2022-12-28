const express = require("express");
const protect = require("../middelware/auth");
const router = express.Router({ mergeParams: true });

const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/comment");

router.route("/").post(protect, createComment).get(protect, getComments);

router.route("/:commentId").delete(protect, deleteComment);

module.exports = router;
