import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faBed,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import RecentBookings from "./RecentBookings";

// Sample mock data
const mockData = {
  newBooking: 172,
  availableRoom: 103,
  checkIn: 71,
  checkOut: 29,
};

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 bg-gray-100">
        {/* New Booking */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="flex-shrink-0 rounded-xl  bg-green-100">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-green-500 p-3"
              size="2x"
            />
          </div>
          <div className="ml-3">
            <h2 className="text-gray-600">New Booking</h2>
            <p className="text-2xl font-bold">{mockData.newBooking}</p>
          </div>
        </div>

        {/* Available Room */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="flex-shrink-0 rounded-xl  bg-blue-100">
            <FontAwesomeIcon
              icon={faBed}
              className="text-blue-500 p-3"
              size="2x"
            />
          </div>
          <div className="ml-3">
            <h2 className="text-gray-600">Available Room</h2>
            <p className="text-2xl font-bold">{mockData.availableRoom}</p>
          </div>
        </div>

        {/* Check In */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="flex-shrink-0 rounded-xl  bg-yellow-100">
            <FontAwesomeIcon
              icon={faSignInAlt}
              className="text-yellow-500 p-3"
              size="2x"
            />
          </div>
          <div className="ml-3">
            <h2 className="text-gray-600">Check In</h2>
            <p className="text-2xl font-bold">{mockData.checkIn}</p>
          </div>
        </div>

        {/* Check Out */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="flex-shrink-0 rounded-xl  bg-red-100">
            <FontAwesomeIcon
              className="text-red-500 p-3"
              icon={faSignOutAlt}
              size="2x"
            />
          </div>
          <div className="ml-3">
            <h2 className="text-gray-600">Check Out</h2>
            <p className="text-2xl font-bold">{mockData.checkOut}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="col-span-1 bg-white p-4 rounded-lg">
          <h1 className="text-base font-semibold text-[#002d72]">
            Recent Bookings
          </h1>
          <RecentBookings />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
