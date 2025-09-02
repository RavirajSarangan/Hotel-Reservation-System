"use client"; // Ensure this is at the top!

import React from "react";
import TopBar from "./home-1/TopBar";
import HeaderOne from "./home-1/Header";
import BannerOne from "./home-1/Banner";
import AdvanceForm from "./home-1/AdvanceForm";
import AboutOne from "./home-1/About";
import FacilitiesOne from "./home-1/FacilitiesOne";
import RoomOne from "./home-1/RoomOne";
import TestimonialOne from "./home-1/TestimonialOne";
import VideoOne from "./home-1/VideoOne";
import OfferOne from "./home-1/OfferOne";
import GalleryOne from "./home-1/GalleryOne";
import FooterOne from "./home-1/FooterOne";
import BackToTop from "./home-1/BackToTop";
import ModernChatbot from "../components/ModernChatbot";

function Page() { // Use PascalCase for Next.js pages
  return (
    <div className="modern-hotel-wrapper">
      {/* Modern gradient overlay for enhanced visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-hotel-primary/5 pointer-events-none z-0"></div>
      
      <div className="relative z-10">
        <TopBar />
        <HeaderOne />
        <BannerOne />
        <AdvanceForm />
        <AboutOne />
        <FacilitiesOne />
        <RoomOne className="pt-120" />
        <TestimonialOne />
        <VideoOne />
        <OfferOne />
        <GalleryOne />
        <FooterOne />
        <BackToTop />
        <ModernChatbot />
      </div>
    </div>
  );
}

export default Page;
