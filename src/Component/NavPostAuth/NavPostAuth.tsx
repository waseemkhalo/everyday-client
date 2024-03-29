import logo from "../../assets/logo/everyday-seasons-white.png";
import NavModal from "../NavModal/NavModal";

/**top home page header */
function NavPostAuth() {
  return (
    <>
      <div className="flex sm:mx-4 md:mx-16 lg:mx-32 justify-between items-center">
        <img
          className="sm:w-60 sm:h-34 md:w-64 md:h-40 "
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
