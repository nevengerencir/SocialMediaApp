import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../features/post/postSlice";
import PostItem from "./shared/PostItem";

function PostList() {
  const { post, isLoading, posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, post]);
  if (isLoading) {
    return null;
  }
  return posts.map((post) => <PostItem post={post} />);
}
export default PostList;
