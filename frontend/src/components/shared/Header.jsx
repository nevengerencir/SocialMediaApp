import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = async () => {
    try{
    dispatch(logout());
    dispatch(reset());}
    catch(err){console.log(err)}
    navigate("/login");
  };

  const handleHome = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="mb-10  text-xl md:text-xl  ">
      <header className="py-4 md:p-4 sticky top-0">
        {" "}
        <div className="flex justify-between">
          <div className="space-x-4">
          <span onClick={handleHome}>Homepage</span>
    {user ? <Link to={`/profile/${user.user._id}`}>
    <span >Your profile</span>

                  </Link> : null }
                  </div>
          <ul className="flex">
            {user ? (
              <li>
                <button
                  className="px-4 md:px-16 hover:opacity-60"
                  onClick={onLogout}
                >
                  <FaSignOutAlt className="inline" /> Logout
                </button>
              </li>
            ) : (
              <>
                {" "}
                <li className="px-4 md:px-16 hover:opacity-60">
                  <Link to="/login">
                    <FaSignInAlt className="inline" /> Login
                  </Link>
                </li>
                <li className="hover:opacity-60">
                  <Link to="/register">
                    <FaUser className="inline" />
                    Register
                  </Link>
                </li>
               
              </>
            )}
          </ul>
        </div>
      </header>
      <div className="border-t "></div>
    </div>
  );
}
export default Header;
