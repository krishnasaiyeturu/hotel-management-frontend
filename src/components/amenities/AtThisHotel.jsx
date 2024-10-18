/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
      </div>
      {isOpen && <div className="p-4 bg-gray-50">{children}</div>}
    </div>
  );
};

const AtThisHotel = () => {
  return (
    <div className="mx-28 py-10">
      <h2 className="text-xl text-[#002d72] font-bold text-center px-4 ">
        AT THIS HOTEL
      </h2>
      {/* <h2 className="text-2xl font-bold text-center mb-6"></h2> */}
      <AccordionItem title="Hotel Details">
        <p>
          Our hotel offers a luxurious experience with elegantly furnished
          rooms, modern amenities, and a breathtaking view of the city skyline.
          Guests can enjoy complimentary breakfast, 24-hour room service, and
          access to our rooftop terrace, which is perfect for relaxing in the
          evening. We prioritize customer service, ensuring that every stay is
          memorable.
        </p>
      </AccordionItem>
      <AccordionItem title="Fitness Center">
        <p>
          The fitness center is equipped with state-of-the-art exercise
          machines, free weights, and a variety of cardio equipment. Our
          facilities include personal training sessions and group classes,
          allowing guests to maintain their fitness routines during their stay.
          The gym is open 24/7, and fresh towels and water are provided for all
          guests.
        </p>
      </AccordionItem>
      <AccordionItem title="24/7 Guest Support">
        <p>
          Our dedicated support team is available around the clock to assist you
          with any needs or inquiries. Whether it's arranging transportation,
          booking reservations, or providing local recommendations, we're here
          to ensure your stay is smooth and enjoyable at any time, day or night.
        </p>
      </AccordionItem>
      <AccordionItem title="Parking and Transportation">
        <p>
          We provide complimentary on-site parking for all guests. For those who
          prefer public transportation, the hotel is conveniently located near
          major bus and train stations. Additionally, our concierge service can
          arrange shuttle services or car rentals to explore the city and
          surrounding areas.
        </p>
      </AccordionItem>
      <AccordionItem title="Pool">
        <p>
          Our outdoor pool is a perfect place to unwind. Surrounded by sun
          loungers and cabanas, guests can relax by the pool or take a
          refreshing dip. The pool area features a bar serving light snacks and
          drinks, creating an enjoyable atmosphere for guests to soak up the
          sun.
        </p>
      </AccordionItem>
      <AccordionItem title="Services">
        <p>
          We offer a range of services designed to make your stay comfortable
          and enjoyable, including laundry services, a 24-hour front desk, and
          concierge assistance to help with reservations and recommendations.
          Guests can also enjoy complimentary Wi-Fi throughout the hotel and
          business services, such as printing and copying.
        </p>
      </AccordionItem>
    </div>
  );
};

export default AtThisHotel;
