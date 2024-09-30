// import React from 'react'
import AboutUs from './AboutUs'
import Home from '../../Pages/Home'
import IncludedWithStay from './IncludesWithStay'
import AdditionalInformation from './AdditionalInformation'
import HomeCarousel from './HomeCarousel'

const HomeContainer = () => {
  return (
    <div>
      <HomeCarousel />
      <AboutUs />
      <Home />
      <IncludedWithStay />
      <AdditionalInformation />
    </div>
  )
}

export default HomeContainer
