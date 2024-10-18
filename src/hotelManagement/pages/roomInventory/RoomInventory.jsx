import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  getAllRooms,
  getAllRoomsCount,
} from "../../redux/actions/roomsActions";
import { useDispatch, useSelector } from "react-redux";

const RoomInventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("available");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeHotel = useSelector((state) => state.admin.hotels.activeHotel);
  const rooms = useSelector((state) => state.admin.roomsInventory.rooms);
  const roomsCount = useSelector(
    (state) => state.admin.roomsInventory.roomsCount
  );

  const roomsPerPage = 10;
  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  const displayedRooms = rooms.slice(
    (currentPage - 1) * roomsPerPage,
    currentPage * roomsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    dispatch(getAllRooms(activeHotel._id, tab));
    setCurrentPage(1); // Reset to first page on tab change
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const statusColors = {
    all: "bg-blue-100 text-blue-600",
    booked: "bg-red-100 text-red-600",
    available: "bg-green-100 text-green-600",
    maintenance: "bg-yellow-100 text-yellow-600",
    Blocked: "bg-gray-100 text-gray-600",
  };

  const navigateFunction = (route) => {
    navigate(`/admin/room-inventory/${route}`);
  };

  useEffect(() => {
    if (activeHotel?._id && activeTab) {
      dispatch(getAllRooms(activeHotel._id, activeTab));
      dispatch(getAllRoomsCount(activeHotel._id));
    }
  }, [dispatch, activeHotel, activeTab]);

  return (
    <div className="bg-white p-6 rounded shadow-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-semibold">Room Inventory</h1>
        <button
          onClick={() => navigateFunction("types")}
          className="bg-blue-500 roomStatusWiseButtons  text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          {/* <FontAwesomeIcon icon={faPlus} className="mr-2" /> */}
          Room Types Manager
        </button>
      </div>

      {/* Room Filters */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-1  rounded-full mr-2 border-2 roomStatusWiseButtons ${
            activeTab === ""
              ? "border-blue-500 bg-blue-100 text-blue-500"
              : "bg-gray-200 text-gray-700 border-gray-200"
          }`}
          onClick={() => handleTabChange("")}
        >
          All ({roomsCount?.all ? roomsCount.all : 0})
        </button>
        <button
          className={`px-4 py-1 rounded-full mr-2 border-2 roomStatusWiseButtons ${
            activeTab === "available"
              ? "border-blue-500 bg-blue-100 text-blue-500"
              : "bg-gray-200 text-gray-700 border-gray-200"
          }`}
          onClick={() => handleTabChange("available")}
        >
          Available ({roomsCount?.available ? roomsCount.available : 0})
        </button>
        <button
          className={`px-4 py-1 rounded-full mr-2  border-2 roomStatusWiseButtons ${
            activeTab === "booked"
              ? "border-blue-500 bg-blue-100 text-blue-500"
              : "bg-gray-200 text-gray-700 border-gray-200"
          }`}
          onClick={() => handleTabChange("booked")}
        >
          Booked ({roomsCount?.booked ? roomsCount.booked : 0})
        </button>
        <button
          className={`px-4 py-1  rounded-full mr-2 border-2 roomStatusWiseButtons ${
            activeTab === "maintenance"
              ? "border-blue-500 bg-blue-100 text-blue-500"
              : "bg-gray-200 text-gray-700 border-gray-200"
          }`}
          onClick={() => handleTabChange("maintenance")}
        >
          Maintenance{" "}
           ({roomsCount?.maintenance ? roomsCount.maintenance : 0})
        </button>
      </div>

      {/* Room Table */}
      <div className="">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-sm text-gray-500 border-b">
                Room Number
              </th>
              <th className="p-4 text-sm text-gray-500 border-b">Room Floor</th>
              <th className="p-4 text-sm text-gray-500 border-b">Type</th>
              <th className="p-4 text-sm text-gray-500 border-b">
                Price Per Night
              </th>
              <th className="p-4 text-sm text-gray-500 border-b">Occupancy</th>
              <th className="p-4 text-sm text-gray-500 border-b">Status</th>
              {/* <th className="p-4 text-sm text-gray-500 border-b text-center">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="p-4 font-bold text-xl text-center text-gray-500"
                >
                  No rooms available. Please check back later.
                </td>
              </tr>
            ) : (
              <>
                {displayedRooms.map((room) => (
                  <tr key={room._id}>
                    <td className="p-4 border-b text-xs">{room?.roomNumber ? room.roomNumber : '-'}</td>
                    <td className="p-4 border-b text-xs">{room?.floorNumber ? room.floorNumber : '-'}</td>
                    <td className="p-4 border-b text-xs">{room?.roomType ? room.roomType : '-'}</td>
                    <td className="p-4 border-b text-xs">
                      $ {room?.type?.pricePerNight ? room.type.pricePerNight : '-'}
                    </td>
                    <td className="p-4 border-b text-xs">
                      {room?.type?.maxOccupancy ? room.type.maxOccupancy : '-'}
                    </td>
                    <td className="p-4 pl-3 border-b text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[room.status] ? statusColors[room.status] : '-'}`}
                      >
                        {room?.status ? room.status : '-'}
                      </span>
                    </td>
                    {/* <td className="p-4 border-b text-center">
                      <button className="text-gray-600 hover:text-gray-800 mr-2">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={() => navigateFunction("edit-room")}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {rooms.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex justify-center items-center mt-4">
            {totalPages > 1 && (
              <>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`px-3 py-1 border mx-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </>
            )}
            {totalPages <= 1 && (
              <button className="px-3 py-1 border mx-1 rounded bg-blue-500 text-white">
                1
              </button>
            )}
          </div>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomInventory;
