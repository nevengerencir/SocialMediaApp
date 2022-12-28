import { useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import {Link} from 'react-router-dom'

function Comment({ comment, deleteComment }) {

  const { user } = useSelector((state) => state.auth);
  return (
    <div className=" relative flex justify-between max-w-4xl mt-4 shadow-lg p-4 rounded-xl">
      {user.user._id === comment.user._id ? (
        <FaRegTrashAlt
          className="absolute top-0 right-2 text-md hover:text-xl duration-200"
          onClick={() => deleteComment(comment._id)}
        />
      ) : null}
      <span className="absolute bottom-0 right-0 p-2 text-xs opacity-60">
        {new Date(comment.createdAt).toLocaleString("en-US")}
      </span>
      <Link to={`/profile/${comment.user._id}`}>
      <div className="flex ">
        <img
          src={comment.user.img}
          className="h-10 md:h-15 rounded-full mr-4"
        />
        <h3 className="text-sm md:text-xl">{comment.user.name}</h3>
      </div>
      </Link>
      <dir>
        <p className="text-sm md:text-lg">{comment.text}</p>
      </dir>
    </div>
  );
}
export default Comment;
