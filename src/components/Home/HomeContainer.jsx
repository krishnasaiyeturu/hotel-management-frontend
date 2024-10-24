// import React from 'react'
import AboutUs from './AboutUs'
// import Home from '../../Pages/Home'
import IncludedWithStay from './IncludesWithStay'
import AdditionalInformation from './AdditionalInformation'
import HomeCarousel from './HomeCarousel'
import AvailablityCheckCard from '../ListingDetails/AvailablityCheckCard'
import HotelBenefits from '../amenities/HotelBenefits'
import HomePageRoomsList from './HomePageRoomsList'

const HomeContainer = () => {
  return (
    <div>
      <div className="relative">
        {/* HomeCarousel - Full Width */}
        <div>
          <HomeCarousel />
        </div>

        {/* AvailablityCheckCard - Positioned to Overlap */}
        <div className="absolute toHeightForMobile md:topHeight left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[80%]">
          <AvailablityCheckCard />
        </div>
      </div>
      <HotelBenefits />
      <IncludedWithStay />
      {/* <Home /> */}
      <HomePageRoomsList />
      <AboutUs />
      <AdditionalInformation />
    </div>
  );
}

export default HomeContainer
