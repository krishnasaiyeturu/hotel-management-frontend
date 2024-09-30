import  { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const AdditionalInformation = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionData = [
    {
      title: "Additional Amenities",
      content: [
        "Complimentary coffee and tea supplies",
        "Mini refrigerator",
        "In-room safe",
        "Work desk with lamp",
        "Iron and ironing board",
        "Smoke detectors",
        "Sound system",
        "Stereo or radio available",
      ],
    },
    {
      title: "Accessible Guest Room Features",
      content: [
        "Wide doorways",
        "Accessible bathroom facilities",
        "Visual and audible alarms",
        "Accessible work desk",
        "Roll-in shower",
      ],
    },
    {
      title: "Available by Request",
      content: [
        "Extra pillows and blankets",
        "Baby crib",
        "Microwave",
        "Pet-friendly options",
        "Laundry service",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-12">
      <h1 className="font-bold text-2xl text-[#002d72] py-2 text-center">
        Additional information
      </h1>
      {accordionData.map((item, index) => (
        <div key={index} className="border-b">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left p-4 flex justify-between items-center"
          >
            <span className="font-semibold text-lg mr-4">{item.title}</span>{" "}
            {/* Added margin-right */}
            <FontAwesomeIcon
              icon={openAccordion === index ? faChevronUp : faChevronDown}
            />
          </button>
          {openAccordion === index && (
            <div className="p-4">
              <ul className="list-disc list-inside">
                {item.content.map((contentItem, idx) => (
                  <li key={idx} className="text-gray-700">
                    {contentItem}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdditionalInformation;
