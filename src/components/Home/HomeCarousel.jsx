import { Carousel } from "react-responsive-carousel";
// import hotelImage from "../../assets/hotelImages/hotel-image.png";
// import foodImage from "../../assets/hotelImages/food-image.png";
// import hotelRoom from "../../assets/hotelImages/hotel-room.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import hotelImg from "../../assets/aspengrandhotellaportepictures/Front.jpg";
import room1 from "../../assets/aspengrandhotellaportepictures/STANDARD-KING.jpg";
import room2 from "../../assets/aspengrandhotellaportepictures/king-suite3.jpg";
import room3 from "../../assets/aspengrandhotellaportepictures/king-suite.jpg";
import room4 from "../../assets/aspengrandhotellaportepictures/2qb2.jpeg";
import room5 from "../../assets/aspengrandhotellaportepictures/pool2.jpg";
import dinning from "../../assets/aspengrandhotellaportepictures/Dinning.jpg";

//  imagess Front,2qtsup,2QB,2qb1,2qb2,BF,Dinning,
const images = [hotelImg, room1, room2, room3, room4, room5, dinning];

const HomeCarousel = () => {
  return (
    <div className="relative">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={2000}
        showStatus={false}
        stopOnHover={true}
        showArrows={true}
      >
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`carousel-item-${index}`}
              className="w-full h-[40rem] object-cover"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-end items-center text-white pb-52">
              <h2 className="text-4xl text-gray-400 font-semibold">
                {image.text} Dynamically show text based on image
              </h2>
            </div> */}
          </div>
        ))}
      </Carousel>

      {/* Static buttons */}
      {/* <div className="absolute bottom-32 left-0 right-0 flex justify-center">
        <div className="mt-6 space-x-4">
          <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-white transition duration-300">
            Rooms & Suites
          </button>
          <button className="bg-[#33568f] text-white px-6 py-2 rounded-lg hover:bg-[#001844] transition duration-300">
            Book Now
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default HomeCarousel;
