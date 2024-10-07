/* eslint-disable no-unsafe-optional-chaining */
import { bookingMockDataForCheckInAndCheckOut } from "../../modules/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleCheck,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../backend";
import toast from "react-hot-toast";
import { formatDate } from "../../../utils/helper";

const CheckInAndCheckOut = () => {
  const data = bookingMockDataForCheckInAndCheckOut;
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [guestStatus, setGuestStatus] = useState('');

  const handleRoomSelection = (roomId) => {
    const updatedSelectedRooms = selectedRooms.includes(roomId)
      ? selectedRooms.filter((id) => id !== roomId)
      : [...selectedRooms, roomId];

    setSelectedRooms(updatedSelectedRooms);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = location?.state;
  const isRoomSelectionAllowed = (roomId) =>
    selectedRooms.includes(roomId) || selectedRooms.length < data.noOfRooms;
  const isButtonDisabled = data?.numberOfRooms === selectedRooms?.length;

  const getDetailsOfSelectedCustomer = async () => {
    try {
      const response = await axios.get(
        `${API}bookings/${bookingId}`
      );
      console.log("GET DETAILS OF SELECTED USER", { response });
      setCustomerDetails(response?.data);
      setGuestStatus(response?.data?.status);
    } catch (error) {
      console.log("GET DETAILS OF SELECTED USER ERROR", { error });
      toast.error(error.response.data.message || "Error while fetching guest information !");
    }
  };
  useEffect(() => {
    getDetailsOfSelectedCustomer();
  }, [bookingId]);

  const navigateToBookedRoomView = () => {
    // navigate("/admin/rooms/");
  };

  const checkInHandler = async () => {
    try {
      const response = await axios.put(`${API}bookings/check-in/${bookingId}`, {
        roomIds: selectedRooms?.length ? selectedRooms : [],
      });
      console.log("CHECK IN SUCCESS RESPONSE", { response });
      navigate("/admin/front-desk");
    } catch (error) {
      console.log("CHECK IN ERROR RESPONSE", { error });
      toast.error(error.response.data.message || "Error while checking in !");
    }
  };

  const checkOutHandler = async () => {
    try {
      const response = await axios.put(`${API}bookings/check-out/${bookingId}`);
      console.log("CHECK OUT SUCCESS RESPONSE", { response });
      navigate("/admin/front-desk");
    } catch (error) {
      console.log("CHECK OUT ERROR RESPONSE", { error });
      toast.error(error.response.data.message || "Error while checking out !");
    }
  };

  return (
    <div className="p-6 rounded-lg bg-white min-h-screen">
      {/* Guest Information and Current Booking */}
      <h1 className="text-lg text-center font-semibold my-2">
        Guest Information
      </h1>
      <div className="grid grid-cols-2 p-6  gap-6">
        {/* Left Section: Current Booking */}
        <div className="col-span-1">
          {/* <p className="text-red-500 flex items-center gap-1">
              <FontAwesomeIcon icon={faExclamationCircle} />
              Due out - 08:59
            </p> */}
          <img
            src={customerDetails?.roomType?.photos[0]}
            alt="Room Thumbnail"
            className="rounded-lg mb-4 h-96 "
          />
        </div>
        <div className="col-span-1 ">
          <div className="mt-4">
            <h3 className="text-xl font-semibold">
              {customerDetails.guest?.firstName}&nbsp;&nbsp;
              {customerDetails.guest?.lastName}
            </h3>
            <p>Booking ID: {bookingId}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-semibold">Check in</p>
                <p className="py-2">
                  {formatDate(customerDetails.checkInDate) || "-"}
                  {/* {format(new Date("2024-10-05T00:00:00.000Z"), "dd/MM/yyyy")} */}
                </p>
              </div>
              <div>
                <p className="font-semibold">Check out</p>
                <p className="py-2">
                  {formatDate(customerDetails.checkOutDate) || "-"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Guest</p>
                <p className="py-2">
                  {customerDetails?.numberOfAdults &&
                  customerDetails?.numberOfChildren
                    ? customerDetails?.numberOfAdults +
                      customerDetails?.numberOfChildren
                    : "0"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Room Type</p>
                <p className="py-2">{customerDetails?.roomTyp?.namee || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">No of Rooms</p>
                <p className="py-2">{customerDetails?.numberOfRooms || "-"}</p>
              </div>
              <div>
                <p className="font-semibold">Guest Email</p>
                <p className="py-2">{customerDetails?.guest?.email || "-"}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold">Address</p>
              <div className="flex my-2">
                <p>
                  {customerDetails?.guest?.address?.addressLine1},&nbsp;&nbsp;
                </p>
                <p>
                  {customerDetails?.guest?.address?.addressLine2}&nbsp;&nbsp;
                </p>
              </div>
              <div className="flex my-2">
                <p>{customerDetails?.guest?.address?.city},&nbsp;&nbsp; </p>
                <p>{customerDetails?.guest?.address?.state},&nbsp;&nbsp; </p>
                <p>{customerDetails?.guest?.address?.Country},&nbsp;&nbsp; </p>
                <p>{customerDetails?.guest?.address?.zipCode}&nbsp;&nbsp;</p>
              </div>
              <div className="flex"></div>
            </div>
          </div>
        </div>
        {/* Right Section: Booking Summary */}
      </div>
      <div className="mx-5">
        <p className="text-lg text-left font-semibold my-2">Eminities</p>
        <div className="grid grid-cols-12 md:grid-cols-12 gap-4">
          {customerDetails?.roomType?.amenities?.length > 0 ? (
            customerDetails?.roomType?.amenities.map((manifest, index) => (
              <p
                key={index}
                className="col-span-3 items-center gap-1 text-green-500"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />{" "}
                {manifest}
              </p>
            ))
          ) : (
            <p className="col-span-full p-4 font-bold text-xl text-center text-gray-500">
              No amenities available!
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end mx-4">
        <button
          onClick={navigateToBookedRoomView}
          className="mt-6 bg-white border border-gray-300 hover:bg-gray-100 text-center p-3 rounded-lg font-semibold"
        >
          See room details
        </button>
      </div>
      <div className=" mt-4 p-6 lg:col-span-2">
        <h2 className="text-lg text-left font-semibold my-2">
          Booking Summary
        </h2>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <p>Room Total (1 night)</p>
            <p>${customerDetails?.roomType?.pricePerNight}</p>
          </div>
          <div className="flex justify-between">
            <p>Extra Person</p>
            <p>0.00</p>
          </div>
          <div className="flex justify-between">
            <p>Extras</p>
            <p>-</p>
            {/* <p>{customerDetails.extrasCost.toFixed(2)}</p> */}
          </div>
          <div className="flex justify-between font-semibold">
            <p>Subtotal</p>
            <p>${customerDetails.totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p className="text-red-500">
              -{/* {customerDetails.discount.toFixed(2)} (10%) */}
            </p>
          </div>
          {/* <div className="flex justify-between">
            <p>Fixed Amount Taxes</p>
            <p>{customerDetails.taxes.toFixed(2)}</p>
          </div> */}
          <div className="flex justify-between text-lg font-semibold text-orange-600">
            <p>Total</p>
            <p>{customerDetails.totalPriceAfterTax}</p>
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
        <h2 className="text-lg text-center font-semibold my-2">
          Available Rooms for Assignment
        </h2>

        {/* List of available rooms */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                {guestStatus === "booked" && (
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
              {customerDetails.availableRooms?.length > 0 ? (
                customerDetails.availableRooms.map((room, index) => (
                  <tr key={index}>
                    {guestStatus === "booked" && (
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 font-bold text-xl text-center text-gray-500"
                  >
                    No rooms available. Please check back later.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mr-5">
        <button
          type="submit"
          className={`flex items-center text-white p-2 rounded-md transition-opacity  ${
            isButtonDisabled || customerDetails?.numberOfRooms
              ? "bg-blue-500 opacity-50 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          }`}
          onClick={
            guestStatus === 'booked'
              ? checkInHandler
              : checkOutHandler
          }
          disabled={isButtonDisabled || data?.numberOfRooms === 0}
        >
          <FontAwesomeIcon
            icon={
              guestStatus === 'booked'
                ? faCircleCheck
                : faPersonWalkingDashedLineArrowRight
            }
            className={`mr-2 pt-1 ${isButtonDisabled ? "opacity-50" : "opacity-100"}`}
          />
          {guestStatus === 'booked' ? "Check In" : "Check Out"}
        </button>
      </div>
    </div>
  );
};
export default CheckInAndCheckOut;
