import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faJugDetergent,
  faTv,
  faLaptop,
  faWind,
  faBroom,
  faDumbbell,
  faWifi,
  faBriefcase,
  faKitchenSet,
  faCar,
  faCampground,
  faUtensils,
  faShirt,
  faSwimmingPool,
  faConciergeBell,
} from "@fortawesome/free-solid-svg-icons";

const IncludedAmenitiesList = () => {
  const amenities = [
    { icon: <FontAwesomeIcon icon={faCoffee} />, label: "Coffee maker" },
    { icon: <FontAwesomeIcon icon={faJugDetergent} />, label: "Guest Laundry" },
    { icon: <FontAwesomeIcon icon={faLaptop} />, label: "Work space" },
    {
      icon: <FontAwesomeIcon icon={faConciergeBell} />,
      label: "24-hour Room Service",
    },
    { icon: <FontAwesomeIcon icon={faDumbbell} />, label: "Fitness Center" },
    { icon: <FontAwesomeIcon icon={faBroom} />, label: "Daily housekeeping" },
    { icon: <FontAwesomeIcon icon={faWind} />, label: "Air conditioning" },
    { icon: <FontAwesomeIcon icon={faWifi} />, label: "Free Wi-Fi" },
    { icon: <FontAwesomeIcon icon={faBriefcase} />, label: "Business Center" },
    { icon: <FontAwesomeIcon icon={faKitchenSet} />, label: "Kitchen" }, // FontAwesome Kitchen icon
    { icon: <FontAwesomeIcon icon={faShirt} />, label: "Washer" }, // FontAwesome Washer icon
    { icon: <FontAwesomeIcon icon={faCar} />, label: "Free parking" }, // FontAwesome Car icon
    { icon: <FontAwesomeIcon icon={faTv} />, label: "Television" },
    { icon: <FontAwesomeIcon icon={faSwimmingPool} />, label: "Swimming Pool" },
    { icon: <FontAwesomeIcon icon={faCampground} />, label: "Camp fire" }, // FontAwesome Campfire icon
    {
      icon: <FontAwesomeIcon icon={faUtensils} />,
      label: "Outdoor dining area",
    },
  ];

  return (
    <>
      <div className="bg-gray-100 py-8 px-6">
        <h2 className="text-xl text-[#002d72] font-bold text-center px-9 mb-8">
          INCLUDED WITH EVERY STAY
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-2xl mb-2">{amenity.icon}</div>
              <span className="text-base font-semibold">{amenity.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IncludedAmenitiesList;
