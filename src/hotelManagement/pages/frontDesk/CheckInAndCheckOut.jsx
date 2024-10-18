/* eslint-disable no-unsafe-optional-chaining */
// import { bookingMockDataForCheckInAndCheckOut } from "../../modules/mockData";
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
  // const data = bookingMockDataForCheckInAndCheckOut;
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [guestStatus, setGuestStatus] = useState("");

  const handleRoomSelection = (roomId) => {
    const updatedSelectedRooms = selectedRooms.includes(roomId)
      ? selectedRooms.filter((id) => id !== roomId)
      : [...selectedRooms, roomId];

    setSelectedRooms(updatedSelectedRooms);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = location?.state;

  const isRoomSelectionAllowed = (roomId) => {
    if (selectedRooms.length === customerDetails.numberOfRooms) {
      if (!selectedRooms.includes(roomId)) {
        return true;
      } else {
        return false;
      }
    } else return false;
  };
  const getDetailsOfSelectedCustomer = async () => {
    try {
      const response = await axios.get(`${API}bookings/${bookingId}`);
      setCustomerDetails(response?.data);
      setGuestStatus(response?.data?.status);
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error while fetching guest information !"
      );
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
      if(response){
      const successMessage = `${customerDetails.guest?.firstName} 
              ${customerDetails.guest?.lastName}${" "} has Successfully Checked In !`;
      toast.success(successMessage);
      navigate("/admin/front-desk");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error while checking in !");
    }
  };

  const checkOutHandler = async () => {
    try {
      const response = await axios.put(`${API}bookings/check-out/${bookingId}`);
      if(response){
      const successMessage = `${customerDetails.guest?.firstName}
              ${customerDetails.guest?.lastName}${" "} has Successfully Checked Out !`;
      toast.success(successMessage);
      navigate("/admin/front-desk");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error while checking out !");
    }
  };
  const checkRoomsLength =
    customerDetails?.status === "booked"
      ? customerDetails?.availableRooms?.length > 0
      : customerDetails?.room?.length > 0;

  const mappingRooms =
    customerDetails?.status === "booked"
      ? customerDetails?.availableRooms
      : customerDetails?.room;
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
                <p className="py-2">{customerDetails?.roomType?.name || "-"}</p>
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
          {customerDetails?.status === "booked"
            ? "Available Rooms for Assignment"
            : "Assaigned rooms"}
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
              {checkRoomsLength ? (
                mappingRooms.map((room, index) => (
                  <tr key={index}>
                    {guestStatus === "booked" && (
                      <td className="p-2">
                        <input
                          type="checkbox"
                          disabled={isRoomSelectionAllowed(room?._id)}
                          checked={selectedRooms.includes(room?._id)}
                          onChange={() => handleRoomSelection(room?._id)}
                        />
                      </td>
                    )}
                    <td className="p-2">#{room._id.slice(0, 4)}</td>
                    <td className="p-2">{room.roomNumber}</td>
                    <td className="p-2">{customerDetails?.roomType?.name}</td>
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
            guestStatus === "booked"
              ? selectedRooms?.length !== customerDetails?.numberOfRooms
                ? "bg-blue-500 opacity-50 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          }`}
          onClick={guestStatus === "booked" ? checkInHandler : checkOutHandler}
          disabled={
            guestStatus === "booked"
              ? selectedRooms?.length !== customerDetails?.numberOfRooms ||
                customerDetails?.numberOfRooms === 0
              : false
          }
        >
          <FontAwesomeIcon
            icon={
              guestStatus === "booked"
                ? faCircleCheck
                : faPersonWalkingDashedLineArrowRight
            }
            className={`mr-2 pt-1 ${
              guestStatus === "booked"
                ? selectedRooms?.length !== customerDetails?.numberOfRooms
                  ? "opacity-50"
                  : "opacity-100"
                : "opacity-100"
            } `}
          />
          {guestStatus === "booked" ? "Check In" : "Check Out"}
        </button>
      </div>
    </div>
  );
};
export default CheckInAndCheckOut;
