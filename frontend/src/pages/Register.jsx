import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { user, isLoading, isSucess, message, isError } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSucess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSucess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <>
      <section className=" text-center font-extrabold">
        <h1>
          <FaUser className="inline mb-2 mx-1 " />
          Register {user}
        </h1>
        <p className="opacity-40 mt-2 text-2xl">Please create an account</p>
      </section>
      <section>
        <form className="max-w-sm mx-auto " onSubmit={onSubmit}>
          {/* name */}
          <input
            className="input"
            type="text"
            onChange={onChange}
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            required
          />
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
          {/* confirm password */}
          <input
            className="input"
            type="password"
            onChange={onChange}
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm  password"
            required
          />
          <div>
            <button className="submit-button  bg-black text-white">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
