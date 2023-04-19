import logo from "../../assets/logo/logo.png";
import NavModal from "../NavModal/NavModal";

/**top home page header */
function NavPostAuth() {
  return (
    <>
      <div className="flex sm:mx-4 md:mx-16 lg:mx-32 justify-between items-center">
        <img
          className="sm:w-32 sm:h-32 md:w-40 md:h-40 "
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
