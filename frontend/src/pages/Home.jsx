import { useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import PostList from "../components/PostList";
import { reset } from "../features/post/postSlice";
import { toast } from "react-toastify";


function Home() {

  const sentences = ['Good to See You Back', 'Great to See You Back.',' How Have You Been?','Good Day to You!','Hi!','Hi There!','Hey, What’s Up?','What’s Going On?','What’s Happening?','What’s New?','What Have You Been Up To?',' How Are You Feeling Today?']
  const randomIndex = Math.floor(Math.random() * sentences.length);
    const item = sentences[randomIndex];


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

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="mb-10">
        <h1>Welcome back</h1>
        <p className="opacity-40  text-2xl mt-6">
         {item}
        </p>
      </section>
      
      <PostList />

    </>
  );
}
export default Home;
