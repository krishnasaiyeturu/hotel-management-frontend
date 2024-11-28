// import { Link } from "react-router-dom";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-[#dddddd] text-sm text-[#222222] relative bottom-0 z-[20]">
        <div className="bg-[#f7f7f7] py-4">
          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-between max-w-screen-2xl mx-auto px-10">
            <div className="flex flex-col gap-4 opacity-80">
              <h6 className=" text-[#002d72] font-bold">Support</h6>
              <p>Customer Support</p>
              <p>Contact Us</p>
              {/* <p>Travel Insurance</p>
              <p>Help for Guests with Disabilities</p>
              <p>Reservation Assistance</p>
              <p>Covid-19 Response</p>
              <p>Report an Issue</p> */}
            </div>
            <div className="flex flex-col gap-4 opacity-80">
              <h6 className=" text-[#002d72] font-bold">Community</h6>
              <p>Aspen Grand Cares: Community Support</p>
              <p>Diversity & Inclusion</p>
              <p>Environment & Sustainability</p>
            </div>
            <div className="flex flex-col gap-4 opacity-80">
              <h6 className="text-[#002d72] font-bold">Services</h6>
              {/* <Link to="/services/booking" className="hover:underline">
                Booking
              </Link> */}
              <p>Booking</p>
              <p>Room Reservations</p>
              <p>Event Hosting</p>
              <p>Special Offers</p>
            </div>
            <div className="flex flex-col gap-4 opacity-80">
              <h6 className="text-[#002d72] font-bold">ASPEN GRAND HOTELS</h6>
              <p>About Us</p>
              <p>Corporate News</p>
            </div>
          </section>
        </div>
        {/* <hr className="bg-[#f7f7f7] mb-6" /> */}
        <section className="flex py-4  bg-[#001844] flex-row flex-wrap justify-between gap-10 px-10 mx-auto">
          <div className="flex flex-row flex-wrap items-center">
            <p className="text-white">© 2023 ASPEN GRAND HOTELS, Inc.</p>
            <span className="p-3">·</span>
            <p className="text-white">Terms of Service</p>
            <span className="p-3">·</span>
            <p className="text-white">Privacy Policy</p>
            <span className="p-3">·</span>
            <p className="text-white">Cookie Preferences</p>
          </div>
          <div className="flex flex-row gap-5 min-w-[120px] items-center">
            <p>English (US)</p>
            <FontAwesomeIcon icon={faFacebook} className="w-6 h-5 text-white" />
            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-5 text-white" />
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
