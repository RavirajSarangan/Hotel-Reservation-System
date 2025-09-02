import React from 'react'
import GDPRCookie from '../home-1/GDPRCookie'
import TopBar from '../home-1/TopBar'
import HeaderOne from '../home-1/Header'
import BreadcrumbOne from '../breadcrumb/Breadcrumb'
import AboutFour from '../home-5/About'
import FacilitiesSeven from './Facilities'
import TeamOne from './Team'
import TestimonialOne from '../home-1/TestimonialOne'
import FooterOne from '../home-1/FooterOne'
import BackToTop from '../home-1/BackToTop'

function page() {
  return (
    <>
      <GDPRCookie
        settings={{
          title: "Accept Cookies & privacy",
          message: "Cookies enable you to use shopping carts and to personalize your experience on our sites, tell us which parts of our websites people have visited, help us measure the effectiveness of ads and web searches.",
          expires: 90, // Cookie expiration in days
        }}
      />
      <TopBar />
      <HeaderOne />
      <BreadcrumbOne
        title="About Us"
        description="Welcome to Bokinn, where luxury meets comfort in the heart of Canada."
      />
      <AboutFour />
      <FacilitiesSeven />
      <TeamOne />
      <TestimonialOne />
      <FooterOne />
      <BackToTop />
    </>
  )
}

export default page