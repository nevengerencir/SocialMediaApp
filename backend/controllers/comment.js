const Comment = require("../models/Comment");
const Post = require("../models/Post");
const mongoose = require("mongoose");

const asyncHandler = require("../middelware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

//  @desc Get all comments for a specific post
//  @route GET /api/post/:postId
//  @access Private
const getComments = asyncHandler(async (req, res, next) => {
  const data = await Comment.find({ id: req.params.postId }).populate(
    "user",
    "img"
  );
  res.status(200).json({
    sucess: true,
    data,
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
  console.log(req.params.postId);
  req.body.user = req.user.id;
  req.body.post = mongoose.Types.ObjectId(req.params.postId);
  console.log(req.body.post);

  //   // req.body.img = req.file.path;
  let data = await Comment.create(req.body);

  res.status(200).json({
    sucess: true,
    data,
  });
});

//  @desc Delete a post by id
//  @route GET /api/post/:id
//  @access Private
const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Posts.findById(req.params.postId).populate("user");
  if (post.user._id.toString() !== req.user.id) {
    return next(new ErrorResponse("Permission denied", 403));
  }
  await Posts.findByIdAndRemove(req.params.postId);
  res.status(200).json({
    sucess: true,
    data: {},
  });
});
module.exports = {
  createComment,
  getComments,
};
