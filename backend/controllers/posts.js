const Posts = require("../models/Post");
const User = require("../models/User");

const asyncHandler = require("../middelware/asyncHandler");
const { find } = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

//  @desc Get all posts
//  @route GET /api/post/
//  @access Private
const getPosts = asyncHandler(async (req, res, next) => {
  let data;
  if (req.params.userId) {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(new ErrorResponse(`User not found`, 401));
    }
    data = await Posts.find({ id: req.params.userId }).populate("user", "name");
  } else {
    data = await Posts.find().populate("user", "name");
  }
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

//  @desc Create a post
//  @route POST /api/post/
//  @access Private
const createPost = asyncHandler(async (req, res, next) => {
  if (typeof req.file !== "undefined") {
    req.body.img = req.file.path;
  }
  req.body.user = req.user.id;

  console.log(req.user.id);
  // req.body.img = req.file.path;
  let data = await Posts.create(req.body);

  res.status(200).json({
    sucess: true,
    data,
  });
});

//  @desc Delete a post by id
//  @route GET /api/post/:id
//  @access Private
const deletePost = asyncHandler(async (req, res, next) => {
  let post = await Posts.findById(req.params.id);
  if (post.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Permission denied", 403));
  }
  post = await Posts.findByIdAndRemove(req.params.id);
  res.status(200).json({
    sucess: true,
    data: {},
  });
});
module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
