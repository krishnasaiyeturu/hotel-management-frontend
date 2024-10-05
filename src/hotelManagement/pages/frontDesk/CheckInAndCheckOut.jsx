import { bookingMockDataForCheckInAndCheckOut } from "../../modules/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleCheck,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const CheckInAndCheckOut = () => {
  const data = bookingMockDataForCheckInAndCheckOut;
    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleRoomSelection = (roomId) => {
      const updatedSelectedRooms = selectedRooms.includes(roomId)
        ? selectedRooms.filter((id) => id !== roomId)
        : [...selectedRooms, roomId];

      setSelectedRooms(updatedSelectedRooms);
    };

    const isRoomSelectionAllowed = (roomId) =>
      selectedRooms.includes(roomId) || selectedRooms.length < data.noOfRooms;
    const isButtonDisabled = data?.noOfRooms === selectedRooms?.length;
  return (
    <div className="p-6 rounded-lg bg-white min-h-screen">
      {/* Guest Information and Current Booking */}
      <h1 className="text-lg text-center font-semibold my-2">
        {location.pathname.includes("/check-in") ? "Check In" : "Check Out"}
      </h1>
      <div className="grid grid-cols-2 p-6  gap-6">
        {/* Left Section: Current Booking */}
        <div className="col-span-1">
          {/* <p className="text-red-500 flex items-center gap-1">
              <FontAwesomeIcon icon={faExclamationCircle} />
              Due out - 08:59
            </p> */}
          <img
            src="https://via.placeholder.com/150"
            alt="Room Thumbnail"
            className="rounded-lg mb-4 h-96 "
          />
        </div>
        <div className="col-span-1 ">
          <div className="mt-4">
            <h3 className="text-xl font-semibold">{data.guestName}</h3>
            <p>Booking ID: {data.bookingId}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-semibold">Check in</p>
                <p>{data.checkIn}</p>
              </div>
              <div>
                <p className="font-semibold">Check out</p>
                <p>{data.checkOut}</p>
              </div>
              <div>
                <p className="font-semibold">Guest</p>
                <p>{data.guestCount}</p>
              </div>
              <div>
                <p className="font-semibold">Room Type</p>
                <p>{data.roomType}</p>
              </div>
              <div>
                <p className="font-semibold">No of Rooms</p>
                <p>{data.noOfRooms}</p>
              </div>
              <div>
                <p className="font-semibold">Guest Email</p>
                <p>{data.guestEmils}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold">Address</p>
              <div className="flex">
                <p>{data.address?.addressLine1},&nbsp;&nbsp;</p>
                <p>{data.address?.addressLine2}&nbsp;&nbsp;</p>
              </div>
              <div className="flex">
                <p>{data.address?.city},&nbsp;&nbsp; </p>
                <p>{data.address?.state},&nbsp;&nbsp; </p>
                <p>{data.address?.Country},&nbsp;&nbsp; </p>
                <p>{data.address?.zipCode}&nbsp;&nbsp;</p>
              </div>
              <div className="flex"></div>
            </div>

            <div className="mt-4">
              <p className="font-semibold">Eminities</p>
              <div className="flex gap-2">
                {data.manifests.map((manifest, index) => (
                  <p
                    key={index}
                    className="flex items-center gap-1 text-green-500"
                  >
                    <FontAwesomeIcon icon={faCheckCircle} /> {manifest}
                  </p>
                ))}
              </div>
            </div>

            <button className="mt-6 w-full bg-white border border-gray-300 hover:bg-gray-100 text-center p-3 rounded-lg font-semibold">
              See room details
            </button>
          </div>
        </div>

        {/* Right Section: Booking Summary */}
      </div>
      <div className=" mt-4 p-6 lg:col-span-2">
        <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <p>Room Total (1 night)</p>
            <p>{data.roomCost.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Extra Person</p>
            <p>0.00</p>
          </div>
          <div className="flex justify-between">
            <p>Extras</p>
            <p>{data.extrasCost.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Subtotal</p>
            <p>{(data.roomCost + data.extrasCost).toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p className="text-red-500">- {data.discount.toFixed(2)} (10%)</p>
          </div>
          <div className="flex justify-between">
            <p>Fixed Amount Taxes</p>
            <p>{data.taxes.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold text-orange-600">
            <p>Total</p>
            <p>{data.totalCost.toFixed(2)}</p>
          </div>
        </div>
        {/* <div className="mt-6 flex justify-between">
          <button className="bg-white border border-gray-300 hover:bg-gray-200 text-center p-3 rounded-lg font-semibold">
            Close
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold">
            Checked Out
          </button>
        </div> */}
      </div>

      {/* Booking History */}

      {/* List of available rooms */}
      <div className=" p-6  lg:col-span-2">
        <h2 className="text-2xl font-semibold mb-4">
          Available Rooms for Assignment
        </h2>

        {/* List of available rooms */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                {!location.pathname.includes("/check-out") && (
                  <th className="p-2 text-left">Select</th>
                )}
                <th className="p-2 text-left">Room Id</th>
                <th className="p-2 text-left">Room Number</th>
                <th className="p-2 text-left">Room Type</th>
                <th className="p-2 text-left">Floor Number</th>
                <th className="p-2 text-left">Price per Night</th>
                {/* <th className="p-2 text-left">Manifests</th> */}
              </tr>
            </thead>
            <tbody>
              {data.availableRoomsForAssignment
                .filter((room) => room.availability === "Available")
                .map((room, index) => (
                  <tr key={index}>
                    {!location.pathname.includes("/check-out") && (
                      <td className="p-2">
                        <input
                          type="checkbox"
                          disabled={!isRoomSelectionAllowed(room.roomId)}
                          checked={selectedRooms.includes(room.roomId)}
                          onChange={() => handleRoomSelection(room.roomId)}
                        />
                      </td>
                    )}
                    <td className="p-2">{room.roomId}</td>
                    <td className="p-2">{room.roomNumber}</td>
                    <td className="p-2">{room.roomType}</td>
                    <td className="p-2">{room.floorNumber}</td>
                    <td className="p-2">${room.pricePerNight}</td>
                    {/* <td className="p-2">
                        <div className="flex flex-wrap gap-2">
                          {room.manifests.map((manifest, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-2 text-[0.6rem] font-semibold text-white-700 bg-blue-100 border border-blue-300 rounded-full"
                            >
                              {manifest}
                            </span>
                          ))}
                        </div>
                      </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mr-5">
        <button
          type="submit"
          className={`flex items-center text-white p-2 rounded-md transition-opacity  ${
            isButtonDisabled
              ? "bg-blue-500 opacity-50 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          }`}
          disabled={isButtonDisabled}
        >
          <FontAwesomeIcon
            icon={
              location.pathname.includes("/check-in")
                ? faCircleCheck
                : faPersonWalkingDashedLineArrowRight
            }
            className={`mr-2 pt-1 ${isButtonDisabled ? "opacity-50" : "opacity-100"}`}
          />
          {location.pathname.includes("/check-in") ? "Check In" : "Check Out"}
        </button>
      </div>
    </div>
  );
};
export default CheckInAndCheckOut;
