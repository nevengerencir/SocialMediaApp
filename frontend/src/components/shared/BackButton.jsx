import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
function BackButton({ url }) {
  return (
    <Link to={url}>
      <div className="my-4 h-16 border w-40 flex justify-center space-x-4 items-center bg-white rounded-2xl shadow-xl hover:bg-black hover:text-white  text-xl">
        <FaArrowCircleLeft className=" align-start content-center  bg" />
        <span >Back</span>
      </div>
    </Link>
  );
}
export default BackButton;
