import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye, faEdit } from "@fortawesome/free-solid-svg-icons";

const allRooms = [
  { id: 1, number: "#001", type: "Double bed", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Available" },
  { id: 2, number: "#002", type: "Single bed", floor: "Floor -2", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Booked" },
  { id: 3, number: "#003", type: "VIP", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Booked" },
  { id: 4, number: "#004", type: "VIP", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
  { id: 5, number: "#005", type: "Single bed", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
  { id: 6, number: "#006", type: "Double bed", floor: "Floor -2", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Waitlist" },
  { id: 7, number: "#007", type: "Double bed", floor: "Floor -3", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
  { id: 8, number: "#008", type: "Single bed", floor: "Floor -5", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Blocked" },
  { id: 9, number: "#009", type: "Double bed", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Available" },
  { id: 10, number: "#010", type: "Double bed", floor: "Floor -2", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Blocked" },
  { id: 11, number: "#011", type: "Double bed", floor: "Floor -3", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Available" },
  { id: 12, number: "#012", type: "Single bed", floor: "Floor -4", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Booked" },
  { id: 13, number: "#013", type: "VIP", floor: "Floor -3", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Booked" },
  { id: 14, number: "#014", type: "VIP", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
  { id: 15, number: "#015", type: "Single bed", floor: "Floor -2", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
  { id: 16, number: "#016", type: "Double bed", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Waitlist" },
  { id: 17, number: "#017", type: "Double bed", floor: "Floor -3", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
  { id: 18, number: "#018", type: "Single bed", floor: "Floor -5", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Blocked" },
  { id: 19, number: "#019", type: "Double bed", floor: "Floor -2", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Available" },
  { id: 20, number: "#020", type: "Double bed", floor: "Floor -4", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Blocked" },
  { id: 21, number: "#021", type: "Single bed", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Available" },
  { id: 22, number: "#022", type: "Double bed", floor: "Floor -2", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Booked" },
  { id: 23, number: "#023", type: "VIP", floor: "Floor -3", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Booked" },
  { id: 24, number: "#024", type: "VIP", floor: "Floor -4", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
  { id: 25, number: "#025", type: "Single bed", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
  { id: 26, number: "#026", type: "Double bed", floor: "Floor -2", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Waitlist" },
  { id: 27, number: "#027", type: "Double bed", floor: "Floor -5", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
  { id: 28, number: "#028", type: "Single bed", floor: "Floor -3", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Blocked" },
  { id: 29, number: "#029", type: "Double bed", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Available" },
  { id: 30, number: "#030", type: "Double bed", floor: "Floor -4", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Blocked" },
];

const RoomInventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All rooms");
  const roomsPerPage = 10;

  // Filter rooms based on active tab
  const filteredRooms = allRooms.filter((room) => {
    if (activeTab === "Available rooms") return room.status === "Available";
    if (activeTab === "Booked rooms") return room.status === "Booked";
    return true; // All rooms
  });

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
  const displayedRooms = filteredRooms.slice(
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
    setCurrentPage(1); // Reset to first page on tab change
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const statusColors = {
    Available: "bg-blue-100 text-blue-600",
    Booked: "bg-red-100 text-red-600",
    Reserved: "bg-green-100 text-green-600",
    Waitlist: "bg-yellow-100 text-yellow-600",
    Blocked: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-semibold">Room Inventory</h1>
        <button className="bg-blue-500 roomStatusWiseButtons  text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Room
        </button>
      </div>

      {/* Room Filters */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-1  rounded-full mr-2 border-2 roomStatusWiseButtons ${
            activeTab === "All rooms"
              ? "border-blue-500 bg-blue-100 text-blue-500"
              : "bg-gray-200 text-gray-700 border-gray-200"
          }`}
          onClick={() => handleTabChange("All rooms")}
        >
          All ({allRooms.length})
        </button>
        <button
          className={`px-4 py-1 rounded-full mr-2 border-2 roomStatusWiseButtons ${
            activeTab === "Available rooms"
              ? "border-blue-500 bg-blue-100 text-blue-500"
              : "bg-gray-200 text-gray-700 border-gray-200"
          }`}
          onClick={() => handleTabChange("Available rooms")}
        >
          Available (
          {allRooms.filter((room) => room.status === "Available").length})
        </button>
        <button
          className={`px-4 py-1 rounded-full border-2 roomStatusWiseButtons ${
            activeTab === "Booked rooms"
              ? "border-blue-500 bg-blue-100 text-blue-500"
              : "bg-gray-200 text-gray-700 border-gray-200"
          }`}
          onClick={() => handleTabChange("Booked rooms")}
        >
          Booked (
          {allRooms.filter((room) => room.status === "Booked").length})
        </button>
      </div>

      {/* Room Table */}
      <div className="">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-sm text-gray-500 border-b">
                Room number
              </th>
              <th className="p-4 text-sm text-gray-500 border-b">Bed type</th>
              <th className="p-4 text-sm text-gray-500 border-b">Room floor</th>
              <th className="p-4 text-sm text-gray-500 border-b">
                Room facility
              </th>
              <th className="p-4 text-sm text-gray-500 border-b">Status</th>
              <th className="p-4 text-sm text-gray-500 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedRooms.map((room) => (
              <tr key={room.id}>
                <td className="p-4 border-b text-xs">{room.number}</td>
                <td className="p-4 border-b text-xs">{room.type}</td>
                <td className="p-4 border-b text-xs">{room.floor}</td>
                <td className="p-4 border-b text-xs">{room.facility}</td>
                <td className="p-4 pl-3 border-b text-xs">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[room.status]}`}
                  >
                    {room.status}
                  </span>
                </td>
                <td className="p-4 border-b text-center">
                  <button className="text-gray-600 hover:text-gray-800 mr-2">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default RoomInventory;
