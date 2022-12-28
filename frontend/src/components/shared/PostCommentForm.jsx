import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../features/post/postSlice";

function PostCommentForm({ id, addComment }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [commentData, setCommentData] = useState({
    id: id,
    text: "",
  });

  const onChange = (e) => {
    {
      setCommentData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(commentData, user.token)
    addComment(commentData, user.token)
    // dispatch(createComment(commentData));
    
  };

  return (
    <>
      {" "}
      <div>
        {/* Form to add a comment and show comments */}

        <form className="max-w-full " onSubmit={onSubmit}>
          <div className="flex text-md">
            <input
              name="text"
              className="input"
              type="text"
              value={commentData.comment}
              onChange={onChange}
              placeholder="Add you comment here"
            />
            <button className="p-2  border rounded-xl font-bold  hover:scale-105 duration-200 mt-6 shadow-xl">
              {" "}
              Add comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default PostCommentForm;
