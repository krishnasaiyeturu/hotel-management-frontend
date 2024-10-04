import { useEffect, useState } from "react";
// import Heading from "../ui/Heading"; // Adjust the path for your Heading component
// import Image from "next/image";

const SUPABASE_ROOMS_URL = "https://example.com/images"; // Mocked Supabase URL

// Mock room data
const mockRooms = [
  {
    id: 1,
    thumbnail:
      "https://images.pexels.com/photos/22469110/pexels-photo-22469110/free-photo-of-pillows-and-book-on-hotel-bed.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    thumbnail:
      "https://images.pexels.com/photos/14917460/pexels-photo-14917460.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    thumbnail:
      "https://images.pexels.com/photos/9462740/pexels-photo-9462740.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    thumbnail:
      "https://images.pexels.com/photos/8134808/pexels-photo-8134808.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    thumbnail:
      "https://images.pexels.com/photos/8134787/pexels-photo-8134787.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    thumbnail:
      "https://images.pexels.com/photos/8092391/pexels-photo-8092391.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    thumbnail:
      "https://images.pexels.com/photos/8089070/pexels-photo-8089070.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    thumbnail:
      "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function Gallery() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Simulate fetching data by setting mock data
    setRooms(mockRooms);
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h1 className="font-bold text-xl text-center text-[#002d72]">
          GALLERY
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 py-4 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rooms.map((item) => (
            <div key={item.id} className="relative w-full h-64">
              <img
                src={item.thumbnail}
                alt={`Room ${item.id}`}
                className="object-cover object-center rounded-xl hover:scale-110 transition duration-500 ease-in-out cursor-pointer"
                // className="object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
