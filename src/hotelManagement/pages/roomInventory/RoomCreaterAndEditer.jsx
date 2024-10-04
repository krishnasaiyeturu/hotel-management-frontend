import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faQuestionCircle,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoom as createRoomAction,
  editRoom as updateRoomAction,
} from "../../redux/actions/roomsActions";
import api from "../../../backend";
import { amenitiesList } from "../../modules/constants";
import toast from "react-hot-toast";

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

  const [showTooltip, setShowTooltip] = useState({
    roomType: false,
    amenities: false,
    roomDetails: false,
  });

  const mockData = {
    roomType: "Deluxe",
    roomCapacity: "2",
    roomPrice: "150",
    roomDescription: "A luxurious room with sea view.",
    amenities: ["Wi-Fi", "Mini-bar"],
    roomDetails: [{ roomNumber: "101", floorNumber: "1" }],
    roomImages: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
    ], // You can simulate existing images here if needed
  };
  const location = useLocation();
  const [roomTypes, setRoomTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const admin = useSelector((state) => state.admin);
  const activeHotel = useSelector((state) => state.admin.hotels.activeHotel);
  // Handle input change for main fields
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
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
    } else {
      setCreateRoom({
        ...createRoom,
        [name]: value,
      });
    }
    // Validate the specific field
    const updatedErrors = errors;
    if (updatedErrors[`${name}`]) {
      delete errors[`${name}`];
    }
    setErrors(updatedErrors);
  };

  // Handle input change for room details (room number & floor)
  const handleRoomDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newRoomDetails = [...createRoom.roomDetails];
    newRoomDetails[index][name] = value;
    const room = { ...createRoom, roomDetails: newRoomDetails };
    setCreateRoom(room);
    const newErrors = errors;
    const hasRoomDetailError = room.roomDetails.every(
      (detail) => detail.roomNumber && detail.floorNumber
    );
    // If there's any error in room details, set a general error message
    if (hasRoomDetailError) {
      delete newErrors.roomDetails;
    }
  };

  // Add new row for room number and floor number
  const addRoom = () => {
    const room = {
      ...createRoom,
      roomDetails: [
        ...createRoom.roomDetails,
        { roomNumber: "", floorNumber: "" },
      ],
    };
    setCreateRoom(room);
    const newErrors = errors;
    const hasRoomDetailError = room.roomDetails.every(
      (detail) => detail.roomNumber && detail.floorNumber
    );
    // If there's any error in room details, set a general error message
    if (!hasRoomDetailError) {
      delete newErrors.roomDetails;
    }
  };

  // Remove room row
  const removeRoom = (index) => {
    const newRoomDetails = [...createRoom.roomDetails];
    newRoomDetails.splice(index, 1);
    const room = { ...createRoom, roomDetails: newRoomDetails };
    setCreateRoom(room);
    const newErrors = errors;
    const hasRoomDetailError = room.roomDetails.every(
      (detail) => detail.roomNumber && detail.floorNumber
    );
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
      newImages[index] = file; // store image URL in state
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
    const validateRooms = createRoom.roomDetails.every(
      (detail) => detail.roomNumber && detail.floorNumber
    );
    if (!validateRooms) {
      newErrors.roomDetails = "Please fill the room details";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log({ activeHotel });
  // Function to create FormData for creating a room
  const createRoomFormData = () => {
    const formData = new FormData();
    formData.append("hotel", activeHotel._id);
    formData.append("roomTypeName", createRoom.roomType);
    formData.append("description", createRoom.roomDescription);
    formData.append("maxOccupancy", createRoom.roomCapacity);
    formData.append("pricePerNight", createRoom.roomPrice);
    formData.append(`rooms`, JSON.stringify(createRoom.roomDetails));
    formData.append(`amenities`, JSON.stringify(createRoom.amenities));
    createRoom.roomImages.forEach((image) => {
      formData.append(`photos`, image);
    });
    return formData;
  };

  // Function to create FormData for editing a room
  const editRoomFormData = () => {
    const formData = new FormData();
    let isModified = false; // Track if there are any modifications

    // Compare with mockData and append only changed fields
    if (createRoom.roomType !== mockData.roomType) {
      formData.append("roomTypeName", createRoom.roomType);
      isModified = true;
    }

    if (createRoom.roomDescription !== mockData.roomDescription) {
      formData.append("description", createRoom.roomDescription);
      isModified = true;
    }

    if (createRoom.roomCapacity !== mockData.roomCapacity) {
      formData.append("maxOccupancy", createRoom.roomCapacity);
      isModified = true;
    }

    if (createRoom.roomPrice !== mockData.roomPrice) {
      formData.append("pricePerNight", createRoom.roomPrice);
      isModified = true;
    }

    // Handle rooms and amenities comparison
    const originalRooms = mockData.roomDetails || [];
    const originalAmenities = mockData.amenities || [];

    // Check for changed room details
    if (
      JSON.stringify(createRoom.roomDetails) !== JSON.stringify(originalRooms)
    ) {
      formData.append("rooms", JSON.stringify(createRoom.roomDetails));
      isModified = true;
    }

    // Check for changed amenities
    if (
      JSON.stringify(createRoom.amenities) !== JSON.stringify(originalAmenities)
    ) {
      formData.append("amenities", JSON.stringify(createRoom.amenities));
      isModified = true;
    }

    // Append each photo if added (assuming it's a file object)
    createRoom.roomImages.forEach((image) => {
      if (!mockData.roomImages.includes(image)) {
        // Check if the image is new
        formData.append("photos", image);
        isModified = true;
      }
    });

    return isModified ? formData : null; // Return null if no fields were changed
  };

  // In handleSubmit, check if formData is not null
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(createRoom)) {
      // Keep the validation check here
      let formData;

      if (location.pathname.includes("/edit-room")) {
        formData = editRoomFormData(); // Call edit function to get FormData
        console.log('edit form data',{ formData });
        if (!formData) {
          toast.info("No changes made to update.");
          return; // Stop if no changes were found
        }
      } else {
        formData = createRoomFormData(); // Call create function to get FormData
        console.log("create form data", { formData });
      }

      try {
        const response = dispatch(
          location.pathname.includes("/edit-room")
            ? updateRoomAction(formData)
            : createRoomAction(formData)
        );
        console.log("Room Creation/Update", { response });
        navigate("/rooms-inventory"); // Redirect after creation/update
        toast.success(
          location.pathname.includes("/edit-room")
            ? "Room updated successfully!"
            : "Room created successfully!"
        );
      } catch (error) {
        console.log({ error: error });
        toast.error("Failed to process room!");
      }
    }
  };

  const getAllRoomTypes = async () => {
    try {
      const response = await api.get("/room/room-types");
      const list = response.data.data;
      setRoomTypes(list);
    } catch (error) {
      console.error("Error fetching room types", error);
    }
  };
  // UseEffect to set initial room data for editing
  useEffect(() => {
    // Check the pathname and set mock data for editing
    if (location.pathname.includes("/edit-room")) {
      setCreateRoom(mockData);
    }
    getAllRoomTypes();
  }, [location.pathname]);

  const getImageBasedOnImagetype = (image) => {
    console.log("IMAGE TYPE", image.type);
    // return image
    if (image.type !== undefined) {
      return URL.createObjectURL(image);
    } else {
      return image;
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  console.log({ createRoom });
  return (
    <div className="bg-white p-6 rounded shadow-md mx-auto">
      <form onSubmit={handleSubmit} className="px-8 py-4 space-y-8">
        <h1 className="text-lg text-center font-semibold">
          {location.pathname.includes("/edit-room")
            ? "Update Room"
            : "Create Room"}
        </h1>
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
                  src={getImageBasedOnImagetype(image)}
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
              Room Type *
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
              {roomTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
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
          <label className="font-medium text-base">
            Amenities
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
          <div className="grid grid-cols-4 gap-2 py-2">
            {amenitiesList.map((amenity, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  checked={createRoom.amenities.includes(amenity)}
                  onChange={handleChange}
                />{" "}
                {amenity}
              </label>
            ))}
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
          {location.pathname.includes("/edit-room") ? (
            <button
              type="submit"
              className={`bg-blue-500 text-white p-2 rounded-md transition-opacity ${
                hasErrors ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={hasErrors}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
              Update Room
            </button>
          ) : (
            <button
              type="submit"
              className={`bg-blue-500 text-white p-2 rounded-md transition-opacity ${
                hasErrors ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={hasErrors}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create Room
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RoomCreatorAndEditor;
