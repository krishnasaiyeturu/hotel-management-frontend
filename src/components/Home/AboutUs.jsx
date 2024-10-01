// import React from "react"; // Import React (optional for modern React versions)

function About() {
  return (
    <section className="px-6 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-xl text-[#002d72]">ABOUT US</h1>
          <p className="mt-4 text-gray-700">
            Welcome to{" "}
            <strong className="text-[#637fac]">ASPEN GRAND HOTELS</strong>,
            where elegance meets comfort in a stunning blend of modern luxury
            and timeless charm. Nestled in the heart of a vibrant city, our
            hotel offers an oasis of tranquility with breathtaking views,
            exquisite interiors, and exceptional service. Whether you are here
            for business or leisure, each of our spacious rooms is designed to
            provide you with an unparalleled experience of relaxation and style.
            Indulge in world-class dining, unwind in our serene spa, or explore
            the local attractions just steps away. At{" "}
            <strong className="text-[#637fac]">ASPEN GRAND HOTELS</strong>, we
            create memories as unforgettable as the destination itself.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://digital.ihg.com/is/image/ihg/holiday-inn-express-and-suites-la-porte-2532858980-4x3?wid=733"
            alt="About Us Image"
            className="w-full h-3/4 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
