import { Link } from "react-router-dom";
import logo from "../../assets/logo/everydaypaper.png";
import NavModal from "../NavModal/NavModal";

/**top home page header */
function NavPostAuth() {
  return (
    <>
      <div className="flex sm:mx-4 md:mx-16 lg:mx-32 justify-between items-center">
        <Link to='/home'>
          <img
            className="sm:w-40 sm:h-34 md:w-40 md:h-40 "
            src={logo} alt="logo"
          />
        </Link>

        <div className="flex space-x-0 lg:ml-48">
          <NavModal />
        </div>
      </div>
    </>
  );
}

export default NavPostAuth;
