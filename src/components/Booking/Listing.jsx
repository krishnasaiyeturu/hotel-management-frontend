/* eslint-disable react/prop-types */
import { AiFillStar } from "react-icons/ai";

const Listing = ({ listingData, calculatedPriceDetails }) => {

  return (
    <div className="relative">
      <div className="border border-[#dddddd] rounded-xl p-6 sticky top-24 max-h-[85vh] bg-white overflow-y-auto">
        {/* Images Section */}
        <div className="grid grid-cols-3 gap-2">
          {listingData?.photos.slice(0, 3).map((photo, index) => (
            <div key={index}>
              <img
                src={photo}
                alt={`Listing image ${index + 1}`}
                className="rounded-md object-cover w-full h-[100px] sm:h-[120px]"
              />
            </div>
          ))}
        </div>

        {/* Room Title and Hotel Rating */}
        <div className="grid grid-cols-2 p-4 gap-2">
          <p className="text-sm text-[#222222]">{listingData?.name}</p>
          <span className="text-xs text-[#222222] flex justify-end items-center gap-1">
            <AiFillStar size={16} />
            {listingData?.hotel?.rating || "New"}
          </span>
        </div>

        <hr className="w-full h-[1.3px] bg-[#dddddd] mb-6" />

        {/* Price Breakdown */}
        <div className="grid gap-3">
          <h5 className="text-[22px] text-[#222222] font-medium pb-1">
            Your total
          </h5>
          <div className="grid grid-cols-2 justify-between text-base text-[#222]">
            <p>1 Night</p>
            <p>${calculatedPriceDetails?.pricePerNight}</p>
          </div>
          <div className="grid grid-cols-2 justify-between text-base text-[#222]">
            <p>{calculatedPriceDetails?.nights} nights</p>
            <p>${calculatedPriceDetails?.totalPriceBeforeTax}</p>
          </div>
          <div className="grid grid-cols-2 justify-between text-base text-[#222]">
            <p>Tax</p>
            <p>
              ${calculatedPriceDetails?.taxAmount} (
              {calculatedPriceDetails?.taxRate})
            </p>
          </div>
        </div>

        <hr className="w-full h-[1.3px] bg-[#dddddd] my-6" />

        {/* Total Price */}
        <div className="grid grid-cols-2 justify-between text-base text-[#222] font-medium">
          <p>Total (USD)</p>
          <p>${calculatedPriceDetails?.totalPriceAfterTax || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default Listing;
