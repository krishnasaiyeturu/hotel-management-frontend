import { useState, useEffect, useRef } from "react";
import {
  faBars,
  faClose,
  faUser,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons"; // Import the caret down icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Use React Router for navigation
import hotelLogo from "../../assets/ASPENLOGO.jpg";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomerData } from "../../hotelManagement/redux/actions/customerActions";

function Navbar() {
  const [hideMenu, setHideMenu] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const dispatch = useDispatch(); // Dispatch for Redux actions
  let customer = useSelector((state) => state.admin.customer.customerDetails);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for the dropdown

  // Fetch customer data on component mount
  useEffect(() => {
    dispatch(fetchCustomerData());
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    // Add your handling logic here for each option
    console.log(option);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo on the left */}
        <div
          className="flex pointer"
          title="ASPEN GRAND HOTELS"
          onClick={() => navigate("/")}
        >
          <img src={hotelLogo} alt="Hotel logo" className="w-6 h-6 mr-4 mt-1" />
          <h2 className="text-2xl font-bold text-[#001f53]">
            ASPEN GRAND HOTELS
          </h2>
        </div>

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
          } absolute top-16 left-0 w-full lg:static lg:block lg:w-auto`}
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

            {/* Conditional rendering for Log In or User Dropdown */}
            {customer ? (
              <li className="relative p-2 lg:p-0" ref={dropdownRef}>
                {" "}
                {/* Set ref here */}
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center text-black hover:text-blue-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  {customer.name}{" "}
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />{" "}
                  {/* Dropdown icon */}
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 w-40 bg-gray-200 ml-8 mt-5 shadow-lg rounded-lg mt-1">
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick("My Bookings")}
                    >
                      My Bookings
                    </li>
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick("Profile")}
                    >
                      Profile
                    </li>
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick("Logout")}
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </li>
            ) : (
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
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
