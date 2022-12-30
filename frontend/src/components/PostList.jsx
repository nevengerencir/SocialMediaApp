import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../features/post/postSlice";
import PostItem from "./shared/PostItem";

function PostList({userId}) {
  const { post, isLoading, posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(userId));
  }, [post]);
  if (isLoading) {
    return null;
  }
  return posts.map((post) => <PostItem post={post} key={post._id} />);
}
export default PostList;
