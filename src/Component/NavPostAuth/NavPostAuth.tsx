import logo from "../../assets/logo/logo.png";
import NavModal from "../NavModal/NavModal";

/**top home page header */
function NavPostAuth() {
  return (
    <>
      <div className="flex sm:mx-4 md:mx-16 lg:mx-32 justify-between items-center">
        <img
          className="sm:w-28 sm:h-28 md:w-48 md:h-48 lg:mr-80"
          src={logo} alt="logo"
        />

        <div className="flex space-x-0 lg:ml-48">
          <NavModal />
        </div>
      </div>
    </>
  );
}

export default NavPostAuth;
