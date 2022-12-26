const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userImg: {
      type: String,
      default:
        "https://res.cloudinary.com/drjszu0so/image/upload/v1672048070/DEV/jdxihbli8g6ul5wmslta.png",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    text: {
      type: String,
      required: [true, "Please add a text"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
