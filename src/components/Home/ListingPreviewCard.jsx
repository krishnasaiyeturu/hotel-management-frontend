/* eslint-disable react/prop-types */
import { AiFillStar } from "react-icons/ai";

const ListingPreviewCard = ({ room }) => {
  // const taxes = Math.round((room?.basePrice * 14) / 100);
  // const priceAfterTaxes = room?.basePrice + taxes;
         
  return (
    <>
      <div className=" h-[310px] md:h-[277px] overflow-hidden rounded-xl">
        <img
          src={room?.photos[0]}
          alt="Listing images"
          className=" w-full h-[310px] md:h-[277px] object-cover object-center rounded-xl hover:scale-110 transition duration-500 ease-in-out cursor-pointer"
        />
      </div>
      <div className=" flex flex-row justify-between items-start w-full">
        {/* listings details */}
        <div className=" flex flex-col gap-1">
          <p className="text-sm text-[#222222] font-medium">
            {room?.name}
            {/* {room?.hotel?.location?.city}, {room?.hotel?.location?.country} */}
          </p>
          {/* {showBeforeTaxPrice && (
            <p className="text-sm text-[#717171]">
              After tax ${priceAfterTaxes}{" "}
              <span className=" font-normal">night</span>
            </p>
          )} */}
          <p className="text-sm text-[#222222] font-semibold">
            ${room?.pricePerNight} <span className=" font-normal">night</span>
          </p>
        </div>
        {/* ratings / new status */}
        <div className=" flex flex-row gap-1 items-center">
          {room?.ratings ? (
            <>
              <AiFillStar size={16} />
              <p className=" text-sm">{room?.hotel?.rating}</p>
            </>
          ) : (
            <>
              <AiFillStar size={16} />
              <p className=" text-sm">New</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListingPreviewCard;
