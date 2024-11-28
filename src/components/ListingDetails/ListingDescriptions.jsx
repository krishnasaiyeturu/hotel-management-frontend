// import ListingDescriptionPopup from "../popUp/ListingDescriptionPopup";
import Map from "../../components/Map";
// import { amenities } from "./amenitiesApi";
// import { AiOutlineRight } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable react/prop-types */
const ListingDescriptions = ({ listingData }) => {
  const latitude = 29.6567;
  const longitude = -95.02791;
  const latLong = [latitude, longitude];
  // const latLongNaN = isNaN(latitude) || isNaN(longitude);
  return (
    <>
      <div className=" flex flex-row justify-between items-center max-h-16">
        <div className=" flex flex-col gap-1 text-[#222222]">
          <h5 className="text-lg">
            This room is offered by{" "}
            <span className="text-xl font-bold"> {listingData?.hotel?.name}</span>
          </h5>
          <p className=" text-sm md:text-base">
            <span className="text-[#001f53] text-base">
              {listingData?.maxOccupancy}
            </span>{" "}
            Guests ·{" "}
            {/* {listingData?.floorPlan?.bedrooms} bedroom ·{" "}
            {listingData?.floorPlan?.beds} beds ·{" "}
            {listingData?.floorPlan?.bathroomsNumber} bath */}
          </p>
        </div>
        {/* profile img */}
        <div>
          {listingData ? (
            <FontAwesomeIcon icon={faUserCircle} className="mr-2 w-8 h-8" />
          ) : null}
        </div>
      </div>
      <hr className=" h-[1.2px] w-full bg-[#dddddd] my-8" />
      {/* description in short */}
      <div>
        <p className=" whitespace-pre-wrap">{listingData?.description}...</p>
      </div>
      {/* modal button */}
      {/* <button
        className=" flex pt-7 underline text-black font-medium items-center gap-1 max-w-[120px]"
        onClick={() => document.getElementById("listing_modal").showModal()}
      >
        Show more
        <AiOutlineRight size={18} />
      </button> */}

      <hr className=" h-[1.2px] w-full bg-[#dddddd] my-8" />

      {/* amenities / what's this place is offering */}
      <div className=" flex flex-col gap-6">
        <h2 className="text-[22px] text-[#222222] font-medium">
          What this place offers
        </h2>
        {/* <div className=" grid grid-cols-2 gap-x-3 md:gap-x-0 gap-y-4">
          {listingData?.amenities.map((item) => {
             if (listingData?.amenities?.includes(item)) {
             return (
             <div key={item} className=" flex flex-row gap-4 items-center">
            {
              // /* <item.svg size={26} opacity={0.8} /> */}
        {/* <p className="text-xs sm:text-sm md:text-base text-[#222222]">
              {item}
            </p>;
             </div>; */}
        {/* </div> */}
        <div className="grid grid-cols-2 gap-x-3 md:gap-x-0 gap-y-4">
          {listingData?.amenities.map((item, index) => (
            <span key={index} className="text-base text-black">
              {item}
            </span>
          ))}
        </div>
      </div>

      <hr className=" h-[1.2px] w-full bg-[#dddddd] my-8" />

      {/* location of the listing */}
      <div className=" flex flex-col gap-6">
        <h2 className="text-[22px] text-[#222222] font-medium">
          Where you&apos;ll be
        </h2>
        {/* map */}
        <div className=" w-full min-h-[400px]">
          <Map latAndLong={latLong} zoom={6} key="listingMap" />
        </div>
      </div>

      {/* reviews section */}
      {/* {listingData?.review ? <></> : <></>} */}

      {/* full description modal */}
      {/* <ListingDescriptionPopup description={listingData?.description} /> */}
    </>
  );
};

export default ListingDescriptions;
