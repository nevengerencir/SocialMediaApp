import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
function Home() {
  return (
    <>
      <section className="text-center">
        <h1>What do you need help with?</h1>
        <p className="opacity-40  text-2xl mt-4">
          Please choose from an option below
        </p>
      </section>
      <div className="max-w-md mx-auto">
        <Link to="/new-ticket">
          <button className="submit-button  border-black text-black">
            <FaQuestionCircle className="inline mx-2 " />
            Create New Ticket
          </button>
        </Link>
        <Link to="/new-ticket">
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
