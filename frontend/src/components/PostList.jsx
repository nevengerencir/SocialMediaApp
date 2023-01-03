import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../features/post/postSlice";
import PostItem from "./shared/PostItem";
import Spinner from "./shared/Spinner";

function PostList({userId}) {

  const { post, isLoading, posts } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(userId));
  }, [post]);
  if (isLoading) {
    return <Spinner/>
  }
  if(posts.length  === 0){
    return <p className=" bold text-center m-10 text-sm md:text-xl p-4 shadow-xl rounded-xl">There are no posts to be shown on this profile</p>
  }
  return posts.map((post) => <PostItem post={post} key={post._id} />);
}
export default PostList;
