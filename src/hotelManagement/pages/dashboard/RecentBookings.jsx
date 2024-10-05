import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../redux/actions/roomsActions";

function RecentBookings() {
  const [currentPage, setCurrentPage] = useState(1);
  const activeHotel = useSelector((state) => state.admin.hotels.activeHotel);
  const rooms = useSelector((state) => state.admin.roomsInventory.rooms);
  const dispatch = useDispatch();

    const handlePrev = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const roomsPerPage = 10;
    const totalPages = Math.ceil(rooms.length / roomsPerPage);
    const displayedRooms = rooms.slice(
      (currentPage - 1) * roomsPerPage,
      currentPage * roomsPerPage
    );
      const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
  useEffect(() => {
    if (activeHotel?._id) {
      dispatch(getAllRooms(activeHotel._id, ""));
    }
  }, [dispatch, activeHotel]);

  return (
    <div>
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
                    <td className="p-2 border-b text-xs">
                      {room?.roomNumber ? room.roomNumber : "-"}
                    </td>
                    <td className="p-2 border-b text-xs">
                      {room?.floorNumber ? room.floorNumber : "-"}
                    </td>
                    <td className="p-2 border-b text-xs">
                      {room?.roomType ? room.roomType : "-"}
                    </td>
                    <td className="p-2 border-b text-xs">
                      ${" "}
                      {room?.type?.pricePerNight
                        ? room.type.pricePerNight
                        : "-"}
                    </td>
                    <td className="p-2 border-b text-xs">
                      {room?.type?.maxOccupancy ? room.type.maxOccupancy : "-"}
                    </td>
                    <td className="p-2 pl-3 border-b text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600`}
                      >
                        {room?.status ? room.status : "-"}
                      </span>
                    </td>
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
}

export default RecentBookings;
