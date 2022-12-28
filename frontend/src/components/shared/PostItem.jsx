import { FaRegCommentAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import CommentList from "./CommentList";
import Spinner from "../shared/Spinner";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaWindows } from "react-icons/fa";
import PostCommentForm from "./PostCommentForm";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../features/post/postSlice";
import { useState } from "react";

function PostItem({ post }) {
  const [isHidden, setHidden] = useState(true);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const deleteItem = { post };

  const deleteComment = async (commentId) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:3000/api/comment/${commentId}`, {
        method: "DELETE",
      });
      setComments((prev) =>
        prev.filter((element) => element._id !== `${commentId}`)
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (commentData, token) => {
    const { id } = commentData;
    console.log( id)

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });
      const comment = await res.json();
      console.log(comment.data);
      setComments((prev) => [...prev, comment.data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    

  };

  const onClick = () => {
    if (window.confirm("Are you sure?")) {
      return dispatch(deletePost(deleteItem.post._id));
    }
    return;
  };

  const fetchComments = async () => {
    if (isHidden)
      try {
        setLoading(true);
        setHidden(false);
        const res = await fetch(
          `http://localhost:3000/api/posts/${post._id}/comments`
        );
        const comments = await res.json();
        setComments(comments.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    else {
      setHidden(true);
      setComments([]);
    }
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
          <span>{new Date(post.createdAt).toLocaleString("en-US")}</span>
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
          ) : 
            ("")
        }
          <div className=" rounded-2xl ml-4 w-full shadow-xl p-4 ">
            <p className="text-xl ">{post.text}</p>
          </div>
        </div>
      </Link>
      {}
      <div className="flex justify-end mt-8 space-x-4 text-xl ">
        <FaRegCommentAlt onClick={fetchComments} />
        <FaThumbsUp />
        <FaThumbsDown />
      </div>
      <div className={`${isHidden ? "hidden" : ""}`}>
        <PostCommentForm id={post._id} addComment={addComment} />

        <div className="mt-6 p-2 ">
          {loading ? (
            <Spinner />
          ) : (
            <CommentList comments={comments} deleteComment={deleteComment} />
          )}
        </div>
      </div>
    </div>
  );
}
export default PostItem;
