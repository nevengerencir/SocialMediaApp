import { useSelector, useDispatch } from "react-redux";
import { getPost, reset } from "../features/post/postSlice";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  
  return (
    <div className="h-screen">
      <BackButton url={"/"} />
   { (!post || isLoading) ? <Spinner/>:  <PostItem post={post} />}
      </div>
  );
}
export default Post;
