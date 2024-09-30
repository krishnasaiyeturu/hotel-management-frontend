import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faBath,
  faTv,
  faLaptop,
  faWind,
  faBroom,
  faFan,
  faWifi,
  faGlassMartiniAlt,
} from "@fortawesome/free-solid-svg-icons";

const IncludedWithStay = () => {
  const amenities = [
    { icon: faCoffee, label: "Coffee maker" },
    { icon: faBath, label: "Bath amenities" },
    { icon: faLaptop, label: "Work space" },
    { icon: faFan, label: "Hair dryer" },
    { icon: faBroom, label: "Daily housekeeping" },
    { icon: faTv, label: "Television" },
    { icon: faWind, label: "Air conditioning" },
    { icon: faWifi, label: "Free Wi-Fi" },
    { icon: faGlassMartiniAlt, label: "Mini Bar" },
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
            <span className="text-base font-semibold">{amenity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncludedWithStay;
