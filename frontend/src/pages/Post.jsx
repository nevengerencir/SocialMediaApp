import { useSelector, useDispatch } from "react-redux";
import { getPost, reset } from "../features/post/postSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/shared/BackButton";
import Spinner from "../components/shared/Spinner";
import PostItem from "../components/shared/PostItem";
import { toast } from "react-toastify";

function Post() {
  const { isLoading, post, isError, message } = useSelector(
    (state) => state.post
  );
  const params = useParams();
  const { postId } = params;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getPost(postId));
  }, [isError, message, postId]);

  if (!post || isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url={"/profile"} />
      <PostItem post={post} />
    </>
  );
}
export default Post;
