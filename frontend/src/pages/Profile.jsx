import PostForm from "../components/shared/PostForm";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import { reset } from "../features/post/postSlice";

function Profile() {
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
      toast.success("Sucess");
    }

    dispatch(reset());
  }, [isError, dispatch, isSucess, message, reset]);

  return (
    <>
      <h1 className="text-center md:text-left">Your profile</h1>

      {isLoading ? <Spinner /> : ""}
      <PostForm />
    </>
  );
}
export default Profile;
