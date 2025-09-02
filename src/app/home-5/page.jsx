import React from 'react'
import HeaderFour from './Header'
import BannerFive from './Banner'
import AdvanceForm from '../home-1/AdvanceForm'
import AboutFour from './About'
import RoomThree from './Room'
import posts from '../data/data-room.json'
import ServiceTwo from './Service'
import FacilitiesFour from './Facilities'
import TestimonialFive from './Testimonial'
import BlogTwo from './Blog'
import NewsletterTwo from './Newsletter'
import FooterFour from './Footer'
import BackToTop from '../home-1/BackToTop'
import GDPRCookie from '../home-1/GDPRCookie'

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
      <HeaderFour />
      <BannerFive />
      <AdvanceForm />
      <AboutFour />
      <RoomThree posts={posts} />
      <ServiceTwo />
      <FacilitiesFour />
      <TestimonialFive />
      <BlogTwo />
      <NewsletterTwo />
      <FooterFour />
      <BackToTop />
    </>
  )
}

export default page