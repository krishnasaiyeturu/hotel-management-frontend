/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDateFormatting } from "../../hooks/useDateFormatting";
import {
  // PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Payment = ({ searchParamsObj }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [statesLoader, setstatesLoader] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  // Additional guest information fields
  const [addressInfo, setAddressInfo] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipcode: "",
  });
  const [errors, setErrors] = useState({});
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
  const updateErrors = (name) => {
    const updatedErrors = errors;
    if (updatedErrors[`${name}`]) {
      delete updatedErrors[`${name}`];
    }
    setErrors(updatedErrors);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo({
      ...guestInfo,
      [name]: value,
    });
    updateErrors(name);
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
  const fetchCountries = async () => {
    try {
      const countriesUrl =
        "https://countriesnow.space/api/v0.1/countries/capital";
      const response = await axios.get(countriesUrl);
      setCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  // Fetch all countries
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch states based on selected country
  const fetchStates = async (country) => {
    if (country) {
      setstatesLoader(true);
      try {
        const statesUrl =
          "https://countriesnow.space/api/v0.1/countries/states";
        const response = await axios.post(statesUrl, { country: country });
        setStates(response.data.data.states);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setstatesLoader(false);
      }
    } else {
      setStates([]);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo({
      ...addressInfo,
      [name]: value,
    });
    updateErrors(name);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!guestInfo.firstName) newErrors.firstName = "First Name is required.";
    if (!guestInfo.lastName) newErrors.lastName = "Last Name is required.";
    if (!guestInfo.email) newErrors.email = "Email is required.";
    if (!addressInfo.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required.";
    if (!selectedCountry) newErrors.country = "Country is required.";
    if (!selectedState) newErrors.state = "State is required.";
    if (!addressInfo.city) newErrors.city = "City is required.";
    if (!addressInfo.zipcode) newErrors.zipcode = "Zip code is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // reservation form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
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
        // setMessage(error.message);
        toast.error("Payment failed. Try again!");
      }
      setIsProcessing(false);
    }
  };
  console.log({ states });
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
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
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
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
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
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-[1.3px] bg-[#dddddd] my-4" />
      <div className="flex flex-col gap-6">
        <h5 className="text-xl md:text-[22px] text-[#222222] font-medium">
          Address Information
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address Line 1 */}
          <div className="p-1 rounded-md">
            <label
              htmlFor="addressLine1"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line 1
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={addressInfo.addressLine1}
              onChange={handleAddressChange}
              className={`mt-1 block w-full border ${errors.addressLine1 ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2`}
              required
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm">{errors.addressLine1}</p>
            )}
          </div>
          {/* Address Line 2 */}
          <div className="p-1 rounded-md">
            <label
              htmlFor="addressLine2"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={addressInfo.addressLine2}
              onChange={handleAddressChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm">{errors.addressLine2}</p>
            )}
          </div>

          {/* Country Dropdown */}
          <div className="p-1 rounded-md">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={selectedCountry}
              onChange={(e) => {
                updateErrors(e.target.name);
                setSelectedCountry(e.target.value);
                fetchStates(e.target.value);
                setSelectedState("");
              }}
              className={`mt-1 block w-full border ${errors.country ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2`}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>

          {/* State Dropdown */}
          <div className="p-1 rounded-md">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <select
              id="state"
              name="state"
              value={selectedState}
              onChange={(e) => {
                updateErrors(e.target.name);
                setSelectedState(e.target.value);
              }}
              className={`mt-1 block w-full border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2`}
              required
            >
              <option value="">Select State</option>
              {statesLoader ? (
                <div className="loader-container">
                  <PulseLoader color="#36D7B7" size={10} />
                </div>
              ) : (
                <>
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </>
              )}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          {/* City */}
          <div className="p-1 rounded-md">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={addressInfo.city}
              onChange={handleAddressChange}
              className={`mt-1 block w-full border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2`}
              required
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          {/* Zip Code */}
          <div className="p-1 rounded-md">
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium text-gray-700"
            >
              Zip Code
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={addressInfo.zipcode}
              onChange={handleAddressChange}
              className={`mt-1 block w-full border ${errors.zipcode ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2`}
              required
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm">{errors.zipcode}</p>
            )}
          </div>
        </div>
      </div>
      {/* payment element */}
      <form onSubmit={handleSubmit}>
        {/* <h5 className="text-xl md:text-[22px] text-[#222222] font-medium pb-4">
            Pay with
          </h5> */}
        {/* <PaymentElement /> */}
        <hr className="w-full h-[1.3px] bg-[#dddddd] my-10" />
        <div>
          <h5 className="text-xl md:text-[22px] text-[#222222] font-medium">
            Ground rules
          </h5>
          <p className="text-sm md:text-base text-[#222222] py-4">
            We ask every guest to remember a few simple things about what makes
            a great guest.
          </p>
          <ul className="text-sm md:text-base list-disc pl-5">
            <li>Follow the house rules </li>
            <li>Treat your Host’s home like your own</li>
          </ul>
        </div>
        <hr className="w-full h-[1.3px] bg-[#dddddd] my-10" />
        <p className="text-xs opacity-70">
          By selecting the button below, I agree to the Host&apos;s House Rules,
          Ground rules for guests, Motel&apos;s Rebooking and Refund Policy, and
          that Motel can charge my payment method if I’m responsible for damage.
        </p>

        {/* <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded-md transition-opacity ${
            hasErrors ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={hasErrors} // Disable button if there are errors
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create Room
        </button> */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className={`px-4 mt-5 bg-blue-500 text-white p-2 rounded-md transition-opacity ${
              Object.keys(errors).length > 0 || isProcessing
                ? "bg-gray-400 opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } rounded-md py-2`}
            disabled={Object.keys(errors).length > 0 || isProcessing}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
