import React from 'react'
import TopBar from '../home-1/TopBar'
import HeaderOne from '../home-1/Header'
import BreadcrumbOne from '../breadcrumb/Breadcrumb'
import AboutSeven from './About'
import GalleryFour from './Gallery'
import FoodMenuOne from './FoodMenu'
import TestimonialSection from '../home-6/Testimonial'
import FooterOne from '../home-1/FooterOne'
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
            <TopBar />
            <HeaderOne />
            <BreadcrumbOne
                title="The Restaurant"
                description="Whether you are in the mood for a leisurely breakfast, a business lunch, or a romantic dinner."
            />
            <AboutSeven />
            <GalleryFour />
            <FoodMenuOne />
            <TestimonialSection className="section__padding" />
            <FooterOne />
            <BackToTop />
        </>
    )
}

export default page