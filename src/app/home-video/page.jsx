'use client'
import React, { useEffect } from 'react'
import TopBar from "../home-1/TopBar";
import HeaderOne from "../home-dark/Header";
import BannerVideo from './Banner';
import AdvanceForm from "../home-1/AdvanceForm";
import AboutOne from "../home-1/About";
import FacilitiesOne from "../home-1/FacilitiesOne";
import RoomOne from "../home-1/RoomOne";
import TestimonialOne from "../home-1/TestimonialOne";
import VideoOne from "../home-1/VideoOne";
import OfferOne from "../home-1/OfferOne";
import GalleryOne from "../home-1/GalleryOne";
import FooterOne from "../home-1/FooterOne";
import BackToTop from "../home-1/BackToTop";
import GDPRCookie from '../home-1/GDPRCookie';
import Chatbot from '../../components/Chatbot';

function page() {
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "dark");
        return () => {
            document.documentElement.removeAttribute("data-theme"); // Cleanup when leaving this page
        };

    }, []);
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
            <BannerVideo />
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
            <Chatbot />
        </>
    )
}

export default page
