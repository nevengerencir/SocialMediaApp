import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="text-center">
        <h1>{user ? `Welcome back ${user.name}!` : ""}</h1>
        <p className="opacity-40  text-2xl mt-4">
          Please choose from an option below
        </p>
      </section>
      <div className="max-w-md mx-auto">
        <Link to="/profile">
          <button className="submit-button  border-black text-black">
            <FaQuestionCircle className="inline mx-2 " />
            Your profile
          </button>
        </Link>
        <Link to="#">
          <button className="submit-button  bg-black text-white">
            <FaTicketAlt className="inline mx-2 " />
            Create New Ticket
          </button>
        </Link>
      </div>
    </>
  );
}
export default Home;
