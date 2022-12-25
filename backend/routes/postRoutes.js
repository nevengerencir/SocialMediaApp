const express = require("express");
const protect = require("../middelware/auth");
const router = express.Router({ mergeParams: true });
const upload = require("../utils/cloudinaryMulterStorage");

const {
  updatePost,
  deletePost,
  createPost,
  getPosts,
  getPostsByUser,
} = require("../controllers/posts");

// router.route("/").post(loginUser);
// .post(upload.single('image'),(req,res) =>{
//   return res.status(200).json({
//     sucess:true,
//     data: req.file.path
// })}) if using multer - disable file uploader first
router.route("/").post(protect, createPost).get(protect, getPosts);

router.route("/picture").post(protect, upload.single("image"), createPost);

// router.route("/:userId").get(protect, getPostsByUser);

router
  .route("/:postId")
  .put(protect, updatePost)
  .delete(protect, deletePost)
  .get(protect, getPosts);
module.exports = router;
