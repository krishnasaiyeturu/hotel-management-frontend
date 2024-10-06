import { useState } from "react";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";  // Use React Router for navigation

function Navbar() {
  const [hideMenu, setHideMenu] = useState(true);
  const { pathname } = useLocation();

  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo on the left */}
        <h2 className="text-2xl font-bold text-[#001f53]">
          ASPEN GRAND HOTELS
        </h2>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setHideMenu(!hideMenu)}
          className="lg:hidden focus:outline-none text-2xl"
        >
          <FontAwesomeIcon icon={hideMenu ? faBars : faClose} />
        </button>

        {/* Navigation on the right */}
        <nav
          className={`${
            hideMenu ? "hidden" : "block"
          } absolute top-16 left-0 w-full  lg:static lg:block lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-6 font-bold">
            <li className="p-2 lg:p-0">
              <Link
                className={`${
                  pathname === "/" ? "text-blue-600" : "text-black"
                } hover:text-blue-600`}
                to="/"
                onClick={() => setHideMenu(true)}
              >
                Home
              </Link>
            </li>
            <li className="p-2 lg:p-0">
              <Link
                className={`${
                  pathname.includes("rooms") ? "text-blue-600" : "text-black"
                } hover:text-blue-600`}
                to="/rooms"
                onClick={() => setHideMenu(true)}
              >
                Rooms
              </Link>
            </li>
            <li className="p-2 lg:p-0">
              <Link
                className={`${
                  pathname === "/amenities" ? "text-blue-600" : "text-black"
                } hover:text-blue-600`}
                to="/amenities"
                onClick={() => setHideMenu(true)}
              >
                Amenities
              </Link>
            </li>
            <li className="p-2 lg:p-0">
              <Link
                className={`${
                  pathname === "/gallery" ? "text-blue-600" : "text-black"
                } hover:text-blue-600`}
                to="/gallery"
                onClick={() => setHideMenu(true)}
              >
                Gallery
              </Link>
            </li>
            <li className="p-2 lg:p-0">
              <Link
                className={`${
                  pathname.includes("events") || pathname === "/signin"
                    ? "text-blue-600"
                    : "text-black"
                } hover:text-blue-600`}
                to="/admin/sign-in"
                onClick={() => setHideMenu(true)}
              >
              Log In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
