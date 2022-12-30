import PostForm from "../components/shared/PostForm";
import {useParams} from 'react-router-dom'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import { reset } from "../features/post/postSlice";
import BackButton from "../components/shared/BackButton";
import PostList from "../components/PostList";

function Profile() {

  const {userId} = useParams()
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSucess, message } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSucess) {
      dispatch(reset());
    }
  }, []);

 

  return (
    <>
      <BackButton url="/" />
      <h1 className="text-center ">Your profile</h1>
      {user.user._id === userId ?   <PostForm /> : null}
      <PostList userId={userId} />
    </>
  );
}
export default Profile;
