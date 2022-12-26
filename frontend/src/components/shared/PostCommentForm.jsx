import { useState } from "react";
function PostCommentForm() {
  const [commentData, setCommentData] = useState("");
  const onChange = (e) => {
    setCommentData(e.target.value);
  };

  return (
    <>
      {" "}
      <div>
        {/* Form to add a comment and show comments */}

        <form className="max-w-full ">
          <div className="flex text-md">
            <input
              className="input"
              type="text"
              value={commentData}
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
