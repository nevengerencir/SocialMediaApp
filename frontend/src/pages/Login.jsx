import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, isLoading, isSucess, message, isError } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = formData;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSucess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className=" text-center font-extrabold">
        <h1>
          <FaSignInAlt className="inline mb-2 mx-1 " />
          Login
        </h1>
        <p className="opacity-40 mt-2 text-2xl">Please create an account</p>
      </section>
      <section>
        <form className="max-w-sm mx-auto " onSubmit={onSubmit}>
          {/* email */}
          <input
            className="input"
            type="email"
            onChange={onChange}
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            required
          />
          {/* password */}
          <input
            className="input"
            type="password"
            onChange={onChange}
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            required
          />
          <div>
            <button className="submit-button bg-black text-white">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
export default Login;
