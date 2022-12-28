const Comment = require("../models/Comment");
const Post = require("../models/Post");
const mongoose = require("mongoose");

const asyncHandler = require("../middelware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

//  @desc Get all comments for a specific post
//  @route GET /api/post/:postId/comments
//  @access Private
const getComments = asyncHandler(async (req, res, next) => {
  const data = await Comment.find({ post: req.params.postId }).populate(
    "user",
    "name img"
  );
  res.status(200).json({
    sucess: true,
    data,
    post: req.params.postId,
  });
});

//  @desc Update a post by id
//  @route GET /api/post/:id
//  @access Private
const updatePost = asyncHandler(async (req, res, next) => {
  let post = await Posts.findById(req.params.id);
  if (post.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Permission denied", 403));
  }
  post = await Posts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    sucess: true,
    post,
  });
});

//  @desc Create a comment
//  @route POST /api/post/:postid/comment
//  @access Private
const createComment = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.post = mongoose.Types.ObjectId(req.params.postId);
  console.log(req.body);

  //   // req.body.img = req.file.path;
  let data = await Comment.create(req.body)
data = await data.populate("user","name img");
  res.status(200).json({
    sucess: true,
    data,
  });
});

//  @desc Delete a comment by id
//  @route GET /api/comment/:commentId
//  @access Private
const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId).populate("user");
  console.log("trying");
  if (comment.user._id.toString() !== req.user.id) {
    return next(new ErrorResponse("Permission denied", 403));
  }
  await Comment.findByIdAndDelete(req.params.commentId);
  res.status(200).json({
    sucess: true,
    data: {},
  });
});
module.exports = {
  createComment,
  getComments,
  deleteComment,
};
