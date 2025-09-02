import React from 'react'
import TopBar from "../home-1/TopBar";
import HeaderOne from "../home-1/Header";
import BannerTwo from './Banner';
import AdvanceForm from '../home-1/AdvanceForm';
import AboutTwo from './About';
import FacilitiesTwo from './Facilities';
import RoomTwo from './Room';
import posts from '../data/data-room.json';
import TestimonialTwo from './Testimonial';
import VideoTwo from './Video';
import OfferTwo from './Offer';
import GalleryTwo from './Gallery';
import FooterOne from "../home-1/FooterOne";
import BackToTop from "../home-1/BackToTop";
import GDPRCookie from '../home-1/GDPRCookie';
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
      <BannerTwo />
      <AdvanceForm />
      <AboutTwo />
      <FacilitiesTwo />
      <RoomTwo posts={posts} />
      <TestimonialTwo />
      <VideoTwo />
      <OfferTwo />
      <GalleryTwo />
      <FooterOne />
      <BackToTop />
    </>
  )
}

export default page