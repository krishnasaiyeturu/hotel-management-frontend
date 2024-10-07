import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../../backend";

const RoomTypesManager = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const navigate = useNavigate();

  const navigateFunction = (route) => {
    navigate(`/admin/room-inventory/${route}`);
  };

  const getAllRoomTypes = async () => {
    // setLoading(true); // Start loading state
    try {
      const res = await axios.get(`${API}room/public`);
      setRoomTypes(res.data);
      // toast.success("Room types fetched successfully!");
    } catch (error) {
      console.error("Error fetching room types:", { error });
      toast.error("Failed to fetch room types. Please try again.");
    }
  };

  useEffect(() => {
    getAllRoomTypes();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-semibold">Room Types Manager</h1>
      </div>

      {/* Room Table */}
      <div className="">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-sm text-gray-500 border-b">Sl.No</th>
              <th className="p-4 text-sm text-gray-500 border-b">Room Type</th>
              <th className="p-4 text-sm text-gray-500 border-b">
                Price Per Night
              </th>
              <th className="p-4 text-sm text-gray-500 border-b">Occupency</th>
              <th className="p-4 text-sm text-gray-500 border-b">Rating</th>
              <th className="p-4 text-sm text-gray-500 border-b">Amenities</th>
              <th className="p-4 text-sm text-gray-500 border-b text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {roomTypes?.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="p-4 font-bold text-xl text-center text-gray-500"
                >
                  No room types available. Please check back later.
                </td>
              </tr>
            ) : (
              <>
                {roomTypes.map((room, index) => (
                  <tr key={room._id}>
                    <td className="p-4 border-b text-xs">{index + 1}</td>
                    <td className="p-4 border-b text-xs">
                      {room?.name ? room.name : "-"}
                    </td>
                    <td className="p-4 border-b text-xs">
                      ${" "}
                      {room?.type?.pricePerNight
                        ? room.type.pricePerNight
                        : "-"}
                    </td>
                    <td className="p-4 border-b text-xs">
                      {room?.type?.maxOccupancy ? room.type.maxOccupancy : "-"}
                    </td>
                    <td className="p-4 border-b text-xs">
                      {room?.hotel?.rating ? room.hotel.rating : "-"}
                    </td>
                    <td className="p-4 pl-3 border-b text-xs">
                      <div className="flex flex-wrap gap-2">
                        {room?.amenities?.slice(0, 4).map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold"
                          >
                            {amenity}
                          </span>
                        ))}
                        {room?.amenities?.length > 4 && (
                          <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold">
                            ...
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 border-b text-center">
                      {/* <button className="text-gray-600 hover:text-gray-800 mr-2">
                        <FontAwesomeIcon icon={faEye} />
                      </button> */}
                      <button
                        onClick={() => navigateFunction("edit-room")}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomTypesManager;
