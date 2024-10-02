/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDateFormatting } from "../../hooks/useDateFormatting";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Payment = ({ searchParamsObj }) => {
  const user = useSelector((state) => state.user.userDetails);
  const newReservationData = useSelector(
    (state) => state.reservations?.newReservationsData
  );
  const listingData = useSelector(
    (state) => state.house.listingDetails.listing
  );
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  //   geting the checkin and checkout dates
  const dateObj = {
    checkin: searchParamsObj?.checkin,
    checkout: searchParamsObj?.checkout,
  };
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setGuestInfo({
       ...guestInfo,
       [name]: value,
     });
   };

  //   dates
  const formattedDates = useDateFormatting(dateObj);
  //   reservation data
  const guestNumber = newReservationData
    ? newReservationData.guestNumber
    : searchParamsObj?.numberOfGuests;
  const checkin = newReservationData
    ? newReservationData?.checkIn
    : searchParamsObj.checkin;
  const checkout = newReservationData
    ? newReservationData?.checkOut
    : searchParamsObj?.checkout;
  const nightStaying = newReservationData
    ? newReservationData?.nightStaying
    : searchParamsObj?.nightStaying;
  const orderId = Math.round(Math.random() * 10000000000);

  // reservation form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You need to log in first!");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      if (!stripe || !elements) {
        return;
      }

      setIsProcessing(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmed?guestNumber=${guestNumber}&checkIn=${checkin}&checkOut=${checkout}&listingId=${listingData?._id}&authorId=${listingData?.author}&nightStaying=${nightStaying}&orderId=${orderId}`,
        },
      });

      if (error) {
        setMessage(error.message);
        toast.error("Payment failed. Try again!");
      }

      setIsProcessing(false);
    }
  };
  return (
    <div>
      {/* trips section */}
      <div className=" flex flex-col gap-6">
        <h5 className="text-xl md:text-[22px] text-[#222222] font-medium">
          Your trip
        </h5>
        {/* dates */}
        <div className=" flex flex-row justify-between">
          <span className="text-sm md:text-base text-[#222222]">
            <p className="font-medium">Dates</p>
            <p>{formattedDates}</p>
          </span>
          {/* guests */}
          <span className="text-sm md:text-base text-[#222222]">
            <p className="font-medium">Guests</p>
            <p>
              {guestNumber} {guestNumber === "1" ? "guest" : "guests"}
            </p>
          </span>
        </div>
        <div className="flex flex-col gap-6">
        <h5 className="text-xl md:text-[22px] text-[#222222] font-medium">
          Guest Information
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="p-3 rounded-md">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={guestInfo.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          {/* Last Name */}
          <div className="p-3 rounded-md">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={guestInfo.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              required
            />
          </div>

          {/* Email Address */}
          <div className="p-3 rounded-md">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={guestInfo.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          </div>
        </div>
        </div>
        <hr className="w-full h-[1.3px] bg-[#dddddd] my-4" />
        {/* payment element */}
        <form onSubmit={handleSubmit}>
          <h5 className="text-xl md:text-[22px] text-[#222222] font-medium pb-4">
            Pay with
          </h5>
          <PaymentElement />
          <hr className="w-full h-[1.3px] bg-[#dddddd] my-10" />
          <div>
            <h5 className="text-xl md:text-[22px] text-[#222222] font-medium">
              Ground rules
            </h5>
            <p className="text-sm md:text-base text-[#222222] py-4">
              We ask every guest to remember a few simple things about what
              makes a great guest.
            </p>
            <ul className="text-sm md:text-base list-disc pl-5">
              <li>Follow the house rules </li>
              <li>Treat your Host’s home like your own</li>
            </ul>
          </div>
          <hr className="w-full h-[1.3px] bg-[#dddddd] my-10" />
          <p className="text-xs opacity-70">
            By selecting the button below, I agree to the Host&apos;s House
            Rules, Ground rules for guests, Motel&apos;s Rebooking and Refund
            Policy, and that Motel can charge my payment method if I’m
            responsible for damage.
          </p>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full md:max-w-[180px] mt-7 px-5 py-3 rounded-md bg-[#1b4281] hover:bg-[#002662] transition duration-200 ease-in text-white font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-gray-400 min-w-[180px]"
          >
            {isProcessing ? (
              <>
                <PulseLoader size={8} color="#000000" speedMultiplier={0.5} />
              </>
            ) : (
              "Confirm and pay"
            )}
          </button>
        </form>
    </div>
  );
};

export default Payment;
