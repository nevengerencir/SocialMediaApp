import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
function PostItem({ post }) {
  return (
    <div className="bg-white  shadow-xl rounded-xl border my-4 p-4 relative">
      <div className=" mb-10 md:flex md:justify-between">
        <Link to={`/${post.user._id}`}>
          <span className=" text-2xl font-bold block">{post.user.name}</span>
        </Link>
        <span className="">
          {new Date(post.createdAt).toLocaleString("en-US")}
        </span>
      </div>
      <Link to={`/${post._id}`}>
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
    </div>
  );
}
export default PostItem;
