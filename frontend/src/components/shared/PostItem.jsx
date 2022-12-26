import { FaRegCommentAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaWindows } from "react-icons/fa";
import PostCommentForm from "./PostCommentForm";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../features/post/postSlice";
import { useState } from "react";

function PostItem({ post }) {
  const [isHidden, setHidden] = useState(true);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const deleteItem = { post };

  const onClick = () => {
    if (window.confirm("Are you sure?")) {
      return dispatch(deletePost(deleteItem.post._id));
    }
    return;
  };

  return (
    <div className="bg-white  shadow-xl rounded-xl border my-4 p-4 relative">
      <div className=" mb-10 md:flex md:justify-between relative">
        <Link to={post.user._id}>
          <img
            src={post.user.img}
            className="w-20 rounded-full inline mr-4 -ml-2"
          />
          <span className=" text-2xl font-bold inline">{post.user.name}</span>
        </Link>
        <div className="space-x-4">
          <span className="">
            {new Date(post.createdAt).toLocaleString("en-US")}
          </span>
          {user.user._id === post.user._id ? (
            <FaRegTrashAlt className="inline text-xl " onClick={onClick} />
          ) : null}
        </div>
      </div>
      <Link to={`/post/${post._id}`}>
        <div className="flex ">
          {post.img ? (
            <img
              src={post.img}
              className="w-80 hidden md:block
       md:max-w-xl shadow-xl"
            />
          ) : (
            ""
          )}
          <div className=" rounded-2xl ml-4 w-full shadow-xl p-4 ">
            <p className="text-xl ">{post.text}</p>
          </div>
        </div>
      </Link>
      {}
      <div className="flex justify-end mt-8 space-x-4 text-xl ">
        <FaRegCommentAlt
          onClick={() => {
            setHidden(!isHidden);
          }}
        />
        <FaThumbsUp />
        <FaThumbsDown />
      </div>
      <div className={`${isHidden ? "hidden" : ""}`}>
        <PostCommentForm />
        <div className="mt-6 p-2 ">
          {post.comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              img={
                "https://res.cloudinary.com/drjszu0so/image/upload/v1672048070/DEV/jdxihbli8g6ul5wmslta.png"
              }
              name={"user"}
            />
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
export default PostItem;
