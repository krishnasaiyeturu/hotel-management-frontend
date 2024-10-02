import { useEffect, useRef, useState } from "react";
import {
  faBars,
  faClose,
  faCaretDown,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom"; // Use React Router for navigation

// Mock data for famous hotels
const famousHotels = [
  { id: 1, name: "ASPEN GRAND HOTELS" },
  { id: 2, name: "The Ritz-Carlton" },
  { id: 3, name: "Four Seasons" },
  { id: 4, name: "Mandarin Oriental" },
  { id: 5, name: "Waldorf Astoria" },
];

// Mock data for user options
const userOptions = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Settings" },
  { id: 3, name: "Logout" },
];

function AdminsNavbar() {
  const [hideMenu, setHideMenu] = useState(true);
  const [hotelDropdownOpen, setHotelDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeHotel, setActiveHotel] = useState(famousHotels[0]); // Default to the first hotel
  const { pathname } = useLocation();

  const userDropdownRef = useRef(null); // Ref for user dropdown
  const hotelDropdownRef = useRef(null); // Ref for hotel dropdown

  const handleHotelSelect = (hotel) => {
    setActiveHotel(hotel);
    setHotelDropdownOpen(false); // Close the dropdown after selection
  };

  const handleUserDropdownToggle = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        hotelDropdownRef.current &&
        !hotelDropdownRef.current.contains(event.target)
      ) {
        setHotelDropdownOpen(false); // Close hotel dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo (Hotel Name) on the left */}
        {/* Dropdown for Hotels */}
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-[#001f53]">
            ASPEN GRAND HOTELS
          </h2>

          {/* Dropdown beside hotel name */}
          <div className="relative ml-4" ref={hotelDropdownRef}>
            <button
              onClick={() => setHotelDropdownOpen(!hotelDropdownOpen)}
              className="bg-white text-black px-4 py-2 border rounded-md shadow-sm flex items-center"
            >
              {activeHotel.name}
              <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
            </button>

            {/* Dropdown list */}
            {hotelDropdownOpen && (
              <ul className="absolute mt-2 bg-white shadow-lg border rounded-md py-2 right-0 w-64">
                {famousHotels.map((hotel) => (
                  <li
                    key={hotel.id}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      activeHotel.id === hotel.id ? "bg-gray-200 font-bold" : ""
                    }`}
                    onClick={() => handleHotelSelect(hotel)}
                  >
                    {hotel.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setHideMenu(!hideMenu)}
          className="lg:hidden focus:outline-none text-2xl"
        >
          <FontAwesomeIcon icon={hideMenu ? faBars : faClose} />
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            hideMenu ? "hidden" : "block"
          } absolute top-16 left-0 w-full lg:static lg:block lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-6 font-bold">
            <li className="p-2 mt-1 mx-2 lg:p-0">
              <Link
                className={`${
                  pathname === "/amenities" ? "text-blue-600" : "text-black"
                } hover:text-blue-600`}
                to="/amenities"
                onClick={() => setHideMenu(true)}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-xl cursor-pointer"
                />
              </Link>
            </li>
            <li className="relative p-2 lg:p-0" ref={userDropdownRef}>
              <div
                className="flex items-center cursor-pointer"
                onClick={handleUserDropdownToggle}
              >
                <FontAwesomeIcon icon={faUser} className="text-xl" />
                <span className="ml-2 text-black">John Abraham</span>
                <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
              </div>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <ul className="absolute mt-2 bg-white shadow-lg border rounded-md py-2 right-0 w-48">
                  {userOptions.map((option) => (
                    <li
                      key={option.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setUserDropdownOpen(false)} // Close dropdown on click
                    >
                      {option.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AdminsNavbar;
