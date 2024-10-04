import { useParams } from "react-router-dom";
import ListingTitle from "../components/ListingDetails/ListingTitle";
import ListingsPhotos from "../components/ListingDetails/ListingsPhotos";
import ListingDescriptions from "../components/ListingDetails/ListingDescriptions";
import ReservationCard from "../components/ListingDetails/ReservationCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneListingRoomsDetails } from "../redux/actions/houseActions";
import ListingDetailsPageSkeleton from "../components/skeletonLoading/ListingDetailsPageSkeleton";

const ListingDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const selectedRoomData = useSelector((state) => state.house.listingDetails);
  const params = useParams();
  console.log({ selectedRoomData });
  const dispatch = useDispatch();
  const roomPictures = [
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  // listing details selectedRoomData
  // const listingData = selectedRoomData?.listing;
  const listingData = {
    ...selectedRoomData?.listing,
    photos: roomPictures,
  };
  console.log({ listingData });
  // const listedAuthor = selectedRoomData?.listingAuthor;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    async function getListingData() {
      await dispatch(getOneListingRoomsDetails(params.id));
      setIsLoading(false);
    }
    getListingData();
  }, [params.id, dispatch]);

  if (isLoading) {
    return <ListingDetailsPageSkeleton />;
  }
  return (
    <main className="max-w-screen-xl xl:px-12 mx-auto py-7 px-5 sm:px-16 md:px-8">
      <section className=" flex flex-col-reverse md:flex-col gap-7">
        {/* listing title & wishlist */}
        <ListingTitle listingData={selectedRoomData} />
        {/* listing photos */}
        <ListingsPhotos listingData={selectedRoomData} />
      </section>
      <section className=" grid grid-cols-1 md:grid-cols-8 lg:grid-cols-6 md:gap-x-8 lg:gap-x-20 pt-8 sm:pt-12 md:pt-16">
        {/* listings description and details */}
        <div className="md:col-span-5 lg:col-span-4 order-2 md:order-1 flex flex-col min-h-[800px] pt-16 sm:pt-20 md:pt-0">
          <ListingDescriptions
            listingData={selectedRoomData}
            // author={listedAuthor}
          />
        </div>
        {/* reservations of the listing */}
        <div className="md:col-span-3 lg:col-span-2 order-1 md:order-2 max-h-[900px]">
          <ReservationCard listingData={selectedRoomData} />
        </div>
      </section>
    </main>
  );
};

export default ListingDetails;
