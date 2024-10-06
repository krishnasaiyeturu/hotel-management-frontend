import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCookieBite,
  faClock,
  faCashRegister,
  faBed,
  faPercent,
  faCoffee,
  faDoorOpen,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const Offers = () => {
  const offers = [
    { icon: faCheckCircle, text: "Free cancellation anytime" },
    { icon: faDoorOpen, text: "Free early check-in" },
    { icon: faClock, text: "Free late checkout" },
    { icon: faCashRegister, text: "No deposit required" },
    { icon: faBed, text: "After every five nights, one night is free" },
    { icon: faCoffee, text: "Free hot breakfast buffet" },
    { icon: faPercent, text: "10% discount on advance booking" },
    { icon: faCookieBite, text: "Fresh cookies in the evening" },
    { icon: faBriefcase, text: "24/7 Business Center Access" },
  ];

  return (
    <div className="bg-white text-white py-10">
      <div className="px-4">
        <h2 className="text-xl text-[#002d72] text-center font-bold text-left mb-4">
          OUR SPECIAL OFFERS
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-4">
          {offers.map((offer, index) => (
            <li
              key={index}
              className="flex items-center bg-white-100 text-blue-600 p-4 rounded-lg shadow-xl"
            >
              <FontAwesomeIcon
                icon={offer.icon}
                className="text-blue-600 w-8 h-8 mr-4"
              />
              <span className="lg:text-sm md:text-sm sm:text-base text-xs font-semibold text-black">
                {offer.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Offers;
