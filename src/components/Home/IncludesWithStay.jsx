import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTv,
  faLaptop,
  faWind,
  faBroom,
  faWifi,
  faJugDetergent,
  faDumbbell,
  faSwimmingPool,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const IncludedWithStay = () => {
  const amenities = [
    { icon: faJugDetergent, label: "Guest Laundry" },
    { icon: faSwimmingPool, label: "Swimming Pool" },
    { icon: faLaptop, label: "Work space" },
    { icon: faBriefcase, label: "Business Center" },
    { icon: faBroom, label: "Daily housekeeping" },
    { icon: faTv, label: "Television" },
    { icon: faWind, label: "Air conditioning" },
    { icon: faWifi, label: "Free Wi-Fi" },
    { icon: faDumbbell, label: "Fitness Center" },
  ];

  return (
    <div className="bg-gray-100 py-8 px-6">
      <h2 className="text-xl text-[#002d72] font-bold text-left px-9 mb-8">
        INCLUDED WITH EVERY STAY
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex flex-col items-center">
            <FontAwesomeIcon icon={amenity.icon} className="text-2xl mb-2" />
            <span className="lg:text-sm md:text-sm sm:text-base text-xs font-semibold">
              {amenity.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncludedWithStay;
