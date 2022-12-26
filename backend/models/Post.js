const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    img: {
      type: String,
      immutable: true,
      default: "",
    },
    text: {
      type: String,
      required: [true, "Please add a text"],
    },
    like: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
