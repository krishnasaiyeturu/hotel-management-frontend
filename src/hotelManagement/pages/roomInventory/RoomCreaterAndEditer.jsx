import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRoom as createRoomAction } from "../../redux/actions/roomsActions";

const RoomCreatorAndEditor = () => {
  // Form state
  const [createRoom, setCreateRoom] = useState({
    roomType: "",
    roomCapacity: "",
    roomPrice: "",
    roomDescription: "",
    amenities: [],
    roomDetails: [{ roomNumber: "", floorNumber: "" }],
    roomImages: [],
  });
  console.log(createRoom.roomImages)
  const [showTooltip, setShowTooltip] = useState({
    roomType: false,
    amenities: false,
    roomDetails: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const admin = useSelector((state) => state.admin);
  const activeHotel = useSelector((state) => state.admin.hotels.activeHotel);
  // Handle input change for main fields
  const handleChange = (e) => {
    const { name, value,checked } = e.target;
    if (name === "amenities") {
      // Handle the amenities as an array of strings
      let updatedAmenities = createRoom.amenities || [];

      if (checked) {
        // Add the amenity if checked
        updatedAmenities = [...updatedAmenities, value];
      } else {
        // Remove the amenity if unchecked
        updatedAmenities = updatedAmenities.filter(
          (amenity) => amenity !== value
        );
      }

      setCreateRoom({
        ...createRoom,
        amenities: updatedAmenities,
      });
    } else{
      setCreateRoom({
        ...createRoom,
        [name]: value,
      });
    }
    // Validate the specific field
    const updatedErrors = errors;
    console.log({ updatedErrors }, 1);
    if (updatedErrors[`${name}`]) {
      delete errors[`${name}`];
    }
    console.log({ updatedErrors }, 2);
    setErrors(updatedErrors);
  };

  // Handle input change for room details (room number & floor)
  const handleRoomDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newRoomDetails = [...createRoom.roomDetails];
    newRoomDetails[index][name] = value;
    setCreateRoom({ ...createRoom, roomDetails: newRoomDetails });
  };
  console.log({ errors });

  // Add new row for room number and floor number
  const addRoom = () => {
    setCreateRoom({
      ...createRoom,
      roomDetails: [
        ...createRoom.roomDetails,
        { roomNumber: "", floorNumber: "" },
      ],
    });
  };

  // Remove room row
  const removeRoom = (index) => {
    const newRoomDetails = [...createRoom.roomDetails];
    newRoomDetails.splice(index, 1);
    const allRooms = { ...createRoom, roomDetails: newRoomDetails };
    setCreateRoom(allRooms);
    const newErrors = errors;
    let hasRoomDetailError = false;
    if (
      allRooms.every((detail) => detail.roomNumber && detail.floorNumber)
    ) {
      delete newErrors.roomDetails; // Clear room details error if all fields are valid
    }
    // If there's any error in room details, set a general error message
    if (!hasRoomDetailError) {
      delete newErrors.roomDetails;
    }
    setErrors(newErrors);
  };

  // Handle image selection
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...createRoom.roomImages];
      newImages[index] = URL.createObjectURL(file); // store image URL in state
      setCreateRoom({ ...createRoom, roomImages: newImages });
    }
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    const newImages = [...createRoom.roomImages];
    newImages.splice(index, 1);
    setCreateRoom({ ...createRoom, roomImages: newImages });
  };
  // Form validation
  const validateForm = (formState) => {
    const newErrors = {};
    if (!formState.roomType) newErrors.roomType = "Room type is required";
    if (!formState.roomCapacity)
      newErrors.roomCapacity = "Room capacity is required";
    if (!formState.roomPrice) newErrors.roomPrice = "Room price is required";
    if (!formState.roomDescription)
      newErrors.roomDescription = "Room description is required";
    let hasRoomDetailError = false;
    formState.roomDetails.forEach((detail) => {
      if (!detail.roomNumber || !detail.floorNumber) {
        hasRoomDetailError = true;
      }
    });
    // If there's any error in room details, set a general error message
    if (hasRoomDetailError) {
      newErrors.roomDetails = "All room details must be filled out.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();  if (validateForm(createRoom)) {
    // Create FormData instance
    const formData = new FormData();
    // Append fields to formData
    console.log({createRoom: createRoom})
    formData.append("hotel", activeHotel._id);
    formData.append("roomTypeName", createRoom.roomType);
    formData.append("description", createRoom.roomDescription);
    formData.append("maxOccupancy", createRoom.roomCapacity);
    formData.append("pricePerNight", createRoom.roomPrice);
    // For arrays like rooms and amenities, append them one by one
    // createRoom.roomDetails.forEach((room) => {
      formData.append(`rooms`, JSON.stringify(createRoom.roomDetails));
    // });
    // createRoom.amenities.forEach((amenity) => {
      formData.append(`amenities`, JSON.stringify(createRoom.amenities));
    // });
    // Append each photo (assuming it's a file object)
    createRoom.roomImages.forEach((image) => {
      formData.append(`photos`, image);
    });
    dispatch(createRoomAction(formData));
    navigate("/admin/room-inventory");
  }
};


  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="bg-white p-6 rounded shadow-md mx-auto">
      <form onSubmit={handleSubmit} className="px-8 py-4 space-y-8">
        <h1 className="text-lg text-center font-semibold">Create Room</h1>
        {/* Room Picture */}
        <div>
          <label className="font-medium text-base">
            Room Picture{" "}
            <FontAwesomeIcon
              icon={faQuestionCircle}
              onMouseEnter={() =>
                setShowTooltip({ ...showTooltip, roomDetails: true })
              }
              onMouseLeave={() =>
                setShowTooltip({ ...showTooltip, roomDetails: false })
              }
            />
          </label>
          {showTooltip.roomDetails && (
            <span className="text-sm border-1 bg-gray-100 p-2 mx-2 text-gray-500 absolute">
              Add pictures of the room for better visibility.
            </span>
          )}
          <div className="flex gap-4 mt-2">
            {createRoom.roomImages.map((image, index) => (
              <div
                key={index}
                className="relative w-28 h-28 border border-gray-300"
              >
                <img
                  src={image}
                  alt="Room"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute bottom-1 right-1 bg-red-600 text-white p-1 rounded-full"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
            {/* Add Image Button */}
            {createRoom.roomImages.length < 3 && (
              <label className="w-28 h-28 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer">
                <FontAwesomeIcon icon={faPlus} className="text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e, createRoom.roomImages.length)
                  }
                />
              </label>
            )}
          </div>
        </div>
        {/* Room Type */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="font-medium text-base">
              Room Type *{" "}
              <FontAwesomeIcon
                icon={faQuestionCircle}
                onMouseEnter={() =>
                  setShowTooltip({ ...showTooltip, roomType: true })
                }
                onMouseLeave={() =>
                  setShowTooltip({ ...showTooltip, roomType: false })
                }
              />
            </label>
            {showTooltip.roomType && (
              <span className="text-sm border-1 bg-gray-100 p-2 mx-2 text-gray-500 absolute">
                Select the type of room you are creating.
              </span>
            )}
            <select
              name="roomType"
              value={createRoom.roomType}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">Select Type</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
            {errors.roomType && (
              <span className="text-red-500 text-sm">{errors.roomType}</span>
            )}
          </div>
          <div>
            <label className=" font-medium text-base">Room Capacity *</label>
            <input
              type="text"
              name="roomCapacity"
              value={createRoom.roomCapacity}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.roomCapacity && (
              <span className="text-red-500 text-sm">
                {errors.roomCapacity}
              </span>
            )}
          </div>
          <div>
            <label className=" font-medium text-base">
              Room Price per Night *
            </label>
            <input
              type="text"
              name="roomPrice"
              value={createRoom.roomPrice}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.roomPrice && (
              <span className="text-red-500 text-sm">{errors.roomPrice}</span>
            )}
          </div>
          {/* Room Description */}
          <div>
            <label className="font-medium text-base">Room Description *</label>
            <textarea
              name="roomDescription"
              value={createRoom.roomDescription}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors.roomDescription && (
              <span className="text-red-500 text-sm">
                {errors.roomDescription}
              </span>
            )}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className=" font-medium text-base">
            Amenities{" "}
            <FontAwesomeIcon
              icon={faQuestionCircle}
              onMouseEnter={() =>
                setShowTooltip({ ...showTooltip, amenities: true })
              }
              onMouseLeave={() =>
                setShowTooltip({ ...showTooltip, amenities: false })
              }
            />
          </label>
          {showTooltip.amenities && (
            <span className="text-sm border-1 bg-gray-100 p-2 mx-2 text-gray-500 absolute">
              Select amenities available in the room.
            </span>
          )}
          <div className="grid grid-cols-4 gap-2">
            <label>
              <input
                type="checkbox"
                name="amenities"
                value="Wi-Fi"
                onChange={handleChange}
              />{" "}
              Wi-Fi
            </label>
            <label>
              <input
                type="checkbox"
                name="amenities"
                value="Mini-bar"
                onChange={handleChange}
              />{" "}
              Mini-bar
            </label>
            <label>
              <input
                type="checkbox"
                name="amenities"
                value="Coffee maker"
                onChange={handleChange}
              />{" "}
              Coffee maker
            </label>
            <label>
              <input
                type="checkbox"
                name="amenities"
                value="Sea view"
                onChange={handleChange}
              />{" "}
              Sea view
            </label>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="mt-6">
          <label className=" font-medium text-base">
            Rooms{" "}
            <FontAwesomeIcon
              icon={faQuestionCircle}
              onMouseEnter={() =>
                setShowTooltip({ ...showTooltip, roomDetails: true })
              }
              onMouseLeave={() =>
                setShowTooltip({ ...showTooltip, roomDetails: false })
              }
            />
          </label>
          {showTooltip.roomDetails && (
            <span className="text-sm border-1 bg-gray-100 p-2 mx-2 text-gray-500 absolute">
              Add room numbers and select floors for each room.
            </span>
          )}
          {createRoom.roomDetails.map((roomDetail, index) => (
            <div key={index} className="grid grid-cols-3 gap-6 mb-4">
              <div>
                <label className=" font-medium text-base">Room Number *</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={roomDetail.roomNumber}
                  onChange={(e) => handleRoomDetailChange(index, e)}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label className=" font-medium text-base">Room Floor *</label>
                <select
                  name="floorNumber"
                  value={roomDetail.floorNumber}
                  onChange={(e) => handleRoomDetailChange(index, e)}
                  className="border p-2 w-full"
                >
                  <option value="">Select Floor</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div className="flex pt-5 items-center">
                {index === createRoom.roomDetails.length - 1 ? (
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={addRoom}
                    className="cursor-pointer text-2xl text-blue-500"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => removeRoom(index)}
                    className="cursor-pointer text-xl text-red-500"
                  />
                )}
              </div>
            </div>
          ))}
          {/* // Display combined error message for room details */}
          {errors.roomDetails && (
            <span className="text-red-500 text-sm">{errors.roomDetails}</span>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded-md transition-opacity ${
              hasErrors ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={hasErrors} // Disable button if there are errors
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomCreatorAndEditor;
