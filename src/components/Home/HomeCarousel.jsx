import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  {
    src: "https://digital.ihg.com/is/image/ihg/holiday-inn-express-and-suites-la-porte-2532858980-3x2",
    text: "Experience luxury like never before at ASPEN GRAND HOTELS.",
  },
  {
    src: "https://images.pexels.com/photos/6460876/pexels-photo-6460876.jpeg?auto=compress&cs=tinysrgb&w=600",
    text: "Wake up to breathtaking views and serene mornings.",
  },
  {
    src: "https://digital.ihg.com/is/image/ihg/holiday-inn-express-and-suites-la-porte-2532859053-4x3?wid=733",
    text: "Immerse yourself in comfort and style.",
  },
  {
    src: "https://images.pexels.com/photos/6284232/pexels-photo-6284232.jpeg?auto=compress&cs=tinysrgb&w=600",
    text: "Unwind in a haven of peace and relaxation.",
  },
  {
    src: "https://images.pexels.com/photos/6585597/pexels-photo-6585597.jpeg?auto=compress&cs=tinysrgb&w=600",
    text: "Explore modern amenities designed for your convenience.",
  },
  {
    src: "https://images.pexels.com/photos/6394651/pexels-photo-6394651.jpeg?auto=compress&cs=tinysrgb&w=600",
    text: "Where exceptional service meets elegance.",
  },
];

const HomeCarousel = () => {
  return (
    <div className="relative">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={3000}
        showStatus={false}
        stopOnHover={true}
        showArrows={true}
      >
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.src}
              alt={`carousel-item-${index}`}
              className="w-full h-[40rem] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-center text-white pb-52">
              <h2 className="text-4xl text-gray-400 font-semibold">
                {image.text} {/* Dynamically show text based on image */}
              </h2>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Static buttons */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center">
        <div className="mt-6 space-x-4">
          <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-white transition duration-300">
            Rooms & Suites
          </button>
          <button className="bg-[#33568f] text-white px-6 py-2 rounded-lg hover:bg-[#001844] transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
